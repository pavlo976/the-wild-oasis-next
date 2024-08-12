import { cleanEnv, str } from "envalid"

export const env = cleanEnv(process.env, {
	SUPABASE_URL: str(),
	SUPABASE_KEY: str(),
	AUTH_URL: str(),
	AUTH_SECRET: str(),
	AUTH_GOOGLE_ID: str(),
	AUTH_GOOGLE_SECRET: str(),
})
