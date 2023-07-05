import {
  index2Rank,
  index2File,
  rc2Index,
  rf2Index,
  index2Column,
} from "./applib"
import { getPieceMatchingIndex1, getPieceMatchingIndex2 } from "../state/pieces"
import * as Action from "./actions"

// KING MOVES
function player1King(srcIndex, gameState) {
  let file = index2File(srcIndex)
  let rank = index2Rank(srcIndex)
  let result = []
  result.push(king(srcIndex, 1, rank, gameState))
  result.push(king(srcIndex, -7, rank, gameState))
  result.push(king(srcIndex, -8, file, gameState))
  result.push(king(srcIndex, -9, file, gameState))
  result.push(king(srcIndex, -1, rank, gameState))
  result.push(king(srcIndex, 7, rank, gameState))
  result.push(king(srcIndex, 8, file, gameState))
  result.push(king(srcIndex, 9, file, gameState))
  if (!gameState.hasCastled()) {
    result.push(kingKingsideCastle(srcIndex, gameState))
    result.push(kingQueensideCastle(srcIndex, gameState))
  }
  return result.filter(Boolean)
}

function king(srcIndex, tarOffset, rf, gameState) {
  let tarIndex = srcIndex + tarOffset
  let pieceAtTarget = getPieceMatchingIndex2(parseInt(tarIndex), gameState)
  if (pieceAtTarget === undefined)
    return movePieceAction(srcIndex, "K", tarIndex)
  if (pieceAtTarget.player === 2)
    return capturePiece(srcIndex, "K", tarIndex, pieceAtTarget.letter)
}
function kingKingsideCastle(srcIndex, gameState) {}
function kingQueensideCastle(srcIndex, gameState) {}

// PAWN MOVES
function player1Pawn1Step(srcIndex, gameState) {
  let tarIndex = srcIndex - 8
  let pieceAtTarget = getPieceMatchingIndex2(parseInt(tarIndex), gameState)
  if (pieceAtTarget === undefined) {
    if (index2Rank(tarIndex) === 8) return pawnMovePromote(srcIndex, tarIndex)
    return movePieceAction(srcIndex, "P", tarIndex)
  }
}

function player1Pawn2Step(srcIndex, gameState) {
  if (index2Rank(srcIndex) !== 2) return
  let tarIndex = srcIndex - 8
  let pieceAtTarget = getPieceMatchingIndex2(parseInt(tarIndex), gameState)
  if (pieceAtTarget !== undefined) return
  tarIndex = srcIndex - 16
  pieceAtTarget = getPieceMatchingIndex2(parseInt(tarIndex), gameState)
  if (pieceAtTarget !== undefined) return
  if (index2Rank(tarIndex) === 8) return pawnMovePromote(srcIndex, tarIndex)
  return movePieceAction(srcIndex, "P", tarIndex)
}

function player1PawnCaptureLeft(srcIndex, gameState) {
  if (index2File(srcIndex) === "a") return
  let tarIndex = srcIndex - 9
  let pieceAtTarget = getPieceMatchingIndex2(parseInt(tarIndex), gameState)
  // also capture en passant

  if (pieceAtTarget?.player === 2) {
    if (index2Rank(tarIndex) === 8)
      return pawnCapturePromote(srcIndex, tarIndex, pieceAtTarget.letter)
    return capturePiece(srcIndex, "P", tarIndex, pieceAtTarget.letter)
  }
}
function player1PawnCaptureRight(srcIndex, gameState) {
  if (index2File(srcIndex) === "h") return
  let tarIndex = srcIndex - 7
  let pieceAtTarget = getPieceMatchingIndex2(parseInt(tarIndex), gameState)
  // also capture en passant

  if (pieceAtTarget?.player === 2) {
    if (index2Rank(tarIndex) === 8)
      return pawnCapturePromote(srcIndex, tarIndex, pieceAtTarget.letter)
    return capturePiece(srcIndex, "P", tarIndex, pieceAtTarget.letter)
  }
}

// ROOK MOVES
function player1Rook(srcIndex, gameState) {
  let file = index2File(srcIndex)
  let rank = index2Rank(srcIndex)
  let result1 = rookHorizontal("-", srcIndex, rank, gameState)
  let result2 = rookHorizontal("+", srcIndex, rank, gameState)
  let result3 = rookVertical("-", srcIndex, file, gameState)
  let result4 = rookVertical("+", srcIndex, file, gameState)
  return [...result1, ...result2, ...result3, ...result4].filter(Boolean)
}

function rookHorizontal(direction, srcIndex, rank, gameState) {
  let column,
    start,
    condition,
    nextColumn,
    result = []
  if (direction === "+") {
    start = index2Column(srcIndex) + 1
    condition = () => column <= 8
    nextColumn = () => column++
  } else {
    start = index2Column(srcIndex) - 1
    condition = () => column > 0
    nextColumn = () => column--
  }
  for (column = start; condition(); nextColumn()) {
    let tarIndex = rc2Index(rank, column)
    let pieceAtTarget = getPieceMatchingIndex2(parseInt(tarIndex), gameState)
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, "R", tarIndex))
    else if (pieceAtTarget.player === 2) {
      result.push(capturePiece(srcIndex, "R", tarIndex, pieceAtTarget.letter))
      break
    } else break
  }
  return result
}

function rookVertical(direction, srcIndex, file, gameState) {
  let rank,
    start,
    condition,
    nextRank,
    result = []
  if (direction === "+") {
    start = index2Rank(srcIndex) + 1
    condition = () => rank <= 8
    nextRank = () => rank++
  } else {
    start = index2Rank(srcIndex) - 1
    condition = () => rank > 0
    nextRank = () => rank--
  }
  for (rank = start; condition(); nextRank()) {
    let tarIndex = rf2Index(rank, file)
    let pieceAtTarget = getPieceMatchingIndex2(parseInt(tarIndex), gameState)
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, "R", tarIndex))
    else if (pieceAtTarget.player === 2) {
      result.push(capturePiece(srcIndex, "R", tarIndex, pieceAtTarget.letter))
      break
    } else break
  }
  return result
}

function capturePiece(srcIndex, srcPiece, tarIndex, tarPiece) {
  return {
    srcIndex,
    srcPiece,
    action: Action.CAPTURE,
    tarIndex,
    tarPiece,
  }
}

function movePieceAction(srcIndex, srcPiece, tarIndex) {
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
  return {
    srcIndex,
    srcPiece: "P",
    action: Action.MOVE_PROMOTE,
    tarIndex,
    tarPiece: "",
  }
}

export {
  player1King,
  player1Pawn1Step,
  player1Pawn2Step,
  player1PawnCaptureLeft,
  player1PawnCaptureRight,
  player1Rook,
}
