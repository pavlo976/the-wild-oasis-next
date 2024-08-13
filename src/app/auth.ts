import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createGuest, getGuest } from "@/data/data-service"

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => !!auth,
		signIn: async ({ user }) => {
			try {
				const existingGuest = await getGuest(user.email!)

				if (!existingGuest) {
					await createGuest({
						newGuest: {
							email: user.email!,
							fullName: user.name!,
						},
					})
				}

				return true
			} catch (error) {
				return false
			}
		},
		session: async ({ session }) => {
			const guest = await getGuest(session.user.email)

			const newSession = {
				...session,
				user: { ...session.user, guestID: guest?.id },
			}

			return newSession
		},
	},
	pages: {
		signIn: "/login",
	},
})
