import { z } from "zod"

export const ReservationSchema = z.object({
	numberOfGuests: z
		.string()
		.min(1, { message: "You have to choose a specific number of guests." }),
	observations: z
		.string()
		.min(1, { message: "Observations cannot be empty." })
		.optional(),
})

export type TReservationSchema = z.infer<typeof ReservationSchema>
