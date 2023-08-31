document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', handleClick));
    cells.forEach(cell => cell.addEventListener('dragstart', handleDragStart));
    cells.forEach(cell => cell.addEventListener('dragover', handleDragOver));
    cells.forEach(cell => cell.addEventListener('drop', handleDrop));
});

let dragStartIndex;
let turn = 'X';
let xPieces = 0; // New line
let oPieces = 0; // New line
const board = Array(9).fill(null);

function handleDragStart(event) {
    dragStartIndex = parseInt(event.target.id.replace('cell-', ''));
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const dropIndex = parseInt(event.target.id.replace('cell-', ''));
    if (board[dropIndex] || dropIndex === dragStartIndex) {
        return;
    }
    board[dropIndex] = board[dragStartIndex];
    board[dragStartIndex] = null;
    renderBoard();
    turn = turn === 'X' ? 'O' : 'X';
}

function handleClick(event) {
    const cell = event.target;
    const index = parseInt(cell.id.replace('cell-', ''));
    
    if (!board[index]) {
        if ((turn === 'X' && xPieces < 3) || (turn === 'O' && oPieces < 3)) { // New condition
            board[index] = turn;

            if (turn === 'X') {
                xPieces++; // New line
            } else {
                oPieces++; // New line
            }

            if (checkWin(turn)) {
                alert(`${turn} wins!`);
                resetBoard();
            }
            turn = turn === 'X' ? 'O' : 'X';
            renderBoard();
        }
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
    xPieces = 0; // New line
    oPieces = 0; // New line
    renderBoard();
    turn = 'X';
}
