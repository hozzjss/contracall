export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={
        "caret-white outline-none px-4 py-2 " + (props.className || "")
      }
    />
  )
}
