import { useForm } from "react-hook-form"

import { useCallback } from "react"
import writeShitCoinContract from "../util/write-shitcoin-contract"
import { uploadMeta } from "../util/uploadMeta"
import { useConnect } from "@stacks/connect-react"

type AkvaFormValues = {
  name: string
  ticker: string
  description: string
  decimals: number
  supply: number
  max_mint: number
  image: FileList
}
function ContractCallVote() {
  const { register, handleSubmit } = useForm<AkvaFormValues>({
    defaultValues: {
      decimals: 0,
      max_mint: 1000,
      supply: 1000_000,
      description: "Commemorating Akva CEO of Stacks",
      name: "Akva",
      ticker: "AKVA",
    },
  })
  const { doContractDeploy } = useConnect()
  const onSubmit = useCallback(
    async (values: AkvaFormValues) => {
      const ft_name = values.name.toLowerCase().replace(/\s/g, "-")
      const metaCID = await uploadMeta({
        name: values.name,
        description: values.description,
        image: values.image[0]!,
      })
      const contractCode = writeShitCoinContract({
        decimals: values.decimals,
        description: values.description,
        ft_name,
        maxMintAmount: values.max_mint,
        supply: values.supply,
        symbol: values.ticker,
        tokenName: values.name,
        metadataIpfsCID: metaCID,
      })

      await doContractDeploy({
        codeBody: contractCode,
        contractName: ft_name,
        onFinish: ({ txId }) => {
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
    [doContractDeploy],
  )
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col gap-y-4 my-12" htmlFor="name">
          Token name
          <input
            {...register("name", {
              required: true,
            })}
            placeholder="Token full name (e.g. Wrapped Nothing v8)"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-y-4 my-12" htmlFor="ticker">
          Token ticker
          <input
            {...register("ticker", {
              required: true,
            })}
            placeholder="Token short ticker no $ (e.g. WMNO)"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-y-4 my-12" htmlFor="description">
          Token description
          <input
            {...register("description", {
              required: true,
            })}
            placeholder="Short description of the token"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-y-4 my-12" htmlFor="decimals">
          Token decimals
          <input
            {...register("decimals", {
              required: true,
            })}
            placeholder="how many numbers after the dot (e.g. 1.3 = 1)"
            type="number"
          />
        </label>
        <label className="flex flex-col gap-y-4 my-12" htmlFor="supply">
          Total supply
          <input
            {...register("supply", {
              required: true,
            })}
            placeholder="how much of this token can be minted"
            type="number"
          />
        </label>
        <label className="flex flex-col gap-y-4 my-12" htmlFor="max_mint">
          Max per mint
          <input
            {...register("max_mint", {
              required: true,
            })}
            placeholder="how much can be minted for each tx"
            type="number"
          />
        </label>
        <label className="flex flex-col gap-y-4 my-12" htmlFor="image">
          Token image
          <input
            {...register("image", {
              required: true,
            })}
            placeholder="how much can be minted for each tx"
            type="file"
          />
        </label>
        <button className="Vote" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default ContractCallVote
