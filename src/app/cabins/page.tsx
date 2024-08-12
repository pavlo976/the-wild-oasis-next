import { type SearchParams } from "../page"
import { type FilterCapacity } from "@/data/data-service"

import { Suspense } from "react"

import CabinList from "../_components/CabinList"
import CabinsLoading from "./loading"
import Filter from "../_components/Filter"
import SpinnerMini from "../_components/SpinnerMini"
import ReservationReminder from "../_components/ReservationReminder"

export default function CabinsPage({ searchParams }: SearchParams) {
	const filter = (searchParams?.capacity || "all") as FilterCapacity

	return (
		<div>
			<h1 className="mb-5 text-4xl font-medium text-accent-400">
				Our Luxury Cabins
			</h1>
			<p className="mb-10 text-lg text-primary-200">
				Cozy yet luxurious cabins, located right in the heart of the Italian
				Dolomites. Imagine waking up to beautiful mountain views, spending your
				days exploring the dark forests around, or just relaxing in your private
				hot tub under the stars. Enjoy nature&apos;s beauty in your own little
				home away from home. The perfect spot for a peaceful, calm vacation.
				Welcome to paradise.
			</p>

			<Suspense key={crypto.randomUUID()} fallback={<SpinnerMini />}>
				<ReservationReminder />
			</Suspense>

			<Suspense key={crypto.randomUUID()} fallback={<SpinnerMini />}>
				<div className="mb-8 flex justify-end">
					<Filter />
				</div>
			</Suspense>

			<Suspense key={crypto.randomUUID()} fallback={<CabinsLoading />}>
				<CabinList filter={filter} />
			</Suspense>
		</div>
	)
}
