// components/pupils/view/view.tsx
import Nodata from "@/components/loaders/noData";
import { createPupilDetailQueryOptions } from "@/hooks/queryOptions/pupils";
import {
    isValidObjectId,
    type PupilSchemaType,
} from "@/types/validator/pupils";
import { useSuspenseQuery } from "@tanstack/react-query";
import PupilProfile from "./pupil-profile";

const ViewPupil = ({ id }: { id: string }) => {
  if (!isValidObjectId(id)) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <Nodata className="w-48 h-48" />
        <span className="text-muted-foreground">Invalid pupil id.</span>
      </div>
    );
  }

  const { data } = useSuspenseQuery(createPupilDetailQueryOptions(id));

  if (!data.success) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <Nodata className="w-48 h-48" />
        <span className="text-muted-foreground">
          {data.error.message || "No pupil found!"}
        </span>
      </div>
    );
  }

  const pupil: PupilSchemaType = data.data;

  return <PupilProfile pupil={pupil} />;
};

export default ViewPupil;
