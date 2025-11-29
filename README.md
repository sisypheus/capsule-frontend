# Capsule Frontend

Deployed live at `https://capsule.poette.dev`

Capsule Frontend is the web interface for the Capsule application.  
It provides a clean, modern UI for exploring, managing, and interacting with data from the Capsule platform.

---

## Overview (For Non‑Technical Readers)

- **What it is:**  
  A website you open in your browser to use Capsule.

- **What it does:**  
  Lets you sign in, browse information, trigger actions, and see results in real time, all through a clean interface.

- **Who it’s for:**  
  People who want to use Capsule without touching configuration files or command‑line tools.

- **How you use it:**
  Open the Capsule Frontend URL in your browser.  
  Sign in (if required).  
  Use the navigation menu to explore the main sections.  
  Use the on‑screen controls (buttons, forms, tables, filters) to interact with your data.

You only need a modern browser (Chrome, Firefox, Edge, Safari).  
Nothing must be installed locally to *use* the app.

---

## Key Features

- **Clean, focused UI** for Capsule’s core workflows.
- **Responsive design** so it works on laptops, tablets, and large screens.
- **API‑driven**: all data comes from the Capsule backend over HTTP/HTTPS.
- **Configurable** via environment variables for different environments (local, staging, production).

---

## Technical Overview (For Developers)

- **Stack:** Modern JavaScript frontend (React/TypeScript with TanStack tooling).
- **Routing:** Client‑side routing for a fast, app‑like experience.
- **State & Data:** Uses API calls and frontend state management to keep the UI in sync with the backend.
- **Configuration:**  
  Environment variables are defined in `.env` files.  
  See `.env.example` for required keys and expected formats.

---

## Prerequisites

- **Node.js:** LTS version recommended (e.g. 18+)
- **Package manager:** `npm` or `yarn`

---

## Setup and Development

```bash
# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

The app is typically available at `http://localhost:5173` (or as configured by the framework).

Make sure to copy `.env.example` to `.env` (or similar) and fill in the values required by your environment.

---

## Production Build

```bash
npm run build
# or
yarn build
```

This produces an optimized production build in the output directory defined by the framework (for example `dist` or `.next`).

---

## Deployment

- Build the app with the command above.  
- Deploy the build output to your hosting provider (e.g. Netlify, Vercel, static hosting, or a custom setup).  
- Configure all required environment variables in your hosting platform (API URLs, keys, feature flags, etc.).  

Once deployed, users can access Capsule Frontend through the provided URL.

---

## Contributing

- Fork or clone the repository.
- Create a feature branch for your change.
- Run the app locally and ensure it builds and runs without errors.
- Open a pull request with a clear description of what you changed and why.

---

## License

This project is licensed under the **MIT License**.