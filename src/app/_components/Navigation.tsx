import Link from "next/link"
import { auth } from "../auth"
import { getBase64 } from "@/lib/getBase64"
import UserAvatar from "./UserAvatar"

export default async function Navigation() {
	const session = await auth()

	const blurredDataUrl =
		session?.user?.image && (await getBase64(session.user.image))

	return (
		<nav className="z-10 text-xl">
			<ul className="flex items-center gap-10 [&>li>a]:p-4">
				<li>
					<Link
						href="/cabins"
						className="transition-colors hover:text-accent-400">
						Cabins
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className="transition-colors hover:text-accent-400">
						About
					</Link>
				</li>
				<li>
					{blurredDataUrl && session?.user?.image && (
						<Link
							href="/account"
							className="flex items-center gap-4 transition-colors hover:text-accent-400">
							<UserAvatar />
							<span>Guest area</span>
						</Link>
					)}
					{!session?.user?.image && (
						<Link
							href="/account"
							className="transition-colors hover:text-accent-400">
							Guest area
						</Link>
					)}
				</li>
			</ul>
		</nav>
	)
}
