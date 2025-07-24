const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Flowbite React components
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}", // shadcn/ui components
    flowbite.content(),
  ],
  safelist: [
    "bg-[#066b5e]/20",
    "hover:bg-[#066b5e]",
    "text-[#066b5e]",
    "checked:bg-[#066b5e]",
    "#066b5e",

    "bg-[#5147A3]/20",
    "hover:bg-[#5147A3]",
    "text-[#5147A3]",
    "checked:bg-[#5147A3]",
    "#5147A3",

    "bg-[#2a5fc1]/20",
    "hover:bg-[#2a5fc1]",
    "text-[#2a5fc1]",
    "checked:bg-[#2a5fc1]",
    "#2a5fc1",

    "bg-[#405189]/20",
    "hover:bg-[#405189]",
    "text-[#405189]",
    "checked:bg-[#405189]",
    "#405189",

    "bg-[#272835]",
    "bg-[#272835]/20",
    "hover:bg-[#272835]",
    "text-[#272835]",
    "checked:bg-[#272835]",
    "#272835",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth-hero-pattern":
          "url('/bin-yaber-assets/pages/about-us/about-us-banner.png')",
        "sidebar-snow": "url('/assets/sidebar/img-1.jpg')",
        "sidebar-office": "url('/assets/sidebar/img-2.jpg')",
        "sidebar-pattern": "url('/assets/sidebar/img-3.jpg')",
        "sidebar-bubble": "url('/assets/sidebar/img-4.jpg')",
        "home-hero-section-bg-image":
          "url('/bin-yaber-assets/hero-section-bg-image.png')",
        "hero-section-gradient":
          "linear-gradient(107.98deg, #000000 0.81%, rgba(0, 0, 0, 0) 72.1%)",
        "hero-section-gradient-mobile":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
      },
      fontFamily: {
        "poppins-extra-light": ["var(--font-poppins-extra-light)"],
        "poppins-light": ["var(--font-poppins-light)"],
        "poppins-rg": ["var(--font-poppins-rg)"],
        "poppins-md": ["var(--font-poppins-md)"],
        "poppins-sb": ["var(--font-poppins-sb)"],
        "poppins-black": ["var(--font-poppins-black)"],
        "poppins-bold": ["var(--font-poppins-bold)"],
        // Bhutan Pranic FE
        grotesk: ["var(--font-grotesk)"],
        figtree: ["var(--font-figtree)"],
        "space-grotesk": ["var(--font-space-grotesk)"],
      },
      boxShadow: {
        light: "0 2px 4px rgba(0, 0, 0, 0.1)",
        right: "3px 0 5px -1px rgba(0, 0, 0, 0.1)",
        "top-only":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
        header: "0px 4px 8px -1px #0D0D1205",
      },
      colors: {
        dark: {
          "weight-100": "#f4f4f4",
          "weight-200": "#cbd1d7",
          "weight-300": "#707383",
          "weight-350": "#7f8290",
          "weight-400": "#212734",
          "weight-500": "#212529",
          "weight-550": "#495057",
          "weight-600": "#282529",
        },
        light: {
          "weight-400": "#878a99",
          "weight-450": "#9fa1ad",
          "weight-500": "#405189",
          "weight-550": "#ced4da",
          "weight-800": "#F4F6F8",
          "weight-850": "#ebedf3",
          "weight-900": "#FFFFFF",
        },
        accent: {
          "yankees-blue": "#405189",
          "indigo-blue": "#364574",
          "light-blue": "#548cf3",
          "light-blue-400": "#406AAF",
          "light-yellow": "#f7b84b",
          "light-green": "#0ab39c",
        },
        // Bin Yaber (F-E)
        orange: {
          50: "#567584",
          200: "#033147",
          400: "#B1BFC6",
          500: "#FE7437",
        },
        black: {
          100: "#DFE1E7",
          300: "#525252",
          400: "#272835",
          500: "#0D0D12",
        },
      },
      backgroundColor: {
        dark: {
          "dencity-50": "#494d51",
          "dencity-100": "#31363C",
          "dencity-200": "#292E32",
          "dencity-220": "#2f343a",
          "dencity-250": "#292e33",
          "dencity-300": "#262a2f",
          "dencity-350": "#7f8290",
          "dencity-400": "#202328",
          "dencity-500": "#25282C",
          "dencity-600": "#1A1D21",
        },
        light: {
          "dencity-100": "#e1e1e3",
          "dencity-200": "#9fa1ad",
          "dencity-400": "#e6eefd",
          "dencity-700": "#eff2f7",
          "dencity-800": "#f3f3f9",
          "dencity-850": "#f9fbfc",
          "dencity-900": "#FFFFFF",
        },
        custom: {
          "blue-100": "#e1ebfd",
          "blue-200": "#dff0fa",
          "blue-300": "#5A6895",
          "blue-400": "#293e4c",
          "blue-500": "#3577F1",
          "blue-550": "#299CDB",
          "blue-600": "#3d4d82",
          "green-50": "#DAF4F0",
          "green-100": "#293E4C",
          "green-400": "#0ab39c",
          "green-450": "#1D3A3A",
          "green-500": "#099885",
          "yellow-100": "#fef4e4",
          "yellow-400": "#484236",
          "orange-50": "#567584",
          "orange-200": "#033147",
          "orange-400": "#B1BFC6",
          "orange-500": "#0D0D12",
        },
        // Bin Yaber (F-E)
        white: "#FFFFFF",
        grey: "#F6F8FA",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        opacityPulse: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.8" },
          "100%": { opacity: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 20s linear infinite",
        opacityPulse: "opacityPulse 1s ease-in-out",
      },
    },
  },

  // bhu

  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    flowbite.plugin(),
  ],
};

export default config;
