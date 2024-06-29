'use strict';

import {
  getCheckButton,
  getPlayAgainButton,
  getGuessText,
  getScoreText,
  getMessageText,
  getHighScoreText,
  getNumberElement,
  getBodyElement,
} from './selectors.js';

const max_guess = 20;
const backgroundWin = 'rgb(96,179,71)';
const backgroundNormal = 'rgb(34,34,34)';
let currentScore = max_guess;

function generateRandomNumber() {
  return Math.floor(Math.random() * max_guess);
}
function handleCheckButton(randomNumber) {
  const checkButton = getCheckButton();
  if (!checkButton) return;

  checkButton.addEventListener('click', () => {
    const guessValue = getGuessText().value;
    const messageText = getMessageText();
    const scoreText = getScoreText();
    const highScoreText = getHighScoreText();
    const numberText = getNumberElement();
    const bodyElement = getBodyElement();

    if (!guessValue) {
      messageText.innerText = 'No Number 😑😑😑';
      return;
    }
    if (currentScore === 0) {
      messageText.innerText = 'Game Over! 😭😭😭';
      checkButton.disabled = true;
      return;
    }
    if (guessValue < randomNumber || guessValue > randomNumber) {
      currentScore--;
      scoreText.innerText = currentScore;
      if (guessValue < randomNumber) messageText.innerText = 'Too low 🤞🤞🤞';
      else if (guessValue > randomNumber)
        messageText.innerText = 'Too high 🤷‍♀️🤷‍♀️🤷‍♀️';
    } else {
      messageText.innerText = 'Correct Number!!! 👌👌👌';
      checkButton.disabled = true;
      numberText.innerText = guessValue;
      bodyElement.style.background = backgroundWin;
      if (Number(scoreText.innerText) > Number(highScoreText.innerText))
        highScoreText.innerText = scoreText.innerText;
    }
  });
}

function handlePlayAgainButton() {
  const playAgainButton = getPlayAgainButton();
  if (!playAgainButton) return;

  playAgainButton.addEventListener('click', () => {
    const bodyElement = getBodyElement();
    const messageText = getMessageText();
    const scoreText = getScoreText();
    const numberText = getNumberElement();
    const guessText = getGuessText();
    const checkButton = getCheckButton();
    const randomNumber = generateRandomNumber();

    checkButton.disabled = false;
    bodyElement.style.backgroundColor = backgroundNormal;
    messageText.innerText = 'Start guessing...';
    currentScore = max_guess;
    scoreText.innerText = currentScore;
    numberText.innerText = '?';
    guessText.value = '';

    const newCheckButton = checkButton.cloneNode(true);
    checkButton.parentNode.replaceChild(newCheckButton, checkButton);

    handleCheckButton(randomNumber);
  });
}

(() => {
  const randomNumber = generateRandomNumber();
  handleCheckButton(randomNumber);
  handlePlayAgainButton();
})();
