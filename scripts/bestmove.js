const space = "_";
let lastFen = "";
let bestMovePopup;
const defaultFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 0";
const STOCKFISH_DEPTH = 16;
const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

function readCurrentBoardFen() {
  const index = new Array(64).fill(space);
  let hasPiece = false;
  for (var i = 1; i <= 8; i++)
    for (var j = 1; j <= 8; j++) {
      const el = document.querySelector(`.piece.square-${i}${j}`);
      if (el) {
        let piece = el
          .getAttribute("class")
          .split(" ")
          .find((x) => x.length === 2 && ["w", "b"].includes(x[0]));

        if (piece && piece[0] == "w") {
          index[(j - 1) * 8 + i - 1] = piece[1].toUpperCase();
          hasPiece = true;
        }

        if (piece && piece[0] == "b") {
          hasPiece = true;
          index[(j - 1) * 8 + i - 1] = piece[1].toLowerCase();
        }
      }
    }
  const row = [];
  for (var i = 0; i < 8; i++) {
    let fen = index.splice(0, 8).join("");
    for (let t = 8; t >= 1; t--) {
      fen = fen.replace(
        new RegExp(new Array(t).fill(space).join(""), "ig"),
        t.toString()
      );
    }
    row.push(fen);
  }
  const board = row.reverse().join("/");
  // const blackMoves = document.querySelectorAll(".black.node.selected");
  const whiteMoves = document.querySelector(".white.node.selected");
  const whoMoveNext = whiteMoves ? "b" : "w";

  //const kq = 'KQkq'
  const kq = kqStatus();
  return [`${board} ${whoMoveNext} ${kq} - 1 0`, hasPiece, whoMoveNext];
}
async function findBestMove(force = false) {
  if (force) {
    lastFen = "";
  }
  const [currentBoardFen, hasPiece, whoMoveNext] = readCurrentBoardFen(); //await getFenFromUI(); //
  // console.log(currentBoardFen, whoMoveNext);
  if (currentBoardFen && lastFen !== currentBoardFen && hasPiece) {
    // console.log(currentBoardFen);
    lastFen = currentBoardFen;
    updateUI(null, whoMoveNext);
    console.log(whoMoveNext, currentBoardFen);
    const result = await (
      await fetch(
        `https://stockfish-chess-api-p7dmqtfpta-km.a.run.app/bestmove?depth=${STOCKFISH_DEPTH}&fen=${lastFen}`
      )
    ).json();

    let [refreshBoardFen] = await readCurrentBoardFen();
    // console.log("refreshBoardFen", refreshBoardFen, lastFen);
    const boardOnly = refreshBoardFen.split(" ")[0];
    const lastBoard = lastFen.split(" ")[0];

    if (
      lastBoard === boardOnly ||
      lastBoard === "" ||
      lastBoard === defaultFEN
    ) {
      updateUI(result, whoMoveNext);
    } else {
      console.log("Board out of sync...");
      //
    }
  }
}

function kqStatus() {
  const w = getCastletatus("w");
  const b = getCastletatus("b");

  if (w == "-" && b === "-") return "- -";
  return w + b;
}
function getCastletatus(mover) {
  let king = mover === "b" ? "king-black" : "white-king";
  let query = mover === "b" ? ".black.node" : ".white.node";
  const findMoves = [...document.querySelectorAll(query + " span")].map((x) =>
    x.getAttribute("data-figurine")
  );

  const allMoves = [...document.querySelectorAll(query)].map((x) =>
    x.textContent.trim()
  );

  const testMoves = [...allMoves, ...findMoves];
  if (
    testMoves.includes("K") ||
    testMoves.includes("R") ||
    testMoves.includes("O-O") ||
    testMoves.includes("O-O-0")
  ) {
    return "-";
  }

  if (mover === "b") return "kq";
  return "KQ";
}
function uniqueMove(moves) {
  const result = [];
  const dict = {};
  for (const m of moves) {
    if (!dict[m.pv]) {
      dict[m.pv] = true;
      result.push(m);
    }
  }
  return result;
}

function updateUI(res, who) {
  // console.log("update UI", who);
  const div = document.querySelector(`.best-move .move-${who}`);
  if (!res) {
    div.innerText = "";
    div.parentNode.setAttribute("class", "waiting " + who);
    document
      .querySelector(".best-move")
      .setAttribute("class", "best-move loading-square");
    return;
  } else {
    document.querySelector(".best-move").setAttribute("class", "best-move");
  }
  const { fen, result } = res;
  const miniboard = document.querySelector(".miniboard");
  // miniboard.setAttribute('src', 'https://no-cors.fly.dev/cors/https://chess-board.fly.dev/?size=100&noframe=true')

  displayImageInConsole(fen, miniboard);

  const { bestmove, info } = result || {};
  const matchedMoves =
    info.filter((x) => x.pv && x.pv.split(" ")[0] === bestmove) || [];

  const onStepMove = info.find((x) => x.pv && x.pv === bestmove);

  const matesMove = matchedMoves.filter((x) => x.score?.unit === "mate");

  matesMove.sort((a, b) => {
    if (who === "b") {
      return a.score?.value - b.score?.value;
    }
    return b.score?.value - a.score?.value;
  });

  matchedMoves.sort((a, b) => {
    if (who === "b") {
      return a.score?.value - b.score?.value;
    }
    return b.score?.value - a.score?.value;
  });

  const allBestMoves = [...matesMove, ...uniqueMove(matchedMoves)];
  const bestMoveName = convertMovesToFriendlyNames(fen, bestmove, true);
  div.innerText = bestMoveName;
  console.log(
    `%cBest move for ${who}: ${bestmove} (${bestMoveName})`,
    `color: ${
      who === "w" ? "green" : "red"
    }; font-size: 45px; font-weight: bold;`
  );
  // displayMoveList()
  for (let i = 0; i < Math.min(30, allBestMoves.length); i++) {
    const item = allBestMoves[i];
    if (item) {
      const friendlyMoves = convertMovesToFriendlyNames(fen, item.pv);
      const message = `${item.score.unit}(${item.score?.value}) -> ${friendlyMoves} `;
      if (i === 0) {
        div.setAttribute("title", message);
      }
      console.log(`%c${i + 1}. ${message}`, "color: blue; font-size: 20px;");
    }
  }
  const start = bestmove.substr(0, 2);
  const end = bestmove.substr(2, 2);

  const startPost = start.charCodeAt(0) - 96;
  const endPos = end.charCodeAt(0) - 96;
  const startSquare = startPost + start[1];
  const endSquare = endPos + end[1];
  div.parentNode.setAttribute("class", "idle " + who);
  div.setAttribute("data-start-square", "square-" + startSquare);
  div.setAttribute("data-end-square", "square-" + endSquare);
  console.log("who", who);
  let bestMove = who == "b" ? allBestMoves.pop() : allBestMoves[0];
  if (matesMove.length > 0) {
    bestMove = matesMove[0];
  }
  console.log(bestMove.score);
  updateEloBar(bestMove, who);
  printChessboardFromFEN(fen);
}

function updateEloBar(bestMove, who) {
  if (!bestMove) {
    return;
  }
  if (who === "b") {
    bestMove.score.value = -bestMove.score.value;
  }
  const eloBar = document.querySelector(".board-layout-evaluation");
  const evaluation = eloBar.querySelector("#evaluation");

  let customEloBar = document.querySelector(".elo-bar");
  if (!customEloBar && evaluation) {
    evaluation.innerHTML = `
    <div id='custom-elo-bar' class='elo-bar view-as-white'> 
      <div class='elo-value' style='height: 50%'> </div>
      <div class='elo-text'>0.0</div>
    </div>`;
  }
  customEloBar = document.querySelector(".elo-bar");

  const valueBar = document.querySelector("#custom-elo-bar .elo-value");
  const textBar = document.querySelector("#custom-elo-bar .elo-text");

  const capturesPieces =
    document.querySelector("wc-captured-piece") ||
    document.querySelector("wc-captured-pieces") ||
    document.querySelector(".player-pieces");

  // const elm = document.querySelectorAll("wc-captured-pieces")[1];

  if (capturesPieces) {
    const viewAs =
      capturesPieces.getAttribute("player-color") === "2" ? "white" : "black";

    let displayText = Math.abs(bestMove.score.value / 100.0).toFixed(1);
    if (!displayText.includes(".")) {
      displayText += ".0";
    }
    if (bestMove.score.value > 0) {
      displayText = "+" + displayText;
    } else {
      displayText = "-" + displayText;
    }

    let isMating = false;
    if (bestMove.score.unit === "mate") {
      displayText = "M" + Math.abs(bestMove.score.value);
      isMating = true;
    }
    let percentage = 50;
    let winingChange = calculateWinChange(bestMove.score.value);
    // console.log("viewAs", viewAs, bestMove.score.value);
    console.log("winingChange", viewAs, winingChange);
    if (viewAs === "white") {
      winingChange = 100 - winingChange;

      if (isMating) {
        console.log("mate", bestMove.score);
        if (bestMove.score.value > 0) {
          winingChange = 0;
        } else winingChange = 100;
      }
      // console.log("percentage", percentage);
    }

    if (viewAs === "black") {
      if (isMating) {
        console.log("mate", bestMove.score);
        if (bestMove.score.value > 0) {
          winingChange = 100;
        } else winingChange = 0;
      }
    }

    if (evaluation) {
      evaluation.style.width = "25px";
      eloBar.style.width = "25px";
      customEloBar.setAttribute("class", "elo-bar view-as-" + viewAs);

      valueBar.style.height = Math.max(0, winingChange) + "%";
      textBar.innerText = displayText;
    } else {
      let el = document.querySelector(".my-custom-elo-bar");

      if (!el) {
        el = document.createElement("div");
        el.className = "my-custom-elo-bar";
        el.innerHTML = `
        <div class='elo-value' id="myelo"></div>
        <span id='elo-text' >0.0</span>
        `;
        document.querySelector("#board-layout-evaluation").appendChild(el);
      }
      el.setAttribute("class", "my-custom-elo-bar viewer-" + viewAs);
      const span = document.querySelector("#elo-text");
      span.innerHTML = displayText;
      const eloBarValue = document.querySelector("#myelo");
      eloBarValue.style.height = winingChange + "%";
    }
  }
}
function handleRouteChange() {}

function displayMoveList() {
  const existingDiv = document.querySelector(".evaluation-settings-component");
  const moveListDiv = document.querySelector(".my-move-list");
  if (moveListDiv) {
    const moveDivs = document.createElement("div");
    moveDivs.textContent = "New Div";
    moveDivs.setAttribute("class", "my-move-list");
    existingDiv.insertAdjacentElement("afterend", moveDivs);
  }
}
function initialisesdUI() {
  window.addEventListener("popstate", handleRouteChange);
  if (!bestMovePopup) {
    bestMovePopup = document.createElement("div");
    const miniBoard = document.createElement("img");
    miniBoard.setAttribute("class", "miniboard");
    const bDiv = document.createElement("div");
    bDiv.setAttribute("class", "b");
    const wDiv = document.createElement("div");
    wDiv.setAttribute("class", "w");

    bestMovePopup.appendChild(wDiv);
    bestMovePopup.appendChild(bDiv);
    bestMovePopup.appendChild(miniBoard);
    document.body.appendChild(bestMovePopup);

    bestMovePopup.setAttribute("class", "best-move");

    bDiv.innerHTML = `<span class="move-b"></span><span class="loading dot2"></span>`;
    wDiv.innerHTML = `<span class="move-w"></span><span class="loading dot2"></span>`;

    bestMovePopup.addEventListener("click", () => {
      // const start = document
      //   .querySelector(".best-move")
      //   .getAttribute("data-start-square");
      // const end = document
      //   .querySelector(".best-move")
      //   .getAttribute("data-end-square");
      // document.querySelector("." + start).click();
      findBestMove(true);
    });
  }
}

const mutationCallback = debounce(() => {
  initialisesdUI();
  findBestMove();
}, 200);

window.addEventListener("load", (event) => {
  console.log("register event .....");
  initialisesdUI();
  findBestMove();
  const o = new MutationObserver(mutationCallback);
  o.observe(document.querySelector(".board-layout-chessboard"), {
    attributes: true,
    childList: true,
    subtree: true,
  });
});

async function getFenFromUI() {
  return new Promise((resolve) => {
    const button = document.querySelector("span.download");
    if (button) {
      document.querySelector("span.download").parentNode.click();
      const className =
        document
          .querySelector("#board-layout-chessboard")
          .getAttribute("class") || "";

      document
        .querySelector("#board-layout-chessboard")
        .setAttribute("class", className + " chess-ext-hidden-ui");
      let intervalId = setInterval(() => {
        const value = document.querySelector(
          ".share-menu-tab-pgn-section input"
        )?.value;
        if (value) {
          clearInterval(intervalId);
          document.querySelector(".ui_outside-close-icon").click();
          const whoMoveNext = value.split(" ")[1];

          document
            .querySelector("#board-layout-chessboard")
            .setAttribute(
              "class",
              className.replace("chess-ext-hidden-ui", "")
            );
          resolve([value, true, whoMoveNext]);
        }
      }, 10);
    } else {
      resolve([""]);
    }
  });
}

setInterval(async () => {
  const [fen] = readCurrentBoardFen();

  if (fen.split(" ")[0] !== lastFen.split(" ")[0]) {
    findBestMove();
  }
}, 5000);
