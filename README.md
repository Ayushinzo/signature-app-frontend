# Digital PDF Frontend

This is the frontend for the Digital PDF application, providing a web interface for secure, fast, and legally compliant document signing and management.

## Features

- User authentication (login/register)
- Upload and view PDF documents
- Digitally sign PDFs with customizable styles
- Download signed documents
- Responsive UI with Material-UI, TailwindCSS, and Framer Motion
- Bank-grade security and legal compliance

## Tech Stack

- React 19
- Vite
- Material-UI
- TailwindCSS
- Framer Motion
- React Router
- pdfjs-dist (PDF rendering)
- Axios (API requests)

## Project Structure

```
frontend/
  public/           # Static assets (images, worker, styles)
  src/
    components/     # Reusable React components
    pages/          # Page-level components (routes)
    context/        # Context providers
    assets/         # Static assets
    App.jsx         # Main app component
    main.jsx        # Entry point
    index.css       # Global styles
  package.json      # Project dependencies and scripts
  vite.config.js    # Vite configuration
  .env              # Environment variables
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Navigate to the `frontend` directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file (see `.env.example` if available):

   ```
   VITE_FRONTEND_URL="http://localhost:5173"
   VITE_BACKEND_URL="http://localhost:4000"
   ```

### Running the App

Start the development server:

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Building for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Customization

- Update branding, images, and styles in the `public/` and `src/assets/` folders.
- Modify routes and components in `src/pages/` and `src/components/`.

## License

See [LICENSE](../LICENSE) for details.

---

© {year} Digital PDF. All rights reserved.