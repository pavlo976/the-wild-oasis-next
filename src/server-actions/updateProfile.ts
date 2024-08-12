"use server"

import { type Session } from "@/utils/helpers"
import { ProfileSchema } from "@/app/_schema/ProfileSchema"
import { auth } from "@/app/auth"
import { updateGuest } from "@/data/data-service"
import { revalidatePath } from "next/cache"

export type FormState = {
	message: string
}

export async function updateProfileAction(_: FormState, data: FormData) {
	const formData = Object.fromEntries(data)

	const guestID = ((await auth())?.user as Session).guestID

	if (!guestID) {
		throw new Error("Guest is not authenticated! Log in to update guest data.")
	}

	const parsedSchema = ProfileSchema.safeParse(formData)

	if (!parsedSchema.success) {
		return { message: "Invalid input data" }
	}

	if (!/^[a-zA-Z0-9]{6,12}$/.test(parsedSchema.data.nationalID!)) {
		throw new Error("NationalID must be between 6 and 12 characters")
	}

	await updateGuest({ id: guestID, updatedGuestFields: parsedSchema.data })

	revalidatePath("/account/profile")

	return { message: "User successfully updated." }
}
