const position = document.querySelector(".posiition");
const nameofplayer = document.querySelector(".player-name");
const playerPic = document.querySelector(".player-pic");
const nationality = document.querySelector(".country");
const flags = document.querySelector(".flagss");
const playerClub = document.querySelector(".club-names");
const clubLog = document.querySelector(".club-log");
const playerRating = document.querySelector(".player-rating");
const playerPace = document.querySelector(".player-pace");
const playerPassing = document.querySelector(".player-passing");
const addPlyerBtn = document.querySelectorAll(".addplayer");
const playersVistaire = document.querySelector(".storedPlayers");
const players = document.querySelectorAll(".players");

const playerShooting = document.querySelector(".player-shooting");
const playerDribbling = document.querySelector(".player-dribbling");
const playerDefending = document.querySelector(".player-defending");
const playerPhysical = document.querySelector(".player-physical");
const submitForm = document.querySelector(".submit-js");
const forma = document.querySelector(".forma");
let playersSaved = JSON.parse(localStorage.getItem("playersSaved")) || [];
let fieldPlayers = {}; // Store players added to positions

if (document.body.classList.contains("form-page")) {
  submitForm.addEventListener("click", () => {
    if (
      position.value !== "" &&
      nameofplayer.value !== "" &&
      playerPic.value !== "" &&
      nationality.value !== "" &&
      flags.value !== "" &&
      playerClub.value !== "" &&
      clubLog.value !== "" &&
      playerRating.value !== "" &&
      playerPace.value !== "" &&
      playerPassing.value !== "" &&
      playerShooting.value !== "" &&
      playerDribbling.value !== "" &&
      playerDefending.value !== "" &&
      playerPhysical.value !== ""
    ) {
      let info = {
        playerPosition: position.value,
        playerName: nameofplayer.value,
        playerPic: playerPic.value,
        playerCountry: nationality.value,
        countryFlag: flags.value,
        playrClub: playerClub.value,
        playerRat: playerRating.value,
        ratingPace: playerPace.value,
        ratingPass: playerPassing.value,
        ratingShoot: playerShooting.value,
        ratingDribl: playerDribbling.value,
        ratingDefance: playerDefending.value,
        ratingPhysique: playerPhysical.value,
        clubLog: clubLog.value,
      };

      playersSaved.push(info);

      localStorage.setItem("playersSaved", JSON.stringify(playersSaved));
      alert("Player has been added");
    } else alert("Please fill all fields");
  });
}

if (document.body.classList.contains("main-page")) {
  const renderSavedPlayers = () => {
    playersVistaire.innerHTML = "";
    playersSaved.forEach((player, index) => {
      const cardShown = document.createElement("div");
      cardShown.classList.add("allCard");
      cardShown.dataset.index = index; // Store player's index
      cardShown.innerHTML = ` 
        <div class="card">
          <div class="uphalf">
            <div class="lefthalfup">
              <h4>${player.playerRat}</h4>
              <h5>${player.playerPosition}</h5>
              <img src="${player.countryFlag}" alt="" />
              <img class="logo" src="${player.clubLog}" alt="" />
            </div>
            <div class="righthalf">
              <img src="${player.playerPic}" alt="" />
            </div>
          </div>
          <div class="downhalfup">
            <div class="prenom">
              <h5 class="leNom">${player.playerName}</h5>
            </div>
            <div class="downhalfdown">
              <div class="lefthalfdown">
                <div class="satisnumber">
                  <p>${player.ratingPace}</p>
                  <p>${player.ratingShoot}</p>
                  <p>${player.ratingPass}</p>
                </div>
                <div class="satword">
                  <p>PAC</p>
                  <p>SHO</p>
                  <p>PAS</p>
                </div>
              </div>
              <div class="rightleftdown">
                <div class="satisnumbe">
                  <p>${player.ratingDribl}</p>
                  <p>${player.ratingDefance}</p>
                  <p>${player.ratingPhysique}</p>
                </div>
                <div class="satwor">
                  <p>DRI</p>
                  <p>DEF</p>
                  <p>PHY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="select-player-btn">Select</button>
      `;
      playersVistaire.appendChild(cardShown);
    });

    // Add click event for Select button
    document.querySelectorAll(".select-player-btn").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const selectedPlayer = playersSaved[index];
        addPlayerToField(selectedPlayer);
      });
    });
  };

  renderSavedPlayers();

  // Add the player to the field
  const addPlayerToField = (player) => {
    const playerPosition = player.playerPosition;

    // Check if the position is already taken
    if (fieldPlayers[playerPosition]) {
      alert(`The ${playerPosition} position is already occupied!`);
      return;
    }

    // Find the corresponding player position element
    const positionElement = document.querySelector(
      `.players[data-position='${playerPosition}']`
    );

    if (positionElement && positionElement.style.display !== "none") {
      // Create player image element and display player info
      const playerImage = document.createElement("img");
      playerImage.src = player.playerPic;
      playerImage.alt = player.playerName;
      playerImage.classList.add("field-player");

      const playerInfo = document.createElement("div");
      playerInfo.classList.add("player-info");
      playerInfo.innerHTML = `
      <div class="shownplr"> <h5>${player.playerName}</h5>
        <p>${playerPosition}</p>
        <button class="remove-player-btn">Remove</button></div>
      `;

      // Add player image and info to the position
      positionElement.appendChild(playerImage);
      positionElement.appendChild(playerInfo);

      // Save player in the fieldPlayers object
      fieldPlayers[playerPosition] = player;

      // Hide the add button for this position
      const addButton = positionElement.querySelector(".addplayer");
      if (addButton) {
        addButton.style.display = "none";
      }

      // Add remove button functionality
      playerInfo
        .querySelector(".remove-player-btn")
        .addEventListener("click", () => {
          removePlayerFromField(playerPosition);
        });
    } else {
      alert("Invalid position or formation. Please select a valid position.");
    }
  };

  // Remove player from the field
  const removePlayerFromField = (position) => {
    const positionElement = document.querySelector(
      `.players[data-position='${position}']`
    );
    const playerImage = positionElement.querySelector(".field-player");
    const playerInfo = positionElement.querySelector(".player-info");

    if (playerImage && playerInfo) {
      // Remove player image and info
      positionElement.removeChild(playerImage);
      positionElement.removeChild(playerInfo);

      // Remove player from fieldPlayers object
      delete fieldPlayers[position];

      // Show the add button for this position again
      const addButton = positionElement.querySelector(".addplayer");
      if (addButton) {
        addButton.style.display = "block";
      }
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const formationSelector = document.getElementById("formation");
  const playerElements = document.querySelectorAll(".players");

  // Formation configurations
  const formations = {
    "4-3-3": [
      "GK",
      "CB1",
      "CB2",
      "LB",
      "RB",
      "CM1",
      "CM2",
      "CM3",
      "LW",
      "RW",
      "ST",
    ],
    "4-4-2": [
      "GK",
      "CB1",
      "CB2",
      "LB",
      "RB",
      "CM1",
      "CM2",
      "LM",
      "RM",
      "ST1",
      "ST2",
    ],
  };

  // Map each position to its coordinates
  const positionStyles = {
    GK: { left: "42%", bottom: "10%" },
    CB1: { left: "30%", bottom: "33%" },
    CB2: { left: "60%", bottom: "33%" },
    LB: { left: "10%", bottom: "33%" },
    RB: { left: "85%", bottom: "33%" },
    CM1: { left: "25%", bottom: "55%" },
    CM2: { left: "50%", bottom: "55%" },
    CM3: { left: "75%", bottom: "55%" },
    LW: { left: "10%", bottom: "77%" },
    RW: { left: "75%", bottom: "77%" },
    LM: { left: "15%", bottom: "60%" },
    RM: { left: "70%", bottom: "60%" },
    ST1: { left: "40%", bottom: "77%" },
    ST2: { left: "60%", bottom: "77%" },
  };

  formationSelector.addEventListener("change", () => {
    const selectedFormation = formationSelector.value;
    const formationPositions = formations[selectedFormation];

    playerElements.forEach((playerElement) => {
      const position = playerElement.dataset.position;
      if (formationPositions.includes(position)) {
        playerElement.style.display = "block"; // Show position
        const { left, bottom } = positionStyles[position];
        playerElement.style.left = left;
        playerElement.style.bottom = bottom;
      } else {
        playerElement.style.display = "none"; // Hide position
      }
    });
  });

  formationSelector.dispatchEvent(new Event("change")); // Initialize with default formation
});
