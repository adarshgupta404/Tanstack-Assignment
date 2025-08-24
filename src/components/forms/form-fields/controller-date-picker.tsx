import { DatePicker } from "@/components/ui/date-picker"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

interface ControlledDatePickerProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  placeholder: string
  error?: string
  onDateChange?: (date: string) => void
}

export function ControlledDatePicker<T extends FieldValues>({
  name,
  control,
  placeholder,
  error,
  onDateChange,
}: ControlledDatePickerProps<T>) {
  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            value={field.value ? new Date(field.value) : undefined}
            onChange={(date) => {
              const dateString = date ? date.toISOString().split("T")[0] : ""
              field.onChange(dateString)
              if (dateString && onDateChange) {
                onDateChange(dateString)
              }
            }}
            placeholder={placeholder}
          />
        )}
      />
    </div>
  )
}
