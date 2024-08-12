"use client"

import { type GetBooking } from "@/data/data-service"
import ReservationCard from "./ReservationCard"

import Link from "next/link"
import { useOptimistic } from "react"
import { deleteReservation } from "@/server-actions/reservation/deleteReservation"

type ReservationListProps = {
	bookings: Array<
		Omit<GetBooking, "cabins"> & {
			cabins: { name: string; image: string } | null
		}
	>
}

function ReservationList({ bookings }: ReservationListProps) {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		{ pending: false, bookings },
		(currentBookings, bookingID: number) => {
			return {
				bookings: currentBookings.bookings.filter(
					currentBooking => currentBooking.id !== bookingID,
				),
				pending: true,
			}
		},
	)

	if (!bookings || !bookings.length) {
		return (
			<p className="text-lg">
				You have no reservations yet. Check out our{" "}
				<Link className="text-accent-500 underline" href="/cabins">
					luxury cabins &rarr;
				</Link>
			</p>
		)
	}

	async function handleDelete(bookingID: number) {
		optimisticDelete(bookingID)

		await deleteReservation(bookingID)
	}

	return (
		<ul className="space-y-6">
			{optimisticBookings.bookings.map(booking => {
				return (
					booking.cabins !== null && (
						<ReservationCard
							booking={booking as NonNullable<GetBooking>}
							handleDelete={handleDelete}
							key={booking.id}
						/>
					)
				)
			})}
		</ul>
	)
}

export default ReservationList
