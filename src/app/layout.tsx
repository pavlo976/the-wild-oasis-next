import { type ReactNode } from "react"
import { type Metadata } from "next"

import { Josefin_Sans } from "next/font/google"

import Header from "./_components/Header"

import { cn } from "@/lib/utils"
import "./_styles/globals.scss"
import ReservationContextProvider from "../contexts/ReservationContext"

export type LayoutProps = {
	children: ReactNode
}

const josefin = Josefin_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sans",
})

export const metadata: Metadata = {
	title: {
		template: "%s / The Wild Oasis",
		default: "Welcome / The Wild Oasis",
	},
	description:
		"Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
}

export default async function RootLayout({ children }: LayoutProps) {
	return (
		<html lang="en" className={`${josefin.className} antialiased`}>
			<body
				className={cn(
					"bg-primary-950 text-primary-50 relative flex min-h-screen flex-col dark",
					josefin.variable,
				)}
				suppressHydrationWarning>
				<Header />

				<div className="grid grow px-8 py-12">
					<main className="mx-auto w-full max-w-7xl">
						<ReservationContextProvider>{children}</ReservationContextProvider>
					</main>
				</div>
			</body>
		</html>
	)
}
