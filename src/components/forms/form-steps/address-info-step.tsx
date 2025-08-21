"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import type { PupilFormType } from "@/types/validator/pupil-form"
import { MapPinIcon } from 'lucide-react'
import { type Control, type FieldErrors } from "react-hook-form"
import { AddressFieldGroup } from "../form-fields/address-group"

interface AddressInformationStepProps {
  control: Control<PupilFormType>
  errors: FieldErrors<PupilFormType>
}

export function AddressInformationStep({ control, errors }: AddressInformationStepProps) {
  return (
    <Card className="border-2 pt-0 overflow-hidden border-primary/20">
      <CardHeader className="bg-gradient-to-r py-4 from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <CardTitle className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5" />
          Address Information
        </CardTitle>
        <CardDescription>Where do you live and where should we pick you up?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <AddressFieldGroup
          control={control}
          prefix="homeAddress"
          title="Home Address"
          errors={errors.homeAddress}
        />
        
        <AddressFieldGroup
          control={control}
          prefix="pickupAddress"
          title="Pickup Address"
          errors={errors.pickupAddress}
        />
      </CardContent>
    </Card>
  )
}
