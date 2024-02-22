import { UIntCV, uintCV } from "@stacks/transactions"
import { useCallback, useState } from "react"
import Input from "../../ui/Input"

export default function UintParser({
  value,
  onChange,
  name,
}: {
  value?: UIntCV
  onChange: (value: UIntCV) => void
  name: string
}) {
  const [internalValue, setInternalValue] = useState(String(value?.value))

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isNaN(Number(e.target.value))) {
        setInternalValue(e.target.value)
        onChange(uintCV(Number(e.target.value)))
      }
    },
    [onChange]
  )

  return (
    <Input
      name={name}
      type="number"
      value={internalValue}
      placeholder="a 128-bit unsigned integer"
      onChange={handleChange}
    />
  )
}
