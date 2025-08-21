"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, type Control, type FieldValues } from "react-hook-form"

interface PhoneFieldGroupProps<T extends FieldValues> {
  control: Control<T>
  errors?: any
}

export function PhoneFieldGroup<T extends FieldValues>({ control, errors }: PhoneFieldGroupProps<T>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Controller
        name={"home.mobile" as any}
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Phone</Label>
            <Input
              id="mobile"
              {...field}
              placeholder="+44 07123 456789 (UK)"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            {errors?.home?.mobile && <p className="text-sm text-destructive">{errors.home.mobile.message}</p>}
          </div>
        )}
      />

      <Controller
        name={"home.work" as any}
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label htmlFor="work">Work Phone</Label>
            <Input
              id="work"
              {...field}
              placeholder="+44 01234 567890 (UK)"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            {errors?.home?.work && <p className="text-sm text-destructive">{errors.home.work.message}</p>}
          </div>
        )}
      />
    </div>
  )
}
