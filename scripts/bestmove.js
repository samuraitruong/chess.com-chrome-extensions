const space = "_";
let lastFen = "";
let bestMovePopup;
const defaultFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 0";
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
  const blackMoves = document.querySelectorAll(".black.node");
  const whiteMoves = document.querySelectorAll(".white.node");
  const whoMoveNext = whiteMoves.length > blackMoves.length ? "b" : "w";

  //const kq = 'KQkq'
  const kq = kqStatus();
  return [`${board} ${whoMoveNext} ${kq} - 1 0`, hasPiece, whoMoveNext];
}
async function findBestMove() {
  const [currentBoardFen, hasPiece, whoMoveNext] = readCurrentBoardFen(); //await getFenFromUI(); //
  // console.log(currentBoardFen, whoMoveNext);
  if (currentBoardFen && lastFen !== currentBoardFen && hasPiece) {
    // console.log(currentBoardFen);
    lastFen = currentBoardFen;
    updateUI(null, whoMoveNext);
    const result = await (
      await fetch(
        "https://no-cors.fly.dev/cors/https://stockfish-chess-api-p7dmqtfpta-km.a.run.app/bestmove?fen=" +
          lastFen
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
      console.log(
        `%cBest move for ${whoMoveNext}: ${result.result.bestmove}`,
        `color: ${
          whoMoveNext === "w" ? "green" : "red"
        }; font-size: 45px; font-weight: bold;`
      );
      updateUI(result.result.bestmove, whoMoveNext);
    } else {
      console.log("Board out of sync...");
      //
    }
  }
}

function kqStatus() {
  const w = getCastleingStatus("w");
  const b = getCastleingStatus("b");

  if (w == "-" && b === "-") return "- -";
  return w + b;
}
function getCastleingStatus(mover) {
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
function updateUI(move, who) {
  const div = document.querySelector(`.best-move .move-${who}`);
  div.innerText = move;

  if (move) {
    const start = move.substr(0, 2);
    const end = move.substr(2, 2);

    const startPost = start.charCodeAt(0) - 96;
    const endPos = end.charCodeAt(0) - 96;
    const startSquare = startPost + start[1];
    const endSquare = endPos + end[1];
    div.parentNode.setAttribute("class", "idle " + who);
    div.setAttribute("data-start-square", "square-" + startSquare);
    div.setAttribute("data-end-square", "square-" + endSquare);
  } else {
    div.parentNode.setAttribute("class", "waiting " + who);
  }
}
function initialisesdUI() {
  if (!bestMovePopup) {
    bestMovePopup = document.createElement("div");
    const bDiv = document.createElement("div");
    bDiv.setAttribute("class", "b");
    const wDiv = document.createElement("div");
    wDiv.setAttribute("class", "w");

    bestMovePopup.appendChild(wDiv);
    bestMovePopup.appendChild(bDiv);
    document.body.appendChild(bestMovePopup);

    bestMovePopup.setAttribute("class", "best-move");

    bDiv.innerHTML = `<span class="move-b"></span><span class="loading dot2"></span>`;
    wDiv.innerHTML = `<span class="move-w"></span><span class="loading dot2"></span>`;

    bestMovePopup.addEventListener("click", () => {
      const start = document
        .querySelector(".best-move")
        .getAttribute("data-start-square");
      const end = document
        .querySelector(".best-move")
        .getAttribute("data-end-square");
      document.querySelector("." + start).click();
    });
  }
}

const mutationCallback = debounce(() => {
  initialisesdUI();
  findBestMove();
}, 500);

window.addEventListener("load", (event) => {
  initialisesdUI();
  findBestMove();
  const o = new MutationObserver(mutationCallback);

  o.observe(document.querySelector(".board"), {
    attributes: true,
    childList: true,
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
