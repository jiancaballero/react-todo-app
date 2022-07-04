/****************************************************************
VARIABLES
****************************************************************/

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
  { name: "sahod", value: 3, type: "coins" },
  { name: "alahas", value: 4, type: "coins" },

  // LIFE DMG CARDS = 4
  { name: "covid", value: 6, type: "lifedmg" },
  { name: "puyat", value: 5, type: "lifedmg" },
  { name: "stress", value: 4, type: "lifedmg" },
  { name: "droga", value: 3, type: "lifedmg" },
];
const fieldCards = [];

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
const energyNotif = document.querySelector(".energy-notif");
const coinNotif = document.querySelector(".coin-notif");
const lifeNotifMessage = document.querySelector(".life-notif-msg");
const energyNotifMessage = document.querySelector(".energynotif-msg");
const coinNotifMessage = document.querySelector(".coin-notif-msg");
const deckCount = document.querySelector(".deck-count");

// SILIP SELECTORS
let peekCount = document.querySelector(".peek-count");
let pasilipVisible = document.querySelector(".pasilip-visible");
let noPasilipVisible = document.querySelector(".no-pasilip-visible");
let silipMessage = document.querySelector(".silip-message");

/************************************************************************************************
FUNCTIONS
************************************************************************************************/

showCards();
function showCards() {
  const fieldCards = generateFieldCards(9);

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
      flipCards.style.transform = "rotateY(180deg)";
      const cardValue = this.closest(".card").getAttribute("card-value");
      const cardType = this.closest(".card").getAttribute("card-type");

      switch (cardType.toLowerCase()) {
        case "life":
          updateLifePoints(Number(cardValue));
          break;
        case "energy":
          updateEnergyPoints(Number(cardValue));
          break;
        case "coins":
          updateCoinPoints(Number(cardValue));
          break;
        case "lifedmg":
          updateLifeDamagePoints(Number(cardValue));
          break;
      }
    });

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

//RANDOMIZE DECK CARDS
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

function updateLifePoints(lPoints) {
  energy--;
  energyPoints.textContent = energy;
  let lifeAdded = 0;
  if (life === 10) {
    life = 10;
  } else {
    if (energy === 0) {
      if (life + lPoints - 1 >= 10) {
        lifeAdded = 10 - life;
        life += lifeAdded;
        lifeNotif.classList.remove("hidden");
        lifeNotifMessage.textContent = `+ ${lifeAdded}`;
        lifePoints.textContent = life;
      } else {
        lifeAdded = lPoints;
        life += lifeAdded;
        lifeNotif.classList.remove("hidden");
        lifeNotifMessage.textContent = `+ ${lifeAdded}`;
        lifePoints.textContent = life;
      }
    } else {
      if (life + lPoints >= 10) {
        lifeAdded = 10 - life;
        life += lifeAdded;
        lifeNotif.classList.remove("hidden");
        lifeNotifMessage.textContent = `+ ${lifeAdded}`;
        lifePoints.textContent = life;
      } else {
        lifeAdded = lPoints;
        life += lifeAdded;
        lifeNotif.classList.remove("hidden");
        lifeNotifMessage.textContent = `+ ${lifeAdded}`;
        lifePoints.textContent = life;
      }
    }
  }
}
function updateEnergyPoints(ePoints) {
  let energyAdded = 0;
  debugger;
  if (energy === 10) {
    energy = 10;
  } else {
    if (energy + ePoints >= 10) {
      energyAdded = 10 - energy;
      energy += energyAdded;
      console.log(energy);
      // energyNotif.classList.remove('hidden');
      // energyNotifMessage.textContent=`+ ${energyAdded}`;
      energyPoints.textContent = energy;
    } else {
      energyAdded = ePoints;
      energy += energyAdded;
      // energyNotif.classList.remove('hidden');
      // energyNotifMessage.textContent=`+ ${energyAdded}`;
      energyPoints.textContent = energy;
    }
  }
}
function updateCoinPoints(cPoints) {
  let coinAdded = 0;
  energy--;
  energyPoints.textContent = energy;
  if (energy === 0) {
    if (life - 1 === 0) {
      alert("Game Over");
    } else {
      life--;
      coinAdded = cPoints;
      coins += coinAdded;
      coinPoints.textContent = coins;
      checkSilip();
    }
  } else {
    let coinAdded = cPoints;
    coins += coinAdded;
    coinPoints.textContent = coins;
    
    checkSilip();
    // coinNotif.classList.remove('hidden');
    // coinNotifMessage.textContent=`+ ${coinAdded}`;
  }
}
function updateLifeDamagePoints(lDmgPoints) {
  lifeDamageAdded = 0;
  energy--;
  energyPoints.textContent = energy;
  if (energy === 0) {
    if (life - 1 <= 0) {
      life=0;
      lifePoints.textContent = life;
      alert("Game Over");
    } else {
      lifeDamageAdded = lDmgPoints + 1;
      life -= lifeDamageAdded;
      // lifeNotif.classList.remove("hidden");
      //   lifeNotifMessage.textContent = `+ ${lifeAdded}`;
      lifePoints.textContent = life;
      
    }
  } else {
    if (life - lDmgPoints <= 0) {
      life =0;
      lifePoints.textContent = life;
      alert("Game Over");
     
    } else {
      lifeDamageAdded = lDmgPoints;
      life -= lifeDamageAdded;
      coinPoints.textContent = coins;
      // lifeNotif.classList.remove("hidden");
      //   lifeNotifMessage.textContent = `+ ${lifeAdded}`;
      lifePoints.textContent = life;
    }
  }
}

function checkSilip(){
  console.log(coins,nextSilip,silipCount)

  //first coin gained
  if(coins>=5 && nextSilip===0  && silipCount===0){
    peekCount.textContent=silipCount;
    silipMessage.classList.add("silipAvailable");
    silipMessage.textContent='buy';
  }
}