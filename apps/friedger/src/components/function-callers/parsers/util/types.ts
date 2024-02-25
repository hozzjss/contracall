import { ClarityValue } from "@stacks/transactions"
import { FocusEvent, Ref } from "react"

export type ParserProps<T extends ClarityValue> = {
  value?: T
  onChange: (value: T) => void
  name: string
  disabled?: boolean
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
  inputRef: Ref<HTMLInputElement>
}
