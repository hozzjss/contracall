export type Primitive = "bool" | "uint128" | "principal"
type Optional = {
  optional: Primitive | Tuple | List | never
}
export type Tuple = Array<{
  name: string
  type: Primitive | Optional | Tuple | List
}>

export type List = {
  type: Optional | Tuple | Primitive | List
  length: number
}
export type ComplexType = {
  tuple: Tuple | never
  list: List | never
  "string-utf8": { length: number } | never
  "string-ascii": { length: number } | never
  buffer: { length: number } | never
} & Optional

export type FnArg = {
  name: string
  type: Primitive | ComplexType
}
export type ContractFn = {
  name: string
  access: "private" | "public" | "read_only"
  args: FnArg[]
}
