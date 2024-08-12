"use client"

import { useState } from "react"

function Counter({ name }: { name: string }) {
	const [count, setCount] = useState(0)

	return (
		<div>
			<p className="font-semibold">{count}</p>

			<div className="space-x-2">
				<button
					className="rounded-md bg-teal-600 px-3 py-2 text-white transition-colors hover:bg-teal-700"
					onClick={() => setCount(previousCount => previousCount + 1)}>
					Increase {name}
				</button>
				<button
					className="rounded-md bg-teal-600 px-3 py-2 text-white transition-colors hover:bg-teal-700"
					onClick={() => setCount(previousCount => previousCount - 1)}>
					Decrease {name}
				</button>
			</div>
		</div>
	)
}

export default Counter
