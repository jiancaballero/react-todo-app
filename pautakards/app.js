
const allCards = [
    //LIFE CARDS = 10
    { name: "Pamilya", value: 8, type: "life" },
    { name: "Tropapeeps", value: 7, type: "life" },
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
  const deckCards = [
  ];
  const fieldCards = [
  ];
  
  // GAME POINTS VARIABLES
  let life = Number(10);
  let energy = Number(10);
  let coins = Number(10);
  let silipCount = 0; 
  let nextSilip = 0;
  
  // POINTS SELECTORS
  const container = document.querySelectorAll(".container");
  let lifePoints = document.querySelector(".life-points");
  let energyPoints = document.querySelector(".energy-points");
  let coinPoints = document.querySelector(".coin-points");
  
  // PARENT CARDS SELECTORS
  const gameCards = document.createElement("div");
  const flipCards= document.createElement("div");
  
  // CARD FRONT SELECTORS
  const lifeCardFront = document.createElement("div");
  const energyCardFront = document.createElement("div");
  const coinCardFront = document.createElement("div");
  const lifeDmgCardFront = document.createElement("div");
  
  // CARD BACK SELECTORS
  const flipCardBack = document.createElement("div");
  const backCardTop = document.createElement("div");
  const backCardBottom = document.createElement("div");
  
  // POINTS NOTIFICATION SELECTION
  const lifeNotif= document.querySelector(".life-notif");
  const energyNotif= document.querySelector(".energy-notif");
  const coinNotif= document.querySelector(".coin-notif");
  const lifeNotifMessage = document.querySelector(".life-notif-msg")
  const energyNotifMessage = document.querySelector(".energynotif-msg")
  const coinNotifMessage = document.querySelector(".coin-notif-msg")
  
  
  // SILIP SELECTORS
  let peekCount = document.querySelector(".peek-count");
  let pasilipVisible = document.querySelector(".pasilip-visible")
  let noPasilipVisible = document.querySelector(".no-pasilip-visible");
  let silipMessage = document.querySelector(".silip-message");
  
  
  displayPoints()
  startGame()
  function startGame(){
  
    // for (let flip of flipCards) {
    //   flip.addEventListener("click", function () {
    //     flip.style.transform = "rotateY(180deg)";
    //   });
    // }
  }
  
  function displayPoints(){
    lifePoints.textContent = life;
    energyPoints.textContent = energy;
    coinPoints.textContent = coins;
    peekCount.textContent = silipCount;
    displaySilip()
    startGame();
  }
  
  function displaySilip(){
    if(silipCount===1 && coins!==0){
      pasilipVisible.classList.remove('hidden')
      noPasilipVisible.classList.add('hidden')
      silipMessage.classList.remove('silip-not-available')
      silipMessage.textContent ='Available'
    }
    else{
      noPasilipVisible.classList.remove('hidden')
      pasilipVisible.classList.add('hidden')
      silipMessage.classList.remove('silip-available')
      silipMessage.textContent ='Not Available'
    }
  }
  
  function buySilip(){
    alert(nextSilip)
    if(coins<5){
      alert("silip not available")
    }
    else{
      if(nextSilip%2==0){
        
        TODO://create modal forr user to buy silip
        coins-=5;
        silipCount=1;
        checkNextSilip()
        displayPoints()
        
      }
    }
  }
  
  function checkNextSilip(){
    nextSilip+=1
    return
  }
  
  
  