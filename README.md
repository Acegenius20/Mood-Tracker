# MoodJournal - Daily Mood Tracker

MoodJournal is a complete, production-style MERN stack app for daily mood logging, reflections, calendar history, and analytics.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS + Framer Motion + Lucide React + Recharts
- Backend: Node.js + Express.js + Mongoose
- Database: MongoDB (Docker container)
- API Client: Axios
- State: React Context API
- Containerization: Docker + Docker Compose

## Core Features

- Daily mood logging (happy, neutral, sad, angry, tired)
- One entry per date (upsert behavior)
- Optional reflection notes (500 char max) with live counter and localStorage draft
- Calendar history with monthly navigation and color-coded mood tags
- Dashboard analytics (weekly summary, charts, streak, 30-day trend)
- Advanced filtering (mood, date range, week, month, note text)
- Edit and delete entries
- JSON and CSV export
- Light/Dark/System theme with persistence
- Toasts, loading and empty states, responsive layout, smooth animations
- Custom 404 page

## Project Structure

```text
Mood Tracker/
  client/
    src/
      api/
      components/
      context/
      pages/
      utils/
  server/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
  docker-compose.yml
```

## Environment Variables

### Backend ([server/.env](server/.env))

```env
PORT=5000
MONGO_URI=mongodb://mongodb:27017/moodjournal
NODE_ENV=production
```

### Frontend ([client/.env](client/.env))

```env
VITE_API_URL=http://localhost:5000
```

## API Routes

- POST /api/moods
- GET /api/moods
- GET /api/moods/:id
- PUT /api/moods/:id
- DELETE /api/moods/:id
- GET /api/moods/filter
- GET /api/moods/weekly-summary
- GET /api/moods/calendar
- GET /api/moods/dashboard

## Docker Usage (Recommended)

Run the complete app:

```bash
docker-compose up --build
```

Services:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017

Database persistence uses a named volume: `mongo_data`

Stop services:

```bash
docker-compose down
```

Stop and remove DB volume:

```bash
docker-compose down -v
```

## Local (Non-Docker) Setup

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## GitHub Push Commands

```bash
git init
git add .
git commit -m "Initial commit - Dockerized MoodJournal MERN app"
git branch -M main
git remote add origin <MY_GITHUB_REPO_URL>
git push -u origin main
```
