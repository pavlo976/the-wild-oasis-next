"use client"

import { HiPencilSquare } from "react-icons/hi2"
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns"
import DeleteReservation from "./DeleteReservation"
import Image from "next/image"
import { type GetBooking } from "@/data/data-service"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function formatDistanceFromNow(dateStr: string) {
	return formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	}).replace("about ", "")
}

type ReservationCardProps = {
	booking: GetBooking
	handleDelete(bookingID: number): Promise<void>
}

function ReservationCard({ booking, handleDelete }: ReservationCardProps) {
	const [isLoadingImage, setIsLoadingImage] = useState(true)

	const {
		id,
		// guestID,
		startDate,
		endDate,
		numberOfNights,
		totalPrice,
		numberOfGuests,
		// status,
		created_at,
		cabins: { name, image },
	} = booking

	const editLinkStyles = cn(
		"group flex flex-grow items-center gap-2 border-b border-primary-800 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900",
	)

	return (
		<div className="flex border border-primary-800">
			<div className="relative flex aspect-square h-32 items-center justify-center">
				{isLoadingImage && <p className="text-center">Image is loading...</p>}
				<Image
					src={image}
					fill
					alt={`Cabin ${name}`}
					className="border-r border-primary-800 object-cover"
					sizes="300px"
					onLoad={() => setIsLoadingImage(false)}
				/>
			</div>

			<div className="flex flex-grow flex-col px-6 py-3">
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-semibold">
						{numberOfNights} nights in Cabin {name}
					</h3>
					{isPast(new Date(startDate)) ? (
						<span className="flex h-7 items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold uppercase text-yellow-200">
							past
						</span>
					) : (
						<span className="flex h-7 items-center rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200">
							upcoming
						</span>
					)}
				</div>

				<p className="text-lg text-primary-300">
					{format(new Date(startDate), "EEE, MMM dd yyyy")} (
					{isToday(new Date(startDate))
						? "Today"
						: formatDistanceFromNow(startDate)}
					) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
				</p>

				<div className="mt-auto flex items-baseline gap-5">
					<p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
					<p className="text-primary-300">&bull;</p>
					<p className="text-lg text-primary-300">
						{numberOfGuests} guest{numberOfGuests > 1 && "s"}
					</p>
					<p className="ml-auto text-sm text-primary-400">
						Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
					</p>
				</div>
			</div>

			{!isPast(new Date(startDate)) && (
				<div className="flex w-[100px] flex-col border-l border-primary-800">
					<Link
						href={`/account/reservations/edit/${id}`}
						className={editLinkStyles}>
						<HiPencilSquare className="size-5 text-primary-600 transition-colors group-hover:text-primary-800" />
						<span className="mt-1">Edit</span>
					</Link>
					<DeleteReservation handleDelete={handleDelete} bookingID={id} />
				</div>
			)}
		</div>
	)
}

export default ReservationCard
