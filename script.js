//your JS code here. If required.
document.getElementById("submit").addEventListener("click", function() {
    const player1 = document.getElementById("player-1").value;
    const player2 = document.getElementById("player-2").value;

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players!");
        return;
    }

    startGame(player1, player2);
});

function startGame(player1, player2) {
    document.querySelector(".message").textContent = `${player1}, you're up!`;
    
    const board = document.getElementById("board");
    board.innerHTML = ""; // Clear any existing board

    let currentPlayer = "X";
    let currentName = player1;
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create the board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id", i);
        cell.addEventListener("click", function() {
            if (gameBoard[i] === "" && !checkWinner(gameBoard)) {
                gameBoard[i] = currentPlayer;
                cell.textContent = currentPlayer;

                if (checkWinner(gameBoard)) {
                    document.querySelector(".message").textContent = `${currentName}, congratulations you won!`;
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    currentName = currentName === player1 ? player2 : player1;
                    document.querySelector(".message").textContent = `${currentName}, you're up!`;
                }
            }
        });
        board.appendChild(cell);
    }
}

function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        board[pattern[0]] && 
        board[pattern[0]] === board[pattern[1]] && 
        board[pattern[0]] === board[pattern[2]]
    );
}
