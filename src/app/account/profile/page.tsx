import { type Metadata } from "next"

import { Suspense } from "react"
import { auth } from "@/app/auth"
import { getGuest } from "@/data/data-service"
import Countries from "@/app/_components/Countries"
import CountriesSpinner from "@/app/_components/CountriesSpinner"

export const metadata: Metadata = {
	title: "Profile",
}

export default async function ProfilePage() {
	const session = await auth()
	const guest = await getGuest(session!.user!.email!)

	return (
		<div>
			<h2 className="mb-4 text-2xl font-semibold text-accent-400">
				Update your guest profile
			</h2>

			<p className="mb-8 flex text-lg text-primary-200">
				Providing the following information will make your check-in process
				faster and smoother. See you soon!
			</p>

			<Suspense fallback={<CountriesSpinner />}>
				<Countries guest={guest!} />
			</Suspense>
		</div>
	)
}
