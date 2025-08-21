import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

interface ControlledSwitchProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  label: string
  id: string
}

export function ControlledSwitch<T extends FieldValues>({ name, control, label, id }: ControlledSwitchProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
          <Switch id={id} checked={field.value} onCheckedChange={field.onChange} />
          <Label htmlFor={id} className="text-sm">
            {label}
          </Label>
        </div>
      )}
    />
  )
}
