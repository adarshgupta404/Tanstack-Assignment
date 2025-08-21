import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  isSubmitting: boolean
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  canGoPrevious: boolean
  submitButtonText:string
}

export function FormNavigation({
  currentStep,
  totalSteps,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
  canGoPrevious,
  submitButtonText
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps

  return (
    <div className="flex justify-between items-center pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="transition-all duration-200 bg-transparent"
      >
        Previous
      </Button>

      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="px-3 py-1">
          Step {currentStep} of {totalSteps}
        </Badge>
      </div>

      {isLastStep ? (
        <Button type="button" onClick={onSubmit} disabled={isSubmitting} className="transition-all duration-200">
          {isSubmitting ? "Submitting..." : submitButtonText}
        </Button>
      ) : (
        <Button type="button" onClick={onNext} className="transition-all duration-200">
          Next
        </Button>
      )}
    </div>
  )
}
