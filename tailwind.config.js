/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlueColor: '#050d43', // #050D43
        midBlueColor: '#4133c5',
        btnSecondaryColor: '#f5fbff',
        chipBgColor: '#f5fbff',
        chipBorderColor: '#f0f0f0',
        grey: '#808080',
        lightGrey: '#d9d9d9',
        orangeColor: '#dc5536',
        greenColor: '#039f61',
        appGradient: 'linear-gradient(180deg, #e8256b 0%, #ea4c2a 100%)',
        mintColor: '#00EA8C',
        redColor: '#DE6363',
        yellowColor: '#E5B800',
        successColor: '#219653',
        primaryDarkBlueColor: '#09263D',
        lightBlue: '#E5F0FF',
        lightBlue2: '#E6F0FF',
        lightBlue3: '#dde9fa',
        textValue: '#555770',
        darkGrey: '#28293D',
        activeMenuGradient: 'linear-gradient(27.16deg, #DA3A6D 21.81%, #DA533C 65.38%)',
        cerise: '#DA3A6D',
        primaryBlue: '#1890FF',
        titleGradient: 'linear-gradient(262deg, #EB1F6D 0%, #EC4B26 48.88%)',
      },
      boxShadow: {
        custom: '0px 10px 30px rgba(0, 0, 0, 0.05)',
        custom2: '1px 2px 30px rgba(0, 0, 0, 0.08);',
        custom3: '0 1px 3px 1px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);', // for clear aligner item
      },
    },
  },
  plugins: [],
}

