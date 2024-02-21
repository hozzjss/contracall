import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import ConnectWallet from "./components/ConnectWallet"
import ContractCallVote from "./components/ContractCallVote"
import { SearchParams, useSearchParams } from "./hooks/useSearchParams"

function App() {
  const [params, updateUrl] = useSearchParams()
  return (
    <SearchParams.Provider value={{ params, updateUrl }}>
      <>
        <div className="mb-12">
          <h1>Unsafe contract call</h1>
          <h2>exercise extreme caution you might lose all yo cash</h2>
        </div>

        {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
        <ConnectWallet />

        {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
        <ContractCallVote />
      </>
    </SearchParams.Provider>
  )
}

export default App
