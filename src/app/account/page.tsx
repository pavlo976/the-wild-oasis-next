import { type Metadata } from "next"
import { auth } from "../auth"

export const metadata: Metadata = {
	title: "Guest area",
}

export default async function AccountPage() {
	const session = await auth()

	return (
		<div>
			<h1 className="mb-7 text-2xl font-semibold text-accent-400">
				Welcome, {session!.user!.name}
			</h1>
		</div>
	)
}
