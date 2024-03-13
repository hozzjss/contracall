import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ContractFn } from "../../util/stacks-types"
import ArgParse from "./ArgParse"
import { useCallback, useEffect, useMemo } from "react"
import {
  ClarityType,
  ClarityValue,
  FungibleConditionCode,
  NonFungibleConditionCode,
  PostConditionMode,
  UIntCV,
  createAssetInfo,
  createFungiblePostCondition,
  createNonFungiblePostCondition,
} from "@stacks/transactions"
import { asciiRegex } from "../../util/checkValidAscii"
import { useConnect } from "@stacks/connect-react"
import { StacksMainnet, StacksTestnet } from "@stacks/network"
import { useContractData } from "../../hooks/useContractData"
import { useSenderAddress } from "../../hooks/useSenderAddress"

type NFTInfo = {
  name: string
  type: "uint128"
}

type FTInfo = {
  name: string
}

export default function CallPublic({
  fn,
  contractName,
}: {
  fn: ContractFn
  contractName: string
}) {
  const { data: contractInterface } = useContractData(contractName)

  const { control, handleSubmit, reset } = useForm<{
    [x: string]: ClarityValue
  }>()
  const [address, name] = useMemo(
    () => contractName.split(".") as [string, string],
    [contractName],
  )

  useEffect(() => {
    reset()
  }, [fn.name, contractName, reset])

  const senderAddress = useSenderAddress()

  const getPostConditions = useCallback(
    (values: { [x: number]: ClarityValue }) => {
      const defaultParams = {
        mode: PostConditionMode.Allow,
        postConditions: [],
      }
      const functionIsTransfer = fn.name === "transfer"

      if (!contractInterface || !functionIsTransfer) {
        return defaultParams
      }

      const uintValue = (
        values[0]?.type === ClarityType.UInt ? values[0] : values[1]
      ) as UIntCV

      const hasFT = Boolean(contractInterface.fungible_tokens.length)
      const hasNFT = Boolean(contractInterface.non_fungible_tokens.length)
      const isFucked = hasFT && hasNFT
      if (isFucked) {
        return defaultParams
      }
      if (hasNFT) {
        const nftName = (contractInterface.non_fungible_tokens[0] as NFTInfo)
          .name

        return {
          mode: PostConditionMode.Deny,
          postConditions: [
            createNonFungiblePostCondition(
              senderAddress,
              NonFungibleConditionCode.Sends,
              createAssetInfo(address, name, nftName),
              uintValue,
            ),
          ],
        }
      }
      if (hasFT) {
        const ftName = (contractInterface.fungible_tokens[0] as FTInfo).name
        return {
          mode: PostConditionMode.Deny,
          postConditions: [
            createFungiblePostCondition(
              senderAddress,
              FungibleConditionCode.Equal,
              uintValue.value,
              createAssetInfo(address, name, ftName),
            ),
          ],
        }
      }
      return defaultParams
    },
    [address, contractInterface, fn.name, name, senderAddress],
  )

  const { doContractCall } = useConnect()

  const onSubmit: SubmitHandler<{ [x: number]: ClarityValue }> = useCallback(
    (values) => {
      // const stringifiedArgs = Object.values(values).map((item) => cvToHex(item))
      // setArgs(stringifiedArgs)
      const { mode, postConditions } = getPostConditions(values)
      doContractCall({
        contractAddress: address,
        contractName: name,
        functionName: fn.name,
        functionArgs: Object.values(values),
        postConditionMode: mode,
        postConditions,
        network: name.startsWith("ST")
          ? new StacksTestnet()
          : new StacksMainnet(),
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
    [address, doContractCall, fn.name, getPostConditions, name],
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
