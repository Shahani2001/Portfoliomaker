# Portfolio Maker - MERN Developer Portfolio Generator

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🎯 Overview
Full-stack MERN application for developers to create, preview, edit, and publish professional portfolio websites. Features public shareable URLs (`/:username`), dynamic forms for skills/projects/experience, JWT auth, and responsive Tailwind UI.

**Tech Stack:**
- **Frontend**: React 19 + Vite + React Router + TanStack Query + React Hook Form + Tailwind CSS + Lucide React
- **Backend**: Node.js + Express + MongoDB + Mongoose + JWT + bcrypt + Validator
- **Other**: CORS, dotenv, nodemon

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)

### Setup
```bash
# Clone repo
git clone <your-repo>
cd portfoliomaker
# Backend
cd backend
npm install
copy .env.example .env
# Edit .env: MONGODB_URI, JWT_SECRET, CORS_ORIGIN=http://localhost:5173
npm run dev
# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

**Environment Variables (backend/.env):**
```
MONGODB_URI= "URI for DB"
JWT_SECRET=your-super-secret-jwt-key-min32chars
PORT=4000
CORS_ORIGIN=http://localhost:5173
```

## 📱 Features
| Feature | Status |
|---------|--------|
| Home Landing | ✅ |
| Register/Login (JWT Auth) | ✅ |
| Create Portfolio (dynamic forms) | ✅ |
| Preview before Publish | ✅ |
| Public Profile `/:username` | ✅ |
| Edit Portfolio `/edit/:username` | ✅ |
| Dashboard Overview | ✅ |
| Full CRUD API | ✅ |
| Responsive Design | ✅ |
| Form Validation | ✅ |
| MongoDB Schema | ✅ |

**Flow**: Register/Login → Create → Preview → Publish → Share `/:username` → Edit anytime

## 🗄️ Database Schema
```javascript
UserPortfolio {
  username: String (unique, URL-safe),
  fullName: String (required),
  title: String,
  bio: String,
  profileImage: String,
  contact: { email, linkedin, github, website },
  skills: [String],
  projects: [{ name, description, techStack[], githubLink, liveDemo }],
  experience: [{ company, role, duration, description }]
}
```

## 🌐 API Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/portfolio
GET /api/portfolio/:username
PUT /api/portfolio/:username
DELETE /api/portfolio/:username
```

## 📱 Screenshots
*(Add screenshots of Home, Create, Profile)*

## 🧪 Testing
```bash
# Backend API (Thunder Client/Postman)
POST http://localhost:4000/api/auth/register {username, password, fullName...}
GET http://localhost:4000/api/portfolio/username

# Frontend
npm run dev # http://localhost:5173
```

## 🚀 Deployment
- **Frontend**: (https://69d71bc4b18e3788ad55d4cb--majestic-macaron-4e9f5d.netlify.app/)
- **Backend**: Render/Railway
- **Database**: MongoDB Atlas

## 🔮 Future
- [ ] Dark/Light theme toggle
- [ ] Portfolio analytics/views
- [ ] Drag & drop projects
- [ ] Resume PDF upload (Cloudinary)
- [ ] SEO meta tags
- [ ] PWA support

## 📄 License
MIT
