import { createQueryKeys } from "@lukemorales/query-key-factory";
import { contractsApi } from "./api-clients";

export const contractsQK = createQueryKeys("contracts", {
  interface: ({ address, name }: { address: string; name: string }) => ({
    queryKey: [address, name],
    queryFn: async () => {
      return contractsApi.getContractInterface({
        contractAddress: address,
        contractName: name,
      });
    },
  }),
});
