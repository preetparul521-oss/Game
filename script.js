
const emojis = ['😀','😁','😂','🤣','😃','😄','😅','😆'];
let cards = [...emojis, ...emojis];
cards.sort(() => 0.5 - Math.random());

const board = document.getElementById('gameBoard');
let firstCard, secondCard;
let lockBoard = false;

function createBoard() {
  board.innerHTML = '';
  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = '';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard || this.textContent) return;

  this.textContent = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      firstCard = secondCard = null;
      lockBoard = false;
    } else {
      setTimeout(() => {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard = secondCard = null;
        lockBoard = false;
      }, 1000);
    }
  }
}

function restartGame() {
  cards.sort(() => 0.5 - Math.random());
  firstCard = secondCard = null;
  lockBoard = false;
  createBoard();
}

createBoard();
