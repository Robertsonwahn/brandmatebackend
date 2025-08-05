# BrandMate - Fullstack Name Storage Application

A fullstack application that allows users to input their full name through a React Native mobile app and saves it to a file on the Express.js backend server.

## Project Structure

```
BrandMate/
├── brandmate-frontend/          # React Native + Expo frontend
│   ├── app/
│   ├── components/
│   │   └── NameForm.tsx        # Main form component
│   └── package.json
├── brandmatebackend/           # Express.js backend
│   ├── server.js              # Main server file
│   ├── names.txt              # File storage for names
│   └── package.json
└── README.md
```

## Features

### Frontend (React Native + Expo)
- Cross-platform mobile application
- JWT-based authentication system
- User registration and login
- Persistent authentication sessions
- Form validation and error handling
- Loading states and user feedback
- Clean, modern UI design
- TypeScript support

### Backend (Express.js + MongoDB)
- RESTful API endpoints with full CRUD operations
- MongoDB database with Mongoose ODM
- Data validation and pagination support
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
```

### 4. Testing the Application
1. Make sure MongoDB is running (locally or Atlas)
2. Start the backend server
3. Start the frontend app
4. Use the form to enter a full name
5. Names will be saved to MongoDB database

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

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- CORS, Helmet, Morgan middleware

## Database Storage

Names are stored in MongoDB database with the following structure:
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "fullName": "John Doe",
  "createdAt": "2025-07-25T18:04:14.139Z",
  "updatedAt": "2025-07-25T18:04:14.139Z"
}
```

## Error Handling

- Frontend: Form validation, network error handling, user feedback
- Backend: Input validation, file operation error handling, proper HTTP status codes

## Security Features

- Helmet for security headers
- CORS configuration
- Input validation and sanitization
- Error message sanitization in production

## Deployment

This application is ready for deployment:

### Backend → Render.com
- Express.js server with production configuration
- Environment variables support
- File-based storage (persistent on Render)

### Frontend → Netlify
- Expo web build optimized for static hosting
- Environment-based API configuration
- Responsive design for web deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Live Demo URLs

After deployment, your application will be available at:
- **Frontend**: `https://your-site-name.netlify.app`
- **Backend API**: `https://your-app-name.onrender.com`