const { fontFamily } = require("tailwindcss/defaultTheme")
import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		extend: {
			height: {
				screen: "100dvh",
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
					50: "#E1E8EF",
					100: "#D4DEE7",
					200: "#B7C7D7",
					300: "#99B0C7",
					400: "#7C99B6",
					500: "#5E82A6",
					600: "#4C6B8A",
					700: "#3C546C",
					800: "#2C3D4F",
					900: "#1B2631",
					950: "#141C24",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
					50: "#FAF5F0",
					100: "#F4ECE1",
					200: "#E8D6BF",
					300: "#DDC2A2",
					400: "#D2AF84",
					500: "#C69963",
					600: "#B78343",
					700: "#926835",
					800: "#6C4D28",
					900: "#4B351B",
					950: "#382814",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"collapsible-down": {
					from: { height: "0" },
					to: { height: "var(--radix-collapsible-content-height)" },
				},
				"collapsible-up": {
					from: { height: "var(--radix-collapsible-content-height)" },
					to: { height: "0" },
				},
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"collapsible-down": "collapsible-down 0.2s ease-out",
				"collapsible-up": "collapsible-up 0.2s ease-out",
				"caret-blink": "caret-blink 1s ease-out infinite",
			},

			gridTemplateColumns: {
				"auto-fill-auto": "repeat(auto-fill, minmax(min(100%, 1fr), 1fr))",
				"auto-fit-auto": "repeat(auto-fit, minmax(min(100%, 1fr), 1fr))",
			},
		},
		fontFamily: {
			sans: ["var(--font-sans)", ...fontFamily.sans],
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
