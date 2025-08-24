import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PupilFormType } from "@/types/validator/pupil-form"
import { PhoneIcon } from "lucide-react"
import type { Control, FieldErrors } from "react-hook-form"
import { ControlledSwitch } from "../form-fields/controller-switch"
import { PhoneFieldGroup } from "../form-fields/phone-group"

interface ContactInformationStepProps {
  control: Control<PupilFormType>
  register: any
  errors: FieldErrors<PupilFormType>
}

export function ContactInformationStep({ control, register, errors }: ContactInformationStepProps) {
  return (
    <Card className="border-2 pt-0 overflow-hidden border-primary/20">
      <CardHeader className="bg-gradient-to-r py-4 from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <CardTitle className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5" />
          Contact Information
        </CardTitle>
        <CardDescription>How can we reach you?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <PhoneFieldGroup control={control} errors={errors} />

        <ControlledSwitch
          name="allowTextMessaging"
          control={control}
          label="Allow text messaging for lesson reminders and updates"
          id="allowTextMessaging"
        />
      </CardContent>
    </Card>
  )
}
