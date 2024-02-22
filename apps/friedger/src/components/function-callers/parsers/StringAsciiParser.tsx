import { StringAsciiCV, stringAsciiCV } from "@stacks/transactions"
import { useCallback, useState } from "react"
import Input from "../../ui/Input"

export default function StringAsciiParser({
  value,
  onChange,
  maxLength,
  name,
}: {
  value?: StringAsciiCV
  onChange: (value: StringAsciiCV) => void
  name: string
  maxLength: number
}) {
  const [internalValue, setInternalValue] = useState(String(value?.data))

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      onChange(stringAsciiCV(e.target.value))
    },
    [onChange]
  )

  return (
    <Input
      name={name}
      maxLength={maxLength}
      type="text"
      value={internalValue}
      placeholder={`up to ${maxLength} characters`}
      onChange={handleChange}
    />
  )
}
