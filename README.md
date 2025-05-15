# React + TypeScript + Vite Frontend

This is the frontend application built with React, TypeScript, and Vite for the THPT 2024 exam results project.

## Requirements

- Node.js >= 16
- npm >= 8
- Git

## Installation

Follow these steps to set up the frontend project locally:

### 1. Clone the repository

```
git clone https://github.com/yourusername/your-frontend-repository.git
cd your-frontend-repository
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```
cp .env.example .env.local
```

Edit the `.env.local` file to set your API base URL:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

## Running the Application

### Development server

Run the Vite development server with hot module replacement:

```
npm run dev
```

The application will be accessible at http://localhost:5173

### Build for production

To build the application for production:

```
npm run build
```

This will generate optimized files in the `dist` directory.

### Preview production build

To preview the production build locally:

```
npm run preview
```

## Project Structure

```
src/
├── assets/         # Static assets like images, fonts, etc.
├── components/     # Reusable React components
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API services
├── stores/         # State management stores
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── vite-env.d.ts   # Vite environment type definitions
```

## API Integration

The frontend connects to the Laravel backend API to fetch the THPT 2024 exam results data. The API base URL is configured in the `.env.local` file.

Example of API call:

```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchExamResults = async (params: any) => {
  const response = await axios.get(`${API_URL}/exam-results`, { params });
  return response.data;
};
```

## Testing

Run tests with:

```
npm test
```

## Linting and Formatting

Run ESLint:

```
npm run lint
```

Fix ESLint issues:

```
npm run lint:fix
```

Format code with Prettier:

```
npm run format
```

## Deployment

To deploy the frontend application:

1. Build the application:
```
npm run build
```

2. Deploy the contents of the `dist` directory to your web server or hosting platform

## Troubleshooting

### "Module not found" errors

If you encounter module resolution issues, try clearing the node_modules and reinstalling dependencies:

```
rm -rf node_modules
npm install
```

### Vite HMR not working

If hot module replacement stops working, try restarting the development server:

```
npm run dev
```

## Contributing

Please read the CONTRIBUTING.md file for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
