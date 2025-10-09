import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 4s linear infinite",
      },
      colors: {
        "sw-blue":   "#304CB2", // Bold Blue
        "sw-red":    "#D5152E", // Warm Red
        "sw-yellow": "#F9B612", // Sunrise Yellow
        "sw-silver": "#CCCCCC", // Summit/Deep Silver approximation
      },
      fontFamily: {
        sw: ['"Ubuntu"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        "sw": "0.75rem",
      },
      boxShadow: {
        "sw": "0 4px 18px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
