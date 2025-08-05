# BrandMate Backend

Express.js backend server for the BrandMate application with MongoDB database integration.

## Features

- RESTful API for saving and retrieving names
- MongoDB database with Mongoose ODM
- Data validation and error handling
- Pagination support for large datasets
- CORS enabled for frontend communication
- Security headers with Helmet
- Request logging with Morgan
- Environment configuration support
- Database connection health monitoring

## API Endpoints

### POST /api/names
Save a new name to the MongoDB database.

**Request Body:**
```json
{
  "fullName": "John Doe"
}
```

**Response (Success):**
```json
{
  "message": "Name saved successfully!",
  "data": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "createdAt": "2025-07-25T18:04:14.139Z",
    "timestamp": "2025-07-25T18:04:14.139Z"
  }
}
```

### GET /api/names
Retrieve all saved names with pagination support.

**Query Parameters:**
- `limit` (optional): Number of results per page (default: 50)
- `page` (optional): Page number (default: 1)

**Example:** `GET /api/names?limit=10&page=2`

**Response:**
```json
{
  "success": true,
  "count": 10,
  "totalCount": 25,
  "currentPage": 2,
  "totalPages": 3,
  "data": [
    {
      "id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "fullName": "John Doe",
      "createdAt": "2025-07-25T18:04:14.139Z",
      "timestamp": "2025-07-25T18:04:14.139Z"
    }
  ]
}
```

### GET /api/names/:id
Retrieve a specific name by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "fullName": "John Doe",
    "createdAt": "2025-07-25T18:04:14.139Z",
    "updatedAt": "2025-07-25T18:04:14.139Z",
    "timestamp": "2025-07-25T18:04:14.139Z"
  }
}
```

### DELETE /api/names/:id
Delete a specific name by ID (admin endpoint).

**Response:**
```json
{
  "success": true,
  "message": "Name deleted successfully",
  "data": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "fullName": "John Doe"
  }
}
```

### GET /api/health
Health check endpoint with database connection status.

**Response:**
```json
{
  "status": "healthy",
  "database": {
    "status": "connected",
    "name": "brandmate"
  },
  "timestamp": "2025-07-25T18:04:14.139Z"
}
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Create .env file
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/brandmate
# For production, use MongoDB Atlas connection string
```

3. Start the development server:
```bash
npm run dev
```

4. Start the production server:
```bash
npm start
```

## Database Storage

Names are stored in MongoDB database with the following schema:
- **fullName**: String (required, trimmed, 1-100 characters)
- **createdAt**: Date (automatically set)
- **updatedAt**: Date (automatically updated)
- **_id**: MongoDB ObjectId (automatically generated)

### Database Features:
- Data validation and sanitization
- Automatic timestamps
- Indexed fields for better query performance
- Pagination support for large datasets

## Development

The server runs on `http://localhost:3000` by default and includes:
- Hot reloading with nodemon
- Request logging
- Error handling
- CORS support for frontend integration

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling for Node.js
- **cors**: Cross-origin resource sharing
- **helmet**: Security headers
- **morgan**: HTTP request logger
- **dotenv**: Environment variable loader
- **nodemon**: Development auto-restart (dev dependency)

## MongoDB Setup

### Local Development
1. Install MongoDB locally or use MongoDB Atlas
2. Set `MONGODB_URI` in your `.env` file
3. The application will automatically create the database and collections

### Production (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Set up a cluster and database user
3. Configure network access
4. Add the connection string to your environment variables

For detailed MongoDB setup instructions, see the [DEPLOYMENT.md](../DEPLOYMENT.md) file.