# 🎬 GUESS WHO? (CINEMA GUESS MASTER)

A fast, cinematic movie & TV character guessing game built for **Discord Screen Share with Friends**, **Realtime Online Rooms**, and **TikTok / Shorts 9:16 Creator Mode**.

---

## 🌟 Key Features

- **🎉 Party Mode (Screen Share)**: Designed for Discord streams. Host inputs friends (Ahmed, Mohammed, etc.), triggers personalized buzzers, and runs rounds with 5-second timers and live scoreboards.
- **🎮 Realtime Online Multiplayer**: Friends join via a 5-character Room Code (e.g. `A7K92`) on their phones or PCs, with real-time buzzer race synchronization powered by WebSockets / Socket.IO.
- **⚡ AI Game Master**: Answers questions concisely and cleverly (*"Yes."*, *"No."*, *"Morally complicated."*, *"He's the protagonist."*) without spoiling the secret character or actor.
- **💡 3 Progressive Hints**: 3 escalating hints per round.
- **📱 TikTok & Shorts 9:16 Mode**: Instant toggle for a high-contrast, oversized vertical view tailored for video capture and live mobile streams.
- **🏆 Daily Challenge**: A global secret character shared worldwide each calendar day, with an anti-spoiler result card generator for Discord & TikTok.
- **🎬 78+ Verified Legends**: Characters from *The Godfather, The Dark Knight, Pulp Fiction, Inception, Titanic, Breaking Bad, Game of Thrones, Peaky Blinders, The Office, Friends, Succession*, and more.

---

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js 18+

### Install & Run
```bash
# 1. Install dependencies
cd server && npm install
cd ../client && npm install
cd ..

# 2. Build client & server
npm run build

# 3. Start the game
npm start
```
Open your browser at: **`http://localhost:3001`**

---

## ☁️ Free 1-Click Cloud Deployment (Render / Railway)

### Deploy to Render (Free 24/7):
1. Push this repository to your GitHub account.
2. Go to [Render.com](https://render.com) and click **New Web Service**.
3. Connect your GitHub repository.
4. Set:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Click **Deploy**!
   You will get a live public link (e.g., `https://cinema-guess.onrender.com`) that you and your friends can open from your phones or anywhere in the world 24/7!
