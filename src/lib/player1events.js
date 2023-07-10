import { getEnPassantOpp } from "../state/enPassantOpportunity"
import {
  killPiece,
  movePiece,
  promotePiece,
  getPieceMatchingIndex2,
} from "../state/pieces"
import { verifyCastleability } from "../state/castleability"
import {
  player1Bishop,
  player1King,
  player1Knight,
  player1Queen,
  player1Pawn1Step,
  player1Pawn2Step,
  player1PawnCaptureLeft,
  player1PawnCaptureRight,
  player1Rook,
} from "./player1moves"

// CONSTANTS
import * as Action from "./actions"

// EVENT HANDLER SUPPORT FUNCTIONS
function findDropTargets(pieceElement, onDragState) {
  let result = []
  let srcIndex = parseInt(pieceElement.getAttribute("tile_num"))
  let { letter } = getPieceMatchingIndex2(parseInt(srcIndex), onDragState)
  switch (letter) {
    case "P":
      result.push(player1Pawn1Step(srcIndex, onDragState))
      result.push(player1Pawn2Step(srcIndex, onDragState))
      result.push(player1PawnCaptureLeft(srcIndex, onDragState))
      result.push(player1PawnCaptureRight(srcIndex, onDragState))
      break
    case "R":
      result = player1Rook(srcIndex, onDragState)
      break
    case "N":
      result = player1Knight(srcIndex, onDragState)
      break
    case "B":
      result = player1Bishop(srcIndex, onDragState)
      break
    case "Q":
      result = player1Queen(srcIndex, onDragState)
      break
    case "K":
      result = player1King(srcIndex, onDragState)
      break
  }
  return result.filter(Boolean) // remove undefined elements from array
}

function computeOnDropStateChanges({
  castleability,
  enPassantOpportunity,
  move,
  pieces1,
  pieces2,
}) {
  let { action, srcIndex, srcPiece, tarIndex, tarPiece } = move
  let freshCastleability, freshEnPassantOpp, freshPieces1, freshPieces2

  const actionValues = {
    [Action.MOVE]: () => {
      freshCastleability = verifyCastleability(srcIndex, castleability)
      freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
      freshEnPassantOpp = getEnPassantOpp(move)
      // also en passant opportunity for 2-step Pawn
    },
    [Action.CAPTURE]: () => {
      freshCastleability = verifyCastleability(srcIndex, castleability)
      freshCastleability = verifyCastleability(tarIndex, freshCastleability)
      freshPieces2 = killPiece(tarIndex, pieces2)
      freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
    },
    [Action.MOVE_PROMOTE]: () => {
      freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
      freshPieces1 = promotePiece(tarIndex, freshPieces1)
    },
    [Action.CAPTURE_PROMOTE]: () => {
      freshCastleability = verifyCastleability(tarIndex, castleability)
      freshPieces2 = killPiece(tarIndex, pieces2)
      freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
      freshPieces1 = promotePiece(tarIndex, freshPieces1)
    },
    [Action.EN_PASSANT]: () => {
      freshPieces2 = killPiece(enPassantOpportunity, pieces2)
      freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
    },
    [Action.KINGSIDE_CASTLE]: () => {
      freshCastleability = verifyCastleability(srcIndex, castleability)
      freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
      freshPieces1 = movePiece(srcIndex + 3, srcIndex + 1, freshPieces1)
    },
    [Action.QUEENSIDE_CASTLE]: () => {
      freshCastleability = verifyCastleability(srcIndex, castleability)
      freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
      freshPieces1 = movePiece(srcIndex - 4, srcIndex - 1, freshPieces1)
    },
    default: () => {
      return
    },
  }

  function computeNewStatesFromAction(action) {
    return (actionValues[action] || actionValues["default"])()
  }
  computeNewStatesFromAction(action)
  return { freshCastleability, freshEnPassantOpp, freshPieces1, freshPieces2 }
}
export { computeOnDropStateChanges, findDropTargets }
