import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ContractFn } from "../../util/stacks-types"
import ArgParse from "./ArgParse"
import { useCallback, useMemo } from "react"
import { ClarityValue, PostConditionMode } from "@stacks/transactions"
import { asciiRegex } from "../../util/checkValidAscii"
import { useConnect } from "@stacks/connect-react"
import { StacksMainnet } from "@stacks/network"

export default function CallPublic({
  fn,
  contractName,
}: {
  fn: ContractFn
  contractName: string
}) {
  const { control, handleSubmit } = useForm<{
    [x: string]: ClarityValue
  }>()
  const [address, name] = useMemo(
    () => contractName.split(".") as [string, string],
    [contractName],
  )

  const { doContractCall } = useConnect()

  const onSubmit: SubmitHandler<{ [x: number]: ClarityValue }> = useCallback(
    (values) => {
      // const stringifiedArgs = Object.values(values).map((item) => cvToHex(item))
      // setArgs(stringifiedArgs)
      doContractCall({
        contractAddress: address,
        contractName: name,
        functionName: fn.name,
        functionArgs: Object.values(values),
        postConditionMode: PostConditionMode.Allow,
        network: new StacksMainnet(),
        onFinish({ txId }) {
          window
            .open(
              "https://explorer.hiro.so/txid/" + txId,
              "_blank",
              "noopener noreferrer",
            )
            ?.focus()
        },
      })
    },
    [address, doContractCall, fn.name, name],
  )

  return (
    <form
      className="flex flex-col gap-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-lg font-bold">{fn.name}</h3>
      {fn.args.map((arg, index) => (
        <Controller
          control={control}
          key={`${fn.name}.${arg.name}`}
          name={String(index)}
          render={({ field: { onBlur, onChange, ref, value, disabled } }) => (
            <ArgParse
              arg={arg}
              disabled={disabled}
              inputRef={ref}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          rules={{ required: true, pattern: asciiRegex }}
        />
      ))}
      <button type="submit">Call</button>
    </form>
  )
}
