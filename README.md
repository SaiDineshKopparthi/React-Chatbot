# React Chatbot

A full-stack chatbot application built with a React frontend and a Node.js/Express backend, designed to deliver a modern chat interface with typing indicators, local persistence, and smooth user experience.

---

## Live Demo

- **Frontend (React, Vite, Tailwind CSS):**  
  [https://react-chatbot-dinesh.netlify.app/](https://react-chatbot-dinesh.netlify.app/)
- **Backend (Node.js + Express, deployed on Cloud Run):**  
  [https://chatbot-backend-826723631076.us-central1.run.app](https://chatbot-backend-826723631076.us-central1.run.app)

---

## Features

- Modern chat UI with React and Tailwind CSS.
- Typing indicator with animated dots while the bot is processing.
- Auto-scroll with smart handling (sticks to bottom unless the user scrolls up).
- Message history persistence using `localStorage`.
- Clear chat option that resets the conversation but keeps the initial greeting.
- Multi-line input with `Shift+Enter` for newlines.
- Styled scrollbar for a polished look.
- Responsive card-based design with fixed header and pinned input bar.

---

## Tech Stack

### Frontend
- **React 19 + Vite** for fast development and builds.
- **Tailwind CSS** for styling and custom theme colors.
- **lucide-react** for modern icons.
- **react-markdown** for rendering AI responses with markdown formatting.

### Backend
- **Node.js + Express** REST API.
- Deployed on **Google Cloud Run**.
- Accepts `POST /chat` requests with body:
  ```json
  {
    "prompt": "Your message here"
  }
  ```
- Returns JSON response:
  ```json
  {
    "response": "Bot's reply here"
  }
  ```

---

## Running Locally

### 1. Clone the repository
```sh
git clone https://github.com/<your-username>/React-Chatbot.git
cd React-Chatbot/react-chatbot
```

### 2. Install dependencies
```sh
npm install
```

### 3. Start the frontend
```sh
npm run dev
```
By default, it runs at http://localhost:5173.

### 4. Start the backend
Navigate to your backend folder (e.g., `react-chatbot-backend`) and run:
```sh
npm install
npm start
```
The backend will run at http://localhost:3002/chat.

---

## Usage Notes

- The frontend is configured to call the backend endpoint at:
  ```
  https://chatbot-backend-826723631076.us-central1.run.app/chat
  ```
- Update this in `Chatbot.jsx` if you want to point to another backend.
- When running locally, ensure the backend runs on port 3002 or adjust the fetch URL in the frontend.