import { Progress } from "@/components/ui/progress"
import { GraduationCapIcon, MapPinIcon, NotebookIcon, PhoneIcon, UserIcon } from "lucide-react"

export const FORM_STEPS = [
  { id: 1, title: "Personal Details", icon: UserIcon },
  { id: 2, title: "Contact Information", icon: PhoneIcon },
  { id: 3, title: "Address Information", icon: MapPinIcon },
  { id: 4, title: "License & Training", icon: GraduationCapIcon },
  { id: 5, title: "Additional Information", icon: NotebookIcon },
]

interface FormProgressProps {
  currentStep: number
  totalSteps: number
}

export function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-4">
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between">
        {FORM_STEPS.map((step) => {
          const Icon = step.icon
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id

          return (
            <div key={step.id} className="flex flex-col items-center space-y-2">
              <div
                className={`${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg scale-110"
                    : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                } w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
