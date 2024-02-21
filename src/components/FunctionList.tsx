import { ContractInterfaceResponse } from "@stacks/blockchain-api-client"
import { useMemo } from "react"

type FnArg = {
  name: string
  type: "bool" | "buff" | "uint128" | "principal"
}
type ContractFn = {
  name: string
  access: "private" | "public" | "read_only"
  args: FnArg[]
}
export default function FunctionList(props: {
  data: ContractInterfaceResponse
}) {
  const fns = useMemo(() => {
    return (props.data.functions as ContractFn[]).filter((item) => {
      return item.access !== "private"
    })
  }, [props.data])
  return (
    <ul className="max-h-64 overflow-auto w-full flex flex-col gap-y-4 p-4">
      {fns.map((contractFn) => {
        return (
          <li
            className="w-full bg-gray-700 py-4 hover:bg-gray-600 cursor-pointer"
            key={contractFn.name}
          >
            {contractFn.name} ({contractFn.access})
          </li>
        )
      })}
    </ul>
  )
}
