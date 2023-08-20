// Function to set the temporary data in local storage
function setTemporaryData(key, data) {
  var expiration = Date.now() + 60000; // One minute from now
  var tempData = {
    data: data,
    expiration: expiration,
  };
  localStorage.setItem(key, JSON.stringify(tempData));
}

// Function to get the temporary data from local storage
function getTemporaryData(key) {
  var tempData = localStorage.getItem(key);
  if (tempData) {
    tempData = JSON.parse(tempData);
    if (Date.now() < tempData.expiration) {
      return tempData.data;
    } else {
      localStorage.removeItem(key); // Remove expired data
    }
  }
  return null;
}

function printChessboardFromFEN(fen) {
  const fenParts = fen.split(" ");
  const piecePlacement = fenParts[0];
  const rows = piecePlacement.split("/");

  const board = [];
  for (let i = 0; i < 8; i++) {
    board.push(new Array(8).fill(""));
  }

  let rowIdx = 0;
  let colIdx = 0;
  for (const row of rows) {
    for (const char of row) {
      if (!isNaN(char)) {
        colIdx += parseInt(char);
      } else {
        board[rowIdx][colIdx] = char;
        colIdx++;
      }
    }
    rowIdx++;
    colIdx = 0;
  }
  const defaultColor = "color: black; font-weight: bold;";
  const nocolor = "color: transparent; font-weight: bold;";

  const chessPieces = {
    K: "♔", // White King
    Q: "♕", // White Queen
    R: "♖", // White Rook
    B: "♗", // White Bishop
    N: "♘", // White Knight
    P: "♙", // White Pawn
    k: "♚", // Black King
    q: "♛", // Black Queen
    r: "♜", // Black Rook
    b: "♝", // Black Bishop
    n: "♞", // Black Knight
    p: "♟", // Black Pawn
    "": "♛",
  };

  const pieceColors = {
    K: "color: #00008b; background-color: transparent;",
    Q: "color: #00008b; background-color: transparent;",
    R: "color: #00008b; background-color: transparent;",
    B: "color: #00008b; background-color: transparent;",
    N: "color: #00008b; background-color: transparent;",
    P: "color: #00008b; background-color: transparent;",
    k: "color: red; background-color: transparent;",
    q: "color: red; background-color: transparent;",
    r: "color: red; background-color: transparent;",
    b: "color: red; background-color: transparent;",
    n: "color: red; background-color: transparent;",
    p: "color: red; background-color: transparent;",
    "": "color: transparent; background-color: transparent;",
  };

  let output = "%c    a    b    c    d    e    f    g   h\n";
  output += "%c  +----+----+----+---+----+----+----+---+\n";
  const colors = [defaultColor, defaultColor];
  for (let i = 0; i < 8; i++) {
    let rowString = `${8 - i} |`;
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      colors.push(pieceColors[piece]);
      rowString += `%c ${chessPieces[piece]} %c|`;
      colors.push(defaultColor);
    }
    output += `${rowString}\n  +----+----+----+---+----+----+----+---+\n`;
  }

  console.log(output, ...colors);
}

function displayImageInConsole(fen, el) {
  if (!fen) return;
  let viewAs = "w";
  const capturesPieces =
    document.querySelector("captured-pieces") ||
    document.querySelector(".captured-pieces");
  if (capturesPieces) {
    viewAs = capturesPieces.getAttribute("color") === "2" ? "w" : "b";
  }
  const imageUrl = `https://no-cors.fly.dev/cors/https://chess-board.fly.dev?frame=false&viewer=${viewAs}&fen=${fen}&size=100`;
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        el.setAttribute("src", "data:" + reader.result);
        // console.log("%c this is image to render", `background-image: url('${reader.result}'); width:300px; height:300px`);
      };
      reader.readAsDataURL(blob);
    })
    .catch((error) => console.error("Error fetching the image:", error));
}

function convertMovesToFriendlyNames(fen, moves, signleValue = false) {

  const mapInvalidMove = {
    "e8g8": "o-o",
    "e8a8": "o-o-o",
    "e1g1": "o-o",
    "e1a1": "o-o-o"
  }

  const [t1, t2] = fen.split(" ");
  const cleanFen = [t1, t2].join(" ");
  const board = new Chess(cleanFen);
  const startPlayer = board.turn()

  const moveList = moves.split(" ");
  const sanMoves = moveList.map((move) => {
    try {
      const parsedMove = board.move(mapInvalidMove[move] || move, { sloppy: true });
      return parsedMove ? parsedMove.san : move;
    } catch (err) {

      return move
    }
  });

  const validSanMoves = sanMoves.filter((move) => move !== null);
  if (signleValue && validSanMoves.length === 1)
    return validSanMoves[0]
  let index = 0
  let results = ""
  const indexAppend = startPlayer === "w" ? 0 : 1
  for (const validMove of validSanMoves) {
    if (index === 0) {
      if (startPlayer === "b")
        results = "1..."
      else
        results = "1."

    }
    else
      if (index % 2 === indexAppend) {
        results += `${Math.floor(index / 2) + 1 + indexAppend}.`
      }

    results += validMove + " "
    index++
  }

  return results;
}

// Example usage:
const fenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
printChessboardFromFEN(fenString);
// displayImageInConsole(fenString)

const moves = "e4e5 f6d7 e5e6 f7e6 d5e6 d7c5";

const friendlyNames = convertMovesToFriendlyNames(
  "4r1k1/4rpp1/3R1n1p/3P4/1p2P3/1Ppb1NNP/5KP1/4R3 w",
  moves
);
console.log(friendlyNames);
