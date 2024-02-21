import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ContractFn } from "../../util/stacks-types"
import ArgParse from "./ArgParse"
import { useCallback, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { queries } from "../../stacks-api/queries"
import { userSession } from "../../user-session"

export default function CallReadOnlyFn({
  fn,
  contractName,
}: {
  fn: ContractFn
  contractName: string
}) {
  const { control, handleSubmit, getValues } = useForm()
  const [address, name] = useMemo(() => contractName.split("."), [contractName])
  const sender = useMemo(() => {
    return userSession.loadUserData().profile.stxAddress.mainnet as string
  }, [])

  console.log({
    values: getValues(),
  })

  const { refetch, data } = useQuery({
    ...queries.contracts.readOnly({
      address,
      name,
      fnName: fn.name,
      sender,
      args: [],
    }),
    enabled: false,
  })

  const onSubmit: SubmitHandler<{ [key: string]: string }> = useCallback(
    (values) => {
      console.log({ values })
    },
    []
  )

  return (
    <form
      className="flex flex-col gap-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-lg font-bold">{fn.name}</h3>
      {fn.args.map((arg) => (
        <Controller
          name={arg.name}
          control={control}
          rules={{ required: true }}
          key={`${fn.name}.${arg.name}`}
          render={({ field }) => (
            <ArgParse arg={arg} onChange={field.onChange} value={field.value} />
          )}
        />
      ))}
      <button type="submit">Call</button>
    </form>
  )
}
