"use client"

import { type NewGuest } from "@/data/data-service"
import { useEffect, useRef, useState, useTransition } from "react"
import { useFormState } from "react-dom"
import { type ControllerRenderProps, useForm } from "react-hook-form"
import { type TProfileSchema, ProfileSchema } from "../_schema/ProfileSchema"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { updateProfileAction } from "@/server-actions/updateProfile"
import SelectCountry from "./SelectCountry"
import { Label } from "@/components/ui/label"
import SpinnerMini from "./SpinnerMini"

type UpdateProfileFormProps = {
	guest: NewGuest["newGuest"]
	countries: Array<{
		name: string
		flag: string
		independent: boolean
	}>
}

export type Field = ControllerRenderProps<{
	nationalID: string
	nationality: string
}>

const initialState = {
	nationality: true,
	nationalID: true,
}

function UpdateProfileForm({ guest, countries }: UpdateProfileFormProps) {
	const [isDirty, setIsDirty] = useState(initialState)
	const [mounted, setMounted] = useState(false)
	const [isPending, startTransition] = useTransition()
	const [_, action] = useFormState(updateProfileAction, {
		message: "",
	})

	const isAllDirty = Object.values(isDirty).every(isDirtyValue => {
		return isDirtyValue === true
	})

	const form = useForm<TProfileSchema>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			nationalID: guest.nationalID ?? "",
			nationality: guest.nationality ?? "",
		},
	})

	const formRef = useRef<HTMLFormElement>(null)

	function handleChange(field: Field, value: string) {
		field.onChange(value)

		if (guest[field.name] !== value) {
			return setIsDirty({ ...isDirty, [field.name]: false })
		}

		setIsDirty({ ...isDirty, [field.name]: true })
	}

	useEffect(() => setMounted(true), [])

	useEffect(() => {
		const nationality = form.getValues("nationality")
		const nationalID = form.getValues("nationalID")

		if (guest.nationalID !== nationalID || guest.nationality !== nationality) {
			return setIsDirty({ nationalID: false, nationality: false })
		}

		setIsDirty({ nationalID: true, nationality: true })
	}, [form, guest])

	return (
		<Form {...form}>
			<form
				ref={formRef}
				action={action}
				onSubmit={event => {
					event.preventDefault()
					form.handleSubmit(() => {
						startTransition(() => {
							action(new FormData(formRef.current!))
						})
					})(event)
				}}
				className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg">
				<div>
					<Label>Full Name</Label>
					<Input
						className="border-primary-500 hover:bg-primary-800 disabled:hover:bg-transparent"
						placeholder="Type fullName..."
						disabled
						defaultValue={guest.fullName}
					/>
				</div>
				<div>
					<Label>Email address</Label>
					<Input
						className="border-primary-500 hover:bg-primary-800 disabled:hover:bg-transparent"
						placeholder="Type fullName..."
						disabled
						defaultValue={guest.email}
					/>
				</div>

				<FormField
					control={form.control}
					name="nationalID"
					render={({ field }) => (
						<FormItem>
							<FormLabel>National ID</FormLabel>
							<FormControl>
								<Input
									className="border-primary-500 hover:bg-primary-800"
									placeholder="Type nationalID..."
									{...field}
									onChange={event => handleChange(field, event.target.value)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="space-y-2">
					<div className="relative flex items-center justify-between">
						<SelectCountry
							form={form}
							name="nationality"
							id="nationality"
							className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
							defaultCountry={guest!.nationality!}
							countries={countries}
							handleChange={handleChange}
						/>
					</div>
				</div>

				<div className="flex items-center justify-end gap-6">
					<Button
						onClick={() => form.reset()}
						disabled={isAllDirty}
						type="button"
						className="bg-red-800 font-semibold text-white hover:bg-red-700 active:bg-red-900 disabled:hover:bg-red-800">
						Clear data
					</Button>
					<Button
						disabled={(mounted && isAllDirty) || isPending}
						size="lg"
						type="submit"
						className="gap-2 bg-accent-500 text-base font-semibold text-primary-950 hover:bg-accent-600 active:bg-accent-800 disabled:hover:bg-accent-500">
						Update profile {isPending && <SpinnerMini />}
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default UpdateProfileForm
