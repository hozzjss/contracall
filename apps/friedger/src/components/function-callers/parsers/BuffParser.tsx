import { useCallback, useState } from "react"
import Input from "../../ui/Input"
import { BufferCV, bufferCVFromString } from "@stacks/transactions"
import { bufferFromHex } from "@stacks/transactions/dist/cl"
import { ParserProps } from "./util/types"

export default function BuffParser({
  value,
  onChange,
  name,
  inputRef,
  onBlur,
  disabled,
}: ParserProps<BufferCV>) {
  const [internalValue, setInternalValue] = useState(
    value?.buffer ? String(value?.buffer) : "",
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInternalValue(value)
      let buffValue: BufferCV
      if (!value) {
        return onChange(null)
      }
      if (value.startsWith("0x")) {
        buffValue = bufferFromHex(value.slice(2))
      } else {
        buffValue = bufferCVFromString(value)
      }
      onChange(buffValue)
    },
    [onChange],
  )

  return (
    <Input
      disabled={disabled}
      inputRef={inputRef}
      name={name}
      onBlur={onBlur}
      onChange={handleChange}
      placeholder="start with 0x for hex"
      type="text"
      value={internalValue}
    />
  )
}
