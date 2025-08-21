"use client";

import {
  pupilFormSchema,
  type PupilFormType,
} from "@/types/validator/pupil-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FORM_STEPS, FormProgress } from "./form-navigation/form-progress";
import { FormNavigation } from "./form-navigation/form-navigation";
import { AdditionalInformationStep } from "./form-steps/additional-field-info";
import { AddressInformationStep } from "./form-steps/address-info-step";
import { ContactInformationStep } from "./form-steps/contact-info-step";
import { LicenseTrainingStep } from "./form-steps/license-training-info";
import { PersonalDetailsStep } from "./form-steps/personal-details-steps";
import { pupilsApi } from "@/api/pupilsApi";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { userKeys } from "@/hooks/queryOptions/pupils";
import { deepDiff } from "@/lib/utils";

interface PupilUpdateFormProps {
  pupil: PupilFormType;
  pupilId: string;
}

export default function PupilUpdateForm({
  pupil,
  pupilId,
}: PupilUpdateFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<PupilFormType>({
    resolver: zodResolver(pupilFormSchema),
    mode: "onChange",
    defaultValues: pupil,
  });

  const {
    register,
    formState: { errors },
    control,
    trigger,
    clearErrors,
  } = form;

  const handleFormSubmit = async () => {
    try {
      const isValid = await trigger();
      console.log(errors);
      console.log(isValid);
      if (isValid) {
        const formData = form.getValues();
        const diff = deepDiff(pupil, formData);
        setIsSubmitting(true);
        const data = await pupilsApi.update(pupilId, diff);
        if (data.success) {
          toast.success("Pupil registration completed successfully!");
          queryClient.invalidateQueries({ queryKey: userKeys.all });
          queryClient.removeQueries({ queryKey: userKeys.detail(pupilId) });
          navigate({ to: `/pupils/${pupilId}/edit` });
        } else {
          toast.error(
            data.error.message || "Failed to update pupil registration."
          );
        }
      }
    } catch (error: any) {
      toast.error(
        error.error.message ||
          "Failed to complete pupil registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate: any = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < FORM_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof PupilFormType | string)[] => {
    switch (step) {
      case 1:
        return ["forename", "surname", "dob", "gender", "title"];
      case 2:
        return ["email", "home.mobile", "home.work", "allowTextMessaging"];
      case 3:
        return [
          "homeAddress.houseNo",
          "homeAddress.address",
          "homeAddress.postcode",
          "pickupAddress.houseNo",
          "pickupAddress.address",
          "pickupAddress.postcode",
        ];
      case 4:
        return [
          "pupilType",
          "licenseType",
          "licenseNo",
          "datePassed",
          "passedTheory",
          "fott",
        ];
      case 5:
        return ["usualAvailability", "notes"];
      default:
        return [];
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStep
            control={control}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
          />
        );
      case 2:
        return (
          <ContactInformationStep
            control={control}
            register={register}
            errors={errors}
          />
        );
      case 3:
        return <AddressInformationStep control={control} errors={errors} />;
      case 4:
        return (
          <LicenseTrainingStep
            control={control}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
          />
        );
      case 5:
        return (
          <AdditionalInformationStep register={register} errors={errors} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Update Pupil Information</h1>
          <p className="text-muted-foreground">
            Editing details for {`${pupil.forename} ${pupil.surname}`}
          </p>
        </div>

        <FormProgress
          currentStep={currentStep}
          totalSteps={FORM_STEPS.length}
        />
      </div>

      <form className="">
        {renderCurrentStep()}

        <FormNavigation
          currentStep={currentStep}
          totalSteps={FORM_STEPS.length}
          isSubmitting={isSubmitting}
          onPrevious={prevStep}
          onNext={nextStep}
          onSubmit={handleFormSubmit}
          canGoPrevious={currentStep > 1}
          submitButtonText="Update Registration"
        />
      </form>
    </div>
  );
}
