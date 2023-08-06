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
  const fenParts = fen.split(' ');
  const piecePlacement = fenParts[0];
  const rows = piecePlacement.split('/');

  const board = [];
  for (let i = 0; i < 8; i++) {
    board.push(new Array(8).fill(''));
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
  const defaultColor = 'color: black; font-weight: bold;';
  const nocolor = 'color: transparent; font-weight: bold;';


  const chessPieces = {
    K: '♔', // White King
    Q: '♕', // White Queen
    R: '♖', // White Rook
    B: '♗', // White Bishop
    N: '♘', // White Knight
    P: '♙', // White Pawn
    k: '♚', // Black King
    q: '♛', // Black Queen
    r: '♜', // Black Rook
    b: '♝', // Black Bishop
    n: '♞', // Black Knight
    p: '♟', // Black Pawn
    '': '♛'
  };
  const pieceColors = {
    'K': 'color: green; background-color: transparent;',
    'Q': 'color: green; background-color: transparent;',
    'R': 'color: green; background-color: transparent;',
    'B': 'color: green; background-color: transparent;',
    'N': 'color: green; background-color: transparent;',
    'P': 'color: green; background-color: transparent;',
    'k': 'color: red; background-color: transparent;',
    'q': 'color: red; background-color: transparent;',
    'r': 'color: red; background-color: transparent;',
    'b': 'color: red; background-color: transparent;',
    'n': 'color: red; background-color: transparent;',
    'p': 'color: red; background-color: transparent;',
    '': 'color: transparent; background-color: transparent;'
  };

  let output = '%c    a    b    c    d    e    f    g   h\n';
  output += '%c  +----+----+----+---+----+----+----+---+\n';
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


// Example usage:
const fenString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
printChessboardFromFEN(fenString);

