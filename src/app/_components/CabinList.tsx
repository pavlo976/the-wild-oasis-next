import { type FilterCapacity, getCabins } from "@/data/data-service"
import CabinCard from "./CabinCard"
import { unstable_noStore } from "next/cache"

type CabinListProps = {
	filter: FilterCapacity
}

async function CabinList({ filter }: CabinListProps) {
	unstable_noStore()

	const data = await getCabins({ filter })

	if (!data.cabins.length) return <p>Cabins not found.</p>

	return (
		data.cabins.length > 0 && (
			<div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
				{data.cabins.map(cabin => (
					<CabinCard cabin={cabin} key={cabin.id} />
				))}
			</div>
		)
	)
}

export default CabinList
