import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { type UseFormReturn } from "react-hook-form"
import { type Field } from "./UpdateProfileForm"

// Let's imagine your colleague already built this component 😃

type SelectCountryProps = {
	defaultCountry: string | null
	name: string
	id: string
	className?: string
	countries: Array<{
		name: string
		flag: string
		independent: boolean
	}>
	form: UseFormReturn<
		{
			nationality: string
			nationalID: string
		},
		undefined,
		undefined
	>
	handleChange: (field: Field, value: string) => void
}

function SelectCountry({
	form,
	countries,
	defaultCountry,
	handleChange,
}: SelectCountryProps) {
	const flag =
		countries.find(country => {
			return country.name === form.getValues("nationality")
		})?.flag ?? ""

	return (
		<FormField
			control={form.control}
			name="nationality"
			render={({ field }) => {
				return (
					<FormItem className="mr-2 w-full">
						<div className="flex items-center justify-between">
							<FormLabel>Where are you from?</FormLabel>
							<Image
								src={flag}
								alt="Country flag"
								className="h-5 w-7 rounded-sm"
								width={28}
								height={20}
							/>
						</div>
						<Select
							onValueChange={value => {
								handleChange(field, value)
								form.trigger("nationality")
							}}
							name="nationality"
							defaultValue={defaultCountry!}>
							<FormControl>
								<SelectTrigger
									className="border-primary-500"
									name="nationality">
									<SelectValue placeholder="Select country..." />
								</SelectTrigger>
							</FormControl>

							<SelectContent className="border-primary-500 bg-primary-900">
								{countries.map(country => {
									return (
										<SelectItem key={country.name} value={country.name}>
											{country.name}
										</SelectItem>
									)
								})}
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}

export default SelectCountry
