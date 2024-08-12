import { z } from "zod"
import {
	EMAIL_START_LETTER_REGEX,
	EMAIL_TOP_LEVEL_DOMAIN_REGEX,
	EMAIL_UPPERCASE_LETTER_REGEX,
} from "@/utils/constants"

export const UserMailSchema = z
	.string()
	.min(1, "Email cannot be empty")
	.refine(value => EMAIL_START_LETTER_REGEX.test(value), {
		message: "Email must start with a letter",
	})
	.refine(value => !EMAIL_UPPERCASE_LETTER_REGEX.test(value), {
		message: "Email must not contain capital letters",
	})
	.refine(value => value.includes("@"), {
		message: "Email must contains @",
	})
	.refine(value => EMAIL_TOP_LEVEL_DOMAIN_REGEX.test(value), {
		message:
			"Email must contain a top-level email domain (e.g. 'gmail.com', 'outlook.com')",
	})
