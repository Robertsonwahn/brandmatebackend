# BrandMate Backend

Express.js backend server for the BrandMate application that handles name storage functionality.

## Features

- RESTful API for saving and retrieving names
- File-based storage system
- CORS enabled for frontend communication
- Security headers with Helmet
- Request logging with Morgan
- Environment configuration support

## API Endpoints

### POST /api/names
Save a new name to the system.

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
  "name": "John Doe",
  "timestamp": "2025-07-25T18:04:14.139Z"
}
```

### GET /api/names
Retrieve all saved names.

**Response:**
```json
{
  "names": [
    "John Doe - 2025-07-25T18:04:14.139Z",
    "Jane Smith - 2025-07-25T18:05:20.456Z"
  ]
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-07-25T18:04:14.139Z"
}
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (optional):
```bash
# Create .env file
PORT=3000
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

4. Start the production server:
```bash
npm start
```

## File Storage

Names are stored in `names.txt` file in the project root directory. Each entry includes:
- Full name
- Timestamp of when it was saved

## Development

The server runs on `http://localhost:3000` by default and includes:
- Hot reloading with nodemon
- Request logging
- Error handling
- CORS support for frontend integration

## Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **helmet**: Security headers
- **morgan**: HTTP request logger
- **dotenv**: Environment variable loader
- **nodemon**: Development auto-restart (dev dependency)