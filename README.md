# Safe Path

A web-based application designed to enhance community safety by providing real-time incident reporting and safe navigation options. This project includes both a client-side and server-side, allowing users to report incidents, view reported incidents on a map, and receive community updates.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Incident Reporting**: Users can report incidents and view reports on an interactive map
- **Community Engagement**: Provides a dashboard for community updates and engagement features
- **Secure Authentication**: Uses OAuth for authentication and authorization
- **Image Upload**: Supports uploading images for reported incidents

## Technologies Used

- **Frontend**: React, TypeScript + SWC, Vite, Tailwind CSS, Firebase (for user authentication)
- **Backend**: Node.js, Express, TypeScript, MongoDB
- **Other Tools**: Redux for state management, Mailtrap for email sending, Vercel for deployment

## Getting Started

### Prerequisites

- Node.js (version 20.11.0 or higher)
- MongoDB (for backend)
- Firebase account (for authentication) and firebase storage
- Mailtrap account (for email sending)

### Installation

Clone the repository:

```bash
git clone https://github.com/Prish20/Safe-Path.git

cd Safe-Path
```

#### Client Setup

1. Navigate to the client directory:

```bash
cd client
```

2.Install dependencies:

```bash
npm install
```

3.Start the development server:

```bash
npm run dev
```

#### Server Setup

1.Navigate to the server directory:

```bash
cd server
```

2.Install dependencies:

```bash
npm install
```

3.Start the development server:

```bash
npm run dev
```

### Environment Variables

Create a `.env` file in both the client and server directories with the following variables:

For the client:

```plaintext
VITE_GOOGLE_MAP_API=your_google_map_api

VITE_FIREBASE_API_KEY=your_firebase_api_key

VITE_GOOGLE_MAP_ID=your_google_map_id

VITE_API_URL=your_api_url
```

For the server:

```plaintext
MONGO_URI =your_mongodb_uri

PORT = 3000

JWT_SECRET = your_jwt_secret

NODE_ENV = development

MAILTRAP_API_TOKEN = your_mailtrap_api_token

CLIENT_URL = your_client_url

CORS_ORIGIN = your_client_url
```

## Usage

1. **Register/Login**: A user can register/login using their google account
2. **Verify Email**: A user can verify their email by entering the code sent to their email
3. **Report an Incident**: Navigate to the incident reporting section, fill in details, and upload images
4. **View Incidents**: Access the map to see reported incidents, filter them by type, or search by location
5. **Community Dashboard**: Engage with community updates on the dashboard

## Folder Structure

```folder structure
client/             # Contains all client-side code (React, TypeScript)
├── src/
│   ├── components/ # Includes reusable UI components
│   ├── pages/      # Different application pages
│   ├── redux/      # State management setup
│   └── hooks/      # Custom React hooks
    
server/             # Contains backend code (Node.js, Express, MongoDB)
├── src/
│   ├── controllers/# Defines request handling
│   ├── models/     # MongoDB models
│   ├── routes/     # API routes for the backend
│   └── utils/      # Helper functions and utilities
```

## Contributing

Contributions are welcome! Please follow the CONTRIBUTING.md guidelines.

1. Fork the project
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.
