import { isPlayerInCheck } from "../state/check"
import {
  orientation,
  newPieces1,
  newPieces2,
  getDefAndAtkPieces1,
  getFreshPiecesWithout,
  getPieceMatchingCode,
  getPieceMatchingIndex1,
  getPieceMatchingIndex2,
  killPiece,
  movePiece,
  promotePiece,
} from "../state/pieces"

function isSimulationAValidMove(srcIndex, tarIndex, victimIndex, onDragState) {
  let pieceAtSource = getPieceMatchingIndex2(srcIndex, onDragState)
  console.log(
    `isSimulationAValidMove: ${pieceAtSource.name}@${pieceAtSource.index}`
  )
  let defPieces = structuredClone(onDragState.pieces1)
  let atkPieces = structuredClone(onDragState.pieces2)

  if (pieceAtSource.player === 2)
    [defPieces, atkPieces] = [atkPieces, defPieces]
  let unkilledPieces = killPiece(victimIndex, atkPieces)
  if (unkilledPieces !== undefined) atkPieces = unkilledPieces
  defPieces = movePiece(srcIndex, tarIndex, defPieces)
  return !isPlayerInCheck(defPieces, atkPieces)
}

function doesPieceHaveAValidMove(piece, dropTargets) {
  for (const moveObj of dropTargets) {
    let { srcIndex, tarIndex, victimIndex, onDragState } = moveObj
    if (isSimulationAValidMove(srcIndex, tarIndex, victimIndex, onDragState))
      return true
  }
  return false
}

export { doesPieceHaveAValidMove, isSimulationAValidMove }
