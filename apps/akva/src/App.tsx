import ConnectWallet from "./components/ConnectWallet"
import ContractCallVote from "./components/BuildContract"

function App() {
  return (
    <>
      <div className="mb-12">
        <h1 className="mb-4 text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
          Akva
        </h1>
        <h2>Launch shit coins</h2>
      </div>

      <ConnectWallet />
      <ContractCallVote />
    </>
  )
}

export default App
