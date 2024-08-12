import clsx from "clsx"
import { ClassValue } from "clsx"
import { type User } from "next-auth"
import { twMerge } from "tw-merge"

export type Session = User & { guestID?: number }

export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs))
}
