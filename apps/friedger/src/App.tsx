import ConnectWallet from "./components/ConnectWallet"
import ContractCaller from "./components/ContractCaller"
import { SearchParams, useSearchParams } from "./hooks/useSearchParams"

function App() {
  const [params, updateUrl] = useSearchParams()

  return (
    <SearchParams.Provider value={{ params, updateUrl }}>
      <>
        <div className="mb-12">
          <h1 className="mb-4 text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
            Friedger
          </h1>
          <h2>
            Unsafe contract call exercise extreme caution you might lose all yo
            cash
          </h2>
        </div>

        <ConnectWallet />
        <ContractCaller />
      </>
    </SearchParams.Provider>
  )
}

export default App
