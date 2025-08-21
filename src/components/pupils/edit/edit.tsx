import PupilUpdateForm from "@/components/forms/pupil-update-form";
import Nodata from "@/components/loaders/noData";
import { createPupilDetailQueryOptions } from "@/hooks/queryOptions/pupils";
import {
  isValidObjectId,
  type PupilSchemaType,
} from "@/types/validator/pupils";
import { useSuspenseQuery } from "@tanstack/react-query";

const EditPupil = ({ id }: { id: string }) => {
  
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
        <span className="text-muted-foreground">{data.error.message}</span>
      </div>
    );
  }

  const pupil: PupilSchemaType = data.data;

  return <PupilUpdateForm pupil={pupil} pupilId={id} />;
};

export default EditPupil;
