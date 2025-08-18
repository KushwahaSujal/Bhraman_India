# Bhromon - West Bengal Tourism Website

🌟 **A comprehensive full-stack tourism platform celebrating the rich heritage and culture of West Bengal**

## ✨ Features

### 🏛️ Heritage & Culture
- **Heritage Sights**: Explore temples, palaces, monuments, and cultural sites
- **Cultural Experiences**: Live performances, workshops, and traditional events
- **Food & Cuisine**: Authentic Bengali recipes and cooking experiences
- **Local Artisans**: E-commerce platform supporting local craftsmen

### 🤖 Smart Tourism
- **AI Itinerary Generator**: Personalized travel planning with AI recommendations
- **Guide Selection**: Certified local guides with ratings and reviews
- **Smart Recommendations**: ML-powered suggestions based on preferences

### 🏨 Travel Services
- **Heritage Hotels**: Curated accommodations in restored heritage properties
- **Transportation**: Integration with bus, train, and metro services
- **Special Packages**: Combo deals and cultural immersion experiences

### 👤 User Experience
- **Responsive Design**: Mobile-first approach with heritage-inspired UI
- **User Authentication**: Secure JWT-based login system
- **Personalized Dashboard**: Track bookings, wishlist, and travel history
- **Social Features**: Reviews, ratings, and community recommendations

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom heritage theme
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Design System
- **Heritage Color Palette**: Maroon, beige, gold, bronze, terracotta
- **Bengali Typography**: Cultural fonts and patterns
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 compliant

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bhromon.git
   cd bhromon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bhromon
   JWT_SECRET=your-super-secret-jwt-key
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
bhromon/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── places/       # Places CRUD
│   │   └── ...
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # User dashboard
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/            # Reusable components
├── lib/                  # Utility libraries
│   ├── models.ts         # Database models
│   ├── mongodb.ts        # Database connection
│   ├── auth.ts           # JWT utilities
│   └── seed.ts           # Database seeding
├── public/               # Static assets
└── ...config files
```

## 🎨 Design Guidelines

### Color Palette
- **Primary**: Heritage Maroon (#8B0000)
- **Secondary**: Heritage Gold (#FFD700)
- **Accent**: Heritage Bronze (#CD7F32)
- **Background**: Heritage Beige (#F5F5DC)

### Typography
- **Headings**: Playfair Display (heritage feel)
- **Body**: Inter (modern readability)
- **Bengali**: Noto Sans Bengali

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with backdrop blur

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Places
- `GET /api/places` - Fetch all places
- `POST /api/places` - Create new place
- `GET /api/places/[id]` - Get place details

### Hotels
- `GET /api/hotels` - Fetch all hotels
- `POST /api/hotels` - Create new hotel

### Guides
- `GET /api/guides` - Fetch all guides
- `POST /api/guides` - Create new guide

## 🌟 Key Features Implementation

### Heritage-Inspired Design
- Custom Tailwind configuration with Bengali color palette
- CSS patterns and gradients inspired by traditional motifs
- Responsive design with mobile-first approach

### Authentication System
- JWT-based authentication
- Secure password hashing with bcryptjs
- Protected routes and API endpoints

### Database Schema
- User management with preferences and bookings
- Places with detailed information and reviews
- Hotels with room types and amenities
- Guides with ratings and availability
- Experiences and products for e-commerce

### AI Features (Planned)
- Machine learning for personalized recommendations
- Natural language processing for itinerary generation
- Image recognition for heritage site identification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- West Bengal Tourism Department for inspiration
- Local artisans and cultural experts
- Open source community for amazing tools
- Bengali heritage and cultural traditions

## 📞 Contact

- **Email**: hello@bhromon.com
- **Website**: [www.bhromon.com](https://www.bhromon.com)
- **Social**: [@BhromonWB](https://twitter.com/BhromonWB)

---

**Made with ❤️ for preserving and promoting the beautiful heritage of West Bengal**
