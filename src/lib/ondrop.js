import { getEnPassantOpp } from "../state/enPassantOpportunity"
import {
  getDefAtk,
  getMovPlayer,
  killPiece,
  movePiece,
  promotePiece,
  getPieceMatchingIndex2,
} from "../state/pieces"
import { verifyCastleability } from "../state/castleability"

// CONSTANTS
import * as Action from "./actions"

// ONDROP EVENT HANDLER SUPPORT FUNCTIONS
function computeOnDropStateChanges({
  castleability,
  enPassantOpportunity,
  move,
  pieces1,
  pieces2,
}) {
  console.log("computeOnDropStateChanges()")
  let { action, srcIndex, srcPiece, tarIndex, tarPiece } = move
  let freshCastleability, freshEnPassantOpp, freshPieces1, freshPieces2
  let thePlayer

  const actionValues = {
    [Action.MOVE]: () => {
      thePlayer = getMovPlayer(srcIndex, pieces1, pieces2)
      freshCastleability = verifyCastleability(srcIndex, castleability)
      if (thePlayer == 1) freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
      else freshPieces2 = movePiece(srcIndex, tarIndex, pieces2)
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
      freshCastleability = castleability
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
      freshCastleability = castleability
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
  ;(() => {
    return (actionValues[action] || actionValues["default"])()
  })()

  return { freshCastleability, freshEnPassantOpp, freshPieces1, freshPieces2 }
}
export { computeOnDropStateChanges }
