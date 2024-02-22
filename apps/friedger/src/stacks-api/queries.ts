import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { contractsQK } from "./contracts";

export const queries = mergeQueryKeys(contractsQK);
