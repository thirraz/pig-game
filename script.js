"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", () => {
    if (playing) {
        // 1. - Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. - Display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `./imgs/dice-${dice}.png`;

        // 3. - Check for rolled 1:
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", () => {
    if (playing) {
        // 1. - Add current score to active player's score
        scores[activePlayer] += currentScore;
        console.log(scores[activePlayer]);

        //scores[1] = scores[1] + currentScore
        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. - Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            //Finish the game
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--active");
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});
