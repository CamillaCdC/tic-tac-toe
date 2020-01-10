var allSquares = document.querySelectorAll(".square");
var playerHeading = document.querySelector(".playerHeading");
var board = document.querySelector(".board");
var pOneSelect = document.querySelector(".pOneHouse");
var pTwoSelect = document.querySelector(".pTwoHouse");
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
var startBtn = document.querySelector(".start");
var error = document.querySelector(".error");
var pOneDropDown = document.querySelector(".pOneDropDown");
var pTwoDropDown = document.querySelector(".pTwoDropDown");
var pOneHouseSelection = document.querySelector(".pOneHouseSelection");
var pTwoHouseSelection = document.querySelector(".pTwoHouseSelection");
var theme = new Audio("audio/theme.mov");
var winSound = new Audio("audio/win.mov");
winSound.volume = 0.3;
var musicPlaying = false;
var musicBtn = document.querySelector(".musicBtn");
var musicBtnClicked = 0;
var noToWinCup; 

// set player house selection and display crests
var playerOneHouseImage = function () {
    pOneHouse = pOneSelect.value;
    if (pOneHouse === "placeholder") {
        document.querySelector(".pOneCrest").classList.add("hide");
    } else {
        document.querySelector(".pOneCrest").src = `images/${pOneHouse}.png`;
        document.querySelector(".pOneCrest").classList.remove("hide");

    }
    // once player one has made a select undisable the player two box
    pTwoSelect.disabled = false;
}
var playerTwoHouseImage = function () {
    pTwoHouse = pTwoSelect.value;
    if (pTwoHouse === "placeholder") {
        document.querySelector(".pOneCrest").classList.add("hide");
    } else {
        document.querySelector(".pTwoCrest").src = `images/${pTwoHouse}.png`;
        document.querySelector(".pTwoCrest").classList.remove("hide");
    }
}

// Start button function
var start = () => {
    // if players haven't choen a house
    if (pOneHouse === undefined || pTwoHouse === undefined) {
        error.classList.remove("hide");
        error.textContent = "All players must choose a house.";
    // check that both house names are not the same
    } else if (pOneHouse === pTwoHouse) {
        error.classList.remove("hide");
        error.textContent = "Players must choose different houses.";
    } else if (document.querySelector(".noWinsForHouseCup").value === "") {
        error.classList.remove("hide");
        error.textContent = "Please enter in the numbers of wins for the House Cup."
    // If they're not the same, hide drop downs and player scores's appear
    } else {
        noToWinCup = document.querySelector(".noWinsForHouseCup").value;
        // hide crests from selection
        document.querySelector(".pOneCrest").classList.add("hide");
        document.querySelector(".pTwoCrest").classList.add("hide");
        document.querySelector(".pOneCrestScore").src = `images/${pOneHouse}.png`;
        document.querySelector(".pTwoCrestScore").src = `images/${pTwoHouse}.png`;
        // playe music
        startMusic();
        // hide errors and drop downs
        error.classList.add("hide");
        pOneDropDown.classList.add("hide");
        pOneSelect.value = "placeholder";
        pTwoDropDown.classList.add("hide");
        pTwoSelect.value = "placeholder";
        document.querySelector(".select").classList.add("hide");
        document.querySelector(".houseCupWins").classList.add("hide");
        // display score boards
        pOneHouseSelection.textContent = `${pOneHouse}'s Score`;
        pOneHouseSelection.classList.add(pOneHouse);
        pTwoHouseSelection.textContent = `${pTwoHouse}'s Score`;
        pTwoHouseSelection.classList.add(pTwoHouse);
        // display heading and board
        playerHeading.classList.remove("hide");
        playerHeading.classList.add(pOneHouse);
        playerHeading.textContent = `${pOneHouse}'s Turn...`;
        board.style.display = "grid";
        // hide start game button
        startBtn.classList.add("hide");
    }
}

// Start game button event listener
startBtn.addEventListener("click", start);

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
    if (event.target.tagName != "IMG") {
        // get images
        var pOnePiece = new Image(104, 130);
        pOnePiece.src = `images/${pOneHouse}.png`;
        var pTwoPiece = new Image(104, 130);
        pTwoPiece.src = `images/${pTwoHouse}.png`;    
        // player 1 turn
        if (playerHeading.textContent === `${pOneHouse}'s Turn...`) {
            event.target.append(pOnePiece);
            // push data-id of square into players array, covert to number
            pOne.push(Number(event.target.dataset.id));
            changeHeading();
        } else {
            // player 2 turn
            event.target.append(pTwoPiece);
            // push data-id of square into players array, covert to number
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
    }
}

// if there is a win. stop game play. highlight winning path. pop up button to reset the game. 
var win = winSeq => {
    // play win sound if mute button isn't clicked
    if (musicBtnClicked === 0) {
        winSound.play();
    }
    // remove event listener from the board so no more turns can be played
    allSquares.forEach(square => { square.removeEventListener("click", click) })
    // Change heading & score board
    if (playerHeading.textContent === `${pTwoHouse}'s Turn...`) {
        playerHeading.classList.add(pOneHouse);
        playerHeading.classList.remove(pTwoHouse);
        playerHeading.textContent = `${pOneHouse} Wins!`;
        pOneWins ++;
        document.querySelector(".pOneScore").textContent = pOneWins;
    } else if (playerHeading.textContent === `${pOneHouse}'s Turn...`) {
        playerHeading.classList.add(pTwoHouse);
        playerHeading.classList.remove(pOneHouse);
        playerHeading.textContent = `${pTwoHouse} Wins!`;
        pTwoWins ++;
        document.querySelector(".pTwoScore").textContent = pTwoWins;
    }
    // change the color of each winning square to house color
    winSeq.forEach(square => {
        if (playerHeading.textContent === `${pOneHouse} Wins!`) {
            document.querySelector(`[data-id='${square}']`).classList.add(`${pOneHouse}Square`);
        } else if (playerHeading.textContent === `${pTwoHouse} Wins!`) {
            document.querySelector(`[data-id='${square}']`).classList.add(`${pTwoHouse}Square`);
        }
    })
    // display reset game button
    resetBtn.style.display = "inline-block";
    resetBtn.addEventListener("click", resetGame);
    winCup();
}

// house cup winning function 
var winCup = function () {
    noToWinCup = Number(noToWinCup);
    if (pOneWins === noToWinCup) {
        playerHeading.classList.add(pOneHouse);
        playerHeading.classList.remove(pTwoHouse);
        playerHeading.textContent = `${pOneHouse} Wins The House Cup!`;
        resetBtn.style.display = "none";
        document.querySelector(".pOneHouseWin").classList.remove("hide");
    } else if (pTwoWins === noToWinCup) {
        playerHeading.classList.add(pTwoHouse);
        playerHeading.classList.remove(pOneHouse);
        playerHeading.textContent = `${pTwoHouse} Wins The House Cup!`;
        resetBtn.style.display = "none";
        document.querySelector(".pTwoHouseWin").classList.remove("hide");
    }
}

// Function to handle when there is no win outcome
var endNoWin = function (arr1, arr2) {
    if (playerHeading.textContent != `${pOneHouse} Wins!` && playerHeading.textContent != `${pTwoHouse} Wins!` && arr1.length + arr2.length === 9) {
        playerHeading.classList.add("hide");
        // playerHeading.textContent = "No one wins!"
        document.querySelector(".noWinner").classList.remove("hide");
        // display reset game button
        resetBtn.style.display = "inline-block";
        resetBtn.addEventListener("click", resetGame);
    }
}

// reset function
var resetGame = () => {
    document.querySelector(".noWinner").classList.add("hide");
    playerHeading.classList.remove("hide");
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
    } else if (playerHeading.textContent === `${pTwoHouse} Wins!`) {
        playerHeading.textContent = `${pOneHouse}'s Turn...`;
        playerHeading.classList.add(pOneHouse);
        playerHeading.classList.remove(pTwoHouse);
    } else {

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

var startNewGameFooterBtn = () => {
    resetScore();
    resetGame();
    board.style.display = "none";
    resetBtn.style.display = "none";
    playerHeading.classList = "playerHeading hide";
    document.querySelector(".select").classList.remove("hide");
    pOneDropDown.classList.remove("hide");
    pTwoDropDown.classList.remove("hide");
    startBtn.classList.remove("hide");
    pOneHouseSelection.classList = "pOneHouseSelection";
    pTwoHouseSelection.classList = "pTwoHouseSelection";
    pOneHouse = undefined;
    pTwoHouse= undefined;
    pTwoSelect.disabled = "disabled";
    document.querySelector(".noWinsForHouseCup").value = null;
    document.querySelector(".houseCupWins").classList.remove("hide");
}

// Event listeners for footer
document.querySelector(".resetScore").addEventListener("click", resetScore);
document.querySelector(".startNewGame").addEventListener("click", startNewGameFooterBtn);

// Music
var playTheme = () => {
    musicBtn.src = "images/unmute.png";
    theme.play();
    musicPlaying = true;
    musicBtnClicked = 0;
    return musicPlaying;
}

var pauseTheme = () => {
    musicBtn.src = "images/mute.png";
    theme.pause();
    theme.currentTime = 0;
    musicPlaying = false;
    musicBtnClicked = 1;
    return musicPlaying;
}

var startMusic = () => {
    if (musicBtnClicked === 0) {
        playTheme();
    } else {
        return;
    }
}

var musicBtnClick = () => {
    if (musicPlaying === true) {
        pauseTheme();
    } else {
        playTheme();
    }
    return musicPlaying;
}

musicBtn.addEventListener("click", musicBtnClick);