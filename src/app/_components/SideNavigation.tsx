"use client"

import { CalendarDaysIcon, HomeIcon, UserIcon } from "lucide-react"

import SignOutButton from "./SignOutButton"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/helpers"

const navLinks = [
	{
		name: "Home",
		href: "/account",
		icon: <HomeIcon className="size-5 text-primary-600" />,
	},
	{
		name: "Reservations",
		href: "/account/reservations",
		icon: <CalendarDaysIcon className="size-5 text-primary-600" />,
	},
	{
		name: "Guest profile",
		href: "/account/profile",
		icon: <UserIcon className="size-5 text-primary-600" />,
	},
]

const linkBaseStyles =
	"flex items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-800 hover:text-primary-50"

function SideNavigation() {
	const pathname = usePathname()

	return (
		<nav className="border-r border-primary-800">
			<ul className="flex h-full flex-col gap-2 text-lg">
				{navLinks.map(link => {
					const linkStyles = cn(
						linkBaseStyles,
						link.href === pathname && "bg-primary-800 text-primary-50",
					)

					return (
						<li key={link.name}>
							<Link className={linkStyles} href={link.href}>
								{link.icon}
								<span>{link.name}</span>
							</Link>
						</li>
					)
				})}

				<li className="mt-auto">
					<SignOutButton />
				</li>
			</ul>
		</nav>
	)
}

export default SideNavigation
