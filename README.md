# Project 1: the Game

## Tic-Tac-Potter

This is the game that I have created for Project 1: the Game.
Access the working game [here.](https://camillacdc.github.io/tic-tac-toe/)

### Challenges

* Figuring out how to determine wins, and making sure win appeared correctly
* Making sure that player turns alternated and the right image appeared for each player
* Ensuring that the right elements appeared and disappeared at the right time

### Cool Tech

* Players can select a house to play as, and the house crest is their piece
* Music plays when the "Start Game" button is clicked as well as a win sound, however if the user chooses to mute the music neither will play again, even if they click "Start New Game"
* Custom cursors
* Running score boards, can also be rest

### How Wins Are Checked

Wins are checked by comparing the indexes in the players array versus the winning sequences. The winning sequences are stored as arrays within an array. 

If the players array length is equal to or greater than three a loop is entered which checks each win sequence again the numbers in the players array. If a number in the players array matches one of the numbers in a win sequence the counter goes up one. If the counter reaches three, meaning that the players array has all three numbers of a winning sequence the win function is called. 

The win function plays the winning sound if the mute button hasn't been clicked. It then removes the event listener so no more turns can be played. The heading is changed to indicate which player has won and the score board is updated. The winning sequence is highlighted in the house colour. Finally the reset game button appears. 

### Lessons Learned

I struggled with two crests appearing in the same square. I was unsure how to make ensure that the click function didn't trigger if the square was not empty. After some trail and error I discovered event.target.tagName would allow me to check whether there was an imagine in the square already. 

Giving the user the control of the music was new for me. I initally wanted the music to play when the page load, but some reading seemed to indicate that this was a poor user experience so I decided to trigger the music to play once the "Start Game" button was clicked. If the user chose to mute the music I wanted to ensure that if even if they started a new game the music didn't start playing again. I got around this by adding a varaible to indicate whether the mute button had been clicked or not. I think there might be a more elegant way to get around this, but my solution still functions. 