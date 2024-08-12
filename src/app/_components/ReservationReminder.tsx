"use client"

import { useReservationContext } from "../../contexts/ReservationContext"
import { useState } from "react"

import { HiXMark } from "react-icons/hi2"
import { Button } from "@/components/ui/button"

import { format } from "date-fns"

function ReservationReminder() {
	const [isOpen, setIsOpen] = useState(true)
	const { range } = useReservationContext()

	function closeReminder() {
		setIsOpen(false)
	}

	if (!range.from || !range.to) return null

	return (
		isOpen && (
			<div className="fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-8 rounded-full bg-accent-500 px-8 py-5 font-semibold text-primary-800 shadow-xl shadow-slate-900">
				<p className="text">
					<span>👋</span> Don&apos;f forget to reserve your dates <br /> from{" "}
					{format(new Date(range.from), "MMM dd yyyy")} to{" "}
					{format(new Date(range.to), "MMM dd yyyy")}
				</p>
				<Button
					onClick={closeReminder}
					size="icon"
					className="rounded-full bg-accent-500 shadow-md hover:bg-accent-600">
					<HiXMark className="size-5" />
				</Button>
			</div>
		)
	)
}

export default ReservationReminder
