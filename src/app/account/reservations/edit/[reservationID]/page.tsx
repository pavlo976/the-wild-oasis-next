import { Suspense } from "react"
import ReservationSpinner from "./loading"
import { EditBooking } from "@/app/_components/EditBooking"

export type ReservationPageProps = { params: { reservationID: string } }

export default function ReservationPage({ params }: ReservationPageProps) {
	return (
		<div>
			<h2 className="mb-7 text-2xl font-semibold text-accent-400">
				Edit Reservation #{params.reservationID}
			</h2>

			<Suspense fallback={<ReservationSpinner />}>
				<EditBooking bookingID={+params.reservationID} />
			</Suspense>
		</div>
	)
}
