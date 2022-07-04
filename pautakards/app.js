const allCards = [
  //LIFE CARDS = 10
  { name: "pamilya", value: 8, type: "life" },
  { name: "Tropa", value: 7, type: "life" },
  { name: "Jowabels", value: 6, type: "life" },
  { name: "Logtu", value: 5, type: "life" },
  { name: "Kopi", value: 4, type: "life" },
  { name: "Pamilya", value: 8, type: "life" },
  { name: "Tropapeeps", value: 7, type: "life" },
  { name: "Jowabels", value: 6, type: "life" },
  { name: "Logtu", value: 5, type: "life" },
  { name: "Kopi", value: 4, type: "life" },

  //ENERGY CARDS = 10
  { name: "harurut", value: 8, type: "energy" },
  { name: "chika", value: 7, type: "energy" },
  { name: "walwalan", value: 6, type: "energy" },
  { name: "lamon", value: 5, type: "energy" },
  { name: "harurut", value: 8, type: "energy" },
  { name: "chika", value: 7, type: "energy" },
  { name: "walwalan", value: 6, type: "energy" },
  { name: "lamon", value: 5, type: "energy" },
  { name: "walwalan", value: 6, type: "energy" },
  { name: "chika", value: 5, type: "energy" },

  //COIN CARDS = 6
  { name: "ipon", value: 8, type: "coins" },
  { name: "sahod", value: 7, type: "coins" },
  { name: "alahas", value: 6, type: "coins" },
  { name: "ipon", value: 8, type: "coins" },
  { name: "sahod", value: 7, type: "coins" },
  { name: "alahas", value: 6, type: "coins" },

  //LIFE DAMAGE DEALER CARDS =10
  { name: "covid", value: 8, type: "lifeDamage" },
  { name: "puyat", value: 7, type: "lifeDamage" },
  { name: "stress", value: 6, type: "lifeDamage" },
  { name: "droga", value: 5, type: "lifeDamge" },
  { name: "covid", value: 8, type: "lifeDamage" },
  { name: "puyat", value: 7, type: "lifeDamage" },
  { name: "stress", value: 6, type: "lifeDamage" },
  { name: "droga", value: 5, type: "lifeDamge" },
  { name: "puyat", value: 7, type: "lifeDamage" },
  { name: "stress", value: 6, type: "lifeDamage" },
];
const deckCards = [];
const fieldCards = [
  { name: "Pamilya", value: 8, type: "life" },
  { name: "Tropa", value: 7, type: "life" },
  { name: "Jowabels", value: 6, type: "life" },
  { name: "tulog", value: 5, type: "life" },
  { name: "Kopi", value: 4, type: "life" },

  { name: "harurut", value: 8, type: "energy" },
  { name: "chika", value: 7, type: "energy" },
  { name: "walwalan", value: 6, type: "energy" },
  { name: "lamon", value: 5, type: "energy" },

  { name: "ipon", value: 8, type: "coins" },
  { name: "sahod", value: 7, type: "coins" },
  { name: "alahas", value: 6, type: "coins" },

  { name: "covid", value: 8, type: "lifeDamage" },
  { name: "puyat", value: 7, type: "lifeDamage" },
  { name: "stress", value: 6, type: "lifeDamage" },
  { name: "droga", value: 5, type: "lifeDamge" },
];

// GAME POINTS VARIABLES
let life = Number(10);
let energy = Number(10);
let coins = Number(10);
let silipCount = 0;
let nextSilip = 0;

// POINTS SELECTORS
let lifePoints = document.querySelector(".life-points");
let energyPoints = document.querySelector(".energy-points");
let coinPoints = document.querySelector(".coin-points");

// CONTAINER SELECTOR
const container = document.querySelector(".container");

const energyCardFront = document.createElement("div");
energyCardFront.setAttribute("class", "energy-card-front");

const coinCardFront = document.createElement("div");
coinCardFront.setAttribute("class", "coin-card-front");

const lifeDmgCardFront = document.createElement("div");
lifeDmgCardFront.setAttribute("class", "life-dmg-card-front");

const backCardBottom = document.createElement("div");
backCardBottom.setAttribute("class", "back-card-bottom");

// POINTS NOTIFICATION SELECTION
const lifeNotif = document.querySelector(".life-notif");
const energyNotif = document.querySelector(".energy-notif");
const coinNotif = document.querySelector(".coin-notif");
const lifeNotifMessage = document.querySelector(".life-notif-msg");
const energyNotifMessage = document.querySelector(".energynotif-msg");
const coinNotifMessage = document.querySelector(".coin-notif-msg");

// SILIP SELECTORS
let peekCount = document.querySelector(".peek-count");
let pasilipVisible = document.querySelector(".pasilip-visible");
let noPasilipVisible = document.querySelector(".no-pasilip-visible");
let silipMessage = document.querySelector(".silip-message");

displayPoints();
function startGame() {
  showCards();

  // for (let flip of flipCards) {
  //   flip.addEventListener("click", function () {
  //     flip.style.transform = "rotateY(180deg)";
  //   });
  // }
}

function showCards() {
  for (fCards of fieldCards) {
    if (fCards.type.toLowerCase() === "life") {
      // PARENT CARD
      const gameCards = document.createElement("div");
      gameCards.setAttribute("class", "card life-card animate__animated animate__rollIn");
      gameCards.style.setProperty('--animate-duration', '800ms')
      container.appendChild(gameCards);

      //FLIP CARDS
      const flipCards = document.createElement("div");
      flipCards.setAttribute("class", "flip-card-inner");
      gameCards.appendChild(flipCards);

      // CARD FLIP FRONT AND BACK CARD
      const lifeCardFront = document.createElement("div");
      lifeCardFront.setAttribute("class", "life-card-front");
      const lifeCardBack = document.createElement("div");
      lifeCardBack.setAttribute("class", "flip-card-back life-card-back");

      // FLIP CARD INNER APPEND LIFE CARD FRONT AND BACK
      flipCards.appendChild(lifeCardFront);
      flipCards.appendChild(lifeCardBack);

      // CARD BACK CARD TOP
      const backCardTop = document.createElement("div");
      backCardTop.setAttribute(
        "class",
        "life-back-top back-card-top flex-container"
      );
      const smallHeart = document.createElement("img");
      smallHeart.setAttribute("src", "assets/icons/heart-header.png");
      const cardTitle = document.createElement("p");
      cardTitle.setAttribute("class", "card-title");
      cardTitle.textContent = `+${fCards.value}`;
      backCardTop.appendChild(smallHeart);
      backCardTop.appendChild(cardTitle);

      //CARD BACK CARD BOTTOM
      const backCardBottom = document.createElement("div");
      backCardBottom.setAttribute(
        "class",
        "back-card-bottom life-back-bottom",
        "flex-container"
      );
      const lifeCardImage = document.createElement("img");
      if (fCards.name.toLowerCase() == "pamilya") {
        lifeCardImage.setAttribute("src", "assets/icons/life-icons/pamilya.png");
      }
      if (fCards.name.toLowerCase() == "tropa") {
        lifeCardImage.setAttribute("src", "assets/icons/life-icons/tropa.png");
      }
      if (fCards.name.toLowerCase() == "jowabels") {
        lifeCardImage.setAttribute("src", "assets/icons/life-icons/jowa.png");
      }
      if (fCards.name.toLowerCase() == "tulog") {
        lifeCardImage.setAttribute("src", "assets/icons/life-icons/tulog.png");
      }
      if (fCards.name.toLowerCase() == "kopi") {
        lifeCardImage.setAttribute("src", "assets/icons/life-icons/kape.png");
      }
      const lifeCardTitle = document.createElement("h3");
      lifeCardTitle.setAttribute("class", "back-card-text");
      lifeCardTitle.textContent = fCards.name.toUpperCase();
      backCardBottom.appendChild(lifeCardImage);
      backCardBottom.appendChild(lifeCardTitle);

      // CARD BACK APPEND FRONT AND BACK
      lifeCardBack.appendChild(backCardTop);
      lifeCardBack.appendChild(backCardBottom);
    }
  }
}

function displayPoints() {
  lifePoints.textContent = life;
  energyPoints.textContent = energy;
  coinPoints.textContent = coins;
  peekCount.textContent = silipCount;
  displaySilip();
  startGame();
}

function displaySilip() {
  if (silipCount === 1 && coins !== 0) {
    pasilipVisible.classList.remove("hidden");
    noPasilipVisible.classList.add("hidden");
    silipMessage.classList.remove("silip-not-available");
    silipMessage.textContent = "Available";
  } else {
    noPasilipVisible.classList.remove("hidden");
    pasilipVisible.classList.add("hidden");
    silipMessage.classList.remove("silip-available");
    silipMessage.textContent = "Not Available";
  }
}

function buySilip() {
  alert(nextSilip);
  if (coins < 5) {
    alert("silip not available");
  } else {
    if (nextSilip % 2 == 0) {
      //create modal forr user to buy silip
      TODO: coins -= 5;
      silipCount = 1;
      checkNextSilip();
      displayPoints();
    }
  }
}

function checkNextSilip() {
  nextSilip += 1;
  return;
}
