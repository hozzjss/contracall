import { useCallback, useState } from "react"
import Input from "../../ui/Input"
import {
  PrincipalCV,
  addressToString,
  principalCV,
  validateStacksAddress,
} from "@stacks/transactions"

export default function PrincipalParser({
  value,
  onChange,
  name,
}: {
  name: string
  value?: PrincipalCV
  onChange: (value: PrincipalCV) => void
}) {
  const [internalValue, setInternalValue] = useState<string>(
    value ? addressToString(value.address) : ""
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInternalValue(value)
      if (validateStacksAddress(value)) {
        onChange(principalCV(value))
      }
    },
    [onChange]
  )

  return (
    <Input
      name={name}
      type="text"
      value={internalValue}
      placeholder="valid stx address"
      onChange={handleChange}
    />
  )
}
