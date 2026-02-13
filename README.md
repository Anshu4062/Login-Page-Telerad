# RadShare Login Page

An interactive login page built with React, Tailwind CSS, and GSAP animations.

## Features

- **Split Layout**: Background image on the left, login form on the right
- **GSAP Animations**: 
  - Logo entrance animation
  - Circular orbiting icons around the RadShare logo
  - Form slide-in animation
  - Floating particle effects
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Responsive**: Optimized for desktop viewing

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Project Structure

```
├── assets/
│   └── background-left.png    # Background image for left side
├── src/
│   ├── components/
│   │   └── LoginPage.jsx      # Main login page component
│   ├── App.jsx                # Root component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js            # Vite configuration
└── postcss.config.js         # PostCSS configuration
```

## Technologies Used

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **GSAP** - Animation library
- **Vite** - Build tool and dev server

## Customization

- Modify icon positions and animations in `src/components/LoginPage.jsx`
- Adjust colors and styling using Tailwind classes
- Add more GSAP animations as needed
- Update form validation and submission logic in the `handleSubmit` function
