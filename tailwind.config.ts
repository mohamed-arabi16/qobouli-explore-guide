
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "#009DB0", // Qobouli Primary
					foreground: "#ffffff",
				},
				secondary: {
					DEFAULT: "#00ABAB", // Qobouli Secondary
					foreground: "#ffffff",
				},
				accent: {
					DEFAULT: "#0C1439", // Qobouli Accent
					foreground: "#ffffff",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				'qobouli-primary': '#009DB0',
                'qobouli-secondary': '#00ABAB',
                'qobouli-accent': '#0C1439',
                'qobouli-cta': '#009DB0', // Call-to-action color
                'qobouli-interactive': '#007A8A', // Hover/active state for CTA
                'qobouli-text': '#0C1439',
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				display: ["SF Pro Display", "Inter", "sans-serif"],
				arabic: ["HSI-Shraq", "sans-serif"],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				glass: "20px",
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
				"fade-in-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(20px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"fade-in": {
					"0%": {
						opacity: "0",
					},
					"100%": {
						opacity: "1",
					},
				},
				"scale-in": {
					"0%": {
						opacity: "0",
						transform: "scale(0.95)",
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)",
					},
				},
				"glow": {
					"0%, 100%": { boxShadow: "0 0 5px rgba(0, 171, 171, 0.3)" },
					"50%": { boxShadow: "0 0 20px rgba(0, 171, 171, 0.7)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in-up": "fade-in-up 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
				"fade-in": "fade-in 0.6s ease-in-out",
				"scale-in": "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
				"glow": "glow 1.5s ease-in-out infinite",
			},
			boxShadow: {
				'soft-glow': '0 0 15px rgba(0, 171, 171, 0.2)',
				'glow-lg': '0 0 40px rgba(0, 171, 171, 0.4)',
			},
			backgroundImage: {
				'cta-gradient': 'linear-gradient(135deg, #009DB0 0%, #00ABAB 100%)',
			},
			backdropBlur: {
				'xl': '32px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
