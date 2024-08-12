import { getPlaiceholder } from "plaiceholder"

type Image = { id: number; url: string; alt: string }

export async function getBase64(imageUrl: string) {
	try {
		const response = await fetch(imageUrl)

		if (!response.ok) {
			throw new Error(
				`Failed to fetch image: ${response.status} ${response.statusText}`,
			)
		}

		const buffer = await response.arrayBuffer()

		const { base64 } = await getPlaiceholder(Buffer.from(buffer))

		return base64
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.stack)
		}
	}
}

export async function addBlurredDataUrls(images: Array<Image>) {
	const base64Promises = images.map(image => getBase64(image.url))

	const base64Results = await Promise.all(base64Promises)

	const photosWithBlur = images.map((image, i) => {
		return { ...image, blurredDataUrl: base64Results[i] }
	})

	return photosWithBlur
}
