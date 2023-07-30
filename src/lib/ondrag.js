import {
  killPiece,
  movePiece,
  promotePiece,
  getPieceMatchingIndex2,
} from "../state/pieces"

import {
  player1Bishop,
  kingStep,
  player1Knight,
  player1Queen,
  pawn1Step,
  pawn2Step,
  pawnCapture,
  rookMovement,
} from "./playermoves"

// ONDRAG EVENT HANDLER SUPPORT FUNCTIONS
function findDropTargets(pieceElement, onDragState) {
  let result = []
  let srcIndex = parseInt(pieceElement.getAttribute("tile_num"))
  let { letter } = getPieceMatchingIndex2(parseInt(srcIndex), onDragState)
  switch (letter) {
    case "P":
      result.push(pawn1Step(srcIndex, onDragState))
      result.push(pawn2Step(srcIndex, onDragState))
      result.push(pawnCapture("L", srcIndex, onDragState))
      result.push(pawnCapture("R", srcIndex, onDragState))
      break
    case "R":
      result = rookMovement(srcIndex, onDragState)
      break
    case "N":
      result = player1Knight(srcIndex, onDragState)
      break
    case "B":
      result = player1Bishop(srcIndex, onDragState)
      break
    case "Q":
      result = player1Queen(srcIndex, onDragState)
      break
    case "K":
      result = kingStep(srcIndex, onDragState)
      break
  }
  return result.filter(Boolean) // remove undefined elements from array
}

export { findDropTargets }
