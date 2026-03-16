// =============================================
//  ttt.js — Tic-Tac-Toe Game Logic
// =============================================

// ── Win Combinations ──────────────────────────
const WIN_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],   // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],   // columns
    [0, 4, 8], [2, 4, 6]               // diagonals
  ];
  
  // ── Game State ────────────────────────────────
  let board         = Array(9).fill('');
  let currentPlayer = 'X';
  let gameOver      = false;
  let scores        = { X: 0, O: 0, D: 0 };
  
  // ── DOM References ────────────────────────────
  const cells       = document.querySelectorAll('.cell');
  const turnChip    = document.getElementById('turnChip');
  const turnText    = document.getElementById('turnText');
  const scoreX      = document.getElementById('scoreX');
  const scoreO      = document.getElementById('scoreO');
  const scoreDraw   = document.getElementById('scoreDraw');
  const btnRestart  = document.getElementById('btnRestart');
  const btnReset    = document.getElementById('btnReset');
  
  // ── Set the turn chip appearance ──────────────
  function setChip(type, message) {
    turnChip.className = 'turn-chip ' + type;
    turnText.textContent = message;
  }
  
  // ── Update chip for current player's turn ─────
  function updateTurnChip() {
    if (currentPlayer === 'X') {
      setChip('x-chip', "Player X's turn");
    } else {
      setChip('o-chip', "Player O's turn");
    }
  }
  
  // ── Update score display ──────────────────────
  function updateScoreDisplay() {
    scoreX.textContent    = scores.X;
    scoreO.textContent    = scores.O;
    scoreDraw.textContent = scores.D;
  }
  
  // ── Check for a winner ────────────────────────
  function getWinningCombo() {
    for (var i = 0; i < WIN_COMBOS.length; i++) {
      var a = WIN_COMBOS[i][0];
      var b = WIN_COMBOS[i][1];
      var c = WIN_COMBOS[i][2];
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return WIN_COMBOS[i];
      }
    }
    return null;
  }
  
  // ── Check if board is full (draw) ─────────────
  function isBoardFull() {
    return board.every(function (cell) { return cell !== ''; });
  }
  
  // ── Handle a cell click ───────────────────────
  function handleCellClick() {
    var index = parseInt(this.getAttribute('data-index'));
  
    // Ignore if game is over or cell is already filled
    if (gameOver || board[index] !== '') return;
  
    // Fill the cell
    board[index] = currentPlayer;
    this.textContent = currentPlayer === 'X' ? '✕' : '○';
    this.classList.add(currentPlayer === 'X' ? 'x-cell' : 'o-cell', 'taken');
  
    // Trigger pop animation
    var clickedCell = this;
    clickedCell.classList.add('pop');
    clickedCell.addEventListener('animationend', function () {
      clickedCell.classList.remove('pop');
    }, { once: true });
  
    // Check for win
    var winCombo = getWinningCombo();
    if (winCombo) {
      // Highlight winning cells
      winCombo.forEach(function (idx) {
        cells[idx].classList.add('winner-cell');
      });
  
      gameOver = true;
      scores[currentPlayer]++;
      updateScoreDisplay();
  
      setChip('win-chip', 'Player ' + currentPlayer + ' wins! \uD83C\uDF89');
      launchConfetti();
      return;
    }
  
    // Check for draw
    if (isBoardFull()) {
      gameOver = true;
      scores.D++;
      updateScoreDisplay();
      setChip('draw-chip', "It's a draw!");
      return;
    }
  
    // Switch to the other player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnChip();
  }
  
  // Attach click listeners to all cells
  cells.forEach(function (cell) {
    cell.addEventListener('click', handleCellClick);
  });
  
  // ── Reset the board (keep scores) ─────────────
  function resetBoard() {
    board         = Array(9).fill('');
    currentPlayer = 'X';
    gameOver      = false;
  
    cells.forEach(function (cell) {
      cell.textContent = '';
      cell.className   = 'cell';
    });
  
    updateTurnChip();
  }
  
  // ── Full reset (board + scores) ───────────────
  function resetAll() {
    scores = { X: 0, O: 0, D: 0 };
    updateScoreDisplay();
    resetBoard();
  }
  
  // ── Button Listeners ──────────────────────────
  btnRestart.addEventListener('click', resetBoard);
  btnReset.addEventListener('click', resetAll);
  
  // ── Confetti Effect ───────────────────────────
  function launchConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    var ctx    = canvas.getContext('2d');
  
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Pastel confetti colors matching the theme
    var colors = ['#c4b5fd', '#93c5fd', '#a5f3fc', '#86efac', '#fde68a', '#f9a8d4'];
  
    var pieces = [];
    for (var i = 0; i < 110; i++) {
      pieces.push({
        x:     Math.random() * canvas.width,
        y:     (Math.random() * canvas.height) - canvas.height,
        w:     Math.random() * 10 + 5,
        h:     Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot:   Math.random() * Math.PI * 2,
        vx:    (Math.random() - 0.5) * 2.8,
        vy:    Math.random() * 3.5 + 2,
        vr:    (Math.random() - 0.5) * 0.14,
        alpha: 0.85 + Math.random() * 0.15
      });
    }
  
    var startTime  = null;
    var animHandle = null;
  
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      pieces.forEach(function (p) {
        p.x   += p.vx;
        p.y   += p.vy;
        p.rot += p.vr;
  
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
  
      if (timestamp - startTime < 3500) {
        animHandle = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  
    if (animHandle) cancelAnimationFrame(animHandle);
    requestAnimationFrame(animate);
  }
  
  // ── Initialise ────────────────────────────────
  updateTurnChip();