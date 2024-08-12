"use server"

import { auth } from "@/app/auth"
import { deleteBooking, getBookings } from "@/data/data-service"
import { type Session } from "@/utils/helpers"
import { revalidatePath } from "next/cache"

export async function deleteReservation(bookingID: number) {
	const session = await auth()

	const { data: guestBookings } = await getBookings(
		(session?.user as Session).guestID!,
	)

	const guestBookingsIDs = guestBookings.map(guestBooking => guestBooking.id)

	if (!guestBookingsIDs.includes(bookingID)) {
		throw new Error("You are not allowed to delete this booking!")
	}

	if (!session?.user) {
		throw new Error("Guest is not authenticated! Log in to delete reservation.")
	}

	await deleteBooking(bookingID)

	revalidatePath("/account/reservations")
}
