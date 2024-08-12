import Spinner from "../_components/Spinner"

function SettingsAndBookingsSpinner() {
	return (
		<div className="grid place-items-center">
			<Spinner />
			<p className="text-xl font-semibold text-primary-200">
				Loading settings and bookings data...
			</p>
		</div>
	)
}

export default SettingsAndBookingsSpinner
