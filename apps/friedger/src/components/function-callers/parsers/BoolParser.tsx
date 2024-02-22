import { useCallback, useState } from "react"
import Input from "../../ui/Input"
import { BooleanCV, ClarityType, boolCV } from "@stacks/transactions"

export default function BoolParser({
  value,
  onChange,
  name,
}: {
  value?: BooleanCV
  onChange: (value: BooleanCV) => void
  name: string
}) {
  const [internalValue, setInternalValue] = useState(
    value?.type === ClarityType.BoolTrue
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.checked)
      onChange(boolCV(e.target.checked))
    },
    [onChange]
  )

  return (
    <Input
      name={name}
      type="checkbox"
      checked={internalValue}
      onChange={handleChange}
    />
  )
}
