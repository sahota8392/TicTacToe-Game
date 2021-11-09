/*
variable to track game state
*/
const statusDisplay = document.querySelector('.gameStatus');



/*
gameActive      Will pause game in case of end scenario
currentPlayer   So we know who's turn
gameState       empty strings will allow us to track played cells
*/
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];



/*
$  = shortcut for jQuery
*/
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;




/*
innerHTML = manipulate webiste being displayed, returns HTML conent of element
*/
statusDisplay.innerHTML = currentPlayerTurn();
const winningConditions =[
    /*
    winning conditions that need to be filled by same player 
    */
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];


function handleCellPlayed (clickedCell, clickedCellIndex) {
/*
    update internal game state to reflect the played move 
    & update user interface to reflect played move
*/
    gameState[clickedCellIndex] = currentPlayer; 
    clickedCell.innerHTML = currentPlayer;
}




/*
? is a Ternary Operator
   3 operands: condition followed by ?, then expression to execute if condition is truthy followed by colon
   Then expression to execute if it is not correct
*/
function handlePlayerChange () {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}





function handleResultValidation () {
    let roundWon = false;
    for (let i=0; i <=7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === "" || b === "" || c === ""){
            continue;
        }
        if (a === b && b ===c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

/*
if we get to here, no one won yet and still moves to play so we switch players
*/
    let roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}






function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
/*  parseInt is so we grab data-cell-index from clicked cell
    identifies where the cell is in our grid
    getAttribute returns as string value so we parse to Integer since we need actual number
*/
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

/*
    Here we check if call has been played or game paused
    if either is true, the click to place "X" or "O" is ignored
*/
    if (gameState[clickedCellIndex] !== "" || !gameActive){
        return;
    }

/*
    if all is in order above, proceed to game flow
*/
    handleCellPlayed(clickedCell, clickedCellIndex);handleResultValidation();
}






function handleRestartGame () {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
                .forEach(cell =>cell.innerHTML = "");
}




/*
Adding event listeners to actual game cells and restart button
*/
document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click', handleCellClick));
document.querySelector('.gameRestart').addEventListener('click', handleRestartGame);