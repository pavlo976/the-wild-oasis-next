import { getBookedDatesByCabinId, getCabin } from "@/data/data-service"

export async function GET(
	_: Request,
	{ params }: { params: { cabinID: string } },
) {
	try {
		const [cabin, bookedDates] = await Promise.all([
			getCabin(+params.cabinID),
			getBookedDatesByCabinId(+params.cabinID),
		])

		return Response.json({ cabin, bookedDates })
	} catch (error) {
		if (error instanceof Error) {
			return Response.json({ message: "Cabin not found!" })
		}
	}
}
