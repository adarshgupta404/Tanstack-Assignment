import Searching from "@/components/loaders/searchingEmployees";
import EditPupil from "@/components/pages/pupils/edit/edit";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/pupils/$id/edit/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <Suspense
      fallback={
        <div className="flex py-10 flex-col items-center justify-center w-full">
          <Searching className="w-48 h-48" />
          <span className="text-muted-foreground">Loading pupil...</span>
        </div>
      }
    >
      <EditPupil id={id} />
    </Suspense>
  );
}
