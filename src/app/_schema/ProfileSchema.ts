import { z } from "zod"

export const ProfileSchema = z.object({
	nationalID: z.string().regex(/^[a-zA-Z0-9]{6,12}$/, {
		message: "NationalID must be between 6 and 12 characters.",
	}),
	nationality: z
		.string()
		.min(1, { message: "You have to choose a specific nationality." }),
})

export type TProfileSchema = z.infer<typeof ProfileSchema>
