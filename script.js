console.log("Screen width:", window.innerWidth);
let screenHieght = window.innerHeight;
let hexagonHieght = 44;
let numberOfHexagons = Math.floor(screenHieght / hexagonHieght);
document.body.classlist.add("overlay-active");

function createHexagon(targetId) {
    let svgNamespace = "http://www.w3.org/2000/svg";
    let hexagon = document.createElementNS(svgNamespace, "svg");
    hexagon.setAttribute("width", "40");
    hexagon.setAttribute("height", "40");
    hexagon.setAttribute("viewBox", "0 0 100 100");

    let polygon = document.createElementNS(svgNamespace, "polygon");
    polygon.setAttribute("points", "50,1 95,25 95,75 50,99 5,75 5,25");
    polygon.setAttribute("fill", "none");
    polygon.setAttribute("stroke", "black");
    polygon.setAttribute("stroke-width", "4");

    hexagon.appendChild(polygon);
    document.querySelector(targetId).appendChild(hexagon);
}

for (let i = 0; i < numberOfHexagons; i++) {
    createHexagon("#js-hexagon-line");
}

for (let i = 0; i < numberOfHexagons - 1; i++) {
    createHexagon("#js-hexagon-line-offset");
}
let player1Score = document.querySelector("#player1-score");
let player1PlusButton = document.querySelector("#player1-plus");
let player1MinusButton = document.querySelector("#player1-minus");

player1PlusButton.addEventListener("click", function() {
    let currentScore = Number(player1Score.textContent);
    let newScore = currentScore + 1;
    player1Score.textContent = newScore;
    checkForWinner(document.querySelector("#player1-name").textContent, newScore);
});

player1MinusButton.addEventListener("click", function() {
    let currentScore = Number(player1Score.textContent);
    if (currentScore > 0) {
        let newScore = currentScore - 1;
        player1Score.textContent = newScore;
    }
});
let player2Score = document.querySelector("#player2-score");
let player2PlusButton = document.querySelector("#player2-plus");

player2PlusButton.addEventListener("click", function() {
    let currentScore = Number(player2Score.textContent);
    let newScore = currentScore + 1;
    player2Score.textContent = newScore;
    checkForWinner(document.querySelector("#player2-name").textContent, newScore);
});
let player2MinusButton = document.querySelector("#player2-minus");

player2MinusButton.addEventListener("click", function() {
    let currentScore = Number(player2Score.textContent);
    if (currentScore > 0) {
        let newScore = currentScore - 1;
        player2Score.textContent = newScore;
    }
});
let player1ResetButton = document.querySelector("#player1-reset");

player1ResetButton.addEventListener("click", function() {
    player1Score.textContent = 0;
});
let player2ResetButton = document.querySelector("#player2-reset");

player2ResetButton.addEventListener("click", function() {
    player2Score.textContent = 0;
});
let player1NameInput = document.querySelector("#player1-name-input");
let player1ColorInput = document.querySelector("#player1-color-input");
let player2NameInput = document.querySelector("#player2-name-input");
let player2ColorInput = document.querySelector("#player2-color-input");
let winTargetInput = document.querySelector("#win-target-input");
let startGameButton = document.querySelector("#start-game-button");
let setupOverlay = document.querySelector("#setup-overlay");

let winOverlay = document.querySelector("#win-overlay");
let winnerMessage = document.querySelector("#winner-message");
let restartButton = document.querySelector("#restart-button");
let winTarget = 10;

function checkForWinner(playerName, score) {
    if (score >= winTarget) {
        winnerMessage.textContent = playerName + " Won!";
        winOverlay.style.display = "flex";
        confetti({
            particleCount: 200,
            spread: 90,
            origin: {y: 0.6}
        });
    }
}

restartButton.addEventListener("click", function() {
    location.reload();
});
startGameButton.addEventListener("click", function() {
    let player1Name = player1NameInput.value;
    let player1Color = player1ColorInput.value;
    let player2Name = player2NameInput.value;
    let player2Color = player2ColorInput.value;
    winTarget = Number(winTargetInput.value);
    document.body.classlist.remove("overlay-active");

    document.querySelector("#player1-name").textContent = player1Name;
    document.querySelector("#player2-name").textContent = player2Name;

    document.documentElement.style.setProperty("--player1-color", player1Color);
    document.documentElement.style.setProperty("--player2-color", player2Color);

    setupOverlay.style.display = "none";
});
