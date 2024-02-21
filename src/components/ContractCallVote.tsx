import { useConnect } from "@stacks/connect-react"
import { useQuery } from "@tanstack/react-query"

import { userSession } from "../user-session"
import { queries } from "../stacks-api/queries"
import { useMemo, useState } from "react"
import FunctionList from "./FunctionList"

const ContractCallVote = () => {
  const [contractName, setContractName] = useState("")
  const [address, name] = useMemo(() => contractName.split("."), [contractName])
  const { refetch, data } = useQuery({
    ...queries.contracts.interface({
      address,
      name,
    }),
    enabled: false,
  })
  function getContract() {
    refetch()
  }

  if (!userSession.isUserSignedIn()) {
    return null
  }

  return (
    <div>
      <label className="flex flex-col gap-y-4 my-12">
        Gimme contract name
        <input
          type="text"
          name="contract-name"
          className="caret-white outline-none p-4"
          placeholder="Contract name"
          value={contractName}
          onChange={(e) => setContractName(e.target.value)}
        />
      </label>
      <button className="Vote" onClick={getContract}>
        Get contract
      </button>

      <div className="mt-12">{data && <FunctionList data={data} />}</div>
    </div>
  )
}

export default ContractCallVote
