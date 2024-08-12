import Image from "next/image"
import Link from "next/link"

import logoSrc from "@/app/../../public/logo.png"

function Logo() {
	return (
		<Link href="/" className="z-10 flex items-center gap-4">
			<Image
				src={logoSrc}
				height="60"
				width="60"
				alt="The Wild Oasis logo"
				priority
				quality={100}
			/>

			<span className="text-xl font-semibold text-primary-100">
				The Wild Oasis
			</span>
		</Link>
	)
}

export default Logo
