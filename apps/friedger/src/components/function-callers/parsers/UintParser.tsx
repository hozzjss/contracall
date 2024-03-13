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
  const [internalValue, setInternalValue] = useState(
    value?.value ? String(value.value) : "",
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/,/g, "")

      if (!newValue) {
        setInternalValue("")
        return onChange(null)
      }
      if (!isNaN(Number(newValue))) {
        setInternalValue(Number(newValue).toLocaleString())
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
      type="text"
      value={internalValue}
    />
  )
}
