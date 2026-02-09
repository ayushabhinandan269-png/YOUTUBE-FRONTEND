==============================
FRONTEND — README.md

YouTube Clone – Frontend

Live Demo
Frontend Live Link: https://youtube-frontend-chi-brown.vercel.app/


(Replace this with your actual deployed link)

Description
This is the frontend of a YouTube-like video streaming platform built using React.
It focuses on a clean YouTube-style UI, routing, dummy data handling, and realistic channel and video pages.

Features

• Home page with YouTube-style video grid
• Category-based filtering
• Search functionality
• Video player page
• Dummy channel pages generated from mock data
• Channel UI includes:
– Banner
– Subscribe button
– Videos and About tabs
• Fully responsive layout
• Sidebar navigation (Home, Explore, Shorts, etc.)

Note:
Dummy channels and videos are rendered using mock data for now. Backend integration is planned later.

Tech Stack

• React (Vite)
• React Router DOM
• Tailwind CSS
• JavaScript (ES6+)
• Mock data for videos and channels

Folder Structure

frontend
│
├── src
│ ├── pages (Home, Channel, DummyChannel, VideoPlayer)
│ ├── components (Reusable UI components)
│ ├── layouts (Main layout)
│ ├── data (Mock video and channel data)
│ ├── utils (Helper functions)
│ └── services (API config – future use)
│
└── README.md

How to Run Frontend

cd frontend
npm install
npm run dev

Runs on:
http://localhost:5173

Future Improvements

• Backend-connected channel pages
• Like and dislike system
• Comment section
• Playlist support
• Authentication integration

Author

Ayush Abhinandan
Capstone Project – Full Stack Development