# E-commerce Backend

Node.js + Express API with **MongoDB** for products and **Cloudinary** for image uploads.

## Setup

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Fill in `.env`:

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default `5000`) |
| `MONGODB_URI` | MongoDB connection string |
| `CLOUDINARY_CLOUD_NAME` | From [Cloudinary Dashboard](https://cloudinary.com/console) |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `CLIENT_URL` | Frontend URL for CORS (e.g. `http://localhost:3000`) |

3. Install and run:

```bash
npm install
npm run dev
```

Server runs at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health / welcome message |
| `GET` | `/products` | List products (`?limit=30&page=1`) |
| `GET` | `/products/:id` | Get product by ID |
| `GET` | `/products/search?q=` | Search products |
| `POST` | `/products` | Create product (multipart: `image`, `title`, `description`, `price`, `category`) |
| `PUT` | `/products/:id` | Update product (optional new `image`) |
| `DELETE` | `/products/:id` | Delete product |
| `POST` | `/upload` | Upload single image → returns Cloudinary URL |
| `POST` | `/upload/multiple` | Upload up to 5 images |

### Create product example

```bash
curl -X POST http://localhost:5000/products \
  -F "title=Used iPhone" \
  -F "description=Good condition" \
  -F "price=499" \
  -F "category=mobiles" \
  -F "image=@./photo.jpg"
```

## Deploy (Vercel)

1. Push this folder to GitHub.
2. Import project in Vercel.
3. Add all `.env` variables in Vercel project settings.
4. Use **MongoDB Atlas** for `MONGODB_URI` in production.

Set the frontend `NEXT_PUBLIC_API_URL` to your deployed backend URL.
