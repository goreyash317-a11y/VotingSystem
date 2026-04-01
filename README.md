# Secure Online Voting System

A full-stack MERN application with blockchain-like vote integrity verification.

## Features

- User authentication with JWT
- Role-based access (Admin/Voter)
- Election management
- Secure voting with one-vote-per-user
- Blockchain-like vote chaining with SHA256 hashes
- Real-time updates with Socket.io
- Results visualization with Chart.js

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js, Axios, React Router
- **Security**: JWT, bcrypt, CORS
- **Real-time**: Socket.io
- **Charts**: Chart.js

## Project Structure

```
votingSystem/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── public/
    ├── package.json
    └── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/voting-system
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Elections
- `GET /api/elections` - Get all elections
- `POST /api/elections` - Create election (Admin only)
- `PUT /api/elections/:id/start` - Start election (Admin only)
- `PUT /api/elections/:id/end` - End election (Admin only)

### Candidates
- `GET /api/candidates/:electionId` - Get candidates for election
- `POST /api/candidates` - Add candidate (Admin only)

### Voting
- `POST /api/vote` - Cast vote

### Results
- `GET /api/results/:electionId` - Get election results
- `GET /api/results/:electionId/verify` - Verify vote chain integrity

## Deployment

### Backend Deployment (Railway)

1. Create a Railway account and project
2. Connect your GitHub repository
3. Set environment variables in Railway dashboard:
   - `PORT`
   - `MONGO_URI` (use MongoDB Atlas)
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy the backend

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `build` folder to Vercel or Netlify
3. Set the API base URL environment variable:
   - For Vercel: `REACT_APP_API_URL=https://your-railway-app-url`
   - For Netlify: Set in build settings

## Usage

1. Register as an admin or voter
2. Admin: Create elections and add candidates
3. Admin: Start elections
4. Voters: Cast votes during active elections
5. Admin: End elections
6. View results after election ends

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- One vote per user per election
- Vote immutability through blockchain-like hashing
- Chain integrity verification

## License

This project is for educational purposes.