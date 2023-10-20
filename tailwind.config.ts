/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1250px",
      },
    },
    screens: {
      max375: { max: "375px" },

      min376: "376px",

      max480: { max: "480px" },

      min481: "481px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      max800: { max: "800px" },
      // => @media (max-width: 8001px) { ... }

      min801: "801px",
      // => @media (min-width: 801px) { ... }

      max1023: { max: "1023px" },
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        border: "rgb(var(--border)",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: {
          DEFAULT: "rgb(var(--background))",
          body: "rgb(var(--background-body))",
        },
        foreground: "rgb(var(--foreground))",

        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        shine: {
          "100%": { left: "125%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 200ms ease",
        shine: "shine 0.8s",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }: any) => {
      addUtilities({
        ".none-select-text": {
          "-webkit-touch-callout": "none",
          "-webkit-user-select": "none",
          /* Safari */
          "-khtml-user-select": "none ",
          "-moz-user-select": "none ",
          /* Firefox */
          "-ms-user-select": " none ",
          /* Internet Explorer/Edge */
          "user-select": " none ",
          /* Non-prefixed version, currently supported by Chrome and Opera */
          "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
        },
      });
    }),
    require("tailwindcss-animate"),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
