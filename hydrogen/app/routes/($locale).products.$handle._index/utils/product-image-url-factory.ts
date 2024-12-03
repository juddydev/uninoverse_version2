export function productImageUrlFactory(nodes: { url: string }[]) {
  return (id: string) => {
    const node = nodes.find((image) => {
      const formattedUrl = image.url.toUpperCase().replaceAll("-", "_")
      const formattedId = id.toUpperCase().replaceAll("-", "_")
      return formattedUrl.includes(formattedId)
    })

    if (node === undefined) {
      throw new Error(`Image with id ${id} not found`)
    }

    return node.url
  }
}
