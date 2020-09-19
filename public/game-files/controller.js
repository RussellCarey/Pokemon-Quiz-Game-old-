import * as doms from "./elements.js";
//import * as setUpMulti from "./multiple.js";
import * as menu from "./menu.js";
// import * as imageloader from "./preload.js";

let sound = true;
let images = [];
let sounds = [];
let first = true;

export let isHangMan = true;
export let pokemonData;

export let fullPokemonData;
export let pokemonStart = 0;
export let pokemonFinish = 150;
let pokemonArray = [];
let pokemonArrayString = [];
export let pokemonNumber = 0;
export let pokemonNumberString = "0";
export let currentPokemonName = "";
export let currentPokemonNameArray = [];
let api;

// HANGMAN VARIABLES
let usedLetters = [];
let firstRoundOver = false;
let pokemonNameLetterCount = 0;
let letterImage = [];
let globalScore = 0;
let roundScore = 10000;
let livesLeft = 5;
export let roundNumber = 1;

// Networking
let playerName;
let playerScore;
let lbArray = [];
let playerPosObj;
let playerPos;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function loadPokemonData() {
  pokemonStart = document.getElementById("rangefrom").value;
  pokemonFinish = document.getElementById("rangeto").value;
  console.log(pokemonStart, pokemonFinish);
  if (pokemonStart < 1) {
    pokemonStart = 1;
  }

  if (pokemonFinish > 806) {
    pokemonFinish = 806;
  }

  if (pokemonStart > pokemonFinish) {
    pokemonStart = 1;
    pokemonFinish = 150;
  }

  if (pokemonStart == null || pokemonFinish == null) {
    pokemonStart = 1;
    pokemonFinish = 150;
  }

  for (let i = pokemonStart; i < pokemonFinish; i++) {
    pokemonArray.push(i);
  }

  for (let i = pokemonArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = pokemonArray[i];
    pokemonArray[i] = pokemonArray[j];
    pokemonArray[j] = temp;
  }
  console.log(pokemonArray);
  isHangMan = menu.isHangman;
  //   whosThatAudio();
  startNewRound();
}

export function startNewRound() {
  //   document.getElementById("guess").style.display = "initial";
  if (first == true) {
  } else {
    roundNumber = roundNumber + 1;
  }

  doms.mainDoms.pokemon.style.opacity = "0";
  getPokemonNumber();
  first = false;
}

// Assign the JSON to the variable
function getPokemonNumber() {
  doms.mainDoms.video.pause();
  async function poke() {
    api = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonArray[roundNumber]}`
    );

    pokemonData = await api.json();
    setPokemonImage();
  }
  poke();
}

// Set pokemon IMages
function setPokemonImage() {
  doms.mainDoms.pokemon.src =
    pokemonData.sprites.other["official-artwork"].front_default;
  doms.mainDoms.pokemonShadow.src =
    pokemonData.sprites.other["official-artwork"].front_default;

  currentPokemonName = pokemonData.name;
  currentPokemonNameArray = currentPokemonName.split("");

  doms.mainDoms.pokemonShadow.style.opacity = "0.5";
  doms.mainDoms.pokemon.style.opacity = "1";
  // WHAT GAME MODE IS CHOSEN?
  if (isHangMan === true) {
    setUpHangman();
  } else {
    setUpHangman();
  }
  gsap.to(doms.mainDoms.loadingscreen, { x: "-200vw", duration: 1 });
  doms.mainDoms.audio2.src = "./game-files/sound/whosthatpokemon.wav";
  doms.mainDoms.audio2.play();
  doms.mainDoms.video.play();
}

// DOM EVENT LISTENERS
doms.mainDoms.video.pause();

doms.mainDoms.speaker.addEventListener("click", () => {
  if (sound === true) {
    doms.mainDoms.audio.volume = 0;
    doms.mainDoms.audio2.volume = 0;
    sound = false;
  } else {
    doms.mainDoms.audio.volume = 1;
    doms.mainDoms.audio2.volume = 1;
    sound = true;
  }
});

doms.mainDoms.video.addEventListener(
  "ended",
  function () {
    doms.mainDoms.video.currentTime = 5;
    doms.mainDoms.video.play();
  },
  false
);

////////////////////////////////////////////////////////////////////////////////////////////
// HANG MAN GAME CODE
////////////////////////////////////////////////////////////////////////////////////////////

function setUpHangman() {
  // hideMulti();
  opaqueLetters();
  showLetterBox();
  addPokemonName();
  doms.mainDoms.audio.src = "./game-files/sound/whosthatpokemon.wav";
  //setUpKeys();
  setUpMobileKeys();
  pokemonNameLetterCount = 0;
  usedLetters = [];
  doms.mainDoms.mobileForm.style.display = "initial";
  doms.mainDoms.mobileForm.focus();
}

function opaqueLetters() {
  const allLetters = document.querySelectorAll(".awnserDiv");
  allLetters.forEach((e) => {
    e.style.display = "none";
  });
}

function showLetterBox() {
  // Show letter container box up
  setTimeout(() => {
    gsap.to(doms.typingDoms.letterbox, { y: "0px", duration: 0.3 });
    //
    // HERE IS WHERE THE LETTER BOX IS SHOWN AT THE COUNTRDOWN SHOULD START FOR THE SCORE THAT IS TIMED
    let roundScoring = setInterval(() => {
      if (roundScore < 0) {
        roundScore = 0;
        clearInterval(roundScoring);
      } else {
        roundScore -= 100;
      }
    }, 100);
  }, 600);
}

function addPokemonName() {
  for (var i = 0; i < currentPokemonName.length; i++) {
    let currentLetter = currentPokemonName.charAt(i);
    letterImage = `./game-files/images/font/${currentLetter}.PNG`;
    const newLetter = document.createElement("img"); // Each name is a div
    newLetter.classList.add("letter-container__letter");
    newLetter.src = letterImage;
    doms.typingDoms.letterbox.appendChild(newLetter); // Add a new child to a parent
  }
}

function guessedPokemon() {
  if (pokemonNameLetterCount === currentPokemonName.length) {
    // CORRECT POKEMON HANGMAN REPLACEMENT FUNCTION
    gsap.to(doms.typingDoms.letterbox, { y: "500px", duration: 1 });
    doms.typingDoms.letterbox.innerHTML = "";
    doms.mainDoms.audio2.pause();
    globalScore += livesLeft * 1000;
    globalScore += roundScore;

    livesLeft = 5;
    doms.mainDoms.pokemon.classList.add("pokemon__show");
    doms.mainDoms.pokemon.style.opacity = "1";

    roundNumber++;
    firstRoundOver = true;

    setTimeout(() => {
      doms.typingDoms.letterbox.classList.remove("letterbox-show");
      doms.mainDoms.pokemon.classList.remove("pokemon__show");
      doms.mainDoms.pokemonShadow.classList.remove("pokemon__show");
      doms.mainDoms.pokemon.style.opacity = "0";
      doms.mainDoms.pokemonShadow.style.opacity = "0";

      // New round
      letterImage = [];
      doms.mainDoms.video.currentTime = 0;

      setTimeout(() => {
        roundScore = 10000;
        startNewRound();
      }, 1500);
    }, 4200);
    // END OF CORRECT POKEMON HANGMAN
    pokemonNameLetterCount = 0;
    usedLetters = [];
  }
}

function setUpKeys() {
  //document.getElementById("focus").focus();
  // Test of the button has been pressed and it corrospons with the pokemon name
  // selected
  document.addEventListener("keydown", (e) => {
    const availableKeys = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      " ",
      "-",
      ".",
    ];

    if (e.key !== "ArrowLeft" && availableKeys.indexOf(e.key) != -1) {
      const str = currentPokemonName;
      for (var i = 0; i < str.length; i++) {
        if (str[i] === e.key) {
          if (str.includes(e.key.toString()) && !usedLetters.includes(e.key)) {
            doms.typingDoms.letterbox.childNodes[i].style.opacity = 1;
            pokemonNameLetterCount++;
          }
        }
        if (!str.includes(e.key.toString()) && !usedLetters.includes(e.key)) {
          doms.mainDoms.audio.src = "./game-files/sound/wrong.wav";
          doms.mainDoms.audio.play();
          livesLeft--;
          usedLetters.push(e.key);
          console.log("lives remaining: " + livesLeft);
          if (livesLeft == 0) {
            outOfLives();
          }
        }
      }
      usedLetters.push(e.key);
    }

    // If all letters have been used
    guessedPokemon();
  });
}

function setUpMobileKeys() {
  //document.getElementById("focus").focus();
  // Test of the button has been pressed and it corrospons with the pokemon name
  // selected
  doms.mainDoms.mobileForm.addEventListener("input", (e) => {
    let value = document.getElementById("mobile-press").value;
    const availableKeys = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      " ",
      "-",
      ".",
    ];

    if (availableKeys.indexOf(value) != -1) {
      const str = currentPokemonName;
      for (var i = 0; i < str.length; i++) {
        if (str[i] === value) {
          if (str.includes(value.toString()) && !usedLetters.includes(value)) {
            doms.typingDoms.letterbox.childNodes[i].style.opacity = 1;
            pokemonNameLetterCount++;
          }
        }
        if (!str.includes(value.toString()) && !usedLetters.includes(value)) {
          doms.mainDoms.audio.src = "./game-files/sound/wrong.wav";
          doms.mainDoms.audio.play();
          livesLeft--;
          usedLetters.push(value);
          console.log("lives remaining: " + livesLeft);
          if (livesLeft == 0) {
            outOfLives();
          }
        }
      }
      usedLetters.push(value);
    }

    // If all letters have been used
    guessedPokemon();
    document.getElementById("mobile-press").value = "";
  });
}

// When you run out of lives //
function outOfLives() {
  recordScore();
  playerName = menu.playerName;
  playerScore = globalScore;
  doms.mainDoms.gameScreen.style.display = "none";
  doms.mainDoms.gameScreen.style.opacity = 0;
  doms.mainDoms.mobileForm.style.display = "none";
  doms.mainDoms.menuBG.style.transform = "translate(0)";
  doms.typingDoms.letterbox.style.transform = "translateY(500px)";

  // Remove letters from the letter box..
  const letters = document.querySelectorAll(".letter-container__letter");
  const lettersLength = letters.length;

  for (let i = 0; i < lettersLength; i++) {
    doms.typingDoms.letterbox.innerHTML = "";
  }

  // Move the score screen and name entry screen into view
  doms.mainDoms.finalScore.style.transform = "translate(0px)";

  livesLeft = 5;

  sendPOST();
}

//Send name and score to DB
function sendPOST() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      name: playerName,
      score: globalScore,
    })
  );
  xhr.onload = function () {
    console.log(JSON.parse(xhr.response));
    getLeaderboard();
  };
}

// Get datafrom leaderboard
function getLeaderboard() {
  lbArray = [];
  var xhr = new XMLHttpRequest();
  // The true means that it is asynconouse!!
  xhr.open("GET", "/lb", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  xhr.onload = function () {
    const leaderboard = JSON.parse(xhr.response);

    const l = Object.keys(leaderboard.data.leaderboard).length;
    for (let i = 0; i < l; i++) {
      lbArray.push(leaderboard.data.leaderboard[i]);
    }

    createLeaderboard();
  };
}

function createLeaderboard() {
  document.getElementById(
    "finalscore-score"
  ).innerHTML = `Nice one <b>${playerName}</b>, your final score was <b>${playerScore}!</b><br><br>Scroll the box below for yours, and other peoples scores!`;

  //
  const scores = document.getElementById("leaderboard-scores");
  scores.innerHTML = " ";
  lbArray.forEach((s, index) => {
    const element = document.createElement("div");
    element.id = `score${index.toString()}`;
    element.classList.add("leaderboardplayer");
    const no = document.createElement("p");
    const name = document.createElement("p");
    const score = document.createElement("p");
    no.innerHTML = `${index + 1}`;
    name.innerHTML = `${s.name}`;
    score.innerHTML = `${s.score}`;
    element.appendChild(no);
    element.appendChild(name);
    element.appendChild(score);
    scores.appendChild(element);
    //
    document.getElementById("leaderboardnext").addEventListener("click", () => {
      gsap.to(doms.mainDoms.finalScore, { x: "-200vw", duration: 1 });
      gsap.to(doms.mainDoms.rangeSelect, { delay: 2, y: "0px", duration: 1 });
    });
  });
}

function recordScore() {
  if (livesLeft < 0) {
    livesLeft = 0;
  }
}

function newGame() {
  globalScore = 0;
  livesLeft = 5;
  roundNumber = 1;
}

////////////////////////////////////////////////////////////////////////////////////////////
// MULTIPLE CHOICE GAME CODE
////////////////////////////////////////////////////////////////////////////////////////////
