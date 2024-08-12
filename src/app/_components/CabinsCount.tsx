import { getCabins } from "@/data/data-service"

async function CabinsCount() {
	const { count } = await getCabins()

	return <span>{count}</span>
}

export default CabinsCount
