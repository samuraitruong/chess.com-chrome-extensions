const space = "_";
let lastFen = "";
let bestMovePopup;

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
  return [`${board} ${whoMoveNext} ${kq} - 1 0 `, hasPiece, whoMoveNext];
}
function findBestMove() {
  const [currentBoardFen, hasPiece, whoMoveNext] = readCurrentBoardFen();
  // console.log(currentBoardFen, whoMoveNext);
  if (lastFen !== currentBoardFen && hasPiece) {
    // console.log(currentBoardFen);
    lastFen = currentBoardFen;
    fetch(
      "https://no-cors-way.herokuapp.com/cors/https://stockfish-chess-api-p7dmqtfpta-km.a.run.app/bestmove?fen=" +
        lastFen
    )
      .catch(console.error)
      .then((x) => x.json())
      .then((result) => {
        let [refreshBoardFen] = readCurrentBoardFen();
        console.log(lastFen, refreshBoardFen);
        if (lastFen === refreshBoardFen || lastFen === "") {
          console.log(
            `%cBest move for ${whoMoveNext}: ${result.result.bestmove}`,
            "color: green; font-size: 45px; font-weight: bold;"
          );
          updateUI(result.result.bestmove, whoMoveNext);
        } else console.log("Board out of sync...");
      });
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
  console.log(mover, testMoves);
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
  if (move) {
    const start = move.substr(0, 2);
    const end = move.substr(2, 2);

    const startPost = start.charCodeAt(0) - 96;
    const endPos = end.charCodeAt(0) - 96;
    const startSquare = startPost + start[1];
    const endSquare = endPos + end[1];
    const div = document.querySelector(".best-move ." + who);
    div.innerText = move;

    div.setAttribute("data-start-square", "square-" + startSquare);
    div.setAttribute("data-end-square", "square-" + endSquare);
  }
}
function initialisesdUI() {
  if (!bestMovePopup) {
    bestMovePopup = document.createElement("div");
    const bDiv = document.createElement("div");
    const wDiv = document.createElement("div");
    bestMovePopup.appendChild(bDiv);
    bestMovePopup.appendChild(wDiv);
    document.body.appendChild(bestMovePopup);

    bestMovePopup.setAttribute("class", "best-move");
    bDiv.setAttribute("class", "w");
    wDiv.setAttribute("class", "b");

    bDiv.innerText = "...";
    wDiv.innerText = "...";
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

findBestMove();

//addEventListener("DOMContentLoaded", (event) => {
setTimeout(() => {
  findBestMove();
  initialisesdUI();

  const o = new MutationObserver(mutationCallback);

  o.observe(document.querySelector(".board"), {
    attributes: true,
    childList: true,
  });
}, 1000);
//});
