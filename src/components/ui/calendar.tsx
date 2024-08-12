"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select"
import { format, setMonth } from "date-fns"
import { MONTHS_AMOUNT } from "@/utils/constants"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

type DropdownName = "months" | "years"

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium hidden",
				nav: "space-x-1 flex items-center",
				nav_button: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
				),
				nav_button_previous: "absolute left-1 border-primary-400",
				nav_button_next: "absolute right-1 border-primary-400",
				table: "w-full border-collapse space-y-1",
				head_row: "flex",
				head_cell:
					"text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
				row: "flex w-full mt-2",
				cell: cn(
					"relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
					props.mode === "range"
						? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
						: "[&:has([aria-selected])]:rounded-md",
				),
				day: cn(
					buttonVariants({ variant: "ghost" }),
					"h-8 w-8 p-0 font-normal aria-selected:opacity-100",
				),
				day_range_start: "day-range-start",
				day_range_end: "day-range-end",
				day_selected:
					"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground disabled:hover:bg-primary",
				day_today: "bg-accent text-accent-foreground",
				day_outside:
					"day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-		 						selected:opacity-30",
				day_disabled:
					"text-muted-foreground opacity-50 hover:bg-primary-950 hover:text-muted-foreground",
				day_range_middle:
					"aria-selected:bg-accent aria-selected:text-accent-foreground",
				day_hidden: "invisible",
				caption_dropdowns: "flex gap-1 border-primary-400",
				...classNames,
			}}
			components={{
				IconLeft: ({ ...props }) => <ChevronLeftIcon className="size-4" />,
				IconRight: ({ ...props }) => <ChevronRightIcon className="size-4" />,
				Dropdown: props => {
					const { fromDate, fromMonth, fromYear, toDate, toMonth, toYear } =
						useDayPicker()

					const { goToMonth, currentMonth } = useNavigation()

					const optionsMap = {
						months: {
							selectValue: (newValue: string) => {
								const newDate = new Date(currentMonth)
								newDate.setMonth(+newValue)
								goToMonth(newDate)
							},

							value: format(currentMonth, "MMMM"),

							items: Array.from({ length: MONTHS_AMOUNT }, (_, i) => ({
								value: i.toString(),
								label: format(setMonth(new Date(), i), "MMMM"),
							})),
						},
						years: {
							selectValue: (newValue: string) => {
								const newDate = new Date(currentMonth)
								newDate.setFullYear(+newValue)
								goToMonth(newDate)
							},

							value: currentMonth.getFullYear().toString(),

							items: (() => {
								const earliestYear =
									fromYear ||
									fromMonth?.getFullYear() ||
									fromDate?.getFullYear()

								const latestYear =
									toYear || toMonth?.getFullYear() || toDate?.getFullYear()

								if (earliestYear && latestYear) {
									const yearsLength = latestYear - earliestYear + 1

									return Array.from({ length: yearsLength }, (_, i) => ({
										label: (earliestYear + i).toString(),
										value: (earliestYear + i).toString(),
									}))
								}
								return []
							})(),
						},
					}

					const selectedOption = optionsMap[props.name as DropdownName]

					return selectedOption ? (
						<Select
							onValueChange={selectedOption.selectValue}
							value={props.value?.toString()}>
							<SelectTrigger className="border-primary-700">
								{
									selectedOption.items.find(item => +item.value === props.value)
										?.label
								}
							</SelectTrigger>
							<SelectContent className="bg-primary-950">
								{selectedOption.items.map(selectItem => (
									<SelectItem value={selectItem.value} key={selectItem.value}>
										{selectItem.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					) : null
				},
			}}
			{...props}
		/>
	)
}
Calendar.displayName = "Calendar"

export { Calendar }
