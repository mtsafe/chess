// import {
//   aiChoosesTile,
//   index2Rank,
//   index2File,
//   index2Column,
//   rf2Index,
// } from "./applib"
import { getPieceMatchingIndex } from "../state/pieces"
import {
  player1Pawn1Step,
  player1Pawn2Step,
  player1PawnCaptureLeft,
  player1PawnCaptureRight,
} from "./player1moves"

// EVENT HANDLER SUPPORT FUNCTIONS
function findDropTargets(pieceElement, pieces1, pieces2) {
  let result = []
  let srcIndex = parseInt(pieceElement.getAttribute("tile_num"))
  let { letter } = getPieceMatchingIndex(parseInt(srcIndex), pieces1, pieces2)
  switch (letter) {
    case "P":
      result.push(player1Pawn1Step(srcIndex, pieces1, pieces2))
      result.push(player1Pawn2Step(srcIndex, pieces1, pieces2))
      result.push(player1PawnCaptureLeft(srcIndex, pieces1, pieces2))
      result.push(player1PawnCaptureRight(srcIndex, pieces1, pieces2))
      break
    case "R":
      // let rookMoves = player1RookVertical(srcIndex, pieces1, pieces2)
      // result=[...result, ...rookMoves]
      // rookMoves = player1RookHorizontal(srcIndex, pieces1, pieces2)
      // result=[...result, ...rookMoves]
      break
  }
  return result.filter(Boolean) // remove undefined elements from array
}

export { findDropTargets }
