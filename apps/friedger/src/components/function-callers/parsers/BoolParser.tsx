import { useCallback, useState } from "react"
import Input from "../../ui/Input"
import { BooleanCV, ClarityType, boolCV } from "@stacks/transactions"
import { ParserProps } from "./util/types"

export default function BoolParser({
  value,
  onChange,
  name,
  inputRef,
  onBlur,
  disabled,
}: ParserProps<BooleanCV>) {
  const [internalValue, setInternalValue] = useState(
    value?.type === ClarityType.BoolTrue,
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.checked)
      onChange(boolCV(e.target.checked))
    },
    [onChange],
  )

  return (
    <Input
      checked={internalValue}
      disabled={disabled}
      inputRef={inputRef}
      name={name}
      onBlur={onBlur}
      onChange={handleChange}
      type="checkbox"
    />
  )
}
