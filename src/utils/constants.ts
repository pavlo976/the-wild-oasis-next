export const FILTER_CAPACITY_SIZES = {
	small: { lte: 3 },
	medium: { gte: 4, lte: 7 },
	large: { gte: 8 },
} as const

export const MONTHS_AMOUNT = 12
export const EMAIL_TOP_LEVEL_DOMAIN_REGEX = /\.[a-z]{2,}$/i
export const EMAIL_START_LETTER_REGEX = /^[a-z]/i
export const EMAIL_UPPERCASE_LETTER_REGEX = /[A-Z]/
