var allSquares = document.querySelectorAll(".square");
var playerHeading = document.querySelector(".playerHeading");
var board = document.querySelector("table");
var playerOne = [];
var playerTwo = [];
var winSequences = [
    [1, 2, 3], 
	[4, 5, 6],
	[7, 8, 9], 
	[1, 4, 7], 
	[2, 5, 8], 
	[3, 6, 9], 
	[1, 5, 9],
    [3, 5, 7]
]
var counter = 0;

// Change heading code
var changeHeading = () => {
    playerHeading.classList.toggle("pTwo");
    if (playerHeading.classList.contains("pTwo")) {
        playerHeading.textContent = "Player 2 Turn..."
    } else {
        playerHeading.textContent = "Player 1 Turn..."
    }
}

// function to handle each time the board is clicked 
var click = event => {
    // check that the box is empty
    if (event.target.textContent === "") {
        // if the box is empty and the heading is saying is player 1's turn add in an X and push data-id to array
        if (playerHeading.textContent === "Player 1 Turn...") {
            event.target.textContent = "X";
            // push data-id of square into players array, covert to number, sort from largest to smallest then call check win function
            playerOne.push(Number(event.target.dataset.id));
            playerOne.sort();
            checkWin(playerOne);
        } else {
        // otherwise if the box is empty but its not player 1's turn add in an O and push data-id to array
            event.target.textContent = "O";
            // push data-id of square into players array, covert to number, sort from largest to smallest then call check win function
            playerTwo.push(Number(event.target.dataset.id));
            checkWin(playerTwo);
        }
    } else {
    // if the box isn't empty do nothing 
        return
    }
    // change the text and color of the heading to show next players turn
    changeHeading();
}

// Add in either an X or an O depend on whos turn it is
allSquares.forEach(square => {
square.addEventListener("click", click)
})

// if there is a win. stop game play. highlight winning path with player colour. pop up button to reset the game. 
var win = winSeq => {
    winSeq.forEach(squ => {
        document.querySelector(`[data-id='${squ}']`).style.background = "gold";
    })
    // remove event listener from the board so no more turns can be played
    allSquares.forEach(square => {
        square.removeEventListener("click", click)
    })
}

// check players arrays against the winSquence arrays
var checkWin = player => {
    winSequences.forEach(sequence => {
        // for each winning sequence see if it matches the data-ids in the player arrays. 
        for (var i = 0; i < sequence.length; i ++) {
            if (sequence[i] === player[i]) {
                counter ++;
            }
            if (counter === 3) {
                win(sequence);
            }
        }
        counter = 0;
    })
}
