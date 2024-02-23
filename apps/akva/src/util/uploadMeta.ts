import { NFTStorage } from "nft.storage"
const storage = new NFTStorage({
  token: import.meta.env.VITE_APP_NFT_STORAGE_TOKEN!,
})

export const uploadMeta = async ({
  description,
  image,
  name,
}: {
  name: string
  description: string
  image: File
}): Promise<string> => {
  const imageCID = await storage.storeBlob(image)

  const json = {
    name,
    description,
    image: `ipfs://ipfs/${imageCID}`,
  }

  const jsonBlob = JSON.stringify(json)
  return storage.storeBlob(new Blob([jsonBlob], { type: "application/json" }))
}
