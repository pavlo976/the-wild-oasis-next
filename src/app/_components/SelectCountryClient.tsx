"use client"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

type SelectCountryClient = {
	countries: Array<{
		name: string
		flag: string
		independent: boolean
	}>
	defaultCountry: string
	flag: string
	id: string
}

function SelectCountryClient({
	countries,
	defaultCountry,
	flag,
	id,
}: SelectCountryClient) {
	return (
		<Select defaultValue={`${defaultCountry}%${flag}`}>
			<SelectTrigger className="border-primary-500" id={id}>
				<SelectValue placeholder="Select country..." />
			</SelectTrigger>
			<SelectContent className="border-primary-500 bg-primary-900">
				{countries.map(country => {
					return (
						<SelectItem
							key={country.name}
							value={`${country.name}%${country.flag}`}>
							{country.name}
						</SelectItem>
					)
				})}
			</SelectContent>
		</Select>
	)
}

export default SelectCountryClient
