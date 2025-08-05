# BrandMate Frontend

React Native + Expo frontend application for the BrandMate name storage system.

## Features

- React Native with Expo for cross-platform mobile development
- TypeScript support
- Form validation and error handling
- Loading states and user feedback
- Clean, modern UI design
- Integration with Express.js backend

## Components

### NameForm
Main component that handles:
- Name input with validation
- Form submission to backend API
- Loading states during API calls
- Success/error message display
- Alert notifications for user feedback

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run on different platforms:
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Web**: Press `w` in the terminal
   - **Expo Go**: Scan QR code with Expo Go app

## Backend Integration

The app connects to the Express.js backend running on `http://localhost:3000`.

Make sure the backend server is running before testing the app:
```bash
cd ../brandmatebackend
npm run dev
```

## Project Structure

```
brandmate-frontend/
├── app/
│   ├── (tabs)/
│   │   └── index.tsx          # Main home screen
│   └── _layout.tsx
├── components/
│   └── NameForm.tsx           # Name input form component
├── assets/
└── package.json
```

## Development

- The app uses Expo Router for navigation
- TypeScript for type safety
- React Native components for native mobile experience
- Styled with React Native StyleSheet

## API Integration

The frontend communicates with the backend through:
- `POST /api/names` - Submit new names
- Error handling for network issues
- Form validation before submission
- User feedback through alerts and messages

## Technologies Used

- **React Native**: Mobile app framework
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based routing system