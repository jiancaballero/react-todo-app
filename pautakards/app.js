/****************************************************************
VARIABLES
****************************************************************/

const fieldCards = [];
const deckCards = [
  //LIFE CARDS = 5
  { name: "Pamilya", value: 7, type: "life" },
  { name: "Tropa", value: 6, type: "life" },
  { name: "tulog", value: 5, type: "life" },
  { name: "Jowabels", value: 4, type: "life" },
  { name: "Kopi", value: 3, type: "life" },

  // ENERGY CARDS = 4
  { name: "harurut", value: 2, type: "energy" },
  { name: "chika", value: 4, type: "energy" },
  { name: "walwal", value: 3, type: "energy" },
  { name: "lamon", value: 5, type: "energy" },

  // COIN CARDS = 4
  { name: "ipon", value: 2, type: "coins" },
  { name: "ipon", value: 2, type: "coins" },
  { name: "sahod", value: 3, type: "coins" },
  { name: "alahas", value: 4, type: "coins" },

  // LIFE DMG CARDS = 4
  { name: "covid", value: 6, type: "lifedmg" },
  { name: "puyat", value: 5, type: "lifedmg" },
  { name: "stress", value: 4, type: "lifedmg" },
  { name: "droga", value: 3, type: "lifedmg" },
];

// GAME POINTS VARIABLES
let life = Number(10);
let energy = Number(10);
let coins = Number(0);
let silipCount = Number(0); //Max of 1
let nextSilip = Number(0); // 0 = available
// POINTS SELECTORS
let lifePoints = document.querySelector(".life-points");
let energyPoints = document.querySelector(".energy-points");
let coinPoints = document.querySelector(".coin-points");
let silipCounts = document.querySelector(".peek-count");
energyPoints.textContent = energy;
lifePoints.textContent = life;
coinPoints.textContent = coins;
silipCounts.textContent = silipCount;
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
const energyNotifPositive = document.querySelector(".energy-notif-positive");
const energyNotifNegative = document.querySelector(".energy-notif-negative");
const coinNotif = document.querySelector(".coin-notif");
const lifeNotifMessage = document.querySelector(".life-notif-msg");
const energyNotifMessage = document.querySelector(".energy-notif-msg");
const coinNotifMessage = document.querySelector(".coin-notif-msg");
const deckCount = document.querySelector(".deck-count");
const silipPopUp = document.querySelector(".pop-up-silip-notif");
// SILIP SELECTORS

let peekCount = document.querySelector(".peek-count");
let pasilipVisible = document.querySelector(".pasilip-visible");
let noPasilipVisible = document.querySelector(".no-pasilip-visible");
const silipNotAvailableMessage = document.querySelector(".silip-message");
const buySilipMessage = document.querySelector(".silip-available");

// OVERLAY
const overlay = document.querySelector(".overlay");

/************************************************************************************************
FUNCTIONS
************************************************************************************************/

showCards();
function showCards() {
  const fieldCards = generateFieldCards(9);
  deckCount.textContent = fieldCards.length;
  for (fCards of fieldCards) {
    //PARENT CARDS
    const gameCards = document.createElement("div");
    gameCards.setAttribute("card-value", fCards.value);
    gameCards.setAttribute("card-type", fCards.type);
    gameCards.setAttribute("class", "card animate__animated animate__rollIn");
    gameCards.style.setProperty("--animate-duration", "800ms");
    container.appendChild(gameCards);

    //FLIP CARDS
    const flipCards = document.createElement("div");
    flipCards.setAttribute("class", "flip-card-inner");
    gameCards.appendChild(flipCards);

    //FLIP CARD CLICK EVENT LISTENER
    flipCards.addEventListener("click", function () {
      if (gameCards.getAttribute("card-type") === "lifedmg") {
        if (silipCount != 0 && nextSilip == 0) {
          //FIXME: when player chose to use silip, flip the card.

          let playerUseSilip = useSilip();
          console.log(playerUseSilip);

          if (playerUseSilip === true) {
            flipCards.style.transform = "rotateY(180deg)";
            const cardValue = this.closest(".card").getAttribute("card-value");
            const cardType = this.closest(".card").getAttribute("card-type");
            getPoints(cardType, cardValue);
          }
        } else {
          flipCards.style.transform = "rotateY(180deg)";
          const cardValue = this.closest(".card").getAttribute("card-value");
          const cardType = this.closest(".card").getAttribute("card-type");
          getPoints(cardType, cardValue);
        }
      } else {
        flipCards.style.transform = "rotateY(180deg)";
        const cardValue = this.closest(".card").getAttribute("card-value");
        const cardType = this.closest(".card").getAttribute("card-type");
        getPoints(cardType, cardValue);
      }
    });

    // SHOW LIFE CARDS
    if (fCards.type.toLowerCase() === "life") {
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
        lifeCardImage.setAttribute(
          "src",
          "assets/icons/life-icons/pamilya.png"
        );
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

    // SHOW ENERGY CARDS
    if (fCards.type.toLowerCase() === "energy") {
      // CARD FLIP FRONT AND BACK CARD
      const energyCardFront = document.createElement("div");
      energyCardFront.setAttribute("class", "energy-card-front");
      const energyCardBack = document.createElement("div");
      energyCardBack.setAttribute("class", "flip-card-back energy-card-back");

      // FLIP CARD INNER APPEND energy CARD FRONT AND BACK
      flipCards.appendChild(energyCardFront);
      flipCards.appendChild(energyCardBack);

      // CARD BACK CARD TOP
      const backCardTop = document.createElement("div");
      backCardTop.setAttribute(
        "class",
        "energy-back-top back-card-top flex-container"
      );
      const smallEnergy = document.createElement("img");
      smallEnergy.setAttribute("src", "assets/icons/enery-header.png");
      const cardTitle = document.createElement("p");
      cardTitle.setAttribute("class", "card-title");
      cardTitle.textContent = `+${fCards.value}`;
      backCardTop.appendChild(smallEnergy);
      backCardTop.appendChild(cardTitle);

      //CARD BACK CARD BOTTOM
      const backCardBottom = document.createElement("div");
      backCardBottom.setAttribute(
        "class",
        "back-card-bottom energy-back-bottom",
        "flex-container"
      );
      const energyCardImage = document.createElement("img");
      if (fCards.name.toLowerCase() == "chika") {
        energyCardImage.setAttribute(
          "src",
          "assets/icons/energy-icons/chika.png"
        );
      }
      if (fCards.name.toLowerCase() == "harurut") {
        energyCardImage.setAttribute(
          "src",
          "assets/icons/energy-icons/harot.png"
        );
      }
      if (fCards.name.toLowerCase() == "walwal") {
        energyCardImage.setAttribute(
          "src",
          "assets/icons/energy-icons/walwal.png"
        );
      }
      if (fCards.name.toLowerCase() == "lamon") {
        energyCardImage.setAttribute(
          "src",
          "assets/icons/energy-icons/lamon.png"
        );
      }

      const energyCardTitle = document.createElement("h3");
      energyCardTitle.setAttribute("class", "back-card-text");
      energyCardTitle.textContent = fCards.name.toUpperCase();
      backCardBottom.appendChild(energyCardImage);
      backCardBottom.appendChild(energyCardTitle);

      // CARD BACK APPEND FRONT AND BACK
      energyCardBack.appendChild(backCardTop);
      energyCardBack.appendChild(backCardBottom);
    }
    // SHOW COIN CARDS
    if (fCards.type.toLowerCase() === "coins") {
      // CARD FLIP FRONT AND BACK CARD
      const coinCardFront = document.createElement("div");
      coinCardFront.setAttribute("class", "coin-card-front");
      const coinCardBack = document.createElement("div");
      coinCardBack.setAttribute("class", "flip-card-back coin-card-back");

      // FLIP CARD INNER APPEND coin CARD FRONT AND BACK
      flipCards.appendChild(coinCardFront);
      flipCards.appendChild(coinCardBack);

      // CARD BACK CARD TOP
      const backCardTop = document.createElement("div");
      backCardTop.setAttribute(
        "class",
        "coin-back-top back-card-top flex-container"
      );
      const smallCoin = document.createElement("img");
      smallCoin.setAttribute("src", "assets/icons/peso-card-header.png");
      const cardTitle = document.createElement("p");
      cardTitle.setAttribute("class", "card-title");
      cardTitle.textContent = `+${fCards.value}`;
      backCardTop.appendChild(smallCoin);
      backCardTop.appendChild(cardTitle);

      //CARD BACK CARD BOTTOM
      const backCardBottom = document.createElement("div");
      backCardBottom.setAttribute(
        "class",
        "back-card-bottom coin-back-bottom",
        "flex-container"
      );
      const coinCardImage = document.createElement("img");
      if (fCards.name.toLowerCase() == "alahas") {
        coinCardImage.setAttribute(
          "src",
          "assets/icons/coin-icons/diamond.png"
        );
      }
      if (fCards.name.toLowerCase() == "sahod") {
        coinCardImage.setAttribute("src", "assets/icons/coin-icons/sahod.png");
      }
      if (fCards.name.toLowerCase() == "ipon") {
        coinCardImage.setAttribute("src", "assets/icons/coin-icons/ipon.png");
      }

      const coinCardTitle = document.createElement("h3");
      coinCardTitle.setAttribute("class", "back-card-text");
      coinCardTitle.textContent = fCards.name.toUpperCase();
      backCardBottom.appendChild(coinCardImage);
      backCardBottom.appendChild(coinCardTitle);

      // CARD BACK APPEND FRONT AND BACK
      coinCardBack.appendChild(backCardTop);
      coinCardBack.appendChild(backCardBottom);
    }

    // SHOW LIFE DAMAGE CARDS
    if (fCards.type.toLowerCase() === "lifedmg") {
      // CARD FLIP FRONT AND BACK CARD
      const lifeDmgCardFront = document.createElement("div");
      lifeDmgCardFront.setAttribute("class", "life-dmg-card-front");
      const lifeDmgCardBack = document.createElement("div");
      lifeDmgCardBack.setAttribute(
        "class",
        "flip-card-back life-dmg-card-back"
      );

      // FLIP CARD INNER APPEND lifeDmg CARD FRONT AND BACK
      flipCards.appendChild(lifeDmgCardFront);
      flipCards.appendChild(lifeDmgCardBack);

      // CARD BACK CARD TOP
      const backCardTop = document.createElement("div");
      backCardTop.setAttribute(
        "class",
        "life-dmg-back-top back-card-top flex-container"
      );
      const smallSkull = document.createElement("img");
      smallSkull.setAttribute("src", "assets/icons/human-skull.png");
      const cardTitle = document.createElement("p");
      cardTitle.setAttribute("class", "card-title");
      cardTitle.textContent = `+${fCards.value}`;
      backCardTop.appendChild(smallSkull);
      backCardTop.appendChild(cardTitle);

      //CARD BACK CARD BOTTOM
      const backCardBottom = document.createElement("div");
      backCardBottom.setAttribute(
        "class",
        "back-card-bottom life-dmg-back-bottom",
        "flex-container"
      );
      const lifeDmgCardImage = document.createElement("img");
      if (fCards.name.toLowerCase() == "puyat") {
        lifeDmgCardImage.setAttribute(
          "src",
          "assets/icons/life-damage-icons/puyat.png"
        );
      }
      if (fCards.name.toLowerCase() == "stress") {
        lifeDmgCardImage.setAttribute(
          "src",
          "assets/icons/life-damage-icons/istres.png"
        );
      }
      if (fCards.name.toLowerCase() == "droga") {
        lifeDmgCardImage.setAttribute(
          "src",
          "assets/icons/life-damage-icons/droga.png"
        );
      }
      if (fCards.name.toLowerCase() == "covid") {
        lifeDmgCardImage.setAttribute(
          "src",
          "assets/icons/life-damage-icons/covid.png"
        );
      }

      const lifeDmgCardTitle = document.createElement("h3");
      lifeDmgCardTitle.setAttribute("class", "back-card-text");
      lifeDmgCardTitle.textContent = fCards.name.toUpperCase();
      backCardBottom.appendChild(lifeDmgCardImage);
      backCardBottom.appendChild(lifeDmgCardTitle);

      // CARD BACK APPEND FRONT AND BACK
      lifeDmgCardBack.appendChild(backCardTop);
      lifeDmgCardBack.appendChild(backCardBottom);
    }
  }
}

//RANDOMIZE FIELD CARDS
function generateFieldCards(cardCount) {
  let fieldCards = [];
  while (fieldCards.length != cardCount) {
    const randomIndex = Math.floor(Math.random() * deckCards.length);
    if (!fieldCards.includes(deckCards[randomIndex])) {
      fieldCards.push(deckCards[randomIndex]);
    }
  }
  return fieldCards;
}

//RANDOMIZE DECK CARDS 13-18

//TODO: function getRandomCardOnDeck() {}

function getPoints(cardType, cardValue) {
  switch (cardType.toLowerCase()) {
    case "life":
      increaseLifePoints(Number(cardValue));
      if (nextSilip > 0) {
        nextSilip--;
        checkSilip();
      } else {
        nextSilip = 0;
        checkSilip();
      }
      break;
    case "energy":
      if (nextSilip > 0) {
        nextSilip--;
        checkSilip();
      } else {
        nextSilip = 0;
        checkSilip();
      }
      break;
    case "coins":
      increaseCoinPoints(Number(cardValue));
      if (nextSilip > 0) {
        nextSilip--;
        checkSilip();
      } else {
        nextSilip = 0;
        checkSilip();
      }
      break;
    case "lifedmg":
      decreaseLifePoints(Number(cardValue));
      if (nextSilip > 0) {
        nextSilip--;
        checkSilip();
      } else {
        nextSilip = 0;
        checkSilip();
      }
      break;
  }
}
function increaseLifePoints(lPoints) {
  decreaseEnergyPoints();
  let lifeAdded = 0;
  if (life === 10) {
    life = 10;
  } else {
    if (energy === 0) {
      if (life + lPoints - 1 >= 10) {
        lifeAdded = 10 - life;
        life += lifeAdded;
        lifePoints.textContent = life;
        displayLifeNotification(lifeAdded, "positive");
      } else {
        lifeAdded = lPoints;
        life += lifeAdded;
        lifePoints.textContent = life;
        displayLifeNotification(lifeAdded, "positive");
      }
    } else {
      if (life + lPoints >= 10) {
        lifeAdded = 10 - life;
        life += lifeAdded;
        lifePoints.textContent = life;
        displayLifeNotification(lifeAdded, "positive");
      } else {
        lifeAdded = lPoints;
        life += lifeAdded;
        lifePoints.textContent = life;
        displayLifeNotification(lifeAdded, "positive");
      }
    }
  }
}
function increaseEnergyPoints(ePoints) {
  let energyAdded = 0;
  if (energy === 10) {
    energy = 10;
  } else {
    if (energy + ePoints >= 10) {
      energyAdded = 10 - energy;
      energy += energyAdded;
      energyPoints.textContent = energy;
      displayEnergyNotification(energyAdded, "positive");
    } else {
      energyAdded = ePoints;
      energy += energyAdded;
      // energyNotif.classList.remove('hidden');
      // energyNotifMessage.textContent=`+ ${energyAdded}`;
      energyPoints.textContent = energy;
      displayEnergyNotification(energyAdded, "positive");
    }
  }
}
function increaseCoinPoints(cPoints) {
  let coinAdded = 0;
  decreaseEnergyPoints();
  if (energy === 0) {
    if (life - 1 === 0) {
      alert("Game Over");
    } else {
      life--;
      coinAdded = cPoints;
      coins += coinAdded;
      coinPoints.textContent = coins;
      displayCoinNotification(coinAdded, "positive");
    }
  } else {
    let coinAdded = cPoints;
    coins += coinAdded;
    console.log(coins);
    coinPoints.textContent = coins;
    displayCoinNotification(coinAdded, "positive");
  }
}

function decreaseCointPoints(cPoints) {
  console.log(cPoints, coins);
  coins -= cPoints;
  coinPoints.textContent = coins;
  displayCoinNotification(cPoints, "negative");
}
function decreaseLifePoints(lDmgPoints) {
  lifeDamageAdded = 0;
  energy--;
  energyPoints.textContent = energy;
  if (energy === 0) {
    if (life - 1 <= 0) {
      life = 0;
      lifePoints.textContent = life;
      alert("Game Over");
    } else {
      lifeDamageAdded = lDmgPoints + 1;
      life -= lifeDamageAdded;
      lifePoints.textContent = life;
      displayLifeNotification(lDmgPoints, "negative");
    }
  } else {
    if (life - lDmgPoints <= 0) {
      life = 0;
      lifePoints.textContent = life;
      displayLifeNotification(lDmgPoints, "negative");
      alert("Game Over");
    } else {
      lifeDamageAdded = lDmgPoints;
      life -= lifeDamageAdded;
      coinPoints.textContent = coins;
      lifePoints.textContent = life;
      displayLifeNotification(lDmgPoints, "negative");
    }
  }
}
function decreaseEnergyPoints() {
  energy--;
  energyPoints.textContent = energy;
  displayEnergyNotification(1, "negative");
}

function checkSilip() {
  if (coins >= 5 && nextSilip === 0 && silipCount === 0) {
    silipNotAvailableMessage.classList.remove("hidden");
    buySilipMessage.classList.remove("hidden");
    buySilipMessage.textContent = "buy";
    silipNotAvailableMessage.classList.add("hidden");
    peekCount.textContent = silipCount;
    pasilipVisible.classList.add("hidden");
  }
  //waiting for second card selection
  else if (coins >= 5 && nextSilip > 0 && silipCount === 0) {
    silipNotAvailableMessage.classList.remove("hidden");
    silipNotAvailableMessage.textContent = `available after ${nextSilip} turn/s`;
    buySilipMessage.classList.add("hidden");
    peekCount.textContent = silipCount;
    pasilipVisible.classList.add("hidden");
  }
  //can not buy silip
  else {
    silipNotAvailableMessage.classList.remove("hidden");
    buySilipMessage.classList.add("hidden");
    peekCount.textContent = silipCount;
    pasilipVisible.classList.add("hidden");
  }
}

function buySilip() {
  decreaseEnergyPoints();
  const lifeDmgCards = document.querySelectorAll(".card");
  decreaseCointPoints(5);
  silipCount = 1;
  silipCounts.textContent = silipCount;
  pasilipVisible.classList.remove("hidden");
  noPasilipVisible.classList.add("hidden");
  buySilipMessage.classList.add("hidden");
  silipNotAvailableMessage.classList.add("hidden");

  for (const lifeDmgCard of lifeDmgCards) {
    if (lifeDmgCard.getAttribute("card-type") === "lifedmg") {
      const silipIconContainer = document.createElement("div");
      silipIconContainer.setAttribute(
        "class",
        "silip-icon animate__animated animate__pulse  animate__infinite"
      );
      const silipIcon = document.createElement("img");
      silipIcon.setAttribute("src", "assets/icons/pasilip.png");
      silipIconContainer.appendChild(silipIcon);
      lifeDmgCard.appendChild(silipIconContainer);
    }
  }
}
buySilipMessage.addEventListener("click", buySilip);

function useSilip() {
  let silipIsUsed = false;

  const continueButton = document.querySelector(".btn-continue");
  const cancelButton = document.querySelector(".btn-cancel");
  const silipCountText = document.querySelector(".pasilip-count-text");
  silipCountText.textContent = silipCount;
  overlay.classList.remove("hidden");
  silipPopUp.classList.remove("hidden");

  continueButton.addEventListener("click", function () {
    silipCount = 0;
    nextSilip = 2;
    checkSilip();
    overlay.classList.add("hidden");
    silipPopUp.classList.add("hidden");
    silipIsUsed = true;
    return silipIsUsed;
  });

  cancelButton.addEventListener("click", function () {
    overlay.classList.add("hidden");
    silipPopUp.classList.add("hidden");
    silipIsUsed = false;
    return silipIsUsed;
  });
  console.log(silipIsUsed);
  return silipIsUsed;
}

function displayLifeNotification(lPoints, notificationType) {
  //FIXME: notifications only appear one time. some notifications dont appear.
  if (notificationType.toLowerCase() === "positive") {
    lifeNotif.classList.add("plus-notif");
    lifeNotif.classList.remove("hidden");
    lifeNotifMessage.textContent = `+${lPoints}`;
  } else {
    lifeNotif.classList.add("minus-notif");
    lifeNotif.classList.remove("hidden");
    lifeNotifMessage.textContent = `-${lPoints}`;
  }
}

function displayEnergyNotification(ePoints, notificationType) {
  if (notificationType.toLowerCase() === "positive") {
    energyNotifPositive.classList.remove("hidden");
    energyNotifPositive.classList.add("plus-notif");
    energyNotifMessage.classList.remove("hidden");
    energyNotifMessage.textContent = `+${ePoints}`;
  } else {
    energyNotifNegative.classList.remove("hidden");
    energyNotifNegative.classList.add("minus-notif");
    // energyNotifMessage.classList.remove("hidden");
    energyNotifMessage.textContent = `-${ePoints}`;
  }
}
function displayCoinNotification(cPoints, notificationType) {
  if (notificationType.toLowerCase() === "positive") {
    coinNotif.classList.remove("hidden");
    coinNotif.classList.add("plus-notif");
    coinNotifMessage.textContent = `+${cPoints}`;
  } else {
    coinNotif.classList.add("minus-notif");
    coinNotif.classList.remove("hidden");
    coinNotifMessage.textContent = `-${cPoints}`;
  }
}
