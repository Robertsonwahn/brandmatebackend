# BrandMate - Fullstack Name Storage Application

A fullstack application that allows users to input their full name through a React Native mobile app and saves it to a MongoDB database via an Express.js backend server with complete user authentication.

## Project Structure

```
BrandMate/
├── brandmate-frontend/          # React Native + Expo frontend
│   ├── app/
│   ├── components/
│   │   ├── AuthScreen.tsx      # Authentication screen
│   │   ├── LoginForm.tsx       # User login form
│   │   ├── RegisterForm.tsx    # User registration form
│   │   ├── UserProfile.tsx     # User profile component
│   │   └── NameForm.tsx        # Main form component
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context
│   ├── config/
│   │   └── api.ts              # API configuration
│   └── package.json
├── brandmatebackend/           # Express.js backend
│   ├── server.js              # Main server file
│   ├── models/
│   │   ├── User.js            # User model
│   │   └── Name.js            # Name model
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   └── package.json
└── README.md
```

## Features

### Frontend (React Native + Expo)
- Cross-platform mobile application (iOS, Android, Web)
- Complete JWT-based authentication system
- User registration and login with validation
- Persistent authentication sessions
- User profile management
- Form validation and error handling
- Loading states and user feedback
- Clean, modern UI design
- TypeScript support

### Backend (Express.js + MongoDB)
- RESTful API endpoints with full CRUD operations
- Complete user authentication system (register, login, logout, profile)
- MongoDB database with Mongoose ODM
- JWT token authentication with bcrypt password hashing
- Data validation and pagination support
- Protected routes with middleware authentication
- CORS enabled for frontend communication
- Security headers and request logging
- Environment configuration support
- Database connection health monitoring

## Quick Start

### 1. Backend Setup
```bash
cd brandmatebackend
npm install
npm run dev
```
The backend will run on `http://localhost:3000`

### 2. Frontend Setup
```bash
cd brandmate-frontend
npm install
npx expo start
```

### 3. MongoDB Setup
```bash
# Set up your MongoDB connection string in brandmatebackend/.env
MONGODB_URI=mongodb://localhost:27017/brandmate
# Or use MongoDB Atlas for cloud database
JWT_SECRET=your-super-secure-jwt-secret
JWT_EXPIRES_IN=7d
```

### 4. Testing the Application
1. Make sure MongoDB is running (locally or Atlas)
2. Start the backend server
3. Start the frontend app
4. Register a new user or login with existing credentials
5. Use the name form to save names to the database
6. View your profile and logout when needed

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/logout` - User logout (protected)

### Names Management
- `POST /api/names` - Save a new name (optional auth)
- `GET /api/names` - Retrieve all saved names with pagination
- `GET /api/names/:id` - Get specific name by ID
- `DELETE /api/names/:id` - Delete name by ID (admin)

### System
- `GET /api/health` - Health check with database status

## Development

### Backend Development
```bash
cd brandmatebackend
npm run dev    # Development with auto-restart
npm start      # Production mode
```

### Frontend Development
```bash
cd brandmate-frontend
npx expo start
```

Then choose your platform:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Press `w` for Web
- Scan QR code for Expo Go app

## Technologies Used

### Frontend
- React Native
- Expo
- TypeScript
- Expo Router
- Cross-platform storage for authentication

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT authentication with bcryptjs
- CORS, Helmet, Morgan middleware

## Database Storage

### User Collection
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "$2b$12$hashedpassword...",
  "role": "user",
  "isActive": true,
  "createdAt": "2025-07-25T18:04:14.139Z",
  "updatedAt": "2025-07-25T18:04:14.139Z"
}
```

### Name Collection
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "fullName": "John Doe",
  "createdAt": "2025-07-25T18:04:14.139Z",
  "updatedAt": "2025-07-25T18:04:14.139Z"
}
```

## Security Features

- JWT token-based authentication with expiration
- bcrypt password hashing with salt rounds
- Protected API routes with middleware authentication
- Input validation and sanitization
- CORS configuration for secure cross-origin requests
- Security headers with Helmet middleware
- Secure token storage with cross-platform compatibility

## User Experience

1. **New Users**: Register → Auto-login → Access main app with personalized greeting
2. **Returning Users**: Auto-login if session valid → Continue using the app
3. **Authentication**: Persistent sessions that survive app restarts
4. **Security**: Secure logout with complete token cleanup

## Deployment

This application is production-ready and deployed:

### Backend → Render.com (LIVE)
- **URL**: `https://brandmatebackend.onrender.com`
- Express.js server with MongoDB Atlas
- Environment variables configured
- JWT authentication enabled

### Frontend → Netlify (Ready for deployment)
- Expo web build optimized for static hosting
- Environment-based API configuration
- Responsive design for web deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) and [FINAL_DEPLOYMENT_GUIDE.md](FINAL_DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## Live Demo URLs

- **Backend API**: `https://brandmatebackend.onrender.com`
- **Frontend**: Ready for deployment to Netlify
- **Health Check**: `https://brandmatebackend.onrender.com/api/health`
