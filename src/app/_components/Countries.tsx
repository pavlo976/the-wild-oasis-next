import { type Tables } from "@/supabase/schema"
import UpdateProfileForm from "./UpdateProfileForm"
import { getCountries } from "@/data/data-service"

type CountriesProps = {
	guest: Tables<"guests">
}

async function Countries({ guest }: CountriesProps) {
	const countries = await getCountries()

	return <UpdateProfileForm guest={guest!} countries={countries} />
}

export default Countries
