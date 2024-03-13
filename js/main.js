let cubes = [];
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'o';
let trackPlayer = document.createElement('i');
trackPlayer.style.color = 'white';
trackPlayer.classList.add('fa', 'fa-circle-o');
//creating game board
document.getElementById("startGame").addEventListener("click", function () {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'o';
    trackPlayer.classList.add('fa', 'fa-circle-o');
    var existingWinDiv = document.getElementById('win');
    if (existingWinDiv) {
        existingWinDiv.remove();
    }
    var tableContainer = document.getElementById('tableDiv');
    var existingTable = document.getElementById('game');
    if (existingTable) {
        tableContainer.removeChild(existingTable);
    }
    var existingPlayerTurn = document.getElementById('playerTurn');
    if (existingPlayerTurn) {
        existingPlayerTurn.remove();
    }
    var playerTurn = document.createElement('div');
    playerTurn.id = 'playerTurn';
    document.body.appendChild(playerTurn);
    playerTurn.appendChild(trackPlayer);

    var table = document.createElement('table');
    table.id = 'game';

    for (var i = 0; i < 3; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement('td');
            cell.classList.add('tableElement');
            var cubeDiv = document.createElement('div');
            cubeDiv.classList.add('cube');
            cell.appendChild(cubeDiv);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    tableContainer.appendChild(table);
    //game logic
    var tCubes = document.getElementsByClassName('cube');
    cubes = Array.from(tCubes);

    for (let i = 0; i < cubes.length; i++) {
        cubes[i].addEventListener('click', playerMove);
    }
});
function playerMove(event) {
    let index = cubes.indexOf(event.target);

    if (gameBoard[index] === '') {
        if (currentPlayer === 'x') {
            cubes[index].innerHTML = '<i class="fa fa-times"></i>';
            gameBoard[index] = currentPlayer;
            currentPlayer = 'o';
            trackPlayer.classList.remove('fa-times');
            trackPlayer.classList.add('fa-circle-o');
        } else {
            cubes[index].innerHTML = '<i class="fa fa-circle-o"></i>';
            gameBoard[index] = currentPlayer;
            currentPlayer = 'x';
            trackPlayer.classList.remove('fa-circle-o');
            trackPlayer.classList.add('fa-times');
        }
        winCond();
    } else {}
}

function checkWinner(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combo of winningCombos) {
        if (combo.every(index => gameBoard[index] === player)) {
            return true;
        }
    }
    return false;
}

function winCond() {
    if (checkWinner('x')) {
        console.log('player x won');
        endGame('x');
    } else if (checkWinner('o')) {
        console.log('player o won');
        endGame('o');
    }else if (gameBoard.every(cell => cell !== '')) {
        console.log('draw');
        endGame('draw');
    }
}

function endGame(winner) {
    for (let i = 0; i < cubes.length; i++) {
        cubes[i].removeEventListener('click', playerMove);
    }
    var existingPlayerTurn = document.getElementById('playerTurn');
    existingPlayerTurn.remove();

    let winDiv = document.createElement("div");
    winDiv.id = "win";

    let winMsg = document.createElement('p');
    if (winner === 'draw') {
        winMsg.textContent = 'It\'s a draw!';
    }else {
        winMsg.textContent = `Player ${winner.toUpperCase()} won!`;
    }

    winDiv.appendChild(winMsg);
    document.body.appendChild(winDiv);
}



