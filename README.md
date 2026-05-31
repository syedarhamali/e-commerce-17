# E-Commerce 17 — OLX PRO Monorepo

Full-stack marketplace with **Next.js** frontend and **Express + MongoDB + Cloudinary** backend.

```
e-commerce-17/
├── e-commerce-frontend/   # Next.js app (port 3000)
├── e-commerce-backend/    # Express API (port 5000)
├── package.json           # Root scripts
└── README.md
```

## Quick start

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Environment variables

Copy `.env.example` and create:

- `e-commerce-backend/.env` — MongoDB, Cloudinary, CORS
- `e-commerce-frontend/.env.local` — `NEXT_PUBLIC_API_URL=http://localhost:5000`

### 3. Run locally (two terminals)

```bash
npm run dev:backend
npm run dev:frontend
```

- Frontend: http://localhost:3000  
- Backend: http://localhost:5000  

## Deploy on Vercel (same GitHub repo, two projects)

Connect **https://github.com/syedarhamali/e-commerce-17** twice:

| Project | Root Directory | Framework |
|---------|----------------|-----------|
| **Frontend** | `e-commerce-frontend` | Next.js |
| **Backend** | `e-commerce-backend` | Other (Node) |

### Frontend env (Vercel)

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | Your backend Vercel URL (e.g. `https://xxx.vercel.app`) |

### Backend env (Vercel)

| Variable | Value |
|----------|--------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary dashboard |
| `CLIENT_URL` | Your frontend Vercel URL |

After both deploy, set `NEXT_PUBLIC_API_URL` on the frontend to the backend URL and redeploy the frontend.

## API overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List products |
| GET | `/products/:id` | Product detail |
| GET | `/products/search?q=` | Search |
| POST | `/products` | Create listing (multipart + image) |
| POST | `/upload` | Upload image to Cloudinary |

See [e-commerce-backend/README.md](./e-commerce-backend/README.md) for more API details.
