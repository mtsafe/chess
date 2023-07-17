import {
  killPiece,
  movePiece,
  promotePiece,
  getPieceMatchingIndex2,
} from "../state/pieces"

import {
  player1Bishop,
  player1King,
  player1Knight,
  player1Queen,
  pawn1Step,
  pawn2Step,
  player1PawnCaptureLeft,
  player1PawnCaptureRight,
  player1Rook,
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
      result.push(player1PawnCaptureLeft(srcIndex, onDragState))
      result.push(player1PawnCaptureRight(srcIndex, onDragState))
      break
    case "R":
      result = player1Rook(srcIndex, onDragState)
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
      result = player1King(srcIndex, onDragState)
      break
  }
  return result.filter(Boolean) // remove undefined elements from array
}

export { findDropTargets }
