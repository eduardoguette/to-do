module.exports = {
  content: ['*.html', './src/**/*{jsx,js}'],
  theme: {
    extend: {
      colors: {
        dew: {
          DEFAULT: '#F4FFFD',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#F4FFFD',
          600: '#C1FFF4',
          700: '#8EFFEA',
          800: '#5BFFE1',
          900: '#28FFD8',
        },
        midnight: {
          DEFAULT: '#011936',
          50: '#2284FB',
          100: '#0976FA',
          200: '#045FCC',
          300: '#03479A',
          400: '#023068',
          500: '#011936',
          600: '#000204',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        amaranth: {
          DEFAULT: '#ED254E',
          50: '#FFF9FA',
          100: '#FDE1E7',
          200: '#F9B2C1',
          300: '#F5839A',
          400: '#F15474',
          500: '#ED254E',
          600: '#CE1138',
          700: '#9F0D2B',
          800: '#70091E',
          900: '#410511',
        },
      },
      animation: {
        'spin-one': 'bounce 3s linear',
      }
    },
  },
  plugins: [],
};
