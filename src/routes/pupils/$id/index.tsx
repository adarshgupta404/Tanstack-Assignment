import PupilProfileSkeleton from "@/components/loaders/profile-skeleton";
import ViewPupil from "@/components/pupils/view/view";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/pupils/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <Suspense fallback={<PupilProfileSkeleton />}>
      <ViewPupil id={id} />
    </Suspense>
  );
}
