import { UIntCV, uintCV } from "@stacks/transactions"
import { useCallback, useState } from "react"
import Input from "../../ui/Input"
import { ParserProps } from "./util/types"

export default function UintParser({
  value,
  onChange,
  name,
  inputRef,
  onBlur,
  disabled,
}: ParserProps<UIntCV>) {
  const [internalValue, setInternalValue] = useState(String(value?.value))

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isNaN(Number(e.target.value))) {
        setInternalValue(e.target.value)
        onChange(uintCV(Number(e.target.value)))
      }
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
      placeholder="a 128-bit unsigned integer"
      type="number"
      value={internalValue}
    />
  )
}
