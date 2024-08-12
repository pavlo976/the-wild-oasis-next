import { type Tables } from "@/supabase/schema"
import DateSelector from "./DateSelector"
import ReservationForm from "./ReservationForm"
import { getBookedDatesByCabinId, getSettings } from "@/data/data-service"
import { auth } from "../auth"
import UserAvatar from "./UserAvatar"

type ReservationProps = {
	cabin: Tables<"cabins">
}

async function Reservation({ cabin }: ReservationProps) {
	const [bookedDates, settings] = await Promise.all([
		getBookedDatesByCabinId(cabin.id),
		getSettings(),
	])

	const session = await auth()

	return (
		<div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
			<DateSelector
				cabin={cabin}
				bookedDates={bookedDates}
				settings={settings}
			/>

			<ReservationForm
				username={session!.user!.name!}
				cabin={cabin}
				UserAvatar={<UserAvatar />}
				type="create"
			/>
		</div>
	)
}

export default Reservation
