import { getEnPassantOpp } from "../state/enPassantOpportunity"
import {
  getDefAndAtkPieces2,
  getMovPlayer,
  killPiece,
  movePiece,
  promotePiece,
  getPieceMatchingIndex1,
  getPieceMatchingIndex2,
} from "../state/pieces"
import { castleabilityUpdater } from "../state/castleability"

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
  // console.log("computeOnDropStateChanges()")
  let { action, srcIndex, srcPiece, tarIndex, tarPiece } = move
  let freshCastleability, freshEnPassantOpp, freshPieces1, freshPieces2
  let thePlayer

  const actionValues = {
    [Action.MOVE]: () => {
      let { letter, player } = getPieceMatchingIndex1(
        srcIndex,
        pieces1.concat(pieces2)
      )
      thePlayer = player
      freshCastleability = castleabilityUpdater(srcIndex, castleability)
      if (thePlayer === 1) freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
      else freshPieces2 = movePiece(srcIndex, tarIndex, pieces2)
      freshEnPassantOpp = getEnPassantOpp(move, letter)
      // also en passant opportunity for 2-step Pawn
    },
    [Action.CAPTURE]: () => {
      thePlayer = getMovPlayer(srcIndex, pieces1, pieces2)
      freshCastleability = castleabilityUpdater(srcIndex, castleability)
      freshCastleability = castleabilityUpdater(tarIndex, freshCastleability)
      if (thePlayer === 1) {
        freshPieces2 = killPiece(tarIndex, pieces2)
        freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
      } else {
        freshPieces1 = killPiece(tarIndex, pieces1)
        freshPieces2 = movePiece(srcIndex, tarIndex, pieces2)
      }
    },
    [Action.MOVE_PROMOTE]: () => {
      thePlayer = getMovPlayer(srcIndex, pieces1, pieces2)
      freshCastleability = castleability
      if (thePlayer === 1) {
        freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
        freshPieces1 = promotePiece(tarIndex, freshPieces1)
      } else {
        freshPieces2 = movePiece(srcIndex, tarIndex, pieces2)
        freshPieces2 = promotePiece(tarIndex, freshPieces2)
      }
    },
    [Action.CAPTURE_PROMOTE]: () => {
      thePlayer = getMovPlayer(srcIndex, pieces1, pieces2)
      freshCastleability = castleabilityUpdater(tarIndex, castleability)
      if (thePlayer === 1) {
        freshPieces2 = killPiece(tarIndex, pieces2)
        freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
        freshPieces1 = promotePiece(tarIndex, freshPieces1)
      } else {
        freshPieces1 = killPiece(tarIndex, pieces1)
        freshPieces2 = movePiece(srcIndex, tarIndex, pieces2)
        freshPieces2 = promotePiece(tarIndex, freshPieces2)
      }
    },
    [Action.EN_PASSANT]: () => {
      thePlayer = getMovPlayer(srcIndex, pieces1, pieces2)
      freshCastleability = castleability
      if (thePlayer === 1) {
        freshPieces2 = killPiece(tarIndex + 8, pieces2)
        freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
      } else {
        freshPieces1 = killPiece(tarIndex - 8, pieces1)
        freshPieces2 = movePiece(srcIndex, tarIndex, pieces2)
      }
    },
    [Action.KINGSIDE_CASTLE]: () => {
      thePlayer = getMovPlayer(srcIndex, pieces1, pieces2)
      freshCastleability = castleabilityUpdater(srcIndex, castleability)
      if (thePlayer === 1) {
        freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
        freshPieces1 = movePiece(srcIndex + 3, srcIndex + 1, freshPieces1)
      } else {
        freshPieces2 = movePiece(srcIndex, tarIndex, pieces2)
        freshPieces2 = movePiece(srcIndex + 3, srcIndex + 1, freshPieces2)
      }
    },
    [Action.QUEENSIDE_CASTLE]: () => {
      thePlayer = getMovPlayer(srcIndex, pieces1, pieces2)
      freshCastleability = castleabilityUpdater(srcIndex, castleability)
      if (thePlayer === 1) {
        freshPieces1 = movePiece(srcIndex, tarIndex, pieces1)
        freshPieces1 = movePiece(srcIndex - 4, srcIndex - 1, freshPieces1)
      } else {
        freshPieces2 = movePiece(srcIndex, tarIndex, pieces2)
        freshPieces2 = movePiece(srcIndex - 4, srcIndex - 1, freshPieces2)
      }
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
