import Spinner from "../_components/Spinner"

function CountriesSpinner() {
	return (
		<div className="grid place-items-center">
			<Spinner />
			<p className="text-xl font-semibold text-primary-200">
				Loading countries...
			</p>
		</div>
	)
}

export default CountriesSpinner
