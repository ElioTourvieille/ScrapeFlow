"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useId } from "react"
import { ParamProps } from "@/types/appNode"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

function StringParam({ param, value, updateNodeParamValue, disabled }: ParamProps) {
  const [internalValue, setInternalValue] = useState(value || '')
  const id = useId()

  useEffect(() => {
    setInternalValue(value || '')
  }, [value])

  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }

  return (
    <div className="space-y-1 p-1 w-full">
        <Label htmlFor={id} className="tex-xs flex">
          {param.name}
          {param.required && <span className="text-red-500">*</span>}
        </Label>
        <Component 
          id={id} 
          className="bg-white" 
          value={internalValue} 
          placeholder="Enter value here" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInternalValue(e.target.value)} 
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => updateNodeParamValue(e.target.value)} 
          disabled={disabled}
        />
        {param.helperText && (
          <p className="text-muted-foreground px-2">{param.helperText}</p>
        )}
    </div>
  )
}

export default StringParam