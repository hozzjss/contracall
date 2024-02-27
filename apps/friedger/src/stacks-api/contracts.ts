import { createQueryKeys } from "@lukemorales/query-key-factory"

import { Configuration, SmartContractsApi } from "@stacks/blockchain-api-client"

export const contractsQK = createQueryKeys("contracts", {
  interface: ({ address, name }: { address: string; name: string }) => ({
    queryKey: [address, name],
    queryFn: async () => {
      const apiClientConfig = new Configuration({
        basePath: `https://api.${
          address.startsWith("ST") ? "testnet" : "mainnet"
        }.hiro.so`,
      })
      const contractsApi = new SmartContractsApi(apiClientConfig)

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
