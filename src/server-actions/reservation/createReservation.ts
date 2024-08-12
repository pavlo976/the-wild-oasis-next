"use server"

import { auth } from "@/app/auth"
import { type Booking, createBooking } from "@/data/data-service"
import { type Session } from "@/utils/helpers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type FormState = {
	message: string
}

export async function createReservation(
	previousState: FormState,
	bookingData: FormData,
) {
	const session = (await auth())?.user as Session

	const newBooking = JSON.parse(
		Object.fromEntries(bookingData).newBooking as string,
	) as Booking

	if (!session) {
		throw new Error("User is not authenticated! Log in to update reservation.")
	}

	const isAllFieldsFilled = Object.values(newBooking)
		.map(value => !!value)
		.every(value => value)

	if (!isAllFieldsFilled) {
		throw new Error("Some required field has not been filled in! Fill it in.")
	}

	const refactoredBooking = {
		...newBooking,
		guestID: session.guestID!,
		observations: newBooking.observations.slice(0, 1000),
		extraPrice: 0,
		totalPrice: newBooking.cabinPrice,
		isPaid: false,
		hasBreakfast: false,
		status: "unconfirmed",
		startDate: newBooking.startDate,
		endDate: newBooking.endDate,
		numberOfNights: newBooking.numberOfNights,
	}

	await createBooking({ newBooking: refactoredBooking })

	revalidatePath(`/cabins/${newBooking.cabinID}`)
	redirect("/cabins/thankyou")

	return { message: "Reservation has been successfully created." }
}
