"use client"

import { Tables } from "@/supabase/schema"
import { differenceInDays, isWithinInterval } from "date-fns"
import { DatePickerWithRange } from "./DatePickerWithRange"
import { useReservationContext } from "../../contexts/ReservationContext"

export function isAlreadyBooked(
	range: { from: Date | undefined; to?: Date | undefined },
	datesArr: Array<Date>,
) {
	return (
		range.from &&
		range.to &&
		datesArr.some(date =>
			range.from && range.to
				? isWithinInterval(date, { start: range.from, end: range.to })
				: {},
		)
	)
}

type DateSelectorProps = {
	settings: Tables<"settings">
	bookedDates: Array<Date>
	cabin: Tables<"cabins">
}

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
	const { regularPrice, discount } = cabin

	const { minimumBookingLength, maxBookingsLength } = settings

	const { range, resetRange } = useReservationContext()

	const displayRange = isAlreadyBooked(range, bookedDates)
		? { to: undefined, from: undefined }
		: range

	const numberOfNights =
		displayRange.from && displayRange.to
			? differenceInDays(displayRange.to, displayRange.from)
			: 0

	const cabinPrice = numberOfNights * (regularPrice - discount)

	return (
		<div className="flex flex-col justify-between">
			<DatePickerWithRange
				min={minimumBookingLength + 1}
				max={maxBookingsLength}
				bookedDates={bookedDates}
				displayRange={displayRange}
			/>

			<div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
				<div className="flex items-baseline gap-6">
					<p className="flex items-baseline gap-2">
						{discount > 0 ? (
							<>
								<span className="text-2xl">${regularPrice - discount}</span>
								<span className="font-semibold text-primary-700 line-through">
									${regularPrice}
								</span>
							</>
						) : (
							<span className="text-2xl">${regularPrice}</span>
						)}
						<span className="">/night</span>
					</p>
					{numberOfNights ? (
						<>
							<p className="bg-accent-600 px-3 py-2 text-2xl">
								<span>&times;</span> <span>{numberOfNights}</span>
							</p>
							<p>
								<span className="text-lg font-bold uppercase">Total</span>{" "}
								<span className="text-2xl font-semibold">${cabinPrice}</span>
							</p>
						</>
					) : null}
				</div>

				{range.from || range.to ? (
					<button
						className="border border-primary-800 px-4 py-2 text-sm font-semibold"
						onClick={resetRange}>
						Clear
					</button>
				) : null}
			</div>
		</div>
	)
}

export default DateSelector
