export type FnArg = {
  name: string
  type: "bool" | "buff" | "uint128" | "principal"
}
export type ContractFn = {
  name: string
  access: "private" | "public" | "read_only"
  args: FnArg[]
}
