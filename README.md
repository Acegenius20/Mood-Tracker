# MoodJournal - Daily Mood Tracker

A complete stack of web applications is built to assist users in documenting and considering their emotional health each day.

Via an easy-to-use emoji-based mood choices process, users can log their mood for the day with MoodJournal.

Users may build on their ability to understand their feelings through this type of application as well as keep a record of their moods/reflections daily for a prolonged period of time.

The users of this application choose an emoji pair for their daily emotion (happy, neutral, sad, angry, tired), and then have the option of adding a brief reflection note about what they were feeling or their thoughts/activities causing that emotion for that day.

The application allows for tracking all past moods in an easy to access date-based historical record using a calendar view interface. Users will be able to see at a glance what their mood was on any given date in the required calendar look-up method.

The ability to effectively track the users' mood on a daily basis has also provided the user access to the weekly mood trend summary dashboard that report its total mood trends very clearly. In this section, we can see the total amount of moods captured throughout the week so that you are better able to recognize patterns of emotion over time, as well as provide a better sense of your mental state.

There is an advanced filtering system that will allow you to filter through mood entries based on particular mood types or date ranges, making it easier to navigate through all of your historical entries.

This application was built using the MERN stack. The front end utilizes React.js as the primary development tool, Node/Express.js has been used to implement the back-end services, and the database is hosted with MongoDB. The hosting of the database utilizes Docker containers to create a consistent and portable environment for development.

This project will be focused on providing an efficient method for users to interact with the application, provide meaningful visualizations for your logged data, and a clean user interface that will encourage daily usage.




To execute this project in your system, be certain that you have the following programs installed:


Node.js 
Docker Desktop (to be used for operating MongoDB in a container)
Instructions for Installing the Software:
Front-end Installation
npm install
Back-end Installation
cd ../server
npm install
Open Docker.
Ensure Docker Desktop has started on your system before you run your project using Docker Compose.
Within the root project folder:
docker-compose up --build


This will create:


MongoDB Container
Back-end Server
Front-end App
Launch the App
The app can be accessed at http://localhost:5173

(or whichever port was specified for running the front end in this project)


The Back-end API can be reached at:
http://localhost:5000



Note:
If you run the project for the first time, the building of the containers through Docker will take some amount of time.
If the ports shown here (i.e., 5000, 5173, 27017) are in use, you will have to make sure you are using a different port than the one shown above.




