var allSquares = document.querySelectorAll(".square");
var playerHeading = document.querySelector(".playerHeading");
var board = document.querySelector(".board");
var pOneHouse;
var pTwoHouse;
var pOne = [];
var pTwo = [];
var pOneWins = 0;
var pTwoWins = 0;
var winSequences = [
    [7, 5, 3],
    [1, 2, 3], 
	[4, 5, 6],
	[7, 8, 9], 
	[1, 4, 7], 
	[2, 5, 8], 
	[3, 6, 9], 
	[1, 5, 9],
]
var counter = 0;
var resetBtn = document.querySelector(".reset");

// Start function
var start = () => {
    // get house name from drop down selection
    var pOneSelect = document.querySelector(".pOneHouse");
    pOneHouse = pOneSelect.options[pOneSelect.selectedIndex].value;
    var pTwoSelect = document.querySelector(".pTwoHouse");
    pTwoHouse = pTwoSelect.options[pTwoSelect.selectedIndex].value;
    // check that both house names are not the same
    if (pOneHouse == pTwoHouse) {
        document.querySelector(".error").textContent = "Players must choose different houses.";
        document.querySelector(".error").style.color = "red";
    // If they're not the same, hide drop downs and player scores's appear
    } else {
        document.querySelector(".error").classList.add("hide");
        document.querySelector(".pOneDropDown").classList.add("hide");
        document.querySelector(".pTwoDropDown").classList.add("hide");
        document.querySelector(".pOneHouseSelection").textContent = `${pOneHouse}'s Score`;
        document.querySelector(".pOneHouseSelection").classList.add(pOneHouse);
        document.querySelector(".pTwoHouseSelection").textContent = `${pTwoHouse}'s Score`;
        document.querySelector(".pTwoHouseSelection").classList.add(pTwoHouse);
        // display heading and board
        playerHeading.classList.remove("hide");
        playerHeading.classList.add(pOneHouse);
        playerHeading.textContent = `${pOneHouse}'s Turn...`;
        board.style.display = "grid";
        // hide start game button
        document.querySelector(".start").classList.add("hide");
        document.querySelector(".select").classList.add("hide");
    }
}

// Start game button event listener
document.querySelector(".start").addEventListener("click", start);

// Change heading code
var changeHeading = () => {
    playerHeading.classList.toggle(pTwoHouse);
    if (playerHeading.classList.contains(pTwoHouse)) {
        playerHeading.textContent = `${pTwoHouse}'s Turn...`;
        playerHeading.classList.remove(pOneHouse);

    } else {
        playerHeading.classList.add(pOneHouse);
        playerHeading.classList.remove(pTwoHouse);
        playerHeading.textContent = `${pOneHouse}'s Turn...`;
    }
}

// function to handle each time the board is clicked 
var click = event => {
    // check that the box is empty
    if (event.target.tagName !== "IMG") {
        // get images
        var pOnePiece = new Image(104, 130);
        pOnePiece.src = `images/${pOneHouse}.png`;
        var pTwoPiece = new Image(104, 130);
        pTwoPiece.src = `images/${pTwoHouse}.png`;    
        // player 1 turn
        if (playerHeading.textContent === `${pOneHouse}'s Turn...`) {
            event.target.append(pOnePiece);
            // push data-id of square into players array, covert to number, sort from largest to smallest then call check win function
            pOne.push(Number(event.target.dataset.id));
            changeHeading();
        } else {
            // player 2 turn
            event.target.append(pTwoPiece);
            // push data-id of square into players array, covert to number, sort from largest to smallest then call check win function
            pTwo.push(Number(event.target.dataset.id));
            changeHeading();
        }
        checkWin(pOne);
        checkWin(pTwo);
        endNoWin(pOne, pTwo);
    } else {
    // if the box isn't empty do nothing 
        return
    } 
}

var endNoWin = function (arr1, arr2) {
    if (playerHeading.textContent != `${pOneHouse} Wins!` && playerHeading.textContent != `${pTwoHouse} Wins!` && arr1.length + arr2.length === 9) {
        playerHeading.textContent = "No one wins!"
        // display reset game button
        resetBtn.style.display = "inline-block";
        resetBtn.addEventListener("click", resetGame);
    }
}

// add event listener to each square within the board
allSquares.forEach(square => {
    square.addEventListener("click", click);
})

// check players arrays against the winSquence arrays
var checkWin = player => {
    // so long as the player has had more than 3
    if (player.length >= 3 && player.length < 6) {
        winSequences.forEach(sequence => {
            // for each winning sequence see if it matches the data-ids in the player arrays.
            for (var i = 0; i < player.length; i ++) {
                if (player[i] === sequence[0]) {
                    counter ++;
                } else if (player[i] === sequence[1]) {
                    counter ++;
                } else if (player[i] === sequence[2]) {
                    counter ++;
                }
                // if the arrays have three matches execute the win function
                if (counter === 3) {
                    win(sequence);
                }
            }
            if (pOne + pTwo === 9 && counter != 3) {
                console.log("Everyone loses");
            }
            // reset counter back to 0 before looking at next sequence 
            counter = 0;
        })
    // if player array doesn't have more than 3 do nothing
    } else {
        return;
    }
}

// if there is a win. stop game play. highlight winning path. pop up button to reset the game. 
var win = winSeq => {
    // remove event listener from the board so no more turns can be played
    allSquares.forEach(square => {
        square.removeEventListener("click", click)
    })
     // Change heading & score board
     if (playerHeading.textContent === `${pTwoHouse}'s Turn...`) {
        playerHeading.classList.add(pOneHouse);
        playerHeading.classList.remove(pTwoHouse);
        playerHeading.textContent = `${pOneHouse} Wins!`;
        pOneWins ++;
        document.querySelector(".pOneScore").textContent = pOneWins;
    } else {
        playerHeading.classList.add(pTwoHouse);
        playerHeading.classList.remove(pOneHouse);
        playerHeading.textContent = `${pTwoHouse} Wins!`;
        pTwoWins ++;
        document.querySelector(".pTwoScore").textContent = pTwoWins;

    }
    // change the color of each winning square to gold
    winSeq.forEach(square => {
        if (playerHeading.textContent === `${pOneHouse} Wins!`) {
            // document.querySelector(`[data-id='${square}']`).classList.remove("square");
            document.querySelector(`[data-id='${square}']`).classList.add(`${pOneHouse}Square`);
        } else {
            document.querySelector(`[data-id='${square}']`).classList.add(`${pTwoHouse}Square`);
        }
    })
    // display reset game button
    resetBtn.style.display = "inline-block";
    resetBtn.addEventListener("click", resetGame);
}

// reset function
var resetGame = () => {
    // Clear boxes of text and color
    pOne.forEach(square => {
        document.querySelector(`[data-id='${square}']`).textContent = "";
        document.querySelector(`[data-id='${square}']`).classList.remove(`${pOneHouse}Square`);

    })
    pTwo.forEach(square => {
        document.querySelector(`[data-id='${square}']`).textContent = "";
        document.querySelector(`[data-id='${square}']`).classList.remove(`${pTwoHouse}Square`);        
    })
    // Reset player arrays
    pOne = [];
    pTwo = [];
    // Change heading to be losers turn first
    if (playerHeading.textContent === `${pOneHouse} Wins!`) {
        playerHeading.textContent = `${pTwoHouse}'s Turn...`;
        playerHeading.classList.add(pTwoHouse);
        playerHeading.classList.remove(pOneHouse);
    } else {
        playerHeading.textContent = `${pOneHouse}'s Turn...`;
        playerHeading.classList.add(pOneHouse);
        playerHeading.classList.remove(pTwoHouse);
    }
    // add back in event listener for squares 
    allSquares.forEach(square => {
        square.addEventListener("click", click)
    })
    // Hide rest button
    resetBtn.style.display = "none";
}

// FOOTER FUNCTIONS
// reset score board function
var resetScore = () => {
    pOneWins = 0;
    pTwoWins = 0;
    document.querySelector(".pOneScore").textContent = pOneWins;
    document.querySelector(".pTwoScore").textContent = pTwoWins;

}

var startNewGame = () => {
    resetScore();
    board.style.display = "none";
    resetBtn.style.display = "none";
    playerHeading.classList.add("hide");
    document.querySelector(".select").classList.remove("hide");
    document.querySelector(".pOneDropDown").classList.remove("hide");
    document.querySelector(".pTwoDropDown").classList.remove("hide");
    document.querySelector(".start").classList.remove("hide");
}

// Event listeners
document.querySelector(".resetScore").addEventListener("click", resetScore);
document.querySelector(".resetGameFooter").addEventListener("click", resetGame);
document.querySelector(".startNewGame").addEventListener("click", startNewGame);