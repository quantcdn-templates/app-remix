# Remix on Quant Cloud

A [Remix](https://remix.run) application template configured for deployment on [Quant Cloud](https://www.quantcdn.io).

[![Deploy to Quant Cloud](https://www.quantcdn.io/img/quant-deploy-btn-sml.svg)](https://dashboard.quantcdn.io/cloud-apps/create/starter-kit/app-remix)

## Features

- Remix v2 with Vite for fast development and builds
- Server-side rendering with React 18
- TypeScript support
- API routes (resource routes)
- Docker multi-stage build for production
- GitHub Actions CI/CD workflow

## Local Development

### Using npm

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at http://localhost:3001.

### Using Docker

```bash
# Copy the override file for local development
cp docker-compose.override.yml.example docker-compose.override.yml

# Build and run
docker-compose up --build
```

## Project Structure

```
app-remix/
├── app/
│   ├── routes/
│   │   ├── _index.tsx      # Home page
│   │   └── api.hello.tsx   # API resource route
│   └── root.tsx            # Root layout component
├── quant/
│   └── meta.json           # Quant Cloud metadata
├── .github/workflows/
│   └── build-deploy.yaml   # CI/CD workflow
├── Dockerfile              # Multi-stage production build
├── docker-compose.yml      # Production compose file
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## Available Routes

- `/` - Home page displaying request information (host, timestamp, user agent)
- `/api/hello` - JSON API endpoint returning request details

## Deployment to Quant Cloud

### Prerequisites

1. A [Quant Cloud](https://www.quantcdn.io) account
2. GitHub repository with this code
3. GitHub secrets configured:
   - `QUANT_API_KEY` - Your Quant Cloud API key
   - `QUANT_ORGANIZATION` - Your organization slug
   - `QUANT_APPLICATION` - (Optional) Application name

### Automatic Deployment

Push to the `main` or `develop` branch to trigger automatic deployment:

```bash
git push origin main
```

The GitHub Actions workflow will:
1. Build the Docker image
2. Push to Quant Cloud registry
3. Deploy to the corresponding environment

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Application port | `3001` |

### Vite Configuration

The `vite.config.ts` file configures Remix with Vite, including:
- Future flags for Remix v3 compatibility
- TypeScript path aliases
- Development server on port 3001

## Learn More

- [Remix Documentation](https://remix.run/docs)
- [Quant Cloud Documentation](https://docs.quantcdn.io)
- [Vite Documentation](https://vitejs.dev)

## License

MIT
