// import {
//   aiChoosesTile,
//   index2Rank,
//   index2File,
//   index2Column,
//   rf2Index,
// } from "./applib"
import { getPieceMatchingIndex1, getPieceMatchingIndex2 } from "../state/pieces"
import {
  player1King,
  player1Pawn1Step,
  player1Pawn2Step,
  player1PawnCaptureLeft,
  player1PawnCaptureRight,
  player1Rook,
} from "./player1moves"

// EVENT HANDLER SUPPORT FUNCTIONS
function findDropTargets(pieceElement, gameState) {
  let result = []
  let srcIndex = parseInt(pieceElement.getAttribute("tile_num"))
  let { letter } = getPieceMatchingIndex2(parseInt(srcIndex), gameState)
  switch (letter) {
    case "P":
      result.push(player1Pawn1Step(srcIndex, gameState))
      result.push(player1Pawn2Step(srcIndex, gameState))
      result.push(player1PawnCaptureLeft(srcIndex, gameState))
      result.push(player1PawnCaptureRight(srcIndex, gameState))
      break
    case "R":
      result = player1Rook(srcIndex, gameState)
      break
    case "K":
      result = player1King(srcIndex, gameState)
      break
  }
  return result.filter(Boolean) // remove undefined elements from array
}

export { findDropTargets }
