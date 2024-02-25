import { useCallback, useState } from "react"
import Input from "../../ui/Input"
import {
  PrincipalCV,
  addressToString,
  principalCV,
  validateStacksAddress,
} from "@stacks/transactions"
import { ParserProps } from "./util/types"

export default function PrincipalParser({
  value,
  onChange,
  name,
  inputRef,
  onBlur,
  disabled,
}: ParserProps<PrincipalCV>) {
  const [internalValue, setInternalValue] = useState<string>(
    value ? addressToString(value.address) : "",
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInternalValue(value)
      if (validateStacksAddress(value.split(".")[0] as string)) {
        onChange(principalCV(value))
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
      placeholder="valid stx address or contract address"
      type="text"
      value={internalValue}
    />
  )
}
