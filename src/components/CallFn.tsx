import { ContractFn } from "../util/stacks-types"
import CallReadOnlyFn from "./function-callers/CallReadOnly"

export function CallFn({
  fn,
  contractName,
}: {
  fn: ContractFn
  contractName: string
}) {
  if (fn.access === "read_only") {
    return <CallReadOnlyFn fn={fn} contractName={contractName} />
  }
}
