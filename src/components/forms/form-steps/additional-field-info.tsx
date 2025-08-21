import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PupilFormType } from "@/types/validator/pupil-form"
import { NotebookIcon } from "lucide-react"
import type { FieldErrors } from "react-hook-form"

interface AdditionalInformationStepProps {
  register: any
  errors: FieldErrors<PupilFormType>
}

export function AdditionalInformationStep({ register, errors }: AdditionalInformationStepProps) {
  return (
    <Card className="border-2 pt-0 overflow-hidden border-primary/20">
      <CardHeader className="bg-gradient-to-r py-4 from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
        <CardTitle className="flex items-center gap-2">
          <NotebookIcon className="w-5 h-5" />
          Additional Information
        </CardTitle>
        <CardDescription>Any other details we should know?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="usualAvailability">Usual Availability</Label>
          <Textarea
            id="usualAvailability"
            {...register("usualAvailability")}
            placeholder="e.g., Weekday evenings, Saturday mornings..."
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="Any special requirements, medical conditions, or other notes..."
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            rows={4}
          />
          {errors.notes && <p className="text-sm text-destructive">{errors.notes.message}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
