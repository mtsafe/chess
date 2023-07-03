// import {
//   aiChoosesTile,
//   index2Rank,
//   index2File,
//   index2Column,
//   rf2Index,
// } from "./applib"
import * as Action from "./actions"

// EVENT HANDLER SUPPORT FUNCTIONS
function findDropTargets(pieceElement, pieces1, pieces2) {
  let result = []
  let tile_num = parseInt(pieceElement.getAttribute("tile_num"))
  let { letter } = getPieceMatchingIndex(parseInt(tile_num), pieces1, pieces2)
  let pieceAtTarget, targetLocation
  switch (letter) {
    case "P":
      targetLocation = tile_num - 8
      pieceAtTarget = getPieceMatchingIndex(
        parseInt(targetLocation),
        pieces1,
        pieces2
      )
      if (pieceAtTarget === undefined || pieceAtTarget.player === 2)
        result.push({
          src: tile_num,
          srcPiece: letter,
          action: Action.MOVE,
          tar: targetLocation,
          tarPiece: "",
        }) // take 1 step
      // result.push(tile_num - 7) // attack right or en passant
      // result.push(tile_num - 9) // attack left or en passant
      // result.push(tile_num - 16) // take 2 steps
      break
  }
  console.log("letter=" + letter + " tile_num=" + tile_num)
  return result
}

function getPieceMatchingIndex(tile_num, pieces1, pieces2) {
  let result
  if (pieces1?.length) result = pieces1.find(piece => piece.index === tile_num)

  if (typeof result === "undefined" && pieces2?.length)
    result = pieces2.find(piece => piece.index === tile_num)
  return result
}

export { findDropTargets }
