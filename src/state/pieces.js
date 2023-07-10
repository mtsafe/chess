import { rf2Index } from "../lib/applib"
// STATE SUPPORT FUNCTIONS

function newPieces1() {
  // player one is light shade
  let result = [
    { name: "Queen", code: "Q", letter: "Q", index: rf2Index(1, "d") },
    { name: "King", code: "K", letter: "K", index: rf2Index(1, "e") },
    { name: "Bishop", code: "QB", letter: "B", index: rf2Index(1, "c") },
    { name: "Bishop", code: "KB", letter: "B", index: rf2Index(1, "f") },
    { name: "Knight", code: "QN", letter: "N", index: rf2Index(1, "b") },
    { name: "Knight", code: "KN", letter: "N", index: rf2Index(1, "g") },
    { name: "Rook", code: "QR", letter: "R", index: rf2Index(1, "a") },
    { name: "Rook", code: "KR", letter: "R", index: rf2Index(1, "h") },
    { name: "Pawn", code: "Pa", letter: "P", index: rf2Index(2, "a") },
    { name: "Pawn", code: "Pb", letter: "P", index: rf2Index(2, "b") },
    { name: "Pawn", code: "Pc", letter: "P", index: rf2Index(2, "c") },
    { name: "Pawn", code: "Pd", letter: "P", index: rf2Index(2, "d") },
    { name: "Pawn", code: "Pe", letter: "P", index: rf2Index(2, "e") },
    { name: "Pawn", code: "Pf", letter: "P", index: rf2Index(2, "f") },
    { name: "Pawn", code: "Pg", letter: "P", index: rf2Index(2, "g") },
    { name: "Pawn", code: "Ph", letter: "P", index: rf2Index(2, "h") },
  ]
  result = result.map(piece => {
    piece.player = 1
    return piece
  })
  return result
}

function newPieces2() {
  // player two is dark shade
  let result = [
    { name: "Queen", code: "Q", letter: "Q", index: rf2Index(8, "d") },
    { name: "King", code: "K", letter: "K", index: rf2Index(8, "e") },
    { name: "Bishop", code: "QB", letter: "B", index: rf2Index(8, "c") },
    { name: "Bishop", code: "KB", letter: "B", index: rf2Index(8, "f") },
    { name: "Knight", code: "QN", letter: "N", index: rf2Index(8, "b") },
    { name: "Knight", code: "KN", letter: "N", index: rf2Index(8, "g") },
    { name: "Rook", code: "QR", letter: "R", index: rf2Index(8, "a") },
    { name: "Rook", code: "KR", letter: "R", index: rf2Index(8, "h") },
    { name: "Pawn", code: "Pa", letter: "P", index: rf2Index(7, "a") },
    { name: "Pawn", code: "Pb", letter: "P", index: rf2Index(7, "b") },
    { name: "Pawn", code: "Pc", letter: "P", index: rf2Index(7, "c") },
    { name: "Pawn", code: "Pd", letter: "P", index: rf2Index(7, "d") },
    { name: "Pawn", code: "Pe", letter: "P", index: rf2Index(7, "e") },
    { name: "Pawn", code: "Pf", letter: "P", index: rf2Index(7, "f") },
    { name: "Pawn", code: "Pg", letter: "P", index: rf2Index(7, "g") },
    { name: "Pawn", code: "Ph", letter: "P", index: rf2Index(7, "h") },
  ]
  result = result.map(piece => {
    piece.player = 2
    return piece
  })
  return result
}

function getFreshPiecesWithout(tarIndex, pieces) {
  return pieces
    .map(p => {
      if (p.index !== tarIndex) return p
    })
    .filter(Boolean)
}

function getPieceMatchingIndex1(tile_num, pieces) {
  if (pieces?.length) return pieces.find(piece => piece.index === tile_num)
}

function getPieceMatchingIndex2(tile_num, onDragState) {
  let result
  if (onDragState.pieces1?.length)
    result = onDragState.pieces1.find(piece => piece.index === tile_num)

  if (typeof result === "undefined" && onDragState.pieces2?.length)
    result = onDragState.pieces2.find(piece => piece.index === tile_num)
  return result
}

function killPiece(tarIndex, pieces) {
  console.log(`killPiece(${tarIndex})`)
  let victim = getPieceMatchingIndex1(tarIndex, pieces)
  if (victim === undefined) return
  return getFreshPiecesWithout(tarIndex, pieces)
}

function makeQueen(tarIndex, pieces) {
  return pieces
    .map(p => {
      if (p.index !== tarIndex) return p
      p.letter = "Q"
      return p
    })
    .filter(Boolean)
}

function movePiece(srcIndex, tarIndex, pieces) {
  console.log(`movePiece(${srcIndex}, ${tarIndex})`)
  let piece = getPieceMatchingIndex1(srcIndex, pieces)
  if (piece === undefined) return

  return pieces.map(p => {
    if (p.index === srcIndex) p.index = tarIndex
    return p
  })
}

function promotePiece(tarIndex, pieces) {
  console.log(`promotePiece(${tarIndex}`)
  let newQueen = getPieceMatchingIndex1(tarIndex, pieces)
  if (newQueen === undefined) return
  return makeQueen(tarIndex, pieces)
}

export {
  newPieces1,
  newPieces2,
  getFreshPiecesWithout,
  getPieceMatchingIndex1,
  getPieceMatchingIndex2,
  killPiece,
  movePiece,
  promotePiece,
}
