import {
  index2Rank,
  index2File,
  rc2Index,
  rf2Index,
  index2Column,
} from "./gameboard"
import {
  genericBishop,
  genericMove,
  genericRook,
  kingKingsideCastle,
  kingQueensideCastle,
  pawn1Step,
  pawn2Step,
  pawnCaptures,
} from "./movementsSupport"

// KING MOVES
function kingMovement(srcIndex, onDragState) {
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
  result.push(kingKingsideCastle(srcIndex, onDragState))
  result.push(kingQueensideCastle(srcIndex, onDragState))
  return result.filter(Boolean)
}

// KNIGHT MOVES
function knightMovement(srcIndex, onDragState) {
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

// PAWN MOVES
function pawnMovement(srcIndex, onDragState) {
  let result = []
  result.push(pawn1Step(srcIndex, onDragState))
  result.push(pawn2Step(srcIndex, onDragState))
  return result.concat(pawnCaptures(srcIndex, onDragState))
}

// QUEEN MOVES
function QueenMovement(srcIndex, onDragState) {
  let result1 = genericBishop(srcIndex, "Q", onDragState)
  let result2 = genericRook(srcIndex, "Q", onDragState)
  return [...result1, ...result2]
}

// BISHOP MOVES
function bishopMovement(srcIndex, onDragState) {
  return genericBishop(srcIndex, "B", onDragState)
}

// ROOK MOVES
function rookMovement(srcIndex, onDragState) {
  return genericRook(srcIndex, "R", onDragState)
}

export {
  bishopMovement,
  kingMovement,
  knightMovement,
  QueenMovement,
  pawnMovement,
  rookMovement,
}
