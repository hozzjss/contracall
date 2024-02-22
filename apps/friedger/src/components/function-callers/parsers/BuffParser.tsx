import { useCallback, useState } from "react"
import Input from "../../ui/Input"
import { BufferCV, bufferCVFromString } from "@stacks/transactions"
import { bufferFromHex } from "@stacks/transactions/dist/cl"

export default function BuffParser({
  value,
  onChange,
  // maxLength,
  name,
}: {
  value?: BufferCV
  onChange: (value: BufferCV) => void
  name: string
  // maxLength: number
}) {
  const [internalValue, setInternalValue] = useState(
    value?.buffer ? String(value?.buffer) : ""
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInternalValue(value)
      let buffValue: BufferCV
      if (value.startsWith("0x")) {
        buffValue = bufferFromHex(value.slice(2))
      } else {
        buffValue = bufferCVFromString(value)
      }
      onChange(buffValue)
    },
    [onChange]
  )

  return (
    <Input
      name={name}
      type="text"
      value={internalValue}
      placeholder={`start with 0x for hex`}
      onChange={handleChange}
    />
  )
}
