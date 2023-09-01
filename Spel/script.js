document.addEventListener('DOMContentLoaded', function () {
  const cells = document.querySelectorAll('.cell');

  // Initialize the draggablePiece
  let draggablePiece = document.createElement('div');
  draggablePiece.className = 'draggablePiece';
  draggablePiece.style.position = 'fixed';
  draggablePiece.style.opacity = '0.5';
  draggablePiece.style.width = '100px';
  draggablePiece.style.height = '100px';
  draggablePiece.style.display = 'none';
  draggablePiece.style.zIndex = '9999';
  document.body.appendChild(draggablePiece);

  cells.forEach(cell => cell.addEventListener('mousedown', handleMouseDown));
  cells.forEach(cell => cell.addEventListener('mouseup', handleMouseUp));
  cells.forEach(cell => cell.addEventListener('mousemove', handleMouseMove));
  cells.forEach(cell => cell.addEventListener('click', handleClick));

  // Rest of your code
});

let isDragging = false;
let draggablePiece = document.createElement('div');
document.body.appendChild(draggablePiece);
draggablePiece.style.position = 'fixed';
draggablePiece.style.opacity = '0.5';
draggablePiece.style.width = '100px';
draggablePiece.style.height = '100px';
draggablePiece.style.display = 'none';
draggablePiece.style.zIndex = '-1';  // Ensure it doesn't interfere with other elements

let dragStartIndex;
let turn = 'X';
let board = Array(9).fill(null);
let xPieces = 0;
let oPieces = 0;

function handleMouseDown(event) {
    const index = parseInt(event.target.id.replace('cell-', ''));
    if (board[index] === turn) {
        isDragging = true;
        dragStartIndex = index;
        draggablePiece.style.backgroundImage = event.target.style.backgroundImage;
        draggablePiece.style.display = 'block';
        handleMouseMove(event);
    }
}

function handleMouseUp(event) {
  if (isDragging) {
      isDragging = false;
      draggablePiece.style.display = 'none';

      const dropCell = document.elementFromPoint(event.clientX, event.clientY);
      const dropIndex = parseInt(dropCell.id.replace('cell-', ''));

      if (board[dropIndex] || dropIndex === dragStartIndex) {
          return;
      }
      board[dropIndex] = board[dragStartIndex];
      board[dragStartIndex] = null;
      renderBoard();

      // Check for a win here after the piece has been moved.
      if (checkWin(board[dropIndex])) {
          alert(`${board[dropIndex]} wins!`);
          setTimeout(() => resetBoard(), 3000);
          return;
      }

      turn = turn === 'X' ? 'O' : 'X';
  }
}

function handleMouseMove(event) {
    if (isDragging) {
        draggablePiece.style.left = event.clientX - 50 + 'px';
        draggablePiece.style.top = event.clientY - 50 + 'px';
    }
}
  function handleClick(event) {
    const cell = event.target;
    const index = parseInt(cell.id.replace('cell-', ''));
    if (!board[index] && ((turn === 'X' && xPieces < 3) || (turn === 'O' && oPieces < 3))) {
      board[index] = turn;
      if (turn === 'X') {
        xPieces++;
      } else {
        oPieces++;
      }
  
      if (checkWin(turn)) {
        alert(`${turn} wins!`);
        setTimeout(() => resetBoard(), 5000);
      }
  
      turn = turn === 'X' ? 'O' : 'X';
      renderBoard();
    }
  }
  
  function renderBoard() {
    board.forEach((mark, index) => {
      const cell = document.getElementById(`cell-${index}`);
      if (mark === 'X') {
        cell.style.backgroundImage = "url('https://i.imgur.com/niv24U2.png')";
      } else if (mark === 'O') {
        cell.style.backgroundImage = "url('https://i.imgur.com/oqjtg8K.png')";
      } else {
        cell.style.backgroundImage = '';
      }
    });
  }
  
  function checkWin(player) {
    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    return winningCombination.some(combination =>
      board[combination[0]] === player &&
      board[combination[1]] === player &&
      board[combination[2]] === player
    );
  }
  
  function resetBoard() {
    board.fill(null);
    xPieces = 0;
    oPieces = 0;
    renderBoard();
    turn = 'X';
  }
