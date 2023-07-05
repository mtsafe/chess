import {
  index2Rank,
  index2File,
  rc2Index,
  rf2Index,
  index2Column,
} from "./applib"
import { getPieceMatchingIndex } from "../state/pieces"
import * as Action from "./actions"

// PAWN MOVES
function player1Pawn1Step(srcIndex, pieces1, pieces2) {
  let tarIndex = srcIndex - 8
  let pieceAtTarget = getPieceMatchingIndex(
    parseInt(tarIndex),
    pieces1,
    pieces2
  )
  if (pieceAtTarget === undefined) {
    if (index2Rank(tarIndex) === 8) return pawnMovePromote(srcIndex, tarIndex)
    return movePieceAction(srcIndex, "P", tarIndex)
  }
}

function player1Pawn2Step(srcIndex, pieces1, pieces2) {
  if (index2Rank(srcIndex) !== 2) return
  let tarIndex = srcIndex - 8
  let pieceAtTarget = getPieceMatchingIndex(
    parseInt(tarIndex),
    pieces1,
    pieces2
  )
  if (pieceAtTarget !== undefined) return
  tarIndex = srcIndex - 16
  pieceAtTarget = getPieceMatchingIndex(parseInt(tarIndex), pieces1, pieces2)
  if (pieceAtTarget !== undefined) return
  if (index2Rank(tarIndex) === 8) return pawnMovePromote(srcIndex, tarIndex)
  return movePieceAction(srcIndex, "P", tarIndex)
}

function player1PawnCaptureLeft(srcIndex, pieces1, pieces2) {
  if (index2File(srcIndex) === "a") return
  let tarIndex = srcIndex - 9
  let pieceAtTarget = getPieceMatchingIndex(
    parseInt(tarIndex),
    pieces1,
    pieces2
  )
  // also capture en passant

  if (pieceAtTarget?.player === 2) {
    if (index2Rank(tarIndex) === 8)
      return pawnCapturePromote(srcIndex, tarIndex, pieceAtTarget.letter)
    return capturePiece(srcIndex, "P", tarIndex, pieceAtTarget.letter)
  }
}
function player1PawnCaptureRight(srcIndex, pieces1, pieces2) {
  if (index2File(srcIndex) === "h") return
  let tarIndex = srcIndex - 7
  let pieceAtTarget = getPieceMatchingIndex(
    parseInt(tarIndex),
    pieces1,
    pieces2
  )
  // also capture en passant

  if (pieceAtTarget?.player === 2) {
    if (index2Rank(tarIndex) === 8)
      return pawnCapturePromote(srcIndex, tarIndex, pieceAtTarget.letter)
    return capturePiece(srcIndex, "P", tarIndex, pieceAtTarget.letter)
  }
}

// ROOK MOVES
function player1Rook(srcIndex, pieces1, pieces2) {
  let file = index2File(srcIndex)
  let rank = index2Rank(srcIndex)
  let result1 = rookHorizontal("-", srcIndex, rank, pieces1, pieces2)
  let result2 = rookHorizontal("+", srcIndex, rank, pieces1, pieces2)
  let result3 = rookVertical("-", srcIndex, file, pieces1, pieces2)
  let result4 = rookVertical("+", srcIndex, file, pieces1, pieces2)
  return [...result1, ...result2, ...result3, ...result4].filter(Boolean)
}

function rookHorizontal(direction, srcIndex, rank, pieces1, pieces2) {
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
  console.log("start=" + start)
  for (column = start; condition(); nextColumn()) {
    let tarIndex = rc2Index(rank, column)
    let pieceAtTarget = getPieceMatchingIndex(
      parseInt(tarIndex),
      pieces1,
      pieces2
    )
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, "R", tarIndex))
    else if (pieceAtTarget.player === 2) {
      result.push(capturePiece(srcIndex, "R", tarIndex, pieceAtTarget.letter))
      break
    } else break
  }
  console.log("rookHorizontal result")
  console.dir(result)
  return result
}

function rookVertical(direction, srcIndex, file, pieces1, pieces2) {
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
    let pieceAtTarget = getPieceMatchingIndex(
      parseInt(tarIndex),
      pieces1,
      pieces2
    )
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
  player1Pawn1Step,
  player1Pawn2Step,
  player1PawnCaptureLeft,
  player1PawnCaptureRight,
  player1Rook,
}