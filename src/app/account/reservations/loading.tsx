import Spinner from "@/app/_components/Spinner"

export default function CabinsLoading() {
	return (
		<div className="grid place-items-center">
			<Spinner />
			<p className="text-xl font-semibold text-primary-200">
				Loading reservations data...
			</p>
		</div>
	)
}
