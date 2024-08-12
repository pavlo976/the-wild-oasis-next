import { signInAction } from "@/server-actions/authentication/sign-in"
import Image from "next/image"

function SignInButton() {
	return (
		<form action={signInAction}>
			<button className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium">
				<Image
					src="https://authjs.dev/img/providers/google.svg"
					alt="Google logo"
					height={24}
					width={24}
				/>
				<span className="mt-1">Continue with Google</span>
			</button>
		</form>
	)
}

export default SignInButton
