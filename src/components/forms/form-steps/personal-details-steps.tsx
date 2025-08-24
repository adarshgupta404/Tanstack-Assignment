import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PupilFormType } from "@/types/validator/pupil-form";
import { UserIcon } from "lucide-react";
import type { Control, FieldErrors } from "react-hook-form";
import { ControlledSelect } from "../form-fields/controller-select";
import { ControlledDatePicker } from "../form-fields/controller-date-picker";
import { FormField } from "../form-fields/form-field";

interface PersonalDetailsStepProps {
  control: Control<PupilFormType>;
  register: any;
  errors: FieldErrors<PupilFormType>;
  clearErrors: (name?: keyof PupilFormType) => void;
}

const titleOptions = [
  { value: "Mr", label: "Mr" },
  { value: "Mrs", label: "Mrs" },
  { value: "Miss", label: "Miss" },
  { value: "Ms", label: "Ms" },
  { value: "Dr", label: "Dr" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "other", label: "Other" },
];

export function PersonalDetailsStep({
  control,
  register,
  errors,
  clearErrors,
}: PersonalDetailsStepProps) {
  return (
    <Card className="border-2 pt-0 overflow-hidden border-primary/20">
      <CardHeader className="bg-gradient-to-r py-4 from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="w-5 h-5" />
          Personal Details
        </CardTitle>
        <CardDescription>Tell us about yourself</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <FormField
              label="Forename"
              htmlFor="forename"
              required
              error={errors.forename?.message}
            >
              <Input
                id="forename"
                {...register("forename")}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </FormField>
          </div>

          <div className="space-y-2">
            <FormField
              label="Surname"
              htmlFor="surname"
              required
              error={errors.surname?.message}
            >
              <Input
                id="surname"
                {...register("surname")}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </FormField>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <FormField
              label="Title"
              htmlFor="title"
              error={errors.title?.message}
            >
              <ControlledSelect
                name="title"
                control={control}
                placeholder="Select title"
                options={titleOptions}
              />
            </FormField>
          </div>
          <div className="space-y-2">
            <FormField
              label="Date of Birth"
              htmlFor="dob"
              required
              error={errors.dob?.message}
            >
              <ControlledDatePicker
                name="dob"
                control={control}
                placeholder="Select date of birth"
                error={errors.dob?.message}
              />
            </FormField>
          </div>
          <div className="space-y-2">
            <FormField
              label="Gender"
              htmlFor="gender"
              required
              error={errors.gender?.message}
            >
              <ControlledSelect
                name="gender"
                control={control}
                placeholder="Select gender"
                options={genderOptions}
              />
            </FormField>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
