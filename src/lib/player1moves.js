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
  let result = []
  let file = index2File(srcIndex)
  let rank = index2Rank(srcIndex)
  if (file !== "a") result.push(genericMove(srcIndex, -1, "K", gameState))
  if (file !== "h") result.push(genericMove(srcIndex, 1, "K", gameState))
  if (rank !== 8) {
    if (file !== "h") result.push(genericMove(srcIndex, -7, "K", gameState))
    result.push(genericMove(srcIndex, -8, "K", gameState))
    if (file !== "a") result.push(genericMove(srcIndex, -9, "K", gameState))
  }
  if (rank !== 1) {
    if (file !== "a") result.push(genericMove(srcIndex, 7, "K", gameState))
    result.push(genericMove(srcIndex, 8, "K", gameState))
    if (file !== "h") result.push(genericMove(srcIndex, 9, "K", gameState))
  }
  result.push(kingKingsideCastle(srcIndex, 1, gameState))
  result.push(kingQueensideCastle(srcIndex, 1, gameState))
  return result.filter(Boolean)
}

function kingKingsideCastle(srcIndex, playerNum, gameState) {
  console.log(`kingKingsideCastle(${srcIndex}, ${playerNum})`)
  let theCastleablility = gameState.canCastle()
  if (
    ((playerNum === 1 &&
      srcIndex === 60 &&
      theCastleablility.player1Kingside) ||
      (playerNum === 2 &&
        srcIndex === 4 &&
        theCastleablility.player2Kingside)) &&
    !getPieceMatchingIndex2(srcIndex - 1, gameState) !== undefined &&
    !getPieceMatchingIndex2(srcIndex - 2, gameState) !== undefined
  )
    return kingsideCastle(srcIndex)
}

function kingQueensideCastle(srcIndex, playerNum, gameState) {
  console.log(`kingQueensideCastle(${srcIndex}, ${playerNum})`)
  let theCastleablility = gameState.canCastle()
  if (
    ((playerNum === 1 &&
      srcIndex === 60 &&
      theCastleablility.player1Queenside) ||
      (playerNum === 2 &&
        srcIndex === 4 &&
        theCastleablility.player2Queenside)) &&
    !getPieceMatchingIndex2(srcIndex - 1, gameState) !== undefined &&
    !getPieceMatchingIndex2(srcIndex - 2, gameState) !== undefined &&
    !getPieceMatchingIndex2(srcIndex - 3, gameState) !== undefined
  )
    return queensideCastle(srcIndex)
}

// KNIGHT MOVES
function player1Knight(srcIndex, gameState) {
  let result = []
  let file = index2File(srcIndex)
  let rank = index2Rank(srcIndex)
  if (rank !== 8) {
    if (file !== "h") {
      if (rank !== 7) result.push(genericMove(srcIndex, -15, "N", gameState))
      if (file !== "g") result.push(genericMove(srcIndex, -6, "N", gameState))
    }
    if (file !== "a") {
      if (rank !== 7) result.push(genericMove(srcIndex, -17, "N", gameState))
      if (file !== "b") result.push(genericMove(srcIndex, -10, "N", gameState))
    }
  }
  if (rank !== 1) {
    if (file !== "h") {
      if (rank !== 2) result.push(genericMove(srcIndex, 17, "N", gameState))
      if (file !== "g") result.push(genericMove(srcIndex, 10, "N", gameState))
    }
    if (file !== "a") {
      if (rank !== 2) result.push(genericMove(srcIndex, 15, "N", gameState))
      if (file !== "b") result.push(genericMove(srcIndex, 6, "N", gameState))
    }
  }
  return result.filter(Boolean)
}

function genericMove(srcIndex, tarOffset, letter, gameState) {
  let tarIndex = srcIndex + tarOffset
  let pieceAtTarget = getPieceMatchingIndex2(tarIndex, gameState)
  if (pieceAtTarget === undefined)
    return movePieceAction(srcIndex, letter, tarIndex)
  if (pieceAtTarget.player === 2)
    return capturePiece(srcIndex, letter, tarIndex, pieceAtTarget.letter)
}

// PAWN MOVES
function player1Pawn1Step(srcIndex, gameState) {
  let tarIndex = srcIndex - 8
  let pieceAtTarget = getPieceMatchingIndex2(tarIndex, gameState)
  if (pieceAtTarget === undefined) {
    if (index2Rank(tarIndex) === 8) return pawnMovePromote(srcIndex, tarIndex)
    return movePieceAction(srcIndex, "P", tarIndex)
  }
}

function player1Pawn2Step(srcIndex, gameState) {
  if (index2Rank(srcIndex) !== 2) return
  let tarIndex = srcIndex - 8
  let pieceAtTarget = getPieceMatchingIndex2(tarIndex, gameState)
  if (pieceAtTarget !== undefined) return
  tarIndex = srcIndex - 16
  pieceAtTarget = getPieceMatchingIndex2(tarIndex, gameState)
  if (pieceAtTarget !== undefined) return
  if (index2Rank(tarIndex) === 8) return pawnMovePromote(srcIndex, tarIndex)
  return movePieceAction(srcIndex, "P", tarIndex)
}

function player1PawnCaptureLeft(srcIndex, gameState) {
  if (index2File(srcIndex) === "a") return
  let tarIndex = srcIndex - 9
  let pieceAtTarget = getPieceMatchingIndex2(tarIndex, gameState)
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
  let pieceAtTarget = getPieceMatchingIndex2(tarIndex, gameState)
  // also capture en passant

  if (pieceAtTarget?.player === 2) {
    if (index2Rank(tarIndex) === 8)
      return pawnCapturePromote(srcIndex, tarIndex, pieceAtTarget.letter)
    return capturePiece(srcIndex, "P", tarIndex, pieceAtTarget.letter)
  }
}

// QUEEN MOVES
function player1Queen(srcIndex, gameState) {
  let result1 = genericBishop(srcIndex, "B", gameState)
  let result2 = genericRook(srcIndex, "Q", gameState)
  return [...result1, ...result2]
}

// BISHOP MOVES
function player1Bishop(srcIndex, gameState) {
  return genericBishop(srcIndex, "B", gameState)
}

function genericBishop(srcIndex, letter, gameState) {
  let result1 = bishopRadiate(1, srcIndex, letter, gameState)
  let result2 = bishopRadiate(2, srcIndex, letter, gameState)
  let result3 = bishopRadiate(3, srcIndex, letter, gameState)
  let result4 = bishopRadiate(4, srcIndex, letter, gameState)
  return [...result1, ...result2, ...result3, ...result4].filter(Boolean)
}

function bishopRadiate(quadrant, srcIndex, letter, gameState) {
  let tarOffset,
    condition,
    nextPosition,
    column,
    rank,
    result = []
  switch (quadrant) {
    case 1:
      tarOffset = -7
      condition = () => column <= 8 && rank <= 8
      nextPosition = () => {
        column++
        rank++
      }
      break
    case 2:
      tarOffset = -9
      condition = () => column > 0 && rank <= 8
      nextPosition = () => {
        column--
        rank++
      }
      break
    case 3:
      tarOffset = 7
      condition = () => column > 0 && rank > 0
      nextPosition = () => {
        column--
        rank--
      }
      break
    case 4:
      tarOffset = 9
      condition = () => column <= 8 && rank > 0
      nextPosition = () => {
        column++
        rank--
      }
      break
  }

  let tarIndex = srcIndex + tarOffset
  column = index2Column(tarIndex)
  rank = index2Rank(tarIndex)
  console.log(`condition=${condition()}`)
  for (; condition(); nextPosition(), tarIndex += tarOffset) {
    let pieceAtTarget = getPieceMatchingIndex2(tarIndex, gameState)
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, letter, tarIndex))
    else if (pieceAtTarget.player === 2) {
      result.push(
        capturePiece(srcIndex, letter, tarIndex, pieceAtTarget.letter)
      )
      break
    } else break
  }
  return result
}

// ROOK MOVES
function player1Rook(srcIndex, gameState) {
  return genericRook(srcIndex, "R", gameState)
}

function genericRook(srcIndex, letter, gameState) {
  let file = index2File(srcIndex)
  let rank = index2Rank(srcIndex)
  let result1 = rookHorizontal("-", srcIndex, letter, rank, gameState)
  let result2 = rookHorizontal("+", srcIndex, letter, rank, gameState)
  let result3 = rookVertical("-", srcIndex, letter, file, gameState)
  let result4 = rookVertical("+", srcIndex, letter, file, gameState)
  return [...result1, ...result2, ...result3, ...result4].filter(Boolean)
}

function rookHorizontal(direction, srcIndex, letter, rank, gameState) {
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
    let pieceAtTarget = getPieceMatchingIndex2(tarIndex, gameState)
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, letter, tarIndex))
    else if (pieceAtTarget.player === 2) {
      result.push(
        capturePiece(srcIndex, letter, tarIndex, pieceAtTarget.letter)
      )
      break
    } else break
  }
  return result
}

function rookVertical(direction, srcIndex, letter, file, gameState) {
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
    let pieceAtTarget = getPieceMatchingIndex2(tarIndex, gameState)
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, letter, tarIndex))
    else if (pieceAtTarget.player === 2) {
      result.push(
        capturePiece(srcIndex, letter, tarIndex, pieceAtTarget.letter)
      )
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

function queensideCastle(srcIndex) {
  return {
    srcIndex,
    srcPiece: "K",
    action: Action.QUEENSIDE_CASTLE,
    tarIndex: srcIndex - 2,
    tarPiece: "N",
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

function kingsideCastle(srcIndex) {
  return {
    srcIndex,
    srcPiece: "K",
    action: Action.KINGSIDE_CASTLE,
    tarIndex: srcIndex + 2,
    tarPiece: "N",
  }
}

export {
  player1Bishop,
  player1King,
  player1Knight,
  player1Queen,
  player1Pawn1Step,
  player1Pawn2Step,
  player1PawnCaptureLeft,
  player1PawnCaptureRight,
  player1Rook,
}
