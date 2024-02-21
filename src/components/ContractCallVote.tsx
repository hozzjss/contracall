import { useQuery } from "@tanstack/react-query"

import { userSession } from "../user-session"
import { queries } from "../stacks-api/queries"
import { FormEvent, useCallback, useContext, useMemo } from "react"
import FunctionList from "./FunctionList"
import { SearchParams, useSearchValue } from "../hooks/useSearchParams"
import { ContractFn } from "../util/stacks-types"
import Input from "./ui/Input"
import { CallFn } from "./CallFn"

const ContractCallVote = () => {
  const { updateUrl } = useContext(SearchParams)
  const [contractName] = useSearchValue("contract-name")
  const [address, name] = useMemo(() => contractName.split("."), [contractName])
  const { data } = useQuery({
    ...queries.contracts.interface({
      address,
      name,
    }),
    enabled: !!contractName,
  })

  const [fnName, setFnName] = useSearchValue("fn-name")
  const selectedFn = useMemo(
    () => (data?.functions as ContractFn[])?.find((fn) => fn.name === fnName),
    [fnName, data?.functions]
  )

  const getContract = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      updateUrl({
        "contract-name": (e.currentTarget[0] as HTMLInputElement).value,
      })
    },
    [updateUrl]
  )

  const handleSelectFn = useCallback(
    (fn: ContractFn) => {
      setFnName(fn.name)
    },
    [setFnName]
  )

  if (!userSession.isUserSignedIn()) {
    return null
  }

  return (
    <div>
      <form onSubmit={getContract}>
        <label className="flex flex-col gap-y-4 my-12">
          Gimme contract name
          <Input
            type="text"
            name="contract-name"
            placeholder="Contract name"
            defaultValue={contractName}
          />
        </label>
        <button className="Vote">Get contract</button>
      </form>

      <div className="mt-12">
        {data && <FunctionList onSelect={handleSelectFn} data={data} />}
      </div>
      <div className="mt-12">
        {selectedFn && <CallFn contractName={contractName} fn={selectedFn} />}
      </div>
    </div>
  )
}

export default ContractCallVote
