import Image from "next/image"
import TextExpander from "./TextExpander"
import { MapPinIcon, UsersIcon } from "lucide-react"
import { BsEyeSlash } from "react-icons/bs"
import { getBase64 } from "@/lib/getBase64"

type CabinProps = {
	image: string
	description: string
	maxCapacity: number
	name: string
}

async function Cabin({ image, description, maxCapacity, name }: CabinProps) {
	const blurredDataImage = await getBase64(image)

	return (
		<>
			<div className="mb-24 grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 px-10 py-3">
				<div className="relative -translate-x-3 scale-[1.15]">
					<Image
						src={image}
						alt={`Cabin ${name}`}
						className="object-cover"
						placeholder="blur"
						blurDataURL={blurredDataImage}
						fill
						priority
						quality={100}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>

				<div>
					<h3 className="mb-5 w-[150%] translate-x-[-254px] bg-primary-950 p-6 pb-1 text-7xl font-black text-accent-100">
						Cabin {name}
					</h3>

					<p className="mb-10 text-lg text-primary-300">
						<TextExpander>{description}</TextExpander>
					</p>

					<ul className="mb-7 flex flex-col gap-4">
						<li className="flex items-center gap-3">
							<UsersIcon className="size-5 text-primary-600" />
							<span className="text-lg">
								For up to <span className="font-bold">{maxCapacity}</span>{" "}
								guests
							</span>
						</li>
						<li className="flex items-center gap-3">
							<MapPinIcon className="size-5 text-primary-600" />
							<span className="text-lg">
								Located in the heart of the{" "}
								<span className="font-bold">Dolomites</span> (Italy)
							</span>
						</li>
						<li className="flex items-center gap-3">
							<BsEyeSlash className="size-5 text-primary-600" />
							<span className="text-lg">
								Privacy <span className="font-bold">100%</span> guaranteed
							</span>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
					Reserve {name} today. Pay on arrival.
				</h2>
			</div>
		</>
	)
}

export default Cabin
