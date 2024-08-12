"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format, isPast, isSameDay } from "date-fns"
import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	type Range,
	useReservationContext,
} from "../../contexts/ReservationContext"

type DatePickerWithRangeProps = React.HTMLAttributes<HTMLDivElement> & {
	min: number
	max: number
	bookedDates: Array<Date>
	displayRange: Range
}

export function DatePickerWithRange({
	className,
	min,
	max,
	bookedDates,
	displayRange,
}: DatePickerWithRangeProps) {
	const { range, setRange } = useReservationContext()

	return (
		<div className={cn("grid gap-2", className)}>
			<p
				className={cn(
					"flex justify-center items-center w-full bg-primary-50 text-primary-950 p-2 rounded-md font-semibold [&>span]:mt-1",
				)}>
				<CalendarIcon className="mr-2 size-4" />
				{range?.from ? (
					range.to ? (
						<span>
							{format(range.from, "LLL dd, y")} -{" "}
							{format(range.to, "LLL dd, y")}
						</span>
					) : (
						<span>{format(range.from, "LLL dd, y")}</span>
					)
				) : (
					<span>Pick a date</span>
				)}
			</p>
			<Select
				onValueChange={value =>
					setRange({
						from: addDays(new Date(), parseInt(value)),
						to: new Date(),
					})
				}>
				<SelectTrigger className="bg-primary-900 text-base">
					<SelectValue placeholder="Select preset range..." />
				</SelectTrigger>
				<SelectContent position="popper" className="bg-primary-950">
					<SelectItem value="0">Today</SelectItem>
					<SelectItem value="1">Tomorrow</SelectItem>
					<SelectItem value="3">In 3 days</SelectItem>
					<SelectItem value="7">In a week</SelectItem>
					<SelectItem value="14">In 2 weeks</SelectItem>
				</SelectContent>
			</Select>
			<Calendar
				initialFocus
				mode="range"
				defaultMonth={range?.from}
				selected={displayRange}
				onSelect={range => {
					if (!range) {
						return setRange({ from: undefined, to: undefined })
					}

					setRange(range)
				}}
				numberOfMonths={2}
				captionLayout="dropdown-buttons"
				className="place-self-center pb-5"
				min={min}
				max={max}
				fromMonth={new Date()}
				fromDate={new Date()}
				toYear={new Date().getFullYear() + 5}
				disabled={currentDate => {
					return (
						isPast(currentDate) ||
						bookedDates.some(date => isSameDay(date, currentDate))
					)
				}}
			/>
		</div>
	)
}
