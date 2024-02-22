import Input from "./ui/Input"

const ContractCallVote = () => {
  return (
    <div>
      <form>
        <label className="flex flex-col gap-y-4 my-12">
          Gimme contract name
          <Input type="text" name="contract-name" placeholder="Contract name" />
        </label>
        <button className="Vote">Get contract</button>
      </form>
    </div>
  )
}

export default ContractCallVote
