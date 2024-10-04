import * as React from "react"
import { Label } from "@/components/ui/label"



import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

interface props {
  label: string;
  id: string;
  type: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export const FormInput: React.FC<props> = (
  { label, id, type, value, setState, placeholder }
) => {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setState(e.target.value)}
        className="mt-1 w-full bg-gray-900 border-gray-700 text-white"
        placeholder={placeholder}
        required
      />
    </div>
  )
}
