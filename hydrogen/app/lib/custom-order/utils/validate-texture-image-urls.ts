export function validateTextureImageUrls(
  fileIds: string[],
  textureImageUrls: string[],
) {
  if (fileIds.length !== textureImageUrls.length) {
    console.error(
      `Texture image count mismatch: ${fileIds.length} !== ${textureImageUrls.length}`,
    )
  }

  for (const fileId of fileIds) {
    const index = textureImageUrls.findIndex((url) => url.includes(fileId))
    if (index === -1) {
      console.error(`Texture image not found: ${fileId}`)
    }
  }
}
