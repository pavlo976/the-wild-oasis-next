"use server"

import { auth } from "@/app/auth"
import { type Booking, getBookings, updateBooking } from "@/data/data-service"
import { type Session } from "@/utils/helpers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type FormState = {
	message: string
}

export async function updateReservation(
	previousState: FormState,
	bookingData: FormData,
) {
	const session = (await auth())?.user as Session

	const { data: guestBookings } = await getBookings(session.guestID!)

	const newBooking = JSON.parse(
		Object.fromEntries(bookingData).newBooking as string,
	) as Booking & { dates?: null }

	delete newBooking.dates

	const guestBookingsIDs = guestBookings.map(guestBooking => guestBooking.id)

	if (!guestBookingsIDs.includes(newBooking.id)) {
		throw new Error("You are not allowed to update this booking!")
	}

	if (!session) {
		throw new Error("User is not authenticated! Log in to update reservation.")
	}

	await updateBooking({
		id: newBooking.id,
		updatedBookingFields: {
			...newBooking,
			observations: newBooking.observations.slice(0, 1000),
		},
	})

	const navigationActions = [revalidatePath, redirect]

	navigationActions.forEach(navigationAction => {
		navigationAction("/account/reservations")
	})

	return { message: "Reservation has been successfully updated." }
}
