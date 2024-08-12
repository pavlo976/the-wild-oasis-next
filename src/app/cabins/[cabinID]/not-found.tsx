import Link from "next/link"

export default function CabinNotFound() {
	return (
		<main className="mt-4 space-y-6 text-center">
			<h1 className="text-3xl font-semibold">Cabin could not be found!</h1>
			<Link
				href="/cabins"
				className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-900 transition-colors hover:bg-accent-700">
				Go back to the cabins
			</Link>
		</main>
	)
}
