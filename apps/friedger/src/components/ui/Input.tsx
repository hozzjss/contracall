import { Ref } from "react"

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    inputRef?: Ref<HTMLInputElement>
  },
) {
  return (
    <input
      {...props}
      className={
        "caret-white outline-none px-4 py-2 " + (props.className || "")
      }
      ref={props.inputRef}
    />
  )
}
