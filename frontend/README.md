1. backend:
   - cd backend
   - copy .env.example -> .env and set MONGO_URI and JWT_SECRET
   - npm install
   - npm run dev

2. frontend:
   - cd frontend
   - npm install
   - ensure VITE_API_URL in environment if needed (or default is http://localhost:5000/api)
   - npm run dev

3. Seed an admin user via POST /api/auth/register and set isAdmin true directly in DB (or add an admin route to create)