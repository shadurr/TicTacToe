document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', handleClick));
});

let board = Array.from(Array(9).keys());
let turn = 'X';
let xPieces = 0;
let oPieces = 0;

function handleClick(event) {
    console.log(`Clicked cell id: ${event.target.id}`);
    const cell = event.target;
    const index = parseInt(cell.id.replace('cell-', ''));

    if (!board[index]) {
        if ((turn === 'X' && xPieces < 3) || (turn === 'O' && oPieces < 3)) {
            board[index] = turn;
            
            if (turn === 'X') {
                xPieces++;
                cell.style.backgroundImage = "url('https://i.imgur.com/niv24U2.png')";
            } else {
                oPieces++;
                cell.style.backgroundImage = "url('https://i.imgur.com/oqjtg8K.png')";
            }

            if (checkWin(turn)) {
                alert(`${turn} wins!`);
                resetBoard();
            }
            
            turn = turn === 'X' ? 'O' : 'X';
        }
    }
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
    board = Array.from(Array(9).keys());
    xPieces = 0;
    oPieces = 0;
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundImage = '');
    turn = 'X';
}
