# Bhromon - West Bengal Tourism Website

## Project Overview
Full-stack Next.js application for West Bengal Tourism with heritage-inspired design, authentication, and comprehensive tourism features.

## Technology Stack
- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS
- Backend: Next.js API routes, MongoDB, Mongoose
- Authentication: JWT with custom auth context
- Styling: Heritage-inspired design with Bengali cultural elements
- Animations: Framer Motion
- Icons: Lucide React

## Features Implemented
✅ **Landing Page**: Heritage-modern design with hero section, features showcase, and responsive navigation
✅ **Authentication System**: Login/signup with JWT tokens, form validation, and error handling  
✅ **Dashboard**: User dashboard with sidebar navigation, overview stats, and feature sections
✅ **Database Models**: User, Place, Hotel, Guide, Experience, Product, and Itinerary schemas
✅ **API Routes**: Authentication endpoints (login, signup, user profile)
✅ **Responsive Design**: Mobile-first approach with custom heritage color palette
✅ **TypeScript Configuration**: Full type safety with Next.js 14
✅ **Development Environment**: Hot reload, error handling, and development server

## Heritage Design System
- **Colors**: Maroon (#8B0000), Gold (#FFD700), Bronze (#CD7F32), Beige (#F5F5DC)
- **Typography**: Playfair Display (heritage), Inter (modern), Noto Sans Bengali
- **Components**: Custom buttons, cards, gradients with Bengali cultural patterns
- **Animations**: Smooth transitions and floating elements

## Current Status
🟢 **COMPLETED**: Core application structure and functionality
🟢 **COMPLETED**: Authentication system with secure JWT implementation
🟢 **COMPLETED**: Responsive heritage-inspired UI design
🟢 **COMPLETED**: Database models and API infrastructure
🟢 **COMPLETED**: Development environment setup

## Next Steps for Enhancement
- [ ] MongoDB connection and data seeding
- [ ] Complete all dashboard sections (heritage sites, guides, hotels, etc.)
- [ ] AI itinerary generator implementation
- [ ] E-commerce functionality for local artisans
- [ ] Image uploads and media management
- [ ] Payment integration
- [ ] Email verification system
- [ ] Advanced search and filtering
- [ ] Reviews and ratings system
- [ ] Mobile app considerations

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Setup
Required environment variables in `.env.local`:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NEXTAUTH_URL` - Application URL
- `NEXTAUTH_SECRET` - NextAuth secret

The project is now ready for development and can be extended with additional features as needed.
