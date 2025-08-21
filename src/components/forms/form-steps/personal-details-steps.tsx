"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PupilFormType } from "@/types/validator/pupil-form"
import { UserIcon } from "lucide-react"
import type { Control, FieldErrors } from "react-hook-form"
import { ControlledSelect } from "../form-fields/controller-select"
import { ControlledDatePicker } from "../form-fields/controller-date-picker"

interface PersonalDetailsStepProps {
  control: Control<PupilFormType>
  register: any
  errors: FieldErrors<PupilFormType>
  clearErrors: (name?: keyof PupilFormType) => void
}

const titleOptions = [
  { value: "Mr", label: "Mr" },
  { value: "Mrs", label: "Mrs" },
  { value: "Miss", label: "Miss" },
  { value: "Ms", label: "Ms" },
  { value: "Dr", label: "Dr" },
]

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "other", label: "Other" },
]

export function PersonalDetailsStep({ control, register, errors, clearErrors }: PersonalDetailsStepProps) {
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
            <Label htmlFor="forename">Forename *</Label>
            <Input
              id="forename"
              {...register("forename")}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            {errors.forename && <p className="text-sm text-destructive">{errors.forename.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="surname">Surname *</Label>
            <Input
              id="surname"
              {...register("surname")}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            {errors.surname && <p className="text-sm text-destructive">{errors.surname.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <ControlledSelect name="title" control={control} placeholder="Select title" options={titleOptions} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth *</Label>
            <ControlledDatePicker
              name="dob"
              control={control}
              placeholder="Select date of birth"
              error={errors.dob?.message}
              onDateChange={() => clearErrors("dob")}
            />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <ControlledSelect
              name="gender"
              control={control}
              placeholder="Select gender"
              options={genderOptions}
              error={errors.gender?.message}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
