import { type Metadata } from "next"

import { getCabin, getCabins } from "@/data/data-service"

import Cabin from "@/app/_components/Cabin"
import Reservation from "@/app/_components/Reservation"
import SettingsAndBookingsSpinner from "@/app/_components/SettingsAndBookingsSpinner"
import { Suspense } from "react"
import { auth } from "@/app/auth"
import LoginMessage from "@/app/_components/LoginMessage"
import CabinsLoading from "../loading"

type CabinPageProps = {
	params: { cabinID: string }
}

export async function generateMetadata({
	params,
}: CabinPageProps): Promise<Metadata> {
	const cabin = await getCabin(+params.cabinID)

	if (!cabin)
		return {
			title: "Cabin not found",
		}

	return { title: `Cabin ${cabin.name}` }
}

export async function generateStaticParams() {
	const cabinIDs = (await getCabins()).cabins.map(cabin => {
		return { cabinID: cabin.id.toString() }
	})

	return cabinIDs
}

export default async function CabinPage({ params }: CabinPageProps) {
	const cabin = await getCabin(+params.cabinID)
	const session = await auth()

	return (
		<div className="mx-auto mt-8 max-w-6xl">
			<Suspense key={crypto.randomUUID()} fallback={<CabinsLoading />}>
				<Cabin {...cabin} />
			</Suspense>

			{session?.user && (
				<Suspense
					key={crypto.randomUUID()}
					fallback={<SettingsAndBookingsSpinner />}>
					<Reservation cabin={cabin} />
				</Suspense>
			)}

			{!session?.user && <LoginMessage />}
		</div>
	)
}
