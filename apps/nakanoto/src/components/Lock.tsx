import { useConnect } from "@stacks/connect-react"
import { useQuery } from "@tanstack/react-query"
import { queries } from "../stacks-api/queries"
import { userSession } from "../user-session"
import { StacksMainnet } from "@stacks/network"
import { useCallback, useMemo } from "react"
import { AddressBalanceResponse } from "@stacks/blockchain-api-client"
const deployerAddress = "SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ"

const mnoTokenId = deployerAddress + ".micro-nthng::micro-nothing"

const getTokenBalance = (balances: AddressBalanceResponse, tokenId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (balances?.fungible_tokens[tokenId] as any)?.balance
}
const providers = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xverse: (window as any)?.XverseProviders?.StacksProvider,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leather: (window as any)?.LeatherProvider,
}

const noProvidersAvailable = () => {
  return providers.xverse === undefined && providers.leather === undefined
}

function ContractCallVote() {
  const { doContractCall } = useConnect()
  let address = ""
  if (userSession.isUserSignedIn()) {
    address = userSession.loadUserData()?.profile.stxAddress.mainnet
  }

  const { data } = useQuery({
    ...queries.accounts.balances({
      address,
      network: new StacksMainnet(),
    }),
  })
  const mnoBalance = useMemo(() => {
    return data ? Number(getTokenBalance(data, mnoTokenId)) : 0
  }, [data])

  const fnName = useMemo(() => {
    return mnoBalance ? "lock-mno-and-wmno" : "lock-wmno"
  }, [mnoBalance])

  const lock = useCallback(
    (provider: "leather" | "xverse") => {
      doContractCall(
        {
          contractAddress: deployerAddress,
          contractName: "not-lockup",
          functionName: fnName,
          functionArgs: [],
        },
        providers[provider],
      )
    },
    [doContractCall, fnName],
  )
  const noWallets = useMemo(noProvidersAvailable, [])
  return (
    <div className="flex flex-col items-center gap-4">
      {providers.xverse ? (
        <button onClick={() => lock("xverse")} type="button">
          LOCK WITH XVERSE
        </button>
      ) : null}
      {providers.leather ? (
        <button onClick={() => lock("leather")} type="button">
          LOCK WITH LEATHER
        </button>
      ) : null}
      {noWallets ? (
        <button onClick={() => lock("leather")} type="button">
          LOCK
        </button>
      ) : null}
    </div>
  )
}

export default ContractCallVote
