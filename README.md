# Tic-Tac-Toe 🎮

A modern, minimal, and fully responsive Tic-Tac-Toe browser game built with pure **HTML**, **CSS**, and **JavaScript** — no frameworks, no dependencies, no build tools.

---
 
## 📁 Project Structure
 
```
tic-tac-toe-master/
│
├── ttt.html      → Game layout and structure
├── TTT.css       → All styles, animations, and responsive design
└── ttt.js        → Game logic, win detection, scoring, and confetti
```
 
---

## 🚀 How to Run
 
1. Download or unzip all three files into the **same folder**
2. Open `ttt.html` in any modern web browser
3. No installation, no build step needed
 
```bash
# Optional: serve locally with Python
python -m http.server 8000
# Then visit: http://localhost:8000/ttt.html
```
 
> **Note:** The game uses Google Fonts (DM Sans + DM Serif Display). An internet connection is needed for fonts to load correctly. The game works offline too — just with a fallback font.
 
---

 ## 🎮 How to Play
 
1. The game is played by **two players** on the same device
2. **Player X** always goes first
3. Players take turns clicking an empty cell to place their mark
4. The first player to get **3 in a row** — horizontally, vertically, or diagonally — wins
5. If all 9 cells fill up with no winner, it's a **draw**
6. Click **↺ Restart** to start a new round (scores are preserved)
7. Click **Reset Scores** to clear all scores and start completely fresh
 
---
