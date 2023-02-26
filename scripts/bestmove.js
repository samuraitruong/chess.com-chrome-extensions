const space = '_'
let lastFen = ''

function readCurrentBoardFen() {
  const index = new Array(64).fill(space);
  let hasPiece = false;
  for (var i = 1; i <= 8; i++)
    for (var j = 1; j <= 8; j++) {
      const el = document.querySelector(`.piece.square-${i}${j}`)
      if (el) {
        let piece = el.getAttribute('class').split(' ').find(x => x.length === 2 && ["w", "b"].includes(x[0]));

        if (piece && piece[0] == "w") {
          index[(j - 1) * 8 + i - 1] = piece[1].toUpperCase()
          hasPiece = true;
        }

        if (piece && piece[0] == "b") {
          hasPiece = true;
          index[(j - 1) * 8 + i - 1] = piece[1].toLowerCase()
        }
      }
    }
  const row = [];
  for (var i = 0; i < 8; i++) {
    let fen = index.splice(0, 8).join('')
    for (let t = 8; t >= 1; t--) {
      fen = fen.replace(new RegExp(new Array(t).fill(space).join(''), 'ig'), t.toString())
    }
    row.push(fen)
  }
  const board = row.reverse().join('/')
  const blackMoves = document.querySelectorAll('.play-controller-moveList .black.node')
  const whiteMoves = document.querySelectorAll('.play-controller-moveList .white.node')
  const whoMoveNext = whiteMoves.length > blackMoves.length ? 'b' : 'w'

  //const kq = 'KQkq'
  const kq = '- -'
  const finalFen = `${board} ${whoMoveNext} ${kq} - 1 0 `
}
function findBestMove() {
  const currentBoardFen = readCurrentBoardFen();

  if (finalFen !== currentBoardFen && hasPiece) {
    // console.log(finalFen)
    lastFen = currentBoardFen
    fetch('https://no-cors-way.herokuapp.com/cors/https://stockfish-chess-api-p7dmqtfpta-km.a.run.app/bestmove?fen=' + lastFen).catch(console.error).then(x => x.json()).then((result) => {

      if (lastFen === readCurrentBoardFen()) {
        console.log(`%cBest move for ${whoMoveNext}: ${result.result.bestmove}`, "color: green; font-size: 60px; font-weight: bold;")

      } else
        console.log("Board out of sync...")
    })
  }

}


findBestMove();

setTimeout(() => {
  findBestMove();
  const o = new MutationObserver(() => {

    findBestMove();
  });

  o.observe(document.querySelector('.board'), { attributes: true, childList: true })
}, 3000)