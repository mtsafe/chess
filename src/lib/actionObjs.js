import {
  orientation,
  newPieces1,
  newPieces2,
  getFreshPiecesWithout,
  getPieceMatchingCode,
  getPieceMatchingIndex1,
  getPieceMatchingIndex2,
  killPiece,
  movePiece,
  promotePiece,
} from "../state/pieces"
import { isPlayerInCheck } from "../state/check"
import * as Action from "./actions"

function isSimulateMovePieceGood(srcIndex, tarIndex, onDragState) {
  // Simulate move piece to check that it is valid / not into check
  let pieceAtSource = getPieceMatchingIndex2(srcIndex, onDragState)
  console.log(
    `isSimulateMovePieceGood: ${pieceAtSource.name}@${pieceAtSource.index}`
  )
  let defPieces = structuredClone(onDragState.pieces1)
  let atkPieces = structuredClone(onDragState.pieces2)

  if (pieceAtSource.player === 2)
    [defPieces, atkPieces] = [atkPieces, defPieces]
  movePiece(srcIndex, tarIndex, defPieces)
  return !isPlayerInCheck(defPieces, atkPieces)
}

function createActionCapture(srcIndex, srcPiece, tarIndex, tarPiece) {
  return {
    srcIndex,
    srcPiece,
    action: Action.CAPTURE,
    tarIndex,
    tarPiece,
  }
}

function createActionEnPassant(srcIndex, tarIndex) {
  return {
    srcIndex,
    srcPiece: "P",
    action: Action.EN_PASSANT,
    tarIndex,
    tarPiece: "P",
  }
}

function movePieceAction(srcIndex, srcPiece, tarIndex, onDragState) {
  console.log(
    `movePieceAction(${srcIndex}, ${srcPiece}, ${tarIndex}, onDragState)`
  )
  if (isSimulateMovePieceGood(srcIndex, tarIndex, onDragState))
    return {
      srcIndex,
      srcPiece,
      action: Action.MOVE,
      tarIndex,
      tarPiece: "",
    }
}

function pawnCapturePromote(srcIndex, tarIndex, tarPiece) {
  return {
    srcIndex,
    srcPiece: "P",
    action: Action.CAPTURE_PROMOTE,
    tarIndex,
    tarPiece,
  }
}

function pawnMovePromote(srcIndex, tarIndex) {
  console.log(`pawnMovePromote(${srcIndex}, ${tarIndex})`)
  return {
    srcIndex,
    srcPiece: "P",
    action: Action.MOVE_PROMOTE,
    tarIndex,
    tarPiece: "",
  }
}

function kingsideCastle(srcIndex) {
  return {
    srcIndex,
    srcPiece: "K",
    action: Action.KINGSIDE_CASTLE,
    tarIndex: srcIndex + 2,
    tarPiece: "N",
  }
}

function queensideCastle(srcIndex) {
  return {
    srcIndex,
    srcPiece: "K",
    action: Action.QUEENSIDE_CASTLE,
    tarIndex: srcIndex - 2,
    tarPiece: "N",
  }
}

export {
  isSimulateMovePieceGood,
  createActionCapture,
  createActionEnPassant,
  movePieceAction,
  pawnCapturePromote,
  pawnMovePromote,
  kingsideCastle,
  queensideCastle,
}
