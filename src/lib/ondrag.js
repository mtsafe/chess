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
} from "./playermoves"

// ONDRAG EVENT HANDLER SUPPORT FUNCTIONS
function findDropTargets(pieceElement, onDragState) {
  let result
  let srcIndex = parseInt(pieceElement.getAttribute("tile_num"))
  let { letter } = getPieceMatchingIndex2(parseInt(srcIndex), onDragState)
  switch (letter) {
    case "P":
      result = pawnMovement({ srcIndex, onDragState })
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

export { findDropTargets }
