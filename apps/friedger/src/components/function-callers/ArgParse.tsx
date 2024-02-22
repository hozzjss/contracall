import {
  BooleanCV,
  BufferCV,
  ClarityValue,
  PrincipalCV,
  StringAsciiCV,
  UIntCV,
  noneCV,
} from "@stacks/transactions"
import { FnArg } from "../../util/stacks-types"
import UintParser from "./parsers/UintParser"
import { useCallback, useEffect, useMemo } from "react"
import StringAsciiParser from "./parsers/StringAsciiParser"
import PrincipalParser from "./parsers/PrincipalParser"
import BoolParser from "./parsers/BoolParser"
import BuffParser from "./parsers/BuffParser"

export default function ArgParse({
  arg,
  onChange,
  value,
}: {
  arg: FnArg
  onChange: (arg: ClarityValue) => unknown
  value: ClarityValue
}) {
  const optionalWrapper = useMemo(() => {
    return (
      arg.type !== "bool" &&
      arg.type !== "principal" &&
      arg.type !== "uint128" &&
      arg.type.optional
    )
  }, [arg.type])
  const getParser = useCallback(
    (arg: FnArg) => {
      if (arg.type === "uint128") {
        return (
          <UintParser
            name={arg.name}
            onChange={onChange}
            value={value as UIntCV}
          />
        )
      }
      if (arg.type === "bool") {
        return (
          <BoolParser
            name={arg.name}
            onChange={onChange}
            value={value as BooleanCV}
          />
        )
      }
      if (arg.type === "principal") {
        return (
          <PrincipalParser
            name={arg.name}
            onChange={onChange}
            value={value as PrincipalCV}
          />
        )
      }
      if (arg.type["string-ascii"]) {
        return (
          <StringAsciiParser
            name={arg.name}
            onChange={onChange}
            value={value as StringAsciiCV}
            maxLength={arg.type["string-ascii"].length}
          />
        )
      }
      if (arg.type.buffer) {
        return (
          <BuffParser
            name={arg.name}
            onChange={onChange}
            value={value as BufferCV}
          />
        )
      }
      return null
    },
    [onChange, value]
  )
  const cmp = useMemo(() => {
    if (optionalWrapper) {
      return getParser({
        name: arg.name,
        type: optionalWrapper,
      })
    }
    return getParser(arg)
  }, [arg, getParser, optionalWrapper])

  useEffect(() => {
    if (!value) {
      onChange(noneCV())
    }
  }, [onChange, optionalWrapper, value])
  return (
    <div className="flex flex-col">
      <label className="flex flex-col gap-2">
        <span>
          {arg.name}{" "}
          {optionalWrapper && (
            <span className="text-xs text-gray-500">(optional)</span>
          )}
        </span>
        {cmp}
      </label>
    </div>
  )
}
