"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PupilFormType } from "@/types/validator/pupil-form"
import { GraduationCapIcon } from "lucide-react"
import type { Control, FieldErrors } from "react-hook-form"
import { ControlledDatePicker } from "../form-fields/controller-date-picker"
import { ControlledSelect } from "../form-fields/controller-select"
import { ControlledSwitch } from "../form-fields/controller-switch"

interface LicenseTrainingStepProps {
  control: Control<PupilFormType>
  register: any
  errors: FieldErrors<PupilFormType>
  clearErrors: (name?: keyof PupilFormType) => void
}

const pupilTypeOptions = [
  { value: "Manual Gearbox", label: "Manual Gearbox" },
  { value: "Automatic", label: "Automatic" },
  { value: "Motorcycle", label: "Motorcycle" },
  { value: "HGV", label: "HGV" },
]

const licenseTypeOptions = [
  { value: "No License", label: "No License" },
  { value: "Provisional", label: "Provisional" },
  { value: "Full License", label: "Full License" },
]

export function LicenseTrainingStep({ control, register, errors, clearErrors }: LicenseTrainingStepProps) {
  return (
    <Card className="border-2 pt-0 overflow-hidden border-primary/20">
      <CardHeader className="bg-gradient-to-r py-4 from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
        <CardTitle className="flex items-center gap-2">
          <GraduationCapIcon className="w-5 h-5" />
          License & Training Information
        </CardTitle>
        <CardDescription>Tell us about your driving experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Pupil Type *</Label>
            <ControlledSelect
              name="pupilType"
              control={control}
              placeholder="Select pupil type"
              options={pupilTypeOptions}
              error={errors.pupilType?.message}
            />
          </div>

          <div className="space-y-2">
            <Label>License Type *</Label>
            <ControlledSelect
              name="licenseType"
              control={control}
              placeholder="Select license type"
              options={licenseTypeOptions}
              error={errors.licenseType?.message}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="licenseNo">License Number</Label>
          <Input
            id="licenseNo"
            {...register("licenseNo")}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-4">
          <ControlledSwitch
            name="passedTheory"
            control={control}
            label="I have passed my theory test"
            id="passedTheory"
          />

          <ControlledSwitch
            name="fott"
            control={control}
            label="I have completed FOTT (First On The Track)"
            id="fott"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="certNo">Certificate Number</Label>
            <Input
              id="certNo"
              {...register("certNo")}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="datePassed">Date Passed</Label>
            <ControlledDatePicker
              name="datePassed"
              control={control}
              placeholder="Select date passed"
              error={errors.datePassed?.message}
              onDateChange={() => clearErrors("datePassed")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
