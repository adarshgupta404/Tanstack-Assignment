import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

interface SelectOption {
  value: string
  label: string
}

interface ControlledSelectProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  placeholder: string
  options: SelectOption[]
  error?: string
}

export function ControlledSelect<T extends FieldValues>({
  name,
  control,
  placeholder,
  options,
  error,
}: ControlledSelectProps<T>) {
  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
