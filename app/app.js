const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const themeToggle = document.getElementById('theme-toggle');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = '';
  gameState = Array(9).fill("");
  gameActive = true;
  currentPlayer = 'X';
  status.textContent = "Crosses start";

  for (let i = 0; i < 9; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.dataset.index = i;
    box.addEventListener('click', handleBoxClick);
    board.appendChild(box);
  }
}

function handleBoxClick(e) {
  const box = e.target;
  const index = box.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  box.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `${currentPlayer === 'X' ? 'Crosses' : 'Noughts'} win! 🎉`;
    gameActive = false;
    highlightWinningBoxes();
  } else if (!gameState.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${currentPlayer === 'X' ? 'Crosses' : 'Noughts'} turn`;
  }
}

function checkWinner() {
  return winningConditions.some(combo => {
    const [a, b, c] = combo;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function highlightWinningBoxes() {
  winningConditions.forEach(combo => {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      document.querySelectorAll('.box')[a].classList.add('win');
      document.querySelectorAll('.box')[b].classList.add('win');
      document.querySelectorAll('.box')[c].classList.add('win');
    }
  });
}

resetBtn.addEventListener('click', createBoard);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

createBoard();
