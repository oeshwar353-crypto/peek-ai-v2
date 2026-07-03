# 🧠 Peek AI — The AI Creator Workspace

Peek AI is an all-in-one AI-powered creator workspace that helps content creators analyze posts, generate scripts, plan content strategies, get personalized coaching, and stay inspired — all in one sleek dashboard.

Powered by **Groq** (Llama 3.3 70B) and built with **FastAPI + Vanilla JS**.

---

## ✨ Features

| Module | What it does |
|---|---|
| 🔍 **Visual Analysis** | Upload a post screenshot — get hook score, virality rating, CTA analysis |
| 📸 **Thumbnail CTR** | Analyze YouTube thumbnails for click-through rate potential |
| ✍️ **Content Generator** | Generate Reel scripts, captions, hooks, and CTAs |
| 💡 **AI Optimizer** | Paste a draft → get instant feedback + 6-style rewrites |
| 📅 **Content Planner** | Build a 7/30/90-day posting calendar and growth strategy |
| 🎯 **Inspiration Engine** | Generate content ideas and break down viral posts |
| 🎓 **Coach Maverick** | Chat with your AI creator coach for strategy and growth advice |
| 📂 **Projects** | Save all your work in organized workspaces |

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/peek-ai.git
cd peek-ai
```

### 2. Set up the backend

```bash
# Create a virtual environment
python -m venv .venv

# Activate it
# Windows:
.venv\Scripts\activate
# macOS / Linux:
source .venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt
```

### 3. Configure your API key

```bash
# Copy the example env file
cp backend/.env.example backend/.env

# Open backend/.env and paste your Groq API key
# Get a free key at: https://console.groq.com
```

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Run the app

```bash
# Start the backend (from project root)
.venv\Scripts\python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload

# Open your browser at:
# http://127.0.0.1:8000
```

---

## 🏗️ Project Structure

```
peek-ai/
├── backend/
│   ├── main.py              # FastAPI app + all routes
│   ├── config.py            # Settings & env loading
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment variable template
│   └── services/
│       ├── vision.py        # Image analysis (Groq vision)
│       ├── generator.py     # Content generation
│       ├── improver.py      # Content optimization
│       ├── coach.py         # AI coach chat
│       ├── planner.py       # Content calendar
│       ├── inspiration.py   # Idea generator
│       └── storage.py       # Project/data persistence
├── frontend/
│   ├── index.html           # Single-page application
│   ├── style.css            # Premium dark UI styles
│   └── app.js               # All frontend logic
├── data/                    # Runtime data (gitignored)
├── .gitignore
├── .gitattributes
└── README.md
```

---

## 🛠️ Tech Stack

- **Backend**: Python · FastAPI · Uvicorn
- **AI**: Groq API · Llama 3.3 70B · Llama 3.2 Vision
- **Frontend**: Vanilla HTML · CSS · JavaScript (no frameworks)
- **Storage**: JSON file-based (no database required)
- **Icons**: Lucide Icons

---

## ⚙️ Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GROQ_API_KEY` | Your Groq API key from [console.groq.com](https://console.groq.com) | ✅ Yes |

> **Never commit your `.env` file.** It is listed in `.gitignore`.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
