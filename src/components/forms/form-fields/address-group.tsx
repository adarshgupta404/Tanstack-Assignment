import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, type Control, type FieldValues } from "react-hook-form"

interface AddressFieldGroupProps<T extends FieldValues> {
  control: Control<T>
  prefix: string
  title: string
  errors?: any
}

export function AddressFieldGroup<T extends FieldValues>({
  control,
  prefix,
  title,
  errors,
}: AddressFieldGroupProps<T>) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller
          name={`${prefix}.houseNo` as any}
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor={`${prefix}HouseNo`}>House Number</Label>
              <Input
                id={`${prefix}HouseNo`}
                {...field}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}
        />
        <Controller
          name={`${prefix}.address` as any}
          control={control}
          render={({ field }) => (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`${prefix}Address`}>Address</Label>
              <Input
                id={`${prefix}Address`}
                {...field}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}
        />
      </div>
      <Controller
        name={`${prefix}.postcode` as any}
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label htmlFor={`${prefix}Postcode`}>Postcode</Label>
            <Input
              id={`${prefix}Postcode`}
              {...field}
              placeholder="SW1A 1AA"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            {errors?.postcode && <p className="text-sm text-destructive">{errors.postcode.message}</p>}
          </div>
        )}
      />
    </div>
  )
}
