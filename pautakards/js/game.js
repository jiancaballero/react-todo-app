/****************************************************************
                            VARIABLES
****************************************************************/

const fieldCards = [];
const deckCards = [
  //LIFE CARDS = 12
  { name: "Pamilya", value: 7, type: "life" },
  { name: "Pamilya", value: 7, type: "life" },
  { name: "Tropa", value: 6, type: "life" },
  { name: "Tropa", value: 6, type: "life" },
  { name: "tulog", value: 5, type: "life" },
  { name: "tulog", value: 5, type: "life" },
  { name: "Jowabels", value: 4, type: "life" },
  { name: "Kopi", value: 3, type: "life" },
  { name: "Kopi", value: 3, type: "life" },
  { name: "Kopi", value: 3, type: "life" },

  // ENERGY CARDS = 8
  { name: "harurut", value: 2, type: "energy" },
  { name: "harurut", value: 2, type: "energy" },

  { name: "walwal", value: 3, type: "energy" },
  { name: "walwal", value: 3, type: "energy" },

  { name: "chika", value: 4, type: "energy" },
  { name: "chika", value: 4, type: "energy" },
  { name: "lamon", value: 5, type: "energy" },
  { name: "lamon", value: 5, type: "energy" },

  // COIN CARDS =8
  { name: "ipon", value: 2, type: "coins" },
  { name: "ipon", value: 2, type: "coins" },
  { name: "ipon", value: 2, type: "coins" },
  { name: "ipon", value: 2, type: "coins" },
  { name: "sahod", value: 3, type: "coins" },
  { name: "sahod", value: 3, type: "coins" },
  { name: "alahas", value: 4, type: "coins" },
  { name: "alahas", value: 4, type: "coins" },

  // LIFE DMG CARDS = 12
  { name: "covid", value: 6, type: "lifedmg" },
  { name: "covid", value: 6, type: "lifedmg" },
  { name: "covid", value: 6, type: "lifedmg" },
  { name: "puyat", value: 5, type: "lifedmg" },
  { name: "puyat", value: 5, type: "lifedmg" },
  { name: "stress", value: 4, type: "lifedmg" },
  { name: "stress", value: 4, type: "lifedmg" },
  { name: "stress", value: 4, type: "lifedmg" },
  { name: "droga", value: 3, type: "lifedmg" },
  { name: "droga", value: 3, type: "lifedmg" },
];
const covidQuotesArray = [
  "“Take care of your body, it’s the only place you have to live.“",
  "“Today is your day to start fresh, to eat right, to train hard, to live healthy, to be proud.“",
  "“Let's spread positivity but not with covid“",
];
const puyatQuotesArray = [
  "“Oh, sleep deprivation! A gift and a curse indeed!”",
  "“The best bridge between despair and hope is a good night’s sleep.“",
  "“No day is so bad that can’t be fixed with a nap.“",
];
const stressQuotesArray = [
  "“What drains your spirit drains your body. What fuels your spirit fuels your body.”",
  "“The key to a healthy life is having a healthy mind.”",
  "“Happiness is the highest form of health.”",
];
const drogaQuotesArray = [
  "“D.E.A.D. spells out Drugs End All Dreams.”",
  "“Getting wasted is a waste of time.”",
  "“The more you use, the less you live.”",
];

// AUDIO
let playCoinAudio= () => new Audio("../assets/audio/coin-sound.wav").play();
let playEnergyAudio= () => new Audio("../assets/audio/energy-sound.wav").play();
let playLifeAudio= () => new Audio("../assets/audio/health.mp3").play();
let playGameOverAudio= () => new Audio("../assets/audio/game-over.mp3").play();
let playLifeDmgAudio= () => new Audio("../assets/audio/lifedmg.wav").play();
let playCardDropAudio= () => new Audio("../assets/audio/card-drop.wav").play();
let playVictoryAudio= () => new Audio("../assets/audio/victory.mp3").play();
const audio = document.querySelector("#bg-music");
audio.play();
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

const deckCardClass = document.querySelector(".deck-card");
const victoryParent = document.querySelector(".victory-wrapper");

// POINTS NOTIFICATION SELECTION
const lifeNotif = document.querySelector(".life-notif");
const energyNotif = document.querySelector(".energy-notif");
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

//GENERATE A RANDOM NUMBER
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

//RANDOMIZE DECK CARDS 13-18
const randomDeckCount = random(13, 19);
const deck = getRandomDeckCards(randomDeckCount);

//RANDOMIZE DECK CARD
function getRandomDeckCards(cardCount) {
  let deck = [];
  while (deck.length != cardCount) {
    const randomIndex = Math.floor(Math.random() * deckCards.length);
    deck.push(deckCards[randomIndex]);
  }
  return deck;
}

//RANDOMIZE FIELD CARDS
function generateFieldCards(cardCount) {
  let fieldCards = [];
  while (fieldCards.length != cardCount) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    if (!fieldCards.includes(deck[randomIndex])) {
      fieldCards.push(deck[randomIndex]);
    }
  }
  return fieldCards;
}

showFieldCards();
function showFieldCards() {
  
  const fieldCards = generateFieldCards(9);
  deckCount.textContent = deck.length;

  for (const [index, fCards] of fieldCards.entries()) {
    //PARENT CARDS
    const gameCards = document.createElement("div");
    gameCards.setAttribute("card-value", fCards.value);
    gameCards.setAttribute("card-type", fCards.type);
    gameCards.setAttribute("card-name", fCards.name);
    gameCards.setAttribute("class", "card animate__animated animate__rollIn");
    gameCards.addEventListener('animationend', () =>{
      gameCards.classList.remove("animate__rollIn");
      gameCards.classList.add("animate__pulse","animate__slower","animate__infinite");
    })
    gameCards.style.setProperty("--animate-duration", "800ms");
    container.appendChild(gameCards);

    //FLIP CARDS
    const flipCards = document.createElement("div");
    flipCards.setAttribute("class", "flip-card-inner");
    gameCards.appendChild(flipCards);
    //FLIP CARD CLICK EVENT LISTENER
    flipCards.addEventListener("click", function () {
      if (life !== 0 && deck.length == 0 && fieldCards.length == 0) {
        victory();
      }
      const cardValue = this.closest(".card").getAttribute("card-value");
      const cardType = this.closest(".card").getAttribute("card-type");
      const cardName = this.closest(".card").getAttribute("card-name");

      switch (cardType.toLowerCase()) {
        case "life":
          increaseLifePoints(Number(cardValue));
          checkSilip();
          //remove the card in the array
          fieldCards.splice(0, 1);
          // rotate the card
          this.style.transform = "rotateY(180deg)";
          let flipParentLife = this.parentElement;
        
          //perform the removal of card
          removeFieldCard(flipParentLife);
          break;

        case "energy":
          increaseEnergyPoints(Number(cardValue));
          checkSilip();
          //remove the card in the array
          fieldCards.splice(0, 1);
          // rotate the card
          this.style.transform = "rotateY(180deg)";
          let flipParentEnergy = this.parentElement;
          
          //perform the removal of card
          removeFieldCard(flipParentEnergy);
          break;

        case "coins":
          increaseCoinPoints(Number(cardValue));
          checkSilip();
          //remove the card in the array
          fieldCards.splice(0, 1);
          // rotate the card
          this.style.transform = "rotateY(180deg)";
          const flipParentCoin = this.parentElement;
          
          //perform the removal of card
          removeFieldCard(flipParentCoin);
          break;

        default:
          //FIXME:silip not working
         
          const flipParentLifeDmg = this.parentElement;
          //if has silip
          if (silipCount > 0) {
            useSilip();
            //check if silip is used

            if (silipIsUsed === true) {
              //flip the card
              this.style.transform = "rotateY(180deg)";
            } else {
              //remove the card in the array
              fieldCards.splice(0, 1);
              decreaseLifePoints(Number(cardValue), cardName);
              //perform the removal of card
              removeFieldCard(flipParentLifeDmg);
            }
          } else {
            //remove the card in the array
            fieldCards.splice(0, 1);
            this.style.transform = "rotateY(180deg)";
            decreaseLifePoints(Number(cardValue), cardName);
            //perform the removal of card
            removeFieldCard(flipParentLifeDmg);
          }

          checkSilip();
          break;
      }
    });
    createBackCard(
      fCards.type,
      fCards.name,
      fCards.value,
      flipCards,
      fieldCards
    );
  }
}
function createNewFieldCard(newFieldCards) {
  const newFieldCard = document.createElement("div");
  newFieldCard.setAttribute(
    "card-value",
    newFieldCards[newFieldCards.length - 1].value
  );
  newFieldCard.setAttribute(
    "card-type",
    newFieldCards[newFieldCards.length - 1].type
  );
  newFieldCard.setAttribute(
    "card-name",
    newFieldCards[newFieldCards.length - 1].name
  );
  newFieldCard.setAttribute("class", "card animate__animated animate__zoomIn");
  const newFieldCardValue = newFieldCard.getAttribute("card-value");
  const newFieldCardType = newFieldCard.getAttribute("card-type");
  const newFieldCardName = newFieldCard.getAttribute("card-name");
  newFieldCard.style.setProperty("--animate-duration", "800ms");
  container.appendChild(newFieldCard);
  const newFlipCards = document.createElement("div");
  newFlipCards.setAttribute("class", "flip-card-inner");
  newFieldCard.appendChild(newFlipCards);

  //TODO:COPY CONTENTS FROM SHOW FIELD CARDS FUNCTION
  // NEW FLIP CARD CLICK EVENT LISTENER
  newFlipCards.addEventListener("click", function () {
    if (life !== 0 && deck.length == 0 && fieldCards.length == 0) {
      victory();
    }
    const cardValue = this.closest(".card").getAttribute("card-value");
    const cardType = this.closest(".card").getAttribute("card-type");
    const cardName = this.closest(".card").getAttribute("card-name");

    switch (cardType.toLowerCase()) {
      case "life":
        increaseLifePoints(Number(cardValue));
        checkSilip();
        //remove the card in the array
        fieldCards.splice(0, 1);
        // rotate the card
        this.style.transform = "rotateY(180deg)";

        let flipParentLife = this.parentElement;

        //perform the removal of card
        removeFieldCard(flipParentLife);
        break;

        break;
      case "energy":
        increaseEnergyPoints(Number(cardValue));
        checkSilip();
        //remove the card in the array
        fieldCards.splice(0, 1);
        // rotate the card
        this.style.transform = "rotateY(180deg)";
        let flipParentEnergy = this.parentElement;
        //perform the removal of card
        removeFieldCard(flipParentEnergy);
        break;
      case "coins":
        increaseCoinPoints(Number(cardValue));
        checkSilip();
        //remove the card in the array
        fieldCards.splice(0, 1);
        // rotate the card
        this.style.transform = "rotateY(180deg)";
        const flipParentCoin = this.parentElement;
        //perform the removal of card
        removeFieldCard(flipParentCoin);
        break;
      case "lifedmg":
        //FIXME:silip not working
        const flipParentLifeDmg = this.parentElement;
        //if has silip
        if (silipCount > 0) {
          useSilip();
          //check if silip is used

          if (silipIsUsed === true) {
            //flip the card
            this.style.transform = "rotateY(180deg)";
          } else {
            //remove the card in the array
            fieldCards.splice(0, 1);
            decreaseLifePoints(Number(cardValue), cardName);
            //perform the removal of card
            removeFieldCard(flipParentLifeDmg);
          }
        } else {
          //remove the card in the array
          fieldCards.splice(0, 1);
          this.style.transform = "rotateY(180deg)";
          decreaseLifePoints(Number(cardValue), cardName);
          //perform the removal of card
          removeFieldCard(flipParentLifeDmg);
        }

        checkSilip();
        break;
    }
  });
  createBackCard(
    newFieldCardType,
    newFieldCardName,
    newFieldCardValue,
    newFlipCards
  );
  if (life !== 0 && deck.length == 0 && fieldCards.length == 0) {
    victory();
  }
}
function createBackCard(cardType, cardName, cardValue, flipCards) {
  // SHOW LIFE CARDS
  if (cardType.toLowerCase() === "life") {
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
    smallHeart.setAttribute("src", "../assets/icons/heart-header.png");
    const cardTitle = document.createElement("p");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = `+${cardValue}`;
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
    if (cardName.toLowerCase() == "pamilya") {
      lifeCardImage.setAttribute(
        "src",
        "../assets/icons/life-icons/pamilya.png"
      );
    }
    if (cardName.toLowerCase() == "tropa") {
      lifeCardImage.setAttribute("src", "../assets/icons/life-icons/tropa.png");
    }
    if (cardName.toLowerCase() == "jowabels") {
      lifeCardImage.setAttribute("src", "../assets/icons/life-icons/jowa.png");
    }
    if (cardName.toLowerCase() == "tulog") {
      lifeCardImage.setAttribute("src", "../assets/icons/life-icons/tulog.png");
    }
    if (cardName.toLowerCase() == "kopi") {
      lifeCardImage.setAttribute("src", "../assets/icons/life-icons/kape.png");
    }
    const lifeCardTitle = document.createElement("h3");
    lifeCardTitle.setAttribute("class", "back-card-text");
    lifeCardTitle.textContent = cardName.toUpperCase();
    backCardBottom.appendChild(lifeCardImage);
    backCardBottom.appendChild(lifeCardTitle);

    // CARD BACK APPEND FRONT AND BACK
    lifeCardBack.appendChild(backCardTop);
    lifeCardBack.appendChild(backCardBottom);
  }

  // SHOW ENERGY CARDS
  if (cardType.toLowerCase() === "energy") {
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
    smallEnergy.setAttribute("src", "../assets/icons/enery-header.png");
    const cardTitle = document.createElement("p");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = `+${cardValue}`;
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
    if (cardName.toLowerCase() == "chika") {
      energyCardImage.setAttribute(
        "src",
        "../assets/icons/energy-icons/chika.png"
      );
    }
    if (cardName.toLowerCase() == "harurut") {
      energyCardImage.setAttribute(
        "src",
        "../assets/icons/energy-icons/harot.png"
      );
    }
    if (cardName.toLowerCase() == "walwal") {
      energyCardImage.setAttribute(
        "src",
        "../assets/icons/energy-icons/walwal.png"
      );
    }
    if (cardName.toLowerCase() == "lamon") {
      energyCardImage.setAttribute(
        "src",
        "../assets/icons/energy-icons/lamon.png"
      );
    }

    const energyCardTitle = document.createElement("h3");
    energyCardTitle.setAttribute("class", "back-card-text");
    energyCardTitle.textContent = cardName.toUpperCase();
    backCardBottom.appendChild(energyCardImage);
    backCardBottom.appendChild(energyCardTitle);

    // CARD BACK APPEND FRONT AND BACK
    energyCardBack.appendChild(backCardTop);
    energyCardBack.appendChild(backCardBottom);
  }
  // SHOW COIN CARDS
  if (cardType.toLowerCase() === "coins") {
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
    smallCoin.setAttribute("src", "../assets/icons/peso-card-header.png");
    const cardTitle = document.createElement("p");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = `+${cardValue}`;
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
    if (cardName.toLowerCase() == "alahas") {
      coinCardImage.setAttribute(
        "src",
        "../assets/icons/coin-icons/diamond.png"
      );
    }
    if (cardName.toLowerCase() == "sahod") {
      coinCardImage.setAttribute("src", "../assets/icons/coin-icons/sahod.png");
    }
    if (cardName.toLowerCase() == "ipon") {
      coinCardImage.setAttribute("src", "../assets/icons/coin-icons/ipon.png");
    }

    const coinCardTitle = document.createElement("h3");
    coinCardTitle.setAttribute("class", "back-card-text");
    coinCardTitle.textContent = cardName.toUpperCase();
    backCardBottom.appendChild(coinCardImage);
    backCardBottom.appendChild(coinCardTitle);

    // CARD BACK APPEND FRONT AND BACK
    coinCardBack.appendChild(backCardTop);
    coinCardBack.appendChild(backCardBottom);
  }

  // SHOW LIFE DAMAGE CARDS
  if (cardType.toLowerCase() === "lifedmg") {
    // CARD FLIP FRONT AND BACK CARD
    const lifeDmgCardFront = document.createElement("div");
    lifeDmgCardFront.setAttribute("class", "life-dmg-card-front");
    const lifeDmgCardBack = document.createElement("div");
    lifeDmgCardBack.setAttribute("class", "flip-card-back life-dmg-card-back");

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
    smallSkull.setAttribute("src", "../assets/icons/human-skull.png");
    const cardTitle = document.createElement("p");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = `-${cardValue}`;
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
    if (cardName.toLowerCase() == "puyat") {
      lifeDmgCardImage.setAttribute(
        "src",
        "../assets/icons/life-damage-icons/puyat.png"
      );
    }
    if (cardName.toLowerCase() == "stress") {
      lifeDmgCardImage.setAttribute(
        "src",
        "../assets/icons/life-damage-icons/istres.png"
      );
    }
    if (cardName.toLowerCase() == "droga") {
      lifeDmgCardImage.setAttribute(
        "src",
        "../assets/icons/life-damage-icons/droga.png"
      );
    }
    if (cardName.toLowerCase() == "covid") {
      lifeDmgCardImage.setAttribute(
        "src",
        "../assets/icons/life-damage-icons/covid.png"
      );
    }

    const lifeDmgCardTitle = document.createElement("h3");
    lifeDmgCardTitle.setAttribute("class", "back-card-text");
    lifeDmgCardTitle.textContent = cardName.toUpperCase();
    backCardBottom.appendChild(lifeDmgCardImage);
    backCardBottom.appendChild(lifeDmgCardTitle);

    // CARD BACK APPEND FRONT AND BACK
    lifeDmgCardBack.appendChild(backCardTop);
    lifeDmgCardBack.appendChild(backCardBottom);
  }
}

//REMOVE THE FIELD CARD CLICKED
function removeFieldCard(flipParent) {
  setTimeout(function () {
    flipParent.remove();
    const fromDeck = updateDeck(deck);

    fieldCards.push(fromDeck);

    createNewFieldCard(fieldCards);
  }, 1200);
}

// UPDATES THE DECK
function updateDeck(deck) {
  const fromDeck = deck.pop();
  deckCount.textContent = deck.length;
  return fromDeck;
}

// POINT UPDATES
function increaseLifePoints(lPoints) {
  let lifeAdded = 0;
  if (life === 10) {
    if(energy<=0){
      life = 10;
      playCardDropAudio();
    }
    else{
      life = 10;
      decreaseEnergyPoints();
      displayEnergyNotification(1, "negative");
      playCardDropAudio();
    }
    
  } else {
   
    if (energy <= 0) {
      if (life + lPoints - 1 >= 10) {
        lifeAdded = 10 - life;
        life += lifeAdded;
        lifePoints.textContent = life;
        displayLifeNotification(lifeAdded, "positive");
        playCardDropAudio();
      } else {
        playLifeAudio();
        lifeAdded = lPoints-1;
        life += lifeAdded;
        lifePoints.textContent = life;
        displayLifeNotification(lifeAdded, "positive");
        playCardDropAudio();
      }
    } else {
      decreaseEnergyPoints();
      displayEnergyNotification(1, "negative");
      if (life + lPoints >= 10) {
        playLifeAudio();
        lifeAdded = 10 - life;
        life += lifeAdded;
        lifePoints.textContent = life;
        displayLifeNotification(lifeAdded, "positive");
      } else {
        playLifeAudio();
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
    playCardDropAudio();
  } else {
    if (energy + ePoints >= 10) {
      energyAdded = 10 - energy;
      energy += energyAdded;
      energyPoints.textContent = energy;
      displayEnergyNotification(energyAdded, "positive");
      playEnergyAudio();
    } else {
      energyAdded = ePoints;
      energy += energyAdded;
      energyPoints.textContent = energy;
      displayEnergyNotification(energyAdded, "positive");
      playEnergyAudio();
    }
  }
}
function increaseCoinPoints(cPoints) {
  let coinAdded = 0;
 
  if (energy <= 0) {
    if (life - 1 <= 0) {
      alert("Game Over");
      playGameOverAudio();
    } else {
      life--;
      lifePoints.textContent = life;
      coinAdded = cPoints;
      coins += coinAdded;
      coinPoints.textContent = coins;
      displayCoinNotification(coinAdded, "positive");
      displayLifeNotification(1, "negative");
      playCardDropAudio();
    }
  } else {
    decreaseEnergyPoints();
    displayEnergyNotification(1, "negative");
    let coinAdded = cPoints;
    coins += coinAdded;
    coinPoints.textContent = coins;
    displayCoinNotification(coinAdded, "positive");
    playCoinAudio();
  }
}

function decreaseCointPoints(cPoints) {
  coins -= cPoints;
  coinPoints.textContent = coins;
  displayCoinNotification(cPoints, "negative");
}
function decreaseLifePoints(lDmgPoints, cardName) {
  lifeDamageAdded = 0;
  energyPoints.textContent = energy;
  if (energy <= 0) {
    lifeDamageAdded = lDmgPoints + 1;
    if (life - lifeDamageAdded <= 0) {
      life = 0;
      lifePoints.textContent = life;
      gameOver(cardName);
      audio.pause();
      playGameOverAudio();
    } else {
      life -= lifeDamageAdded;
      lifePoints.textContent = life;
      displayLifeNotification(lifeDamageAdded, "negative");
      playLifeDmgAudio();
    }
  } else {
    if (life - lDmgPoints <= 0) {
      decreaseEnergyPoints();
      displayEnergyNotification(1, "negative");
      life = 0;
      lifePoints.textContent = life;
      displayLifeNotification(lDmgPoints, "negative");
      gameOver(cardName);
      audio.pause();
      playGameOverAudio();
    } else {
      decreaseEnergyPoints();
      displayEnergyNotification(1, "negative");
      lifeDamageAdded = lDmgPoints;
      life -= lifeDamageAdded;
      coinPoints.textContent = coins;
      lifePoints.textContent = life;
      displayLifeNotification(lDmgPoints, "negative");
      playLifeDmgAudio();
    }
  }
}
function decreaseEnergyPoints() {
  energy--;
  energyPoints.textContent = energy;
}

// FIXME: silip turns to not available when any card is clicked while there is silip
function checkSilip() {
  //available to buy silip
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

buySilipMessage.addEventListener("click", buySilip);
function buySilip() {
  decreaseEnergyPoints();
  displayEnergyNotification(1, "negative");

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
      silipIcon.setAttribute("src", "../assets/icons/pasilip.png");
      silipIconContainer.appendChild(silipIcon);
      lifeDmgCard.appendChild(silipIconContainer);
    }
  }
}

function useSilip() {
  const continueButton = document.querySelector(".btn-continue");
  const cancelButton = document.querySelector(".btn-cancel");
  const silipCountText = document.querySelector(".pasilip-count-text");
  silipCountText.textContent = silipCount;
  overlay.classList.remove("hidden");
  silipPopUp.classList.remove("hidden");

  continueButton.addEventListener("click", function () {
    silipCount = 0;
    nextSilip = 2;
    overlay.classList.add("hidden");
    silipPopUp.classList.add("hidden");
    silipIsUsed = true;
  });

  cancelButton.addEventListener("click", function () {
    overlay.classList.add("hidden");
    silipPopUp.classList.add("hidden");
    silipIsUsed = false;
  });
}
//FIXME:notification is red even thous is positive (Life and energy)
function displayLifeNotification(lPoints, notificationType) {
  if (notificationType.toLowerCase() === "positive") {
    lifeNotif.classList.remove("minus-notif");
    lifeNotif.classList.remove("hidden");
    lifeNotif.classList.add("plus-notif");
    lifeNotifMessage.textContent = `+${lPoints}`;
  } else {
    lifeNotif.classList.remove("plus-notif");
    lifeNotif.classList.remove("hidden");
    lifeNotif.classList.add("minus-notif");
    lifeNotifMessage.textContent = `-${lPoints}`;
  }
  setTimeout(function () {
    lifeNotif.classList.add("hidden");
  }, 1000);
}

function displayEnergyNotification(ePoints, notificationType) {
  if (notificationType.toLowerCase() === "positive") {
    energyNotif.classList.remove("minus-notif");
    energyNotif.classList.remove("hidden");
    energyNotif.classList.add("plus-notif");
    energyNotifMessage.textContent = `+${ePoints}`;
  } else {
    energyNotif.classList.remove("plus-notif");
    energyNotif.classList.remove("hidden");
    energyNotif.classList.add("minus-notif");
    energyNotifMessage.textContent = `-${ePoints}`;
  }
  setTimeout(function () {
    energyNotif.classList.add("hidden");
  }, 1000);
}
function displayCoinNotification(cPoints, notificationType) {
  if (notificationType.toLowerCase() === "positive") {
    coinNotif.classList.remove("minus-notif");
    coinNotif.classList.remove("hidden");
    coinNotif.classList.add("plus-notif");
    coinNotifMessage.textContent = `+${cPoints}`;
  } else {
    coinNotif.classList.remove("plus-notif");
    coinNotif.classList.add("minus-notif");
    coinNotif.classList.remove("hidden");
    coinNotifMessage.textContent = `-${cPoints}`;
  }
  setTimeout(function () {
    coinNotif.classList.add("hidden");
  }, 1000);
}



//TODO:create a victory display screen for players
function victory() {
  overlay.classList.remove("hidden");
  victory.classList.remove("hidden");
}

const gameOverQuote = generateRandomQuote(covidQuotesArray);
function generateRandomQuote(array) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array[0];
}
function gameOver(cardName) {
  overlay.classList.remove();
  let gameOverQuote = "";
  const gameOverClass = document.querySelector(".game-over-main-wrapper");
  const causeOfDeath = document.querySelector(".cause-of-death-name ");
  const causeOfDeathImage = document.querySelector(".cause-of-death-img");
  const quoteClass = document.querySelector(".quote");
  const restartBtn = document.querySelector(".restart");
  const exitBtn = document.querySelector(".exit");

  switch (cardName.toLowerCase()) {
    case "covid":
      gameOverQuote = generateRandomQuote(covidQuotesArray);
      causeOfDeath.textContent = cardName;
      causeOfDeathImage.setAttribute(
        "src",
        "../assets/icons/life-damage-icons/covid.png"
      );
      quoteClass.textContent = gameOverQuote;
      break;
    case "puyat":
      gameOverQuote = generateRandomQuote(puyatQuotesArray);
      causeOfDeath.textContent = cardName;
      causeOfDeathImage.setAttribute(
        "src",
        "../assets/icons/life-damage-icons/puyat.png"
      );
      quoteClass.textContent = gameOverQuote;
      break;
    case "stress":
      gameOverQuote = generateRandomQuote(stressQuotesArray);
      causeOfDeath.textContent = cardName;
      causeOfDeathImage.setAttribute(
        "src",
        "../assets/icons/life-damage-icons/istres.png"
      );
      quoteClass.textContent = gameOverQuote;
      break;
    case "droga":
      gameOverQuote = generateRandomQuote(drogaQuotesArray);
      causeOfDeath.textContent = cardName;
      causeOfDeathImage.setAttribute(
        "src",
        "../assets/icons/life-damage-icons/droga.png"
      );
      break;
    default:
      causeOfDeath.textContent = "Oh No! You ran out of life";
      causeOfDeathImage.setAttribute("src", "../assets/icons/heart.png");
  }
  overlay.classList.remove("hidden");
  gameOverClass.classList.remove("hidden");

  restartBtn.addEventListener("click", function () {
    window.location.reload();
  });
}
