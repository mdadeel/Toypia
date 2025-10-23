# ToyTopia - Local Toy Finds

A modern web application connecting families with local toy sellers. Browse, review, and discover amazing toys for children of all ages.

## Project Overview

**Purpose**: A vibrant e-commerce platform for local toy sellers where families can discover, review, and connect with toys made for children of all ages.

**Live URL**: [Deploy to Netlify, Vercel, or other platforms using the dist folder]

## Key Features

- 🛍️ Browse toys by category, age group, and search
- 👤 User authentication and profile management
- ⭐ Review and rating system
- ❤️ Add favorites functionality
- 🛒 Try Now form for each toy
- 🎨 Responsive design for mobile, tablet, and desktop
- 🔐 Secure authentication with Firebase
- 📊 Popular toys section
- 🎯 Dynamic and engaging UI with animations

## Technologies Used

- React 18
- Vite
- shadcn/ui
- Tailwind CSS
- Firebase (for authentication)
- Lucide React (icons)
- React Router DOM (navigation)

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone https://github.com/mdadeel/toytopia.git
git clone <your-repository-url>

# Navigate to the project directory
cd toytopia
# Install dependencies
npm install

# Create .env file and add your Firebase configuration:
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory with your Firebase configuration:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

Build the project using `npm run build` and deploy the `dist` folder to your preferred hosting service like Netlify, Vercel, or Surge.

## Project Structure

```
src/
├── components/         # Reusable UI components
├── contexts/           # React context providers
├── data/              # JSON data files
├── hooks/             # Custom React hooks
├── integrations/      # Third-party integrations (Firebase)
├── pages/             # Page components
└── assets/            # Static assets
```

## Features Implemented

1. **Enhanced Authentication**: Login/Signup with Firebase including Google OAuth
2. **Toy Discovery**: Browse and search toys
3. **Toy Details**: Detailed view with "Try Now" form
4. **Reviews**: User review and rating system
5. **Favorites**: Save favorite toys (with localStorage)
6. **Featured Toys Slider**: Swiper-based auto-rotating slider with navigation controls showcasing featured toys
7. **Popular Toys**: Top-rated toys section on home page
8. **Category Spotlight**: Browse toys by category
9. **Weekly Deals**: Featured discounted toys section
10. **Load More Functionality**: "View More" button to load additional toy cards
11. **Responsive Design**: Mobile-first approach
12. **Protected Routes**: Secure access to private features
13. **My Favorites Page**: Dedicated page to view saved toys
14. **Profile Page**: Editable user profile with name and photo URL
15. **Forgot Password**: Functional password reset feature
16. **Show/Hide Password**: Toggle for password visibility during login/signup
17. **404 Page**: Custom not found page for invalid routes
18. **Enhanced Navbar**: Shows user profile with hover effect when logged in
19. **Enhanced Footer**: Eye-catching design with social links and contact info
20. **imgbb Image Hosting**: All product images hosted on imgbb for optimal performance
