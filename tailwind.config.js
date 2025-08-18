/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          maroon: '#8B0000',
          deepMaroon: '#660000',
          beige: '#F5F5DC',
          gold: '#FFD700',
          bronze: '#CD7F32',
          terracotta: '#E2725B',
          sage: '#9CAF88',
        },
        bengali: {
          red: '#FF6B6B',
          yellow: '#FFE66D',
          green: '#4ECDC4',
          blue: '#45B7D1',
        }
      },
      fontFamily: {
        bengali: ['Noto Sans Bengali', 'serif'],
        heritage: ['Playfair Display', 'serif'],
        modern: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'heritage-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FFD700\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 0l30 30-30 30L0 30z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'bengali-pattern': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23CD7F32\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M50 0L60.87 39.13L100 50L60.87 60.87L50 100L39.13 60.87L0 50L39.13 39.13z\"/%3E%3C/g%3E%3C/svg%3E')",
        'cultural-motif': "url('data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%238B0000\" fill-opacity=\"0.08\"%3E%3Cpath d=\"M40 0c22.091 0 40 17.909 40 40s-17.909 40-40 40S0 62.091 0 40 17.909 0 40 0zm0 10c-16.569 0-30 13.431-30 30s13.431 30 30 30 30-13.431 30-30-13.431-30-30-30z\"/%3E%3C/g%3E%3C/svg%3E')",
        'gradient-heritage': 'linear-gradient(135deg, #8B0000 0%, #660000 50%, #CD7F32 100%)',
        'gradient-cultural': 'linear-gradient(45deg, #8B0000 0%, #FFD700 25%, #CD7F32 50%, #8B0000 75%, #FFD700 100%)',
        'gradient-festival': 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 25%, #4ECDC4 50%, #45B7D1 75%, #8B0000 100%)',
      }
    },
  },
  plugins: [],
}
