import * as doms from "./elements.js";
import * as main from "./controller.js";

export let playerName = "";
let errmsg = [];
let start = true;

// doms.mainDoms.audio.src = "./game-files/sound/titlemusic.wav";
// doms.mainDoms.audio.play();

// window.onload = function () {
//   doms.mainDoms.audio.src = "./game-files/sound/titlemusic.wav";
//   doms.mainDoms.audio.play();
// };

// When some data is loaded load the title screen.

doms.menuDoms.titleScreen.style.filter = "brightness(100%)";

////////////////////////////////
// IMPORT THE JS THEN SET THE INPUT AS AN ARRAY TO LOAD INTO
// imageloader.loadSound(vidvid);
// imageloader.letters(fonts);

// On window load make it so you can click go
if (document.readyState === "interactive") {
  // Add some time after page has loaded
  setTimeout(() => {
    doms.mainDoms.spinner.style.width = "5vw";
    doms.mainDoms.spinner.src = "./game-files/images/pikapress.png";
    // When you click on the ready button
    doms.mainDoms.spinner.style.cursor = "pointer";
    doms.mainDoms.spinner.addEventListener("click", () => {
      // Starts music
      doms.mainDoms.audio.src = "./game-files/sound/titlemusic.wav";
      doms.mainDoms.audio.play();
      setTimeout(() => {
        // After x amount of seconds then the screebn moves and adds a click to the next screen
        gsap.to(doms.mainDoms.loadingscreen, { x: "-200vw", duration: 1 });
        setTimeout(() => {
          // Removes the animation from the logo so it can move
          doms.mainDoms.titlelogo.classList.remove(
            "titleScreen__logo__animation"
          );
          // Move logo
          gsap.to(doms.mainDoms.titlelogo, { opacity: 0, duration: 0.5 });
          gsap.to(doms.mainDoms.titlelogo, {
            delay: 1,
            x: "-200vw",
            duration: 0.1,
          });
          doms.mainDoms.spinner.src = "./game-files/images/pikachugif.gif";
          doms.mainDoms.spinner.style.width = "17vw";
          gsap.to(doms.mainDoms.namescreen, { y: "0", duration: 1 });
        }, 3000);
      }, 3400);
    });
  }, 7000);
}

// Multile choice
doms.mainDoms.namescreenbutton.addEventListener("click", () => {
  checkName();
});

// RAnge button choice
document.getElementById("rangeStart").addEventListener("click", () => {
  doms.mainDoms.gameScreen.style.display = "initial";
  doms.mainDoms.gameScreen.style.opacity = 1;
  doms.mainDoms.audio.pause();
  gsap.to(document.getElementById("rangeSelect"), {
    y: "-300vw",
    duration: 0.1,
  });
  gsap.to(document.getElementById("menubackground"), {
    y: "-400vw",
    duration: 0.1,
  });
  doms.mainDoms.loadingscreen.style.transform = "translate(0)";
  main.loadPokemonData();
});

// On click screen - load the next screen for mode select
// On mode select go to range select
// After range select -- add another loading screen before the game start
// load the game

function checkName() {
  console.log("clicked");
  const pn = document.getElementById("playernameinput").value.trim();
  console.log(pn);

  // Not variables
  if (pn.length > 8) {
    errmsg.push("Name must be shorter than 8 characters.");
    doms.mainDoms.audio.src = "./game-files/sound/wrong.wav";
    doms.mainDoms.audio.play();
    document.getElementById("nameerror").innerText = errmsg[0];
    // Check if name fiel is empty
  } else if (pn == "") {
    errmsg.push("Name field is empty, please enter a name.");
    doms.mainDoms.audio.src = "./game-files/sound/wrong.wav";
    doms.mainDoms.audio.play();
    document.getElementById("nameerror").innerText = errmsg[0];
  } else if (pn.length < 2) {
    errmsg.push("Name needs to be longer than 2 characters.");
    doms.mainDoms.audio.src = "./game-files/sound/wrong.wav";
    doms.mainDoms.audio.play();
    document.getElementById("nameerror").innerText = errmsg[0];
  } else {
    checkDatabase(pn);
    //
    setTimeout(() => {
      if (start === true) {
        document.getElementById("nameerror").innerText = " ";
        playerName = pn;
        console.log(pn + " is okay");
        gsap.to(document.getElementById("enternamescreen"), {
          y: "-200vw",
          duration: 1,
        });
        gsap.to(document.getElementById("rangeSelect"), {
          y: "0",
          duration: 1,
        });
      }
    }, 3000);
  }
}

function checkDatabase(pn) {
  start = true;
  const lbArray = [];
  var xhr = new XMLHttpRequest();
  // The true means that it is asynconouse!!
  xhr.open("GET", "/lb", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  xhr.onload = function () {
    const leaderboard = JSON.parse(xhr.response);

    const l = Object.keys(leaderboard.data.leaderboard).length;
    //
    for (let i = 0; i < l; i++) {
      lbArray.push(leaderboard.data.leaderboard[i]);
    }
    //
    for (let i = 0; i < lbArray.length; i++) {
      if (lbArray[i].name == pn) {
        doms.mainDoms.audio.src = "./game-files/sound/wrong.wav";
        doms.mainDoms.audio.play();
        document.getElementById("nameerror").innerText =
          "Leaderboard contains this name, please choose another.";
        start = false;
      }
    }
  };
}
