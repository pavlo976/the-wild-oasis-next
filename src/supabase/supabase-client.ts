import { createClient } from "@supabase/supabase-js"
import { Database } from "./schema"
import { env } from "../../env"

export const supabaseClient = createClient<Database>(
	env.SUPABASE_URL,
	env.SUPABASE_KEY,
)
