import { type Metadata } from "next"

import { Suspense } from "react"
import ReservationList from "@/app/_components/ReservationList"
import CabinsLoading from "./loading"
import { getBookings } from "@/data/data-service"
import { type Session } from "@/utils/helpers"
import { auth } from "@/app/auth"

export const metadata: Metadata = {
	title: "Reservations",
}

export default async function ReservationsPage() {
	const guestID = ((await auth())?.user as Session).guestID

	const { data: bookings } = await getBookings(guestID!)

	return (
		<div>
			<h2 className="mb-7 text-2xl font-semibold text-accent-400">
				Your reservations
			</h2>

			<Suspense fallback={<CabinsLoading />}>
				<ReservationList bookings={bookings} />
			</Suspense>
		</div>
	)
}
