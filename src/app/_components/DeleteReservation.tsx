"use client"

import { Trash } from "lucide-react"
import { useTransition } from "react"
import SpinnerMini from "./SpinnerMini"

type DeleteReservationProps = {
	bookingID: number
	handleDelete(bookingID: number): Promise<void>
}

function DeleteReservation({
	bookingID,
	handleDelete,
}: DeleteReservationProps) {
	const [isPending, startTransition] = useTransition()

	function handleDeleteBooking() {
		if (confirm("Are you sure you want to delete this reservation?")) {
			startTransition(() => handleDelete(bookingID))
		}
	}

	return (
		<button
			className="group flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
			onClick={handleDeleteBooking}>
			<Trash className="size-5 text-primary-600 transition-colors group-hover:text-primary-800" />
			<span className="mt-1">Delete</span>
			{isPending && <SpinnerMini />}
		</button>
	)
}

export default DeleteReservation
