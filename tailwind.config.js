/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'blue-ice': {
                    50: '#f0f7ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c3d66',
                },
                'turquoise': {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                },
                'depth': {
                    'surface': '#c8d8e8',      /* Layer 0: Icy surface */
                    'layer-1': '#1a3a4d',      /* Layer 1: Deep water blue (Problem) */
                    'layer-2': '#0f2d3a',      /* Layer 2: Darker teal (Method) */
                    'layer-3': '#08192a',      /* Layer 3: Even deeper (Numbers, References) */
                    'layer-4': '#020810',      /* Layer 4: Near-black (Testimonials, Team, FAQ) */
                    'emergence': '#e8f0f5',    /* Layer 5: Light emergence (Contact) */
                    'accent': '#00d4b4',       /* Turquoise thread throughout */
                },
            },
            backgroundImage: {
                'gradient-blue-ice': 'linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%)',
                'gradient-underwater': 'linear-gradient(180deg, #7dd3fc 0%, #2dd4bf 50%, #14b8a6 100%)',
            },
            backdropBlur: {
                xs: '2px',
                sm: '4px',
                md: '12px',
                lg: '16px',
                xl: '24px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'bubble': 'bubble 3s ease-in infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                bubble: {
                    '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
                    '10%': { opacity: '1' },
                    '90%': { opacity: '1' },
                    '100%': { transform: 'translateY(-100vh) scale(0)', opacity: '0' },
                },
            },
        },
    },
    plugins: [],
}
