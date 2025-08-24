import DashboardPage from "@/components/pages/pupils/list/list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pupils/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardPage />;
}
