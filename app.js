var allSquares = document.querySelectorAll(".square");

allSquares.forEach(square => {
    square.addEventListener("click", event => {
        event.target.textContent = "X";
    })
})