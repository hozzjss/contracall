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
          <h1 className="mb-4">Friedger</h1>
          <h2>
            Unsafe contract call exercise extreme caution you might lose all yo
            cash
          </h2>
        </div>

        <ConnectWallet />
        <ContractCallVote />
      </>
    </SearchParams.Provider>
  )
}

export default App
