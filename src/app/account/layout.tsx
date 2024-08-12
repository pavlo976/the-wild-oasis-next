import { type Metadata } from "next"
import { type LayoutProps } from "../layout"
import SideNavigation from "../_components/SideNavigation"

export const metadata: Metadata = {
	title: {
		template: "%s / Account",
		default: "Account / The Wild Oasis",
	},
}

export default function AccountLayout({ children }: LayoutProps) {
	return (
		<div className="grid h-full grid-cols-[16rem_1fr] gap-12">
			<SideNavigation />
			{children}
		</div>
	)
}
