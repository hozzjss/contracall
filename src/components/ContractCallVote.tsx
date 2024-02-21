import { useConnect } from "@stacks/connect-react"
import { useQuery } from "@tanstack/react-query"

import { userSession } from "../user-session"
import { queries } from "../stacks-api/queries"
import { FormEvent, useMemo, useState } from "react"
import FunctionList from "./FunctionList"
import { useSearchParams } from "../hooks/useSearchParams"

const ContractCallVote = () => {
  const [params, updateParams] = useSearchParams()
  const contractName = useMemo(() => params["contract-name"] || "", [params])
  const setContractName = (name: string) => {
    updateParams({
      "contract-name": name,
    })
  }
  const [address, name] = useMemo(() => contractName.split("."), [contractName])
  const { data } = useQuery({
    ...queries.contracts.interface({
      address,
      name,
    }),
    enabled: !!contractName,
  })
  function getContract(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setContractName((e.currentTarget[0] as HTMLInputElement).value)
  }

  if (!userSession.isUserSignedIn()) {
    return null
  }

  return (
    <form onSubmit={getContract}>
      <label className="flex flex-col gap-y-4 my-12">
        Gimme contract name
        <input
          type="text"
          name="contract-name"
          className="caret-white outline-none p-4"
          placeholder="Contract name"
          defaultValue={contractName}
        />
      </label>
      <button className="Vote">Get contract</button>

      <div className="mt-12">{data && <FunctionList data={data} />}</div>
    </form>
  )
}

export default ContractCallVote
