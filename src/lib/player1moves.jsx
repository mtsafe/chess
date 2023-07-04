import { index2Rank } from "./applib"
import { getPieceMatchingIndex } from "../state/pieces"
import * as Action from "./actions"

function player1Pawn1Step(letter, tile_num, pieces1, pieces2) {
  let pieceAtTarget, targetLocation
  targetLocation = tile_num - 8
  pieceAtTarget = getPieceMatchingIndex(
    parseInt(targetLocation),
    pieces1,
    pieces2
  )
  if (pieceAtTarget === undefined || pieceAtTarget.player === 2)
    return {
      src: tile_num,
      srcPiece: letter,
      action: Action.MOVE,
      tar: targetLocation,
      tarPiece: "",
    }
}

function player1Pawn2Step(letter, tile_num, pieces1, pieces2) {
  // Check for rank == 2
  if (index2Rank(tile_num) !== 2) {
    console.log(`${tile_num} is not rank 2; it is ${index2Rank(tile_num)}`)
    return
  }
  let pieceAtTarget, targetLocation
  targetLocation = tile_num - 8
  pieceAtTarget = getPieceMatchingIndex(
    parseInt(targetLocation),
    pieces1,
    pieces2
  )
  if (pieceAtTarget !== undefined) return
  targetLocation = tile_num - 16
  pieceAtTarget = getPieceMatchingIndex(
    parseInt(targetLocation),
    pieces1,
    pieces2
  )
  if (pieceAtTarget !== undefined) return
  return {
    src: tile_num,
    srcPiece: letter,
    action: Action.MOVE,
    tar: targetLocation,
    tarPiece: "",
  }
}

export { player1Pawn1Step, player1Pawn2Step }
