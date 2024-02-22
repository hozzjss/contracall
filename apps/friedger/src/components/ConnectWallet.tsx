import { showConnect } from "@stacks/connect"

import { userSession } from "../user-session"

function authenticate() {
  showConnect({
    appDetails: {
      name: "Friedger",
      icon: window.location.origin + import.meta.env.BASE_URL + "friedger.jpg",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload()
    },
    userSession,
  })
}

function disconnect() {
  userSession.signUserOut()
  window.location.reload()
}

const ConnectWallet = () => {
  if (userSession.isUserSignedIn()) {
    return (
      <div>
        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
        {/* <p>mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
        <p>testnet: {userSession.loadUserData().profile.stxAddress.testnet}</p> */}
      </div>
    )
  }

  return (
    <button className="Connect" onClick={authenticate}>
      Connect Wallet
    </button>
  )
}

export default ConnectWallet
