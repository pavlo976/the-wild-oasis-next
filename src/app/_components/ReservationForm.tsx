"use client"

import { Cabin, type Booking } from "@/data/data-service"
import { useForm } from "react-hook-form"
import {
	ReservationSchema,
	type TReservationSchema,
} from "../_schema/ReservationSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useReservationContext } from "../../contexts/ReservationContext"
import { useRef, useTransition, type ReactElement } from "react"
import { createReservation } from "@/server-actions/reservation/createReservation"
import { updateReservation } from "@/server-actions/reservation/updateReservation"
import SpinnerMini from "./SpinnerMini"
import { differenceInDays } from "date-fns"
import { useFormState } from "react-dom"

type ReservationFormProps = {
	cabin: Cabin
	username: string
	UserAvatar: ReactElement
	booking?: Booking
	type: "create" | "update"
}

function ReservationForm({
	username,
	cabin,
	UserAvatar,
	booking,
	type,
}: ReservationFormProps) {
	const [isPending, startTransition] = useTransition()

	const [createMessage, createReservationAction] = useFormState(
		createReservation,
		{
			message: "",
		},
	)
	const [updateMessage, updateReservationAction] = useFormState(
		updateReservation,
		{
			message: "",
		},
	)

	console.log(createMessage)

	const { range, resetRange } = useReservationContext()

	const { maxCapacity, regularPrice, discount, id: cabinID } = cabin

	const startDate = range.from
	const endDate = range.to

	const numberOfNights =
		startDate && endDate ? differenceInDays(endDate, startDate) : 0

	const cabinPrice = numberOfNights * (regularPrice - discount)

	const form = useForm<TReservationSchema>({
		resolver: zodResolver(ReservationSchema),
		defaultValues: {
			observations: booking?.observations ?? "",
			numberOfGuests: booking?.numberOfGuests.toString() ?? "",
		},
	})

	const formRef = useRef<HTMLFormElement>(null)

	const newFormData = new FormData()

	function resetFields() {
		form.reset()
	}

	function handleReservation() {
		const dates = type === "create" &&
			range.from &&
			range.to && {
				startDate: range.from,
				endDate: range.to,
				numberOfNights: differenceInDays(range.to, range.from),
			}

		newFormData.append(
			"newBooking",
			JSON.stringify({
				...booking,
				cabinPrice,
				cabinID,
				observations: form.getValues("observations")!,
				numberOfGuests: Number(form.getValues("numberOfGuests")),
				...dates,
			}),
		)

		if (type === "update") {
			return updateReservationAction(newFormData)
		}

		createReservationAction(newFormData)
		resetRange()
	}

	return (
		<div className="grid grid-rows-[0.5fr_4fr]">
			<div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
				<p>Logged in as</p>

				<div className="flex items-center gap-4">
					{UserAvatar}
					<p>{username}</p>
				</div>
			</div>

			<Form {...form}>
				<form
					ref={formRef}
					action={handleReservation}
					onSubmit={event => {
						event.preventDefault()
						form.handleSubmit(() => {
							startTransition(() => {
								handleReservation()
							})
						})(event)
					}}
					className="flex flex-col  gap-5 bg-primary-900 px-16 py-10 text-lg">
					<FormField
						control={form.control}
						name="numberOfGuests"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel className="text-lg">How many guests?</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										name="numberOfGuests">
										<FormControl>
											<SelectTrigger className="w-full border-primary-500 bg-primary-200 px-5 py-3 text-base text-primary-950 shadow-sm">
												<SelectValue placeholder="Select a number of guests..." />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-primary-950">
											<SelectItem value={"0"}>
												Select a number of guests...
											</SelectItem>

											{Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
												guestAmount => (
													<SelectItem
														value={guestAmount.toString()}
														key={guestAmount}>
														{guestAmount}{" "}
														{guestAmount === 1 ? "guest" : "guests"}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>

									<FormMessage className="text-base" />
								</FormItem>
							)
						}}
					/>
					<FormField
						control={form.control}
						name="observations"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-lg">
									Anything we should know about your stay?
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Any pets, allergies, special requirements, etc.?"
										className="w-full resize-y border-primary-500 bg-primary-200 px-5 py-3 text-base text-primary-800 shadow-sm placeholder:text-primary-700"
										{...field}
									/>
								</FormControl>

								<FormMessage className="text-base" />
							</FormItem>
						)}
					/>

					<div className="flex items-center gap-6">
						{!(startDate && endDate) && (
							<p className="text-accent-400">Start by selecting dates.</p>
						)}
						{startDate && endDate && (
							<>
								<Button
									disabled={!form.formState.isDirty || isPending}
									type="button"
									variant="destructive"
									className="disabled:hover:bg-red-900"
									onClick={resetFields}>
									Clear data
								</Button>

								<Button
									disabled={!form.formState.isDirty || isPending}
									type="submit"
									size="lg"
									className={`w-full gap-2 bg-accent-500 text-lg font-semibold text-primary-950 transition-all hover:bg-accent-600 disabled:text-primary-700 disabled:hover:bg-accent-500`}>
									Reserve now {isPending && <SpinnerMini />}
								</Button>
							</>
						)}
					</div>

					<p>
						{type === "create" ? createMessage.message : updateMessage.message}
					</p>
				</form>
			</Form>
		</div>
	)
}

export default ReservationForm
