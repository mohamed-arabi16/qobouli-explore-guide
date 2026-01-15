
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
					DEFAULT: "#0A7B8A", // Refined teal - deeper, more premium
					foreground: "#ffffff",
				},
				secondary: {
					DEFAULT: "#087F8C", // Sophisticated secondary teal
					foreground: "#ffffff",
				},
				accent: {
					DEFAULT: "#0D1B2A", // Deep navy - more refined
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
				'qobouli-primary': '#0A7B8A',
				'qobouli-secondary': '#087F8C',
				'qobouli-accent': '#0D1B2A',
				'qobouli-cta': '#0A7B8A',
				'qobouli-interactive': '#065A66',
				'qobouli-text': '#0D1B2A',
			},
			fontFamily: {
				sans: ['"SF Pro Text"', '"Inter"', 'system-ui', 'sans-serif'],
				display: ['"SF Pro Display"', '"Inter"', 'system-ui', 'sans-serif'],
				arabic: ['"HSI-Shraq"', '"SF Arabic"', 'sans-serif'],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				glass: "24px",
				'2xl': '16px',
				'3xl': '24px',
				'4xl': '32px',
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
			},
			keyframes: {
				// Core UI animations - Apple-inspired fluid motion
				"accordion-down": {
					from: { height: "0", opacity: "0" },
					to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
					to: { height: "0", opacity: "0" },
				},
				// Premium fade animations with spring-like easing
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(16px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in-down": {
					"0%": { opacity: "0", transform: "translateY(-16px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				// Refined scale animations
				"scale-in": {
					"0%": { opacity: "0", transform: "scale(0.96)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				"scale-in-center": {
					"0%": { opacity: "0", transform: "scale(0.92)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				// Elegant slide animations
				"slide-in-right": {
					"0%": { opacity: "0", transform: "translateX(24px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				"slide-in-left": {
					"0%": { opacity: "0", transform: "translateX(-24px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				"slide-up-fade": {
					"0%": { opacity: "0", transform: "translateY(8px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				// Subtle floating animation
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-8px)" },
				},
				// Gentle pulse for attention
				"pulse-subtle": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.85" },
				},
				// Premium shimmer effect
				"shimmer": {
					"0%": { backgroundPosition: "-200% 0" },
					"100%": { backgroundPosition: "200% 0" },
				},
				// Soft glow pulse
				"glow-pulse": {
					"0%, 100%": { boxShadow: "0 0 20px rgba(10, 123, 138, 0.15)" },
					"50%": { boxShadow: "0 0 40px rgba(10, 123, 138, 0.3)" },
				},
				// Stagger reveal animation
				"stagger-fade": {
					"0%": { opacity: "0", transform: "translateY(12px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				// Smooth bounce for scroll indicators
				"bounce-gentle": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(6px)" },
				},
				// Card hover lift
				"lift": {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(-4px)" },
				},
				// Progress line draw
				"draw-line": {
					"0%": { strokeDashoffset: "1000" },
					"100%": { strokeDashoffset: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
				"accordion-up": "accordion-up 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
				"fade-in": "fade-in 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
				"fade-in-up": "fade-in-up 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
				"fade-in-down": "fade-in-down 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
				"scale-in": "scale-in 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
				"scale-in-center": "scale-in-center 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
				"slide-in-right": "slide-in-right 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
				"slide-in-left": "slide-in-left 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
				"slide-up-fade": "slide-up-fade 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
				"float": "float 4s ease-in-out infinite",
				"pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
				"shimmer": "shimmer 2.5s ease-in-out infinite",
				"glow-pulse": "glow-pulse 3s ease-in-out infinite",
				"stagger-fade": "stagger-fade 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards",
				"bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
				"lift": "lift 0.2s cubic-bezier(0.32, 0.72, 0, 1) forwards",
				"draw-line": "draw-line 2s cubic-bezier(0.32, 0.72, 0, 1) forwards",
			},
			boxShadow: {
				// Apple-inspired subtle shadows
				'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.1)',
				'soft-lg': '0 4px 12px -4px rgba(0, 0, 0, 0.05), 0 8px 24px -8px rgba(0, 0, 0, 0.1)',
				'soft-xl': '0 8px 16px -8px rgba(0, 0, 0, 0.04), 0 16px 40px -12px rgba(0, 0, 0, 0.12)',
				'soft-2xl': '0 12px 24px -12px rgba(0, 0, 0, 0.04), 0 24px 56px -16px rgba(0, 0, 0, 0.14)',
				// Elevated card shadows
				'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 4px 8px rgba(0, 0, 0, 0.04), 0 12px 32px rgba(0, 0, 0, 0.1)',
				// Premium glow shadows
				'glow-primary': '0 0 24px -4px rgba(10, 123, 138, 0.25)',
				'glow-primary-lg': '0 0 40px -8px rgba(10, 123, 138, 0.35)',
				// Glass shadows
				'glass': '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
				'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
				// Button shadows
				'button': '0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.08)',
				'button-hover': '0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.1)',
				// Legacy support
				'soft-glow': '0 0 20px rgba(10, 123, 138, 0.15)',
				'glow-lg': '0 0 40px rgba(10, 123, 138, 0.25)',
			},
			backgroundImage: {
				// Premium gradients
				'gradient-primary': 'linear-gradient(135deg, #0A7B8A 0%, #087F8C 100%)',
				'gradient-accent': 'linear-gradient(135deg, #0D1B2A 0%, #1B2838 100%)',
				'gradient-subtle': 'linear-gradient(180deg, rgba(10, 123, 138, 0.04) 0%, rgba(10, 123, 138, 0) 100%)',
				'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
				'gradient-shine': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
				// Legacy
				'cta-gradient': 'linear-gradient(135deg, #0A7B8A 0%, #087F8C 100%)',
			},
			backdropBlur: {
				'xs': '4px',
				'xl': '32px',
				'2xl': '48px',
				'3xl': '64px',
			},
			transitionTimingFunction: {
				'apple': 'cubic-bezier(0.32, 0.72, 0, 1)',
				'apple-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
			transitionDuration: {
				'400': '400ms',
				'600': '600ms',
				'800': '800ms',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
