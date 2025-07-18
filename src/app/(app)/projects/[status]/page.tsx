
'use client';

import React from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader } from "lucide-react";
import Link from "next/link";
import { getProjectsByStatus } from "@/lib/firestore";
import { ProjectClient } from "@/components/projects/project-client";
import { useAuth } from '@/contexts/auth-context';
import type { Project } from '@/lib/data';

// TypeScript interfaces
interface StatusConfig {
  dbValue: string;
  title: string;
}

interface PageParams {
  status: string;
}

interface ProjectsByStatusPageProps {
  params: PageParams;
}

const statusMap: Record<string, StatusConfig> = {
  'all': { dbValue: 'all', title: 'All Projects' },
  'new': { dbValue: 'New', title: 'New Projects' },
  'active': { dbValue: 'Active', title: 'Active Projects' },
  'on-hold': { dbValue: 'On Hold', title: 'On Hold Projects' },
  'completed': { dbValue: 'Completed', title: 'Completed Projects' },
};

export default function ProjectsByStatusPage({ params }: ProjectsByStatusPageProps): JSX.Element {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [projects, setProjects] = React.useState<Project[]>([]);
  
  const statusFilter: string = params.status || 'all';
  const statusConfig: StatusConfig | undefined = statusMap[statusFilter];
  const pageTitle: string = statusConfig ? statusConfig.title : statusMap['all'].title;
  const dbStatus: string = statusConfig ? statusConfig.dbValue : 'all';

  React.useEffect(() => {
    if (user) {
      const fetchData = async (): Promise<void> => {
        setLoading(true);
        const projectsData: Project[] = await getProjectsByStatus(dbStatus, user);
        setProjects(projectsData);
        setLoading(false);
      };
      fetchData();
    }
  }, [user, dbStatus]);

  if (loading || !user) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={pageTitle}
        description={user.role === 'Client' ? 'A list of projects you are associated with.' : `Browse and manage all ${statusFilter.replace('-', ' ')} projects.`}
      >
        {(user.role === 'Admin' || user.role === 'Agent') && (
            <Link href="/projects/create" passHref>
            <Button>
                <PlusCircle />
                Create New Project
            </Button>
            </Link>
        )}
      </PageHeader>
      <ProjectClient projects={projects} />
    </div>
  );
}
