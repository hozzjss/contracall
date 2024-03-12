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
      const newValue = e.target.value
      setInternalValue(newValue)
      if (!newValue) {
        return onChange(null)
      }
      if (!isNaN(Number(newValue))) {
        onChange(uintCV(Number(newValue)))
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
