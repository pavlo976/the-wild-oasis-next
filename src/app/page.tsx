import Image from "next/image"
import Link from "next/link"

import { getBase64 } from "@/lib/getBase64"

export type SearchParams = {
	searchParams: { [key: string]: string | Array<string> | undefined }
}

export default async function RootPage() {
	const blurredDataUrl = await getBase64(
		"https://znspipcfyxecwbbksfgu.supabase.co/storage/v1/object/public/cabin-images/bg.png",
	)

	return (
		<main className="mt-24">
			{blurredDataUrl && (
				<Image
					src="https://znspipcfyxecwbbksfgu.supabase.co/storage/v1/object/public/cabin-images/bg.png"
					fill
					alt="Mountains and forests with two cabins"
					className="object-cover object-top"
					placeholder="blur"
					blurDataURL={blurredDataUrl}
					quality={80}
					priority
				/>
			)}

			<div className="relative z-10 text-center">
				<h1 className="mb-10 text-8xl font-normal tracking-tight text-primary-50 drop-shadow">
					Welcome to paradise.
				</h1>
				<Link
					href="/cabins"
					className="bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600">
					Explore luxury cabins
				</Link>
			</div>
		</main>
	)
}
