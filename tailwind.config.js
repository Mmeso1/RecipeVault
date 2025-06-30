/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          50: '#fafbfc',
          100: '#f4f6f8',
          200: '#e8ecf0',
          300: '#d1d9e0',
          400: '#b0bcc9',
          500: '#8fa0b3',
          600: '#6b7c95',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        snow: {
          50: '#ffffff',
          100: '#fefefe',
          200: '#fdfdfd',
          300: '#fcfcfc',
          400: '#fbfbfb',
          500: '#F9FAFB', // Primary Snow White
          600: '#f8f9fa',
          700: '#f6f7f8',
          800: '#f4f5f6',
          900: '#f2f3f4',
        },
        seafoam: {
          50: '#f0f9f6',
          100: '#dcf2ea',
          200: '#bce5d6',
          300: '#8dd5bc',
          400: '#5cbfa0',
          500: '#A5D6C4', // Secondary Seafoam
          600: '#7bb8a0',
          700: '#5a9b7d',
          800: '#4a7d65',
          900: '#3d6653',
        },
        pistachio: {
          50: '#f6faf2',
          100: '#e9f5e1',
          200: '#d4eac5',
          300: '#b8da9d',
          400: '#96c56f',
          500: '#C4DFAA', // Accent Pistachio
          600: '#a8c48a',
          700: '#8ba96b',
          800: '#6f8a54',
          900: '#5a7145',
        },
        strawberry: {
          50: '#fef7f7',
          100: '#feecec',
          200: '#fdd8d8',
          300: '#fcb5b5',
          400: '#f98585',
          500: '#FFC1CC', // Accent Strawberry Cream
          600: '#f472a6',
          700: '#e85d8a',
          800: '#d1477a',
          900: '#b83d6e',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#333333', // Text Color Neutral Slate
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};