module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      "4/sm": "160px",
      "2/sm": "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'black': '#000000',
        'grey-300': '#F5F2F0',
        'grey-500': '#47433D',
        'bg-300': '#fff9f2',
        'bg-500': '#faeede',
        'bg-800': '#fbe8d4',
        'accent-500': '#b3966b',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
      },
      backgroundImage: {
				'wolken': "url('/Achtergrond.jpg')"
			},
      width: {
        "custom-31": "31.871429%",
        "custom-66": "66%"
      }
    }
  },
  plugins: []
};
