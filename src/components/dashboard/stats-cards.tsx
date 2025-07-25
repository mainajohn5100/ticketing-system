import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Ticket, Project } from "@/lib/data";
import { Ticket as TicketIcon, BarChart2, FilePlus2, Briefcase } from "lucide-react";
import { isToday } from "date-fns";
import { useSettings } from "@/contexts/settings-context";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  tickets: Ticket[];
  projects: Project[];
}

export function StatsCards({ tickets, projects }: StatsCardsProps) {
  const { projectsEnabled } = useSettings();
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status !== 'Closed' && t.status !== 'Terminated').length;
  const newTicketsToday = tickets.filter(t => t.createdAt && isToday(new Date(t.createdAt))).length;
  const totalProjects = projects.length;

  const statItems = [
    { title: "Total Tickets", value: totalTickets, icon: TicketIcon, color: "text-blue-500", disabled: false },
    { title: "Open Tickets", value: openTickets, icon: BarChart2, color: "text-green-500", disabled: false },
    { title: "New Tickets Today", value: newTicketsToday, icon: FilePlus2, color: "text-purple-500", disabled: false },
    { title: "Total Projects", value: totalProjects, icon: Briefcase, color: "text-orange-500", disabled: !projectsEnabled },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat, index) => (
        <Card key={index} className={cn(stat.disabled && "bg-muted/50")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={cn("text-sm font-medium", stat.disabled && "text-muted-foreground")}>{stat.title}</CardTitle>
            <stat.icon className={cn("h-4 w-4 text-muted-foreground", !stat.disabled && stat.color)} />
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", stat.disabled && "text-muted-foreground")}>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
