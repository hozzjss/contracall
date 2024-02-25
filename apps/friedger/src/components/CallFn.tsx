import { ContractFn } from "../util/stacks-types"
import CallPublic from "./function-callers/CallPublic"
import CallReadOnlyFn from "./function-callers/CallReadOnly"

export function CallFn({
  fn,
  contractName,
}: {
  fn: ContractFn
  contractName: string
}) {
  if (fn.access === "read_only") {
    return <CallReadOnlyFn contractName={contractName} fn={fn} />
  }
  return <CallPublic contractName={contractName} fn={fn} />
}
