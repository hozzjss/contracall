import { StringAsciiCV, stringAsciiCV } from "@stacks/transactions"
import { useCallback, useState } from "react"
import Input from "../../ui/Input"
import { ParserProps } from "./util/types"

export default function StringAsciiParser({
  value,
  onChange,
  name,
  inputRef,
  onBlur,
  disabled,
}: ParserProps<StringAsciiCV>) {
  const [internalValue, setInternalValue] = useState(String(value?.data))

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value

      setInternalValue(newValue || "")
      if (!newValue) {
        return onChange(null)
      }
      onChange(stringAsciiCV(newValue))
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
      placeholder="ascii text"
      type="text"
      value={internalValue}
    />
  )
}
