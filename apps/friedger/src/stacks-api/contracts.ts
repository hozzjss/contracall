import { createQueryKeys } from "@lukemorales/query-key-factory"
import { contractsApi } from "./api-clients"

export const contractsQK = createQueryKeys("contracts", {
  interface: ({ address, name }: { address: string; name: string }) => ({
    queryKey: [address, name],
    queryFn: async () => {
      return contractsApi.getContractInterface({
        contractAddress: address,
        contractName: name,
      })
    },
  }),
  readOnly: ({
    address,
    name,
    fnName,
    args,
    sender,
  }: {
    address: string
    name: string
    fnName: string
    args: string[]
    sender: string
  }) => ({
    queryKey: [address, name, fnName, args, sender],
    queryFn: async () => {
      return contractsApi.callReadOnlyFunction({
        contractAddress: address,
        contractName: name,
        functionName: fnName,
        readOnlyFunctionArgs: {
          arguments: args,
          sender,
        },
      })
    },
  }),
})
