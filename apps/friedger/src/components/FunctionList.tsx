import { ContractInterfaceResponse } from "@stacks/blockchain-api-client"
import { useMemo, useState } from "react"
import { ContractFn } from "../util/stacks-types"

export default function FunctionList(props: {
  data: ContractInterfaceResponse
  onSelect: (fn: ContractFn) => unknown
}) {
  const fns = useMemo(() => {
    return (props.data.functions as ContractFn[]).filter((item) => {
      return item.access !== "private"
    })
  }, [props.data])
  const [hidden, setHidden] = useState(true)
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">Functions</h2>
        <button onClick={() => setHidden(!hidden)} type="button">
          {hidden ? "unhide" : "hide"}
        </button>
      </div>
      {!hidden && (
        <ul className="max-h-64 overflow-auto w-full flex flex-col gap-y-4 p-4">
          {fns.map((contractFn) => {
            return (
              <li
                className="w-full bg-gray-700 p-4 hover:bg-gray-600 cursor-pointer"
                key={contractFn.name}
                onClick={() => props.onSelect(contractFn)}
                onKeyUp={() => props.onSelect(contractFn)}
                role="menuitem"
              >
                {contractFn.name} ({contractFn.access})
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
