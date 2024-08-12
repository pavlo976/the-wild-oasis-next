import { type Tables } from "@/supabase/schema"

import { eachDayOfInterval } from "date-fns"
import { supabaseClient } from "@/supabase/supabase-client"
import { notFound } from "next/navigation"
import { FILTER_CAPACITY_SIZES } from "@/utils/constants"

type NewBooking = {
	newBooking: Omit<Booking, "id" | "created_at">
}

type UpdateGuest = {
	id: number
	updatedGuestFields: Partial<Guest>
}

type UpdateBooking = {
	id: number
	updatedBookingFields: Partial<Booking>
}

type GetCabins = {
	filter: FilterCapacity
}

export type Guest = Tables<"guests">
export type Booking = Tables<"bookings">

export type FilterCapacity = "small" | "medium" | "large" | "all"

export type NewGuest = {
	newGuest: Partial<Omit<Guest, "email" | "fullName">> & {
		email: Guest["email"]
		fullName: Guest["fullName"]
	}
}

export type GetBooking = Omit<
	Booking,
	"cabinPrice" | "extraPrice" | "hasBreakfast" | "isPaid" | "observations"
> & { cabins: Cabin }

export type Cabin = Tables<"cabins">

/////////////
// GET

export async function getCabin(id: number) {
	const { data, error } = await supabaseClient
		.from("cabins")
		.select("*")
		.eq("id", id)
		.single()

	// For testing
	// await new Promise((res) => setTimeout(res, 1000));

	if (error) {
		console.error(error)

		notFound()
	}

	return data
}

export async function getCabinPrice(id: number) {
	const { data, error } = await supabaseClient
		.from("cabins")
		.select("regularPrice, discount")
		.eq("id", id)
		.single()

	if (error) {
		console.error(error)
	}

	return data
}

export async function getCabins({ filter }: GetCabins = { filter: "all" }) {
	const query = supabaseClient
		.from("cabins")
		.select("id, name, maxCapacity, regularPrice, discount, image", {
			count: "exact",
		})
		.order("name")

	// await new Promise(res => setTimeout(res, 10000))

	if (filter === "medium") {
		query
			.gte("maxCapacity", FILTER_CAPACITY_SIZES[filter].gte)
			.lte("maxCapacity", FILTER_CAPACITY_SIZES[filter].lte)
	}

	if (filter === "small") {
		query.lte("maxCapacity", FILTER_CAPACITY_SIZES[filter].lte)
	}

	if (filter === "large") {
		query.gte("maxCapacity", FILTER_CAPACITY_SIZES[filter].gte)
	}

	const { data, error, count } = await query

	if (error) {
		console.error(error)
		throw new Error("Cabins could not be loaded")
	}

	return { cabins: data, count }
}

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
	const { data } = await supabaseClient
		.from("guests")
		.select("*")
		.eq("email", email)
		.single()

	// No error here! We handle the possibility of no guest in the sign in callback
	return data
}

export async function getBooking(id: number) {
	const { data, error, count } = await supabaseClient
		.from("bookings")
		.select("*", { count: "exact" })
		.eq("id", id)
		.single()

	if (error) {
		console.error(error)
		throw new Error("Booking could not get loaded")
	}

	return { data, count }
}

export async function getBookings(guestID: number) {
	const { data, error, count } = await supabaseClient
		.from("bookings")
		// We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
		.select(
			"id, created_at, startDate, endDate, numberOfNights, numberOfGuests, totalPrice, status, guestID, cabinID, cabins(name, image)",
			{ count: "exact" },
		)
		.eq("guestID", guestID)
		.order("startDate")

	if (error) {
		console.error(error)
		throw new Error("Bookings could not get loaded")
	}

	return { data, count }
}

export async function getBookedDatesByCabinId(cabinID: number) {
	const startOfUtcDay = new Date(new Date().setUTCHours(0, 0, 0, 0))
	const today = startOfUtcDay.toISOString()

	// Getting all bookings
	const { data, error } = await supabaseClient
		.from("bookings")
		.select("*")
		.eq("cabinID", cabinID)
		.or(`startDate.gte.${today},status.eq.checked-in`)

	if (error) {
		console.error(error)
		throw new Error("Bookings could not get loaded")
	}

	// Converting to actual dates to be displayed in the date picker
	const bookedDates = data
		.map(booking => {
			return eachDayOfInterval({
				start: new Date(booking.startDate),
				end: new Date(booking.endDate),
			})
		})
		.flat()

	return bookedDates
}

export async function getSettings() {
	const { data, error } = await supabaseClient
		.from("settings")
		.select("*")
		.single()

	// await new Promise(res => setTimeout(res, 10000))

	if (error) {
		console.error(error)
		throw new Error("Settings could not be loaded")
	}

	return data
}

export async function getCountries() {
	try {
		const res = await fetch("https://restcountries.com/v2/all?fields=name,flag")
		const countries = await res.json()
		return countries as Array<{
			name: string
			flag: string
			independent: boolean
		}>
	} catch {
		throw new Error("Could not fetch countries")
	}
}

/////////////
// CREATE

export async function createGuest({ newGuest }: NewGuest) {
	const { data, error } = await supabaseClient
		.from("guests")
		.insert({ ...newGuest })

	console.log(data)

	if (error) {
		console.error(error)
		throw new Error("Guest could not be created")
	}

	return data
}

export async function createBooking({ newBooking }: NewBooking) {
	console.log(newBooking)

	const { data, error } = await supabaseClient
		.from("bookings")
		.insert({ ...newBooking })
		.select()
		.single()

	if (error) {
		console.error(error)
		throw new Error("Booking could not be created")
	}

	return data
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest({ id, updatedGuestFields }: UpdateGuest) {
	const { data, error } = await supabaseClient
		.from("guests")
		.update(updatedGuestFields)
		.eq("id", id)
		.select()
		.single()

	if (error) {
		console.error(error)
		throw new Error("Guest could not be updated")
	}
	return data
}

export async function updateBooking({
	id,
	updatedBookingFields,
}: UpdateBooking) {
	const { data, error } = await supabaseClient
		.from("bookings")
		.update(updatedBookingFields)
		.eq("id", id)
		.select()
		.single()

	if (error) {
		console.error(error)
		throw new Error("Booking could not be updated")
	}
	return data
}

/////////////
// DELETE

export async function deleteBooking(id: number) {
	const { data, error } = await supabaseClient
		.from("bookings")
		.delete()
		.eq("id", id)

	if (error) {
		console.error(error)
		throw new Error("Booking could not be deleted")
	}
	return data
}
