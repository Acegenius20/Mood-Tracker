# MoodJournal - Daily Mood Tracker


A full-stack web application designed to help users record and reflect on their emotional well-being on a daily basis.

MoodJournal allows users to log how they feel each day using an intuitive emoji-based mood selection system. The goal of the project is to provide a simple and engaging way to build emotional awareness and maintain a daily record of moods and reflections over time.

Users can choose from a set of predefined mood options represented by emojis, such as happy, neutral, sad, angry, and tired, and optionally add a short reflection note describing their thoughts, experiences, or reasons behind that mood for the day.

The application maintains a date-wise history of all mood entries, presented in a calendar-style interface that makes it easy to view past records and identify emotional patterns across days, weeks, and months. Each date visually reflects the mood logged for that day, allowing users to quickly scan their emotional history.

In addition to daily logging, the project includes a weekly mood summary dashboard that provides a clear overview of mood trends. This section displays the total count of each mood recorded during the week, helping users better understand recurring emotional patterns and overall mental state.

A filtering system is included to allow users to browse mood entries based on specific mood types or selected date ranges, making the history easier to navigate.

The application is built using the MERN stack, with React powering the frontend, Node.js and Express handling the backend services, and MongoDB used as the database. The database is managed through Docker containers to ensure a consistent and portable development environment.

This project focuses on clean user interaction, meaningful data visualization, and an intuitive interface that encourages consistent daily use.



## Tech Stack

- Frontend: React + Vite + Tailwind CSS + Framer Motion + Lucide React + Recharts
- Backend: Node.js + Express.js + Mongoose
- Database: MongoDB (Docker container)
- API Client: Axios
- State: React Context API
- Containerization: Docker + Docker Compose

## Core Features

- Daily mood logging (happy, neutral, sad, angry, tired)
- Optional reflection notes with live counter 
- Calendar history with monthly navigation and mood tags
- Dashboard with detailed analytics 
- Advanced filtering (mood, date range, week, month, note text)
- Data export


How to Run the Project

To run this project on your system, make sure the following software is installed:

Node.js 
Docker Desktop (for running MongoDB in a container)
Installation Steps:
Install frontend dependencies
npm install
Install backend dependencies
cd ../server
npm install
Start Docker
Make sure Docker Desktop is running on your machine.
Run the project using Docker Compose
From the root project folder:
docker-compose up --build

This will start:

MongoDB container
Backend server
Frontend application
Open the application
Once everything starts successfully, open:
http://localhost:5173

(or the frontend port configured in the project)

The backend API will run on:

http://localhost:5000



Note:
If this is the first time running the project, Docker may take a few minutes to build the containers.

Make sure the required ports (such as 5000, 5173, and 27017) are not already in use.




