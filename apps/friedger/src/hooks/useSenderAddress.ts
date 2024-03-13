import { useMemo } from "react"
import { userSession } from "../user-session"

export function useSenderAddress() {
  return useMemo(() => {
    return userSession.loadUserData().profile.stxAddress.mainnet as string
  }, [])
}
