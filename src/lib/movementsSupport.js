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
  getSrcAndTarPieces,
  isVacantTile,
  killPiece,
  movePiece,
  promotePiece,
} from "../state/pieces"
import { isPlayerInCheck } from "../state/check"
import {
  captureAction,
  enPassantAction,
  movePieceAction,
  capturePromoteAction,
  movePromoteAction,
  kingsideCastleAction,
  queensideCastleAction,
} from "./actionObjs"
// const onDragState = {
//   pieces1,
//   pieces2,
//   enPassantOpportunity,
//   castleability,
//   canCastle,
// }

// KING MOVES SUPPORT
function kingKingsideCastle(srcIndex, onDragState) {
  console.log(`kingKingsideCastle(${srcIndex})`)
  let { kingside } = canPlayerCastle(srcIndex, onDragState)
  if (
    kingside &&
    isVacantTile(srcIndex + 1, onDragState) &&
    isVacantTile(srcIndex + 2, onDragState)
  )
    return kingsideCastleAction(srcIndex, onDragState)
}

function kingQueensideCastle(srcIndex, onDragState) {
  console.log(`kingQueensideCastle(${srcIndex})`)
  let { queenside } = canPlayerCastle(srcIndex, onDragState)
  if (
    queenside &&
    isVacantTile(srcIndex - 1, onDragState) &&
    isVacantTile(srcIndex - 2, onDragState) &&
    isVacantTile(srcIndex - 3, onDragState)
  )
    return queensideCastleAction(srcIndex, onDragState)
}

function canPlayerCastle(srcIndex, onDragState) {
  let { player } = getPieceMatchingIndex2(srcIndex, onDragState)
  let theCastleablility, kingside, queenside, isKingPositioned

  if (player === 1) {
    isKingPositioned = srcIndex === 60
    theCastleablility = onDragState.canCastle(
      isPlayerInCheck(onDragState.pieces1, onDragState.pieces2)
    )
    kingside = isKingPositioned && theCastleablility.player1Kingside
    queenside = isKingPositioned && theCastleablility.player1Queenside
    return { kingside, queenside }
  }
  if (player === 2) {
    isKingPositioned = srcIndex === 4
    theCastleablility = onDragState.canCastle(
      isPlayerInCheck(onDragState.pieces2, onDragState.pieces1)
    )
    kingside = isKingPositioned && theCastleablility.player2Kingside
    queenside = isKingPositioned && theCastleablility.player2Queenside
    return { kingside, queenside }
  }
}

// KNIGHT MOVES SUPPORT
function genericMove(srcIndex, tarOffset, letter, onDragState) {
  console.log(`genericMove(srcIndex, tarOffset, letter, onDragState)`)
  let tarIndex = srcIndex + tarOffset
  let { pieceAtSource, pieceAtTarget } = getSrcAndTarPieces(
    srcIndex,
    tarIndex,
    onDragState
  )
  if (pieceAtTarget === undefined)
    return movePieceAction(srcIndex, letter, tarIndex, onDragState)
  else if (pieceAtSource.player !== pieceAtTarget.player)
    return captureAction(
      srcIndex,
      letter,
      tarIndex,
      pieceAtTarget.letter,
      onDragState
    )
}

// PAWN MOVES SUPPORT
function pawn1Step(srcIndex, onDragState) {
  console.log(`pawn1Step(${srcIndex}, onDragState)`)
  let { player } = getPieceMatchingIndex2(srcIndex, onDragState)
  let tarIndex = srcIndex + 8 * orientation[player]
  if (!isVacantTile(tarIndex, onDragState)) return
  if (index2Rank(tarIndex) === 1 || index2Rank(tarIndex) === 8)
    return movePromoteAction(srcIndex, tarIndex, onDragState)
  return movePieceAction(srcIndex, "P", tarIndex, onDragState)
}

function isPawnOnFrontLine(srcIndex, onDragState) {
  let { player } = getPieceMatchingIndex2(srcIndex, onDragState)
  if (player === 1) {
    if (index2Rank(srcIndex) == 2) return true
  } else if (index2Rank(srcIndex) == 7) return true
  return false
}

function pawn2Step(srcIndex, onDragState) {
  if (!isPawnOnFrontLine(srcIndex, onDragState)) return

  let { player } = getPieceMatchingIndex2(srcIndex, onDragState)
  let step = 8 * orientation[player]
  let tarIndex = srcIndex + step
  if (!isVacantTile(tarIndex, onDragState)) return

  tarIndex += step
  if (!isVacantTile(tarIndex, onDragState)) return

  return movePieceAction(srcIndex, "P", tarIndex, onDragState)
}

function pawnCaptures(srcIndex, onDragState) {
  let result1 = pawnCaptureRL(
    { badFile: "a", atkSideVal: -1 },
    srcIndex,
    onDragState
  )
  let result2 = pawnCaptureRL(
    { badFile: "h", atkSideVal: 1 },
    srcIndex,
    onDragState
  )
  return [result1, result2]
}

function pawnCaptureRL(leftRight, srcIndex, onDragState) {
  if (index2File(srcIndex) === leftRight.badFile) return
  let { player } = getPieceMatchingIndex2(srcIndex, onDragState)
  let tarIndex = srcIndex + 8 * orientation[player] + leftRight.atkSideVal
  let pieceAtTarget = getPieceMatchingIndex2(tarIndex, onDragState)
  if (pieceAtTarget === undefined) {
    let victimIndex = srcIndex + leftRight.atkSideVal
    console.log(
      `does victimIndex{${victimIndex}} === onDragState.enPassantOpportunity{${onDragState.enPassantOpportunity}}`
    )
    if (victimIndex === onDragState.enPassantOpportunity)
      return enPassantAction(srcIndex, tarIndex, onDragState)
    return
  }

  if (
    (pieceAtTarget.player === 1 && index2Rank(tarIndex) === 1) ||
    (pieceAtTarget.player === 2 && index2Rank(tarIndex) === 8)
  )
    return capturePromoteAction(
      srcIndex,
      tarIndex,
      pieceAtTarget.letter,
      onDragState
    )

  return captureAction(
    srcIndex,
    "P",
    tarIndex,
    pieceAtTarget.letter,
    onDragState
  )
}

// BISHOP MOVES SUPPORT
function genericBishop(srcIndex, letter, onDragState) {
  let result1 = bishopRadiate(1, srcIndex, letter, onDragState)
  let result2 = bishopRadiate(2, srcIndex, letter, onDragState)
  let result3 = bishopRadiate(3, srcIndex, letter, onDragState)
  let result4 = bishopRadiate(4, srcIndex, letter, onDragState)
  return [...result1, ...result2, ...result3, ...result4].filter(Boolean)
}

function bishopRadiate(quadrant, srcIndex, letter, onDragState) {
  console.log(
    `bishopRadiate(quatrant=${quadrant}, srcIndex=${srcIndex}, letter=${letter}, onDragState)`
  )
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
    let { pieceAtSource, pieceAtTarget } = getSrcAndTarPieces(
      srcIndex,
      tarIndex,
      onDragState
    )
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, letter, tarIndex, onDragState))
    else if (pieceAtSource.player !== pieceAtTarget.player) {
      result.push(
        captureAction(
          srcIndex,
          letter,
          tarIndex,
          pieceAtTarget.letter,
          onDragState
        )
      )
      break
    } else break
  }
  return result
}

// ROOK MOVES SUPPORT
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
    let { pieceAtSource, pieceAtTarget } = getSrcAndTarPieces(
      srcIndex,
      tarIndex,
      onDragState
    )
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, letter, tarIndex, onDragState))
    else if (pieceAtSource.player !== pieceAtTarget.player) {
      result.push(
        captureAction(
          srcIndex,
          letter,
          tarIndex,
          pieceAtTarget.letter,
          onDragState
        )
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
    let { pieceAtSource, pieceAtTarget } = getSrcAndTarPieces(
      srcIndex,
      tarIndex,
      onDragState
    )
    if (pieceAtTarget === undefined)
      result.push(movePieceAction(srcIndex, letter, tarIndex, onDragState))
    else if (pieceAtSource.player !== pieceAtTarget.player) {
      result.push(
        captureAction(
          srcIndex,
          letter,
          tarIndex,
          pieceAtTarget.letter,
          onDragState
        )
      )
      break
    } else break
  }
  return result
}

export {
  genericBishop,
  genericMove,
  genericRook,
  kingKingsideCastle,
  kingQueensideCastle,
  pawn1Step,
  pawn2Step,
  pawnCaptures,
}
