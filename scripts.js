//***************************SPLASH SCREEN Disk Image******************************** */

document.addEventListener("DOMContentLoaded", function () {
  // Duration for each splash screen in milliseconds
  // const SPLASH_DURATION = 500; // 0.5 seconds per splash screen
  const SPLASH1_DURATION = 600; // 600 0.7 seconds for first splash
  const SPLASH2_DURATION = 1500; // 1500 0.5 seconds for second splash

  // Get references to the splash screens and main content
  const splash1 = document.getElementById("splash1");
  const splash2 = document.getElementById("splash2");
  const mainContent = document.getElementById("main-content");

  // Function to fade out an element
  function fadeOut(element, callback) {
    element.style.opacity = "0";
    // Wait for the transition to complete before executing the callback
    setTimeout(() => {
      element.style.display = "none";
      if (callback) callback();
    }, 500); // Match this duration with the CSS transition (0.5s)
  }

  // Show the first splash screen for SPLASH_DURATION
  setTimeout(() => {
    fadeOut(splash1, () => {
      // After first splash screen fades out, show the second splash screen
      splash2.style.display = "flex"; // Using flex to center the image
      splash2.style.opacity = "1"; // Ensure it's fully visible

      // Show the second splash screen for SPLASH_DURATION
      setTimeout(() => {
        fadeOut(splash2, () => {
          // After second splash screen fades out, show the main content
          mainContent.style.display = "block";
        });
      }, SPLASH2_DURATION);
    });
  }, SPLASH1_DURATION);
});

//*************** Green CRT Text Splashscreen 2 *************
document.addEventListener("DOMContentLoaded", function () {
  const lines = document.querySelectorAll(".line");
  // const cursor = document.getElementById("cursor");

  let lineIndex = 0;
  let charIndex = 0;
  const typingSpeed = 1; // Speed of typing effect

  function typeCharacter() {
    if (lineIndex < lines.length) {
      let currentLine = lines[lineIndex].dataset.line;

      if (charIndex < currentLine.length) {
        lines[lineIndex].style.opacity = 1;
        lines[lineIndex].textContent += currentLine[charIndex];

        charIndex++;
        setTimeout(typeCharacter, typingSpeed);
      } else {
        lines[lineIndex].textContent += "\n";
        lineIndex++;
        charIndex = 0;
        setTimeout(typeCharacter, typingSpeed);
      }
    }
  }
  typeCharacter();
});

//******************************MAIN SITE BELOW************************************* */

//************************Make Open Windows Draggable******************************* */

// Make windows draggable with a drag threshold
function makeDraggable(element, header) {
  let isDragging = false;
  let offsetX = 0,
    offsetY = 0;
  let startX = 0,
    startY = 0;
  const dragThreshold = 5;

  // Bring the window to the top when clicking anywhere on the window
  element.addEventListener("mousedown", function (event) {
    if (!event.target.classList.contains("close-btn")) {
      element.style.zIndex = getNextZIndex();
    }
  });

  header.addEventListener("mousedown", function (event) {
    startX = event.clientX;
    startY = event.clientY;
    offsetX = event.clientX - element.offsetLeft;
    offsetY = event.clientY - element.offsetTop;
    isDragging = false;

    function onMouseMove(event) {
      const diffX = Math.abs(event.clientX - startX);
      const diffY = Math.abs(event.clientY - startY);

      // Only start dragging if the mouse has moved beyond the threshold
      if (!isDragging && (diffX > dragThreshold || diffY > dragThreshold)) {
        isDragging = true;
      }

      if (isDragging) {
        // Move the window, maintaining the offset
        element.style.left = event.clientX - offsetX + "px";
        element.style.top = event.clientY - offsetY + "px";
        element.style.position = "absolute"; // Ensure absolute positioning
      }
    }

    function onMouseUp() {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    // Add mousemove and mouseup listeners
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    // Prevent default behavior (e.g., text selection)
    event.preventDefault();
  });
}

// Function to get the next highest z-index
function getNextZIndex() {
  const allWindows = document.querySelectorAll(".info-window");
  let highestZIndex = 0;

  allWindows.forEach((window) => {
    const zIndex = parseInt(window.style.zIndex) || 0;
    if (zIndex > highestZIndex) {
      highestZIndex = zIndex;
    }
  });

  return highestZIndex + 1;
}

// Apply draggable functionality
makeDraggable(
  document.getElementById("info-window"),
  document.getElementById("info-header")
);
makeDraggable(
  document.getElementById("info-window-hardware"),
  document.getElementById("hrdwr-header")
);
makeDraggable(
  document.getElementById("info-window-webdev"),
  document.getElementById("webdv-header")
);
makeDraggable(
  document.getElementById("info-window-vr"),
  document.getElementById("vr-header")
);
makeDraggable(
  document.getElementById("info-window-aboutMe"),
  document.getElementById("aboutMe-header")
);
makeDraggable(
  document.getElementById("info-window-resume"),
  document.getElementById("resume-header")
);
makeDraggable(
  document.getElementById("info-window-contact"),
  document.getElementById("contact-header")
);
makeDraggable(
  document.getElementById("info-window-ms"),
  document.getElementById("ms-header")
);
makeDraggable(
  document.getElementById("info-window-trash"),
  document.getElementById("trash-header")
);

makeDraggable(
  document.getElementById("info-window-emptyTrash"),
  document.getElementById("emptyTrash-header")
);

// makeDraggable(
//   document.getElementById("info-window-cookies"),
//   document.getElementById("cookies-header")
// );

//************************shrink open/close window anim******************************* */
function toggleWindow(element) {
  // Set the display to block first, and then use setTimeout to apply the show class
  element.style.display = "block";

  // Trigger a reflow to make sure the transition works
  element.offsetHeight; // This forces a reflow, necessary for the transition to work

  // Add the show class to trigger the grow-out animation
  element.classList.add("show");

  // Set the window to the highest z-index
  element.style.zIndex = getNextZIndex();
}

function closeWindow(element) {
  // Remove the show class to trigger the shrink-down animation
  element.classList.remove("show");

  // Hide the element after the animation completes
  setTimeout(() => {
    element.style.display = "none";
  }, 200); // Match the transition duration (200ms)
}

//************************Make Icons Clickable******************************* */

document.getElementById("info-icon").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window"));
});

document
  .getElementById("info-iconHrdwr")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-hardware"));
  });

document
  .getElementById("info-iconWebDev")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-webdev"));
  });

document
  .getElementById("info-iconVR")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-vr"));
  });

document
  .getElementById("info-iconBlog")
  .addEventListener("dblclick", function () {
    window.open(
      " https://bloghoskins.blogspot.com/",
      "_blank",
      "width=800,height=600"
    ); // Opens old site in a new tab
  });

document
  .getElementById("info-iconOldSite")
  .addEventListener("dblclick", function () {
    window.open(
      "https://digitalsunsetstudios.com/oldIndex.html",
      "_blank",
      "width=800,height=600"
    ); // Opens BLOG in a new tab
  });

document
  .getElementById("info-iconGit")
  .addEventListener("dblclick", function () {
    window.open("https://github.com/gary909", "_blank", "width=800,height=600"); // Opens GITHUB in a new tab
  });

document
  .getElementById("info-iconLinkIn")
  .addEventListener("dblclick", function () {
    window.open(
      "https://www.linkedin.com/in/gary-white-3a779a51/",
      "_blank",
      "width=800,height=600"
    ); // Opens LLINKEDIN in a new tab
  });

document
  .getElementById("info-iconAboutMe")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-aboutMe"));
  });

document
  .getElementById("info-iconResume")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-resume"));
  });

document
  .getElementById("info-iconContact")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-contact"));
  });

document
  .getElementById("info-iconMS")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-ms"));
  });

document
  .getElementById("info-iconTrash")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-trash"));
  });

document
  .getElementById("info-iconEmptyTrash")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-emptyTrash"));
  });

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    closeWindow(this.parentElement);
  });
});

//************************Make Icon text Clickable******************************* */

// main About (desktop) text clickable
document.getElementById("about-text").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window"));
});

// AboutMe (windowed) text clickable
document
  .getElementById("aboutMe-text")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-aboutMe"));
  });

// Resume (windowed) text clickable
document
  .getElementById("resume-text")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-resume"));
  });

// contact icon (windowed) text clickable
document
  .getElementById("contact-text")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-contact"));
  });

// hardware icon text clickable
document.getElementById("hdwr-text").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window-hardware"));
});

// webdev icon text clickable
document
  .getElementById("webdev-text")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-webdev"));
  });

// vr icon text clickable
document.getElementById("vr-text").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window-vr"));
});

// blog icon text clickable
document.getElementById("blog-text").addEventListener("dblclick", function () {
  window.open(
    "https://bloghoskins.blogspot.com/",
    "_blank",
    "width=800,height=600"
  ); // Opens BLOG in a new tab
});

// Github icon text clickable
document
  .getElementById("github-text")
  .addEventListener("dblclick", function () {
    window.open("https://github.com/gary909", "_blank", "width=800,height=600"); // Opens GITHUB in a new tab
  });

// LinkedIn icon text clickable
document.getElementById("lkdIn-text").addEventListener("dblclick", function () {
  window.open(
    "https://www.linkedin.com/in/gary-white-3a779a51/",
    "_blank",
    "width=800,height=600"
  ); // Opens LINKEDIN in a new tab
});

// Minesweeper icon text clickable
document.getElementById("ms-text").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window-ms"));
});

// Trash icon text clickable
document.getElementById("trash-text").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window-trash"));
});

// Empty Trash icon text clickable
document
  .getElementById("emptyTrash-text")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-emptyTrash"));
  });

//*************************Make nav bar open upon click****************************** */

// Set a flag to indicate if the navbar is active
let navbarActive = false;

// Select all the nav items
const navItems = document.querySelectorAll(".nav-item");

// Add click event listener to each nav item (initial click activates hover)
navItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevents closing dropdown immediately when clicking inside

    // Activate the navbar if it is not active yet
    if (!navbarActive) {
      navbarActive = true;
      const dropdown = this.querySelector(".dropdown");

      // Close any other open dropdowns and open the clicked one
      closeAllDropdowns();
      dropdown.style.display = "block";

      // Enable hover functionality for all other items
      enableHover();
    }
  });
});

// Enable hover functionality after the first click
function enableHover() {
  navItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      if (navbarActive) {
        const dropdown = this.querySelector(".dropdown");
        // Close any other open dropdowns and show the hovered one
        closeAllDropdowns();
        dropdown.style.display = "block";
      }
    });
  });
}

// Function to close all open dropdowns
function closeAllDropdowns() {
  document.querySelectorAll(".dropdown").forEach((menu) => {
    menu.style.display = "none";
  });
}

// Close the dropdowns and reset navbar when clicking outside
document.addEventListener("click", function (event) {
  const isClickInsideNav = event.target.closest(".nav-bar");

  if (!isClickInsideNav) {
    closeAllDropdowns();
    navbarActive = false; // Reset navbar state when clicking outside
  }
});

//*******************************Make Icons Draggable******************************** */

// Function to make icon containers draggable
function makeIconDraggable(iconContainer) {
  let isDragging = false;
  let offsetX = 0,
    offsetY = 0;

  iconContainer.addEventListener("mousedown", function (event) {
    let startX = event.clientX;
    let startY = event.clientY;
    isDragging = false;

    offsetX = event.clientX - iconContainer.offsetLeft;
    offsetY = event.clientY - iconContainer.offsetTop;

    function onMouseMove(event) {
      const diffX = Math.abs(event.clientX - startX);
      const diffY = Math.abs(event.clientY - startY);

      if (!isDragging && (diffX > 5 || diffY > 5)) {
        isDragging = true;
      }

      if (isDragging) {
        iconContainer.style.left = event.clientX - offsetX + "px";
        iconContainer.style.top = event.clientY - offsetY + "px";
        iconContainer.style.position = "absolute";
      }
    }

    function onMouseUp() {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    event.preventDefault();
  });
}

// Apply draggable functionality to each icon
const iconContainers = document.querySelectorAll(".icon-container");
iconContainers.forEach((container) => makeIconDraggable(container));

//***************************Add time and date to top Nav**************************** */

function updateTime() {
  const timeDateElement = document.getElementById("time-date");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();

  // Display format: HH:MM:SS - DD/MM/YYYY
  timeDateElement.textContent = `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
}

// Update time every second
setInterval(updateTime, 1000);

// Initialize the time immediately
updateTime();

//********************************Fullscreen Button********************************** */

// Function to toggle fullscreen mode
function toggleFullscreen() {
  const elem = document.documentElement; // Target the whole page (document)

  if (!document.fullscreenElement) {
    // If not in fullscreen, request fullscreen mode
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    document.getElementById("fullscreen-icon").src = "fullscreen_exit.png"; // Change to exit icon
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    document.getElementById("fullscreen-icon").src = "fullscreen_button.png"; // Change back to fullscreen icon
  }
}

// Add event listener to the button
document
  .getElementById("fullscreen-btn")
  .addEventListener("click", toggleFullscreen);

// Handle when the user exits fullscreen with Escape or other methods
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    document.getElementById("fullscreen-icon").src = "fullscreen_button.png"; // Change back to fullscreen icon
  }
});

//******************************Close All windows Button************************************ */

// Function to close all open windows
function closeAllWindows() {
  const openWindows = document.querySelectorAll(".info-window.show");
  openWindows.forEach((window) => {
    window.classList.remove("show"); // Hide the window by removing the 'show' class
  });
}

// Add event listener to the close windows button
document
  .getElementById("close-windows-btn")
  .addEventListener("click", closeAllWindows);

//****************************************NAV BAR Links********************************* */

//************* ABOUT ME NAV BAR ****************/
const aboutLink = document.getElementById("about-link");
const aboutWindow = document.getElementById("info-window-aboutMe");

// Function to open the vr window
aboutLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-aboutMe"));
  closeAllDropdowns();
});

//****** RESUME NAV BAR *******/
const resumeLink = document.getElementById("resume-link");
const resumeWindow = document.getElementById("info-window-resume");

// Function to open the vr window
resumeLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-resume"));
  closeAllDropdowns();
});

//****** CONTACT NAV BAR *******/
const contactLink = document.getElementById("contact-link");
const contactWindow = document.getElementById("info-window-contact");

// Function to open the vr window
contactLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-contact"));
  closeAllDropdowns();
});

//****** VR NAV BAR *******/
const vrLink = document.getElementById("vr-link");
const vrWindow = document.getElementById("info-window-vr");

// Function to open the vr window
vrLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-vr"));
  closeAllDropdowns();
});

//****** WEB DEV NAV BAR *******/
const webdevLink = document.getElementById("webdev-link");
const webdevWindow = document.getElementById("info-window-webdev");

// Function to open the webdev window
webdevLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-webdev"));
  closeAllDropdowns();
});

//****** Hardware NAV BAR ***/
// Get the "Projects" link and hardware window elements
const projectsLink = document.getElementById("hardware-link");
const hardwareWindow = document.getElementById("info-window-hardware");

// Function to open the hardware window
projectsLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-hardware"));
  closeAllDropdowns();
});

//****************************** Cookies NAV BAR *************************/
// Get the "Projects" link and hardware window elements
const cookiesLink = document.getElementById("cookies-link");
const cookiesWindow = document.getElementById("info-window-cookies");

// Function to open the hardware window
cookiesLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-cookies"));
  closeAllDropdowns();
});

// Get the button element by its ID
document.getElementById("leave-btn").addEventListener("click", function () {
  // Redirect to the desired website
  window.location.href = "https://cats.com/"; // Replace with your desired URL
});

const cookieWindow = document.getElementById("info-window-cookies");

// Get the button element by its ID
document.getElementById("stay-btn").addEventListener("click", function () {
  // Redirect to the desired website
  cookieWindow.style.display = "none"; // Hide the cookie window
});

//*************************Pixelated Bio Image reveal****************************** */

const infoWindow = document.getElementById("info-window-aboutMe");
const image = document.getElementById("image");
const images = ["images/GHck4.jpg", "images/GHck3.jpg", "images/GHck2.jpg"];

let index = 0;
const delay = 500; // Adjust the delay in milliseconds as needed

function transitionImage() {
  if (index < images.length) {
    image.src = images[index];
    index++;
    setTimeout(transitionImage, delay);
  }
}

// Function to trigger when the window is opened
function handleWindowOpen() {
  if (infoWindow.style.display !== "none") {
    // Reset index and start image transition
    index = 0;
    setTimeout(transitionImage, delay);
  }
}

// Observe changes in the display style of the window
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.attributeName === "style" &&
      infoWindow.style.display === "block"
    ) {
      handleWindowOpen();
    }
  });
});

// Start observing the info window for style changes
observer.observe(infoWindow, { attributes: true });

// Initially hide the window
infoWindow.style.display = "none";

//*************************Pixelated Hardware Image reveal****************************** */

const hrdwrWindow = document.getElementById("info-window-hardware");
const hdWrImage = document.getElementById("hdWrImage");
const hdWrImages = [
  "images/StringSynthCutOut3.png",
  "images/StringSynthCutOut2.png",
  "images/StringSynthCutOut1.png",
  "images/StringSynthCutOut.png",
];

let hdWrIndex = 0;
const hdWrDelay = 500; // Adjust the delay in milliseconds as needed

function hdWrtransitionImage() {
  if (hdWrIndex < hdWrImages.length) {
    hdWrImage.src = hdWrImages[hdWrIndex];
    hdWrIndex++;
    setTimeout(hdWrtransitionImage, hdWrDelay);
  }
}

// Function to trigger when the window is opened
function hdWrhandleWindowOpen() {
  if (hrdwrWindow.style.display !== "none") {
    // Reset index and start image transition
    hdWrIndex = 0;
    setTimeout(hdWrtransitionImage, hdWrDelay);
  }
}

// Observe changes in the display style of the window
const hdWrObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.attributeName === "style" &&
      hrdwrWindow.style.display === "block"
    ) {
      hdWrhandleWindowOpen();
    }
  });
});

// Start observing the info window for style changes
hdWrObserver.observe(hrdwrWindow, { attributes: true });

// Initially hide the window
hrdwrWindow.style.display = "none";

//********************Blog Text Carousel***************************/

document.addEventListener("DOMContentLoaded", function () {
  const sentences = [
    '"I found your Blog Hoskins site, and well.. what a wonderful thing youve done"',
    '"Your explanations were so useful and Ive certainly learnt a lot more than I knew before I found your site!"',
    '"OH MAN I JUST GOT IT WORKING! THE SHEER JOY! Thanks for your work!"',
    '"Just a quick note to say thanks for the Helios project article. It started me off down a fantastic rabbit hole.."',
  ];
  let currentIndex = 0;

  const sentenceElement = document.getElementById("sentence");

  function showNextSentence() {
    // Fade out first
    sentenceElement.classList.remove("fade-in");

    // Wait for the fade-out to complete before changing the text
    setTimeout(() => {
      // Update the text content
      currentIndex = (currentIndex + 1) % sentences.length;
      sentenceElement.textContent = sentences[currentIndex];

      // Force reflow: this ensures the class change is registered properly
      void sentenceElement.offsetWidth; // Forces the browser to reflow, so it registers the class re-adding

      // Fade the new sentence in
      sentenceElement.classList.add("fade-in");
    }, 1000); // Match the fade-out duration (1s)
  }

  // Initial fade-in for the first sentence
  sentenceElement.classList.add("fade-in");

  // Cycle through sentences every 3 seconds
  setInterval(showNextSentence, 3000);
});

//********************Collapsible Certs***************************/
// document.addEventListener("DOMContentLoaded", function () {
//   const collapsibles = document.querySelectorAll(".collapsible");

//   collapsibles.forEach((button) => {
//     button.addEventListener("click", function () {
//       this.classList.toggle("active");

//       const content = this.nextElementSibling;
//       if (content.style.display === "block") {
//         content.style.display = "none";
//       } else {
//         content.style.display = "block";
//       }
//     });
//   });
// });

//****************************Minesweeper Code Below*********************************/

const minesweeper = document.getElementById("minesweeper");
const resetButton = document.getElementById("resetButton");
const gridSize = 10;
const numMines = 15;
let cells = [];
let gameEnded = false;

resetButton.addEventListener("click", resetGame);

function resetGame() {
  // Clear the grid
  minesweeper.innerHTML = "";
  cells = [];
  gameEnded = false;
  createGrid();
}

function createGrid() {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-id", i);
    cell.setAttribute("data-bomb", "false");
    cell.addEventListener("click", () => handleClick(cell));
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (!gameEnded) toggleFlag(cell);
    });
    minesweeper.appendChild(cell);
    cells.push(cell);
  }
  placeMines();
}

function placeMines() {
  let placedMines = 0;
  while (placedMines < numMines) {
    const randomIndex = Math.floor(Math.random() * gridSize * gridSize);
    const cell = cells[randomIndex];
    if (cell.getAttribute("data-bomb") === "false") {
      cell.setAttribute("data-bomb", "true");
      placedMines++;
    }
  }
}

function handleClick(cell) {
  if (
    gameEnded ||
    cell.classList.contains("revealed") ||
    cell.classList.contains("flag")
  )
    return;

  if (cell.getAttribute("data-bomb") === "true") {
    endGame(false);
  } else {
    revealCell(cell);
    checkWin();
  }
}

function revealCell(cell) {
  const id = parseInt(cell.getAttribute("data-id"));
  const adjacentBombs = countAdjacentBombs(id);
  cell.classList.add("revealed");
  if (adjacentBombs > 0) {
    cell.textContent = adjacentBombs;
  } else {
    revealAdjacentCells(id);
  }
}

function countAdjacentBombs(id) {
  const adjacentCells = getAdjacentCells(id);
  return adjacentCells.filter(
    (cell) => cell.getAttribute("data-bomb") === "true"
  ).length;
}

function revealAdjacentCells(id) {
  const adjacentCells = getAdjacentCells(id);
  adjacentCells.forEach((cell) => {
    if (!cell.classList.contains("revealed")) {
      revealCell(cell);
    }
  });
}

function getAdjacentCells(id) {
  const adjacent = [];
  const row = Math.floor(id / gridSize);
  const col = id % gridSize;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      if (
        newRow >= 0 &&
        newRow < gridSize &&
        newCol >= 0 &&
        newCol < gridSize
      ) {
        adjacent.push(cells[newRow * gridSize + newCol]);
      }
    }
  }
  return adjacent;
}

function toggleFlag(cell) {
  if (cell.classList.contains("flag")) {
    cell.classList.remove("flag");
  } else {
    cell.classList.add("flag");
  }
}

function checkWin() {
  const revealedCells = cells.filter((cell) =>
    cell.classList.contains("revealed")
  ).length;
  if (revealedCells === gridSize * gridSize - numMines) {
    endGame(true);
  }
}

function endGame(win) {
  gameEnded = true;
  cells.forEach((cell) => {
    if (cell.getAttribute("data-bomb") === "true") {
      cell.classList.add("bomb");
    }
  });
  setTimeout(() => {
    alert(win ? "You Win!" : "Game Over");
  }, 100);
}

createGrid();

//*************** */ Delay the background image by 3 seconds********************
setTimeout(function () {
  document.body.style.backgroundImage = "url('images/DigitalSunsetLogo.png')";
}, 2900); // 3000 milliseconds = 3 seconds

//*************** */ Delay the background Colour by 2 seconds********************
setTimeout(function () {
  document.body.style.backgroundColor = "#004f9f";
}, 2000); // 2000 milliseconds = 2 seconds

//****************************Clippy GIF JS*********************************/

// Wait 30 seconds before showing Clippy
setTimeout(function () {
  const clippyGif = document.getElementById("clippyGif");

  // Fade in Clippy
  clippyGif.classList.add("show");

  // After 3 seconds, fade out Clippy
  setTimeout(function () {
    clippyGif.classList.remove("show");
    clippyGif.classList.add("hide");
  }, 2000); // Keep it visible for 2 seconds
}, 3300); // Wait 3.3 seconds before showing the GIF

//****************************Make icons clickable under mobile*********************************/

// Function to open a window based on device type
function handleOpenWindow(event, element, windowId) {
  // Check if it's a touch event (e.g., mobile device)
  if (event.type === "touchstart" || event.type === "click") {
    toggleWindow(element);
  }
}

// Function to attach the event listeners for opening windows
function addOpenWindowListener(iconId, windowId) {
  const icon = document.getElementById(iconId);
  const windowElement = document.getElementById(windowId);

  // Add click event listener
  icon.addEventListener("click", function (event) {
    handleOpenWindow(event, windowElement);
  });

  // Add touchstart event listener with { passive: true }
  icon.addEventListener(
    "touchstart",
    function (event) {
      handleOpenWindow(event, windowElement);
    },
    { passive: true }
  ); // This makes the event listener passive
}

// Function to open a web link based on device type
function handleOpenLink(event, url) {
  // Check if it's a touch or click event
  if (event.type === "touchstart" || event.type === "click") {
    // Open the web link in a new tab
    window.open(url, "_blank");
  }
}

// Function to attach event listeners to open web links
function addLinkOpenListener(iconId, url) {
  const icon = document.getElementById(iconId);

  // Add both touchstart and click event listeners
  icon.addEventListener("click", function (event) {
    handleOpenLink(event, url);
  });

  // ); // This makes the event listener passive
  icon.addEventListener(
    "touchstart",
    function (event) {
      const windowElement = document.getElementById(windowId); // Define windowElement here
      handleOpenWindow(event, windowElement, windowId);
    },
    { passive: true }
  );
}

// Example: Attach listeners for the icons to open web links

// Check if the screen width is less than or equal to 767px
if (window.matchMedia("(max-width: 767px)").matches) {
  // Apply the event listeners to your window icons
  addOpenWindowListener("info-icon", "info-window");
  addOpenWindowListener("info-iconHrdwr", "info-window-hardware");
  addOpenWindowListener("info-iconWebDev", "info-window-webdev");
  addOpenWindowListener("info-iconVR", "info-window-vr");
  // addOpenWindowListener("info-iconBlog", "info-window3");
  // addOpenWindowListener("info-iconGit", "info-window3");
  // addOpenWindowListener("info-iconLinkIn", "info-window3");
  addOpenWindowListener("info-iconTrash", "info-window-trash");
  addOpenWindowListener("info-iconAboutMe", "info-window-aboutMe");
  addOpenWindowListener("info-iconResume", "info-window-resume");
  addOpenWindowListener("info-iconContact", "info-window-contact");
  addOpenWindowListener("info-iconEmptyTrash", "info-window-emptyTrash");
  addOpenWindowListener("info-iconContact", "info-window3");
  addOpenWindowListener("info-iconMS", "info-window-ms");
  // Below: Attach listeners for the icons to open web links:
  addLinkOpenListener("info-iconBlog", "https://bloghoskins.blogspot.com");
  addLinkOpenListener("info-iconGit", "https://github.com/gary909");
  addLinkOpenListener(
    "info-iconLinkIn",
    "https://www.linkedin.com/in/gary-white-3a779a51/"
  );
  addLinkOpenListener(
    "info-iconOldSite",
    "https://digitalsunsetstudios.com/oldIndex.html"
  );
}
