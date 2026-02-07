# Cybersecurity Awareness Training - Multiple Choice Game

A React-based multiple choice question game for corporate cybersecurity awareness training. This application can be embedded as an iframe in external websites with authentication via access_token and siteId parameters.

## Features

- **Iframe Authentication**: Secure token-based authentication for embedded deployment
- **Responsive Design**: Adapts to various container sizes and devices
- **Admin Interface**: Content management dashboard for question creation and editing
- **Player Interface**: Interactive game interface for answering questions
- **Scalability**: Designed to support 1000+ concurrent players

## Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── app/              # Main application setup
├── components/       # Shared UI components
├── features/         # Feature modules
│   ├── auth/         # Authentication handling
│   ├── admin/        # Admin interface
│   └── game/         # Player game interface
├── layouts/          # Page layouts
├── stores/           # Zustand stores
└── types/            # TypeScript types
```

## Deployment

This application is designed for static deployment and can be hosted on any CDN or static hosting service.

## Security

- Authentication tokens are transmitted securely via querystring parameters
- No personal data is collected or stored
- All communication should use HTTPS

## License

Proprietary - For internal use only.