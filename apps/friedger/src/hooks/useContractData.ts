import { useQuery } from "@tanstack/react-query"
import { queries } from "../stacks-api/queries"
import { useMemo } from "react"

export function useContractData(contractName: string) {
  const [address, name] = useMemo(
    () => contractName.split(".") as [string, string],
    [contractName],
  )

  return useQuery({
    ...queries.contracts.interface({
      address,
      name,
    }),
    enabled: !!contractName,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
