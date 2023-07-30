import {
  index2Rank,
  index2File,
  rc2Index,
  rf2Index,
  index2Column,
} from "./applib"
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

// const onDragState = {
//   pieces1,
//   pieces2,
//   recordedMoves,
//   enPassantOpportunity,
//   castleability,
//   canCastle,
// }

// KING MOVES
function kingStep(srcIndex, onDragState) {
  let result = []
  let file = index2File(srcIndex)
  let rank = index2Rank(srcIndex)
  if (file !== "a") result.push(genericMove(srcIndex, -1, "K", onDragState))
  if (file !== "h") result.push(genericMove(srcIndex, 1, "K", onDragState))
  if (rank !== 8) {
    if (file !== "h") result.push(genericMove(srcIndex, -7, "K", onDragState))
    result.push(genericMove(srcIndex, -8, "K", onDragState))
    if (file !== "a") result.push(genericMove(srcIndex, -9, "K", onDragState))
  }
  if (rank !== 1) {
    if (file !== "a") result.push(genericMove(srcIndex, 7, "K", onDragState))
    result.push(genericMove(srcIndex, 8, "K", onDragState))
    if (file !== "h") result.push(genericMove(srcIndex, 9, "K", onDragState))
  }
  let pieceAtSource = getPieceMatchingIndex2(srcIndex, onDragState)
  result.push(kingKingsideCastle(srcIndex, pieceAtSource.player, onDragState))
  result.push(kingQueensideCastle(srcIndex, pieceAtSource.player, onDragState))
  return result.filter(Boolean)
}

function kingKingsideCastle(srcIndex, playerNum, onDragState) {
  console.log(`kingKingsideCastle(${srcIndex}, player=${playerNum})`)
  let theCastleablility = onDragState.canCastle()
  if (
    ((playerNum === 1 &&
      srcIndex === 60 &&
      theCastleablility.player1Kingside &&
      !isPlayerInCheck(onDragState.pieces1, onDragState.pieces2)) ||
      (playerNum === 2 &&
        srcIndex === 4 &&
        theCastleablility.player2Kingside &&
        !isPlayerInCheck(onDragState.pieces2, onDragState.pieces1))) &&
    getPieceMatchingIndex2(srcIndex + 1, onDragState) === undefined &&
    getPieceMatchingIndex2(srcIndex + 2, onDragState) === undefined &&
    isSimulateMovePieceGood(srcIndex, srcIndex + 1, onDragState) &&
    isSimulateMovePieceGood(srcIndex, srcIndex + 2, onDragState)
  )
    return kingsideCastle(srcIndex)
}

function kingQueensideCastle(srcIndex, playerNum, onDragState) {
  console.log(`kingQueensideCastle(${srcIndex}, player=${playerNum})`)
  let theCastleablility = onDragState.canCastle()

  if (
    ((playerNum === 1 &&
      srcIndex === 60 &&
      theCastleablility.player1Queenside &&
      !isPlayerInCheck(onDragState.pieces1, onDragState.pieces2)) ||
      (playerNum === 2 &&
        srcIndex === 4 &&
        theCastleablility.player2Queenside &&
        !isPlayerInCheck(onDragState.pieces2, onDragState.pieces1))) &&
    getPieceMatchingIndex2(srcIndex - 1, onDragState) === undefined &&
    getPieceMatchingIndex2(srcIndex - 2, onDragState) === undefined &&
    getPieceMatchingIndex2(srcIndex - 3, onDragState) === undefined &&
    isSimulateMovePieceGood(srcIndex, srcIndex - 1, onDragState) &&
    isSimulateMovePieceGood(srcIndex, srcIndex - 2, onDragState)
  )
    return queensideCastle(srcIndex)
}

// KNIGHT MOVES
function player1Knight(srcIndex, onDragState) {
  let result = []
  let file = index2File(srcIndex)
  let rank = index2Rank(srcIndex)
  if (rank !== 8) {
    if (file !== "h") {
      if (rank !== 7) result.push(genericMove(srcIndex, -15, "N", onDragState))
      if (file !== "g") result.push(genericMove(srcIndex, -6, "N", onDragState))
    }
    if (file !== "a") {
      if (rank !== 7) result.push(genericMove(srcIndex, -17, "N", onDragState))
      if (file !== "b")
        result.push(genericMove(srcIndex, -10, "N", onDragState))
    }
  }
  if (rank !== 1) {
    if (file !== "h") {
      if (rank !== 2) result.push(genericMove(srcIndex, 17, "N", onDragState))
      if (file !== "g") result.push(genericMove(srcIndex, 10, "N", onDragState))
    }
    if (file !== "a") {
      if (rank !== 2) result.push(genericMove(srcIndex, 15, "N", onDragState))
      if (file !== "b") result.push(genericMove(srcIndex, 6, "N", onDragState))
    }
  }
  return result.filter(Boolean)
}

function genericMove(srcIndex, tarOffset, letter, onDragState) {
  console.log(`genericMove(srcIndex, tarOffset, letter, onDragState)`)
  let tarIndex = srcIndex + tarOffset
  let pieceAtTarget = getPieceMatchingIndex2(tarIndex, onDragState)
  if (pieceAtTarget === undefined)
    return movePieceAction(srcIndex, letter, tarIndex, onDragState)
  if (pieceAtTarget.player === 2)
    return createActionCapture(srcIndex, letter, tarIndex, pieceAtTarget.letter)
}

// PAWN MOVES
function pawn1Step(srcIndex, onDragState) {
  console.log(`pawn1Step(${srcIndex}, onDragState)`)
  let pieceAtSource = getPieceMatchingIndex2(srcIndex, onDragState)
  let tarIndex = srcIndex + 8 * orientation[pieceAtSource.player]
  if (getPieceMatchingIndex2(tarIndex, onDragState) !== undefined) return
  if (index2Rank(tarIndex) === 1 || index2Rank(tarIndex) === 8)
    return pawnMovePromote(srcIndex, tarIndex)
  return movePieceAction(srcIndex, "P", tarIndex, onDragState)
}

function isPawnOnFrontLine(srcIndex, onDragState) {
  let pieceAtSource = getPieceMatchingIndex2(srcIndex, onDragState)
  if (orientation[pieceAtSource.player] === -1) {
    if (index2Rank(srcIndex) == 2) return true
  } else if (index2Rank(srcIndex) == 7) return true
  return false
}

function pawn2Step(srcIndex, onDragState) {
  if (!isPawnOnFrontLine(srcIndex, onDragState))
    console.log("Pawn is not on the front line to 2 step.")
  if (!isPawnOnFrontLine(srcIndex, onDragState)) return

  let pieceAtSource = getPieceMatchingIndex2(srcIndex, onDragState)
  let tarIndex = srcIndex + 8 * orientation[pieceAtSource.player]
  if (getPieceMatchingIndex2(tarIndex, onDragState) !== undefined) return

  tarIndex = srcIndex + 16 * orientation[pieceAtSource.player]
  if (getPieceMatchingIndex2(tarIndex, onDragState) !== undefined) return

  return movePieceAction(srcIndex, "P", tarIndex, onDragState)
}

function pawnCapture(leftRight, srcIndex, onDragState) {
  const lr =
    leftRight === "L"
      ? {
          badFile: "a",
          atkSideVal: -1,
        }
      : {
          badFile: "h",
          atkSideVal: 1,
        }
  if (index2File(srcIndex) === lr.badFile) return
  let pieceAtSource = getPieceMatchingIndex2(srcIndex, onDragState)
  if (pieceAtSource === undefined) return
  let tarIndex =
    srcIndex + 8 * orientation[pieceAtSource.player] + lr.atkSideVal
  let pieceAtTarget = getPieceMatchingIndex2(tarIndex, onDragState)
  if (pieceAtTarget === undefined) {
    let victimIndex = srcIndex + lr.atkSideVal
    console.log(
      `does victimIndex{${victimIndex}} === onDragState.enPassantOpportunity{${onDragState.enPassantOpportunity}}`
    )
    if (victimIndex === onDragState.enPassantOpportunity)
      return createActionEnPassant(srcIndex, tarIndex)
    return
  }

  if (
    (pieceAtTarget.player === 1 && index2Rank(tarIndex) === 1) ||
    (pieceAtTarget.player === 2 && index2Rank(tarIndex) === 8)
  )
    return pawnCapturePromote(srcIndex, tarIndex, pieceAtTarget.letter)

  return createActionCapture(srcIndex, "P", tarIndex, pieceAtTarget.letter)
}

// QUEEN MOVES
function player1Queen(srcIndex, onDragState) {
  let result1 = genericBishop(srcIndex, "B", onDragState)
  let result2 = genericRook(srcIndex, "Q", onDragState)
  return [...result1, ...result2]
}

// BISHOP MOVES
function player1Bishop(srcIndex, onDragState) {
  return genericBishop(srcIndex, "B", onDragState)
}

function genericBishop(srcIndex, letter, onDragState) {
  let result1 = bishopRadiate(1, srcIndex, letter, onDragState)
  let result2 = bishopRadiate(2, srcIndex, letter, onDragState)
  let result3 = bishopRadiate(3, srcIndex, letter, onDragState)
  let result4 = bishopRadiate(4, srcIndex, letter, onDragState)
  return [...result1, ...result2, ...result3, ...result4].filter(Boolean)
}

function bishopRadiate(quadrant, srcIndex, letter, onDragState) {
  console.log(`bishopRadiate(quadrant, srcIndex, letter, onDragState)`)
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
    let pieceAtTarget = getPieceMatchingIndex2(tarIndex, onDragState)
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, letter, tarIndex, onDragState))
    else if (pieceAtTarget.player === 2) {
      result.push(
        createActionCapture(srcIndex, letter, tarIndex, pieceAtTarget.letter)
      )
      break
    } else break
  }
  return result
}

// ROOK MOVES
function player1Rook(srcIndex, onDragState) {
  return genericRook(srcIndex, "R", onDragState)
}

function genericRook(srcIndex, letter, onDragState) {
  let file = index2File(srcIndex)
  let rank = index2Rank(srcIndex)
  let result1 = rookHorizontal("-", srcIndex, letter, rank, onDragState)
  let result2 = rookHorizontal("+", srcIndex, letter, rank, onDragState)
  let result3 = rookVertical("-", srcIndex, letter, file, onDragState)
  let result4 = rookVertical("+", srcIndex, letter, file, onDragState)
  return [...result1, ...result2, ...result3, ...result4].filter(Boolean)
}

function rookHorizontal(direction, srcIndex, letter, rank, onDragState) {
  console.log(`rookHorizontal(direction, srcIndex, letter, rank, onDragState)`)
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
    let pieceAtTarget = getPieceMatchingIndex2(tarIndex, onDragState)
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, letter, tarIndex, onDragState))
    else if (pieceAtTarget.player === 2) {
      result.push(
        createActionCapture(srcIndex, letter, tarIndex, pieceAtTarget.letter)
      )
      break
    } else break
  }
  return result
}

function rookVertical(direction, srcIndex, letter, file, onDragState) {
  console.log(`rookVertical(direction, srcIndex, letter, file, onDragState)`)
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
    let pieceAtTarget = getPieceMatchingIndex2(tarIndex, onDragState)
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, letter, tarIndex, onDragState))
    else if (pieceAtTarget.player === 2) {
      result.push(
        createActionCapture(srcIndex, letter, tarIndex, pieceAtTarget.letter)
      )
      break
    } else break
  }
  return result
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

function isSimulateMovePieceGood(srcIndex, tarIndex, onDragState) {
  // Simulate move piece to check that it is valid / not into check
  let pieceAtSource = getPieceMatchingIndex2(srcIndex, onDragState)
  let defPieces = structuredClone(onDragState.pieces1)
  let atkPieces = structuredClone(onDragState.pieces2)
  console.log(
    `isSimulateMovePieceGood: ${pieceAtSource.name}@${pieceAtSource.index}`
  )
  // console.dir(pieceAtSource)

  if (pieceAtSource.player === 2)
    [defPieces, atkPieces] = [atkPieces, defPieces]
  movePiece(srcIndex, tarIndex, defPieces)
  return !isPlayerInCheck(defPieces, atkPieces)
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

export {
  player1Bishop,
  kingStep,
  player1Knight,
  player1Queen,
  pawn1Step,
  pawn2Step,
  pawnCapture,
  player1Rook,
}
