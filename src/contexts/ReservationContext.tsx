"use client"

import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useContext,
	useState,
} from "react"


type ReservationContextProviderProps = {
	children: ReactNode
}

type ReservationState = {
	range: Range
	setRange: Dispatch<SetStateAction<Range>>
	resetRange: () => void
}

export type Range = { from: Date | undefined; to?: Date | undefined }

const INITIAL_STATE = {
	from: undefined,
	to: undefined,
} as const

const ReservationContext = createContext<ReservationState | null>(null)

export function useReservationContext() {
	const context = useContext(ReservationContext)

	if (!context) {
		throw new Error(
			"useReservationContext was called outside of ReservationContextProvider!",
		)
	}

	return context
}

function ReservationContextProvider({
	children,
}: ReservationContextProviderProps) {
	const [range, setRange] = useState<Range>(INITIAL_STATE)

	function resetRange() {
		setRange(INITIAL_STATE)
	}

	return (
		<ReservationContext.Provider value={{ range, setRange, resetRange }}>
			{children}
		</ReservationContext.Provider>
	)
}

export default ReservationContextProvider
