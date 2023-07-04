import { index2Rank, index2File } from "./applib"
import { getPieceMatchingIndex } from "../state/pieces"
import * as Action from "./actions"

function player1Pawn1Step(letter, tile_num, pieces1, pieces2) {
  let tarIndex = tile_num - 8
  let pieceAtTarget = getPieceMatchingIndex(
    parseInt(tarIndex),
    pieces1,
    pieces2
  )
  if (pieceAtTarget === undefined)
    return {
      srcIndex: tile_num,
      srcPiece: letter,
      action: Action.MOVE,
      tarIndex,
      tarPiece: "",
    }
}

function player1Pawn2Step(letter, tile_num, pieces1, pieces2) {
  if (index2Rank(tile_num) !== 2) return
  let tarIndex = tile_num - 8
  let pieceAtTarget = getPieceMatchingIndex(
    parseInt(tarIndex),
    pieces1,
    pieces2
  )
  if (pieceAtTarget !== undefined) return
  tarIndex = tile_num - 16
  pieceAtTarget = getPieceMatchingIndex(parseInt(tarIndex), pieces1, pieces2)
  if (pieceAtTarget !== undefined) return
  return {
    srcIndex: tile_num,
    srcPiece: letter,
    action: Action.MOVE,
    tarIndex,
    tarPiece: "",
  }
}

function player1PawnCaptureLeft(letter, tile_num, pieces1, pieces2) {
  if (index2Rank(tile_num) === "a") return
  let tarIndex = tile_num - 9
  let pieceAtTarget = getPieceMatchingIndex(
    parseInt(tarIndex),
    pieces1,
    pieces2
  )
  if (pieceAtTarget?.player === 2)
    return {
      srcIndex: tile_num,
      srcPiece: letter,
      action: Action.CAPTURE,
      tarIndex,
      tarPiece: pieceAtTarget.letter,
    }
}

export { player1Pawn1Step, player1Pawn2Step, player1PawnCaptureLeft }
