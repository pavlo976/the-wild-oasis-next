import Spinner from "@/app/_components/Spinner"

export default function LoadingCabin() {
	return (
		<div className="grid place-items-center">
			<Spinner />
			<p className="text-xl font-semibold text-primary-200">
				Loading individual cabin data...
			</p>
		</div>
	)
}
