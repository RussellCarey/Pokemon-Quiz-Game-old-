import * as doms from "./elements.js";
import * as main from "./controller.js";

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
        doms.mainDoms.titlelogo.addEventListener("click", () => {
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
          gsap.to(doms.mainDoms.modeSelect, { y: "0", duration: 1 });
        });
      }, 3400);
    });
  }, 7000);
}

// Typing Mode
document.getElementById("choice1").addEventListener("click", () => {
  gsap.to(doms.mainDoms.modeSelect, { y: "200vw", duration: 1 });
  gsap.to(doms.mainDoms.rangeSelect, { y: "0", duration: 1 });
});

// Multile choice
document.getElementById("choice2").addEventListener("click", () => {
  gsap.to(doms.mainDoms.modeSelect, { y: "200vw", duration: 1 });
  gsap.to(doms.mainDoms.rangeSelect, { y: "0", duration: 1 });
});

// RAnge button choice
document.getElementById("rangeStart").addEventListener("click", () => {
  doms.mainDoms.audio.pause();
  document.getElementById("rangeSelect").style.transform = "translate(-200vw)";
  document.getElementById("menubackground").style.transform =
    "translate(-200vw)";
  doms.mainDoms.loadingscreen.style.transform = "translate(0)";
  main.loadPokemonData();
});

// On click screen - load the next screen for mode select
// On mode select go to range select
// After range select -- add another loading screen before the game start
// load the game
