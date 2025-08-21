import AddPupils from "@/components/pupils/add/add";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pupils/add/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddPupils />;
}
