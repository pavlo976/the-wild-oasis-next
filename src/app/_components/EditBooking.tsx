import { getBooking, getCabin } from "@/data/data-service"
import ReservationForm from "./ReservationForm"
import UserAvatar from "./UserAvatar"
import { auth } from "../auth"
import { type Session } from "@/utils/helpers"

type EditBookingProps = {
	bookingID: number
}

export async function EditBooking({ bookingID }: EditBookingProps) {
	const { data: booking } = await getBooking(bookingID)
	const cabin = await getCabin(booking.cabinID)

	const username = ((await auth())?.user as Session).name

	return (
		<ReservationForm
			type="update"
			booking={booking}
			UserAvatar={<UserAvatar />}
			cabin={cabin}
			username={username!}
		/>
	)
}
