import {
  killPiece,
  movePiece,
  promotePiece,
  getPieceMatchingIndex2,
} from "../state/pieces"

import {
  bishopMovement,
  kingMovement,
  knightMovement,
  QueenMovement,
  pawnMovement,
  rookMovement,
} from "./pieceMovements"

// ONDRAG EVENT HANDLER SUPPORT FUNCTIONS
function findDropTargets(pieceElement, onDragState) {
  let srcIndex = parseInt(pieceElement.getAttribute("tile_num"))
  return findDropTargetsBySrcIndex(parseInt(srcIndex), onDragState)
}

function findDropTargetsBySrcIndex(srcIndex, onDragState) {
  let result // array of moveObj
  let { letter } = getPieceMatchingIndex2(srcIndex, onDragState)
  switch (letter) {
    case "P":
      result = pawnMovement(srcIndex, onDragState)
      break
    case "R":
      result = rookMovement(srcIndex, onDragState)
      break
    case "N":
      result = knightMovement(srcIndex, onDragState)
      break
    case "B":
      result = bishopMovement(srcIndex, onDragState)
      break
    case "Q":
      result = QueenMovement(srcIndex, onDragState)
      break
    case "K":
      result = kingMovement(srcIndex, onDragState)
      break
  }
  return result.filter(Boolean) // remove undefined elements from array
}

export { findDropTargets, findDropTargetsBySrcIndex }
