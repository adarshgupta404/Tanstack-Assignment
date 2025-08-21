import EditPupil from "@/components/pupils/edit/edit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pupils/$id/edit/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <div>
      <EditPupil id={id} />
    </div>
  );
}
