import { NFTStorage } from "nft.storage"
const storage = new NFTStorage({ token: import.meta.env.NFT_STORAGE_TOKEN! })

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
    image: imageCID,
  }

  const jsonBlob = JSON.stringify(json)
  return storage.storeBlob(new Blob([jsonBlob], { type: "application/json" }))
}
