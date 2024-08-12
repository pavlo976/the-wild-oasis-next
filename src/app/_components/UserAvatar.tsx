import Image from "next/image"
import { auth } from "../auth"
import { getBase64 } from "@/lib/getBase64"

async function UserAvatar() {
	const session = await auth()

	if (!session?.user && !session?.user?.image) return null

	const blurredDataUrl = await getBase64(session.user.image!)

	return (
		<Image
			src={session.user.image!}
			alt={`User ${session.user.name}`}
			placeholder="blur"
			blurDataURL={blurredDataUrl}
			width={40}
			height={40}
			quality={100}
			referrerPolicy="no-referrer"
			className="object-fit rounded-full"
		/>
	)
}

export default UserAvatar
