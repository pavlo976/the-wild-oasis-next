"use client"

import { type ReactNode } from "react"
import { type FilterCapacity } from "@/data/data-service"
import { cn } from "@/utils/helpers"

import { usePathname, useSearchParams, useRouter } from "next/navigation"

const buttonBaseStyles = "px-5 py-2 transition-colors hover:bg-primary-700"

type ButtonProps = {
	filter: FilterCapacity
	children: ReactNode
}

function Filter() {
	return (
		<div className="flex border border-primary-800">
			<Button filter="all">All cabins</Button>
			<Button filter="small">1&mdash;3 guests</Button>
			<Button filter="medium">4&mdash;7 guests</Button>
			<Button filter="large">8&mdash;12 guests</Button>
		</div>
	)
}

function Button({ filter, children }: ButtonProps) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const params = new URLSearchParams(searchParams)

	const activeFilter = searchParams.get("capacity") || "all"

	function handleFilter(filter: FilterCapacity) {
		params.set("capacity", filter)

		const url = `${pathname}?${params.toString()}`

		replace(url, { scroll: false })
	}

	return (
		<button
			onClick={() => handleFilter(filter)}
			className={cn(
				buttonBaseStyles,
				activeFilter === filter && "bg-primary-700 text-primary-50",
			)}>
			{children}
		</button>
	)
}

export default Filter
