import Spinner from "@/app/_components/Spinner"

export default function ReservationSpinner() {
	return (
		<div className="grid place-items-center">
			<Spinner />
			<p className="text-xl font-semibold text-primary-200">
				Loading reservation...
			</p>
		</div>
	)
}
