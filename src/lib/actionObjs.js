import {
  rc2Index,
  rf2Index,
  index2RF,
  index2Rank,
  index2File,
  index2Column,
  aiChoosesTile,
  numMovesLeft,
  tie,
  locateOneMoveWin,
  winner,
} from "../lib/applib"

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

// "Reversible Algebraic Notation" as per Wikipedia
function algebraicNotation({ action, srcIndex, srcPiece, tarIndex, tarPiece }) {
  switch (action) {
    case Action.CAPTURE:
      return `${srcPiece === "P" ? "" : srcPiece}${index2RF(srcIndex)}x${
        tarPiece === "P" ? "" : tarPiece
      }${index2RF(tarIndex)}`
    case Action.EN_PASSANT:
      return `${index2RF(srcIndex)}x${index2RF(tarIndex)} e.p.`
    case Action.MOVE:
      return `${srcPiece === "P" ? "" : srcPiece}${index2RF(
        srcIndex
      )}-${index2RF(tarIndex)}`
    case Action.CAPTURE_PROMOTE:
      return `${index2RF(srcIndex)}x${tarPiece}${index2RF(tarIndex)}Q`
    case Action.MOVE_PROMOTE:
      return `${index2RF(srcIndex)}-${index2RF(tarIndex)}Q`
    case Action.KINGSIDE_CASTLE:
      return "0-0-0"
    case Action.QUEENSIDE_CASTLE:
      return "0-0"
  }
}

function isSimulationGood(srcIndex, tarIndex, victimIndex, onDragState) {
  // Simulate move piece to check that it is valid / not into check
  let pieceAtSource = getPieceMatchingIndex2(srcIndex, onDragState)
  console.log(`isSimulationGood: ${pieceAtSource.name}@${pieceAtSource.index}`)
  let defPieces = structuredClone(onDragState.pieces1)
  let atkPieces = structuredClone(onDragState.pieces2)

  if (pieceAtSource.player === 2)
    [defPieces, atkPieces] = [atkPieces, defPieces]
  let unkilledPieces = killPiece(victimIndex, atkPieces)
  if (unkilledPieces !== undefined) atkPieces = unkilledPieces
  defPieces = movePiece(srcIndex, tarIndex, defPieces)
  return !isPlayerInCheck(defPieces, atkPieces)
}

function captureAction(srcIndex, srcPiece, tarIndex, tarPiece, onDragState) {
  if (isSimulationGood(srcIndex, tarIndex, tarIndex, onDragState)) {
    let moveObj = {
      action: Action.CAPTURE,
      algNote: "",
      onDragState,
      srcIndex,
      srcPiece,
      tarIndex,
      tarPiece,
    }

    return { ...moveObj, algNote: algebraicNotation(moveObj) }
  }
}

function enPassantAction(srcIndex, tarIndex, onDragState) {
  let victimIndex = rf2Index(index2Rank(srcIndex), index2File(tarIndex))
  if (isSimulationGood(srcIndex, tarIndex, victimIndex, onDragState)) {
    let moveObj = {
      action: Action.EN_PASSANT,
      algNote: "",
      onDragState,
      srcIndex,
      srcPiece: "P",
      tarIndex,
      tarPiece: "P",
    }

    return { ...moveObj, algNote: algebraicNotation(moveObj) }
  }
}

function movePieceAction(srcIndex, srcPiece, tarIndex, onDragState) {
  if (isSimulationGood(srcIndex, tarIndex, srcIndex, onDragState)) {
    let moveObj = {
      action: Action.MOVE,
      algNote: "",
      onDragState,
      srcIndex,
      srcPiece,
      tarIndex,
      tarPiece: "",
    }

    return { ...moveObj, algNote: algebraicNotation(moveObj) }
  }
}

function capturePromoteAction(srcIndex, tarIndex, tarPiece, onDragState) {
  if (isSimulationGood(srcIndex, tarIndex, tarIndex, onDragState)) {
    let moveObj = {
      action: Action.CAPTURE_PROMOTE,
      algNote: "",
      onDragState,
      srcIndex,
      srcPiece: "P",
      tarIndex,
      tarPiece,
    }

    return { ...moveObj, algNote: algebraicNotation(moveObj) }
  }
}

function movePromoteAction(srcIndex, tarIndex, onDragState) {
  if (isSimulationGood(srcIndex, tarIndex, srcIndex, onDragState)) {
    let moveObj = {
      action: Action.MOVE_PROMOTE,
      algNote: "",
      onDragState,
      srcIndex,
      srcPiece: "P",
      tarIndex,
      tarPiece: "",
    }

    return { ...moveObj, algNote: algebraicNotation(moveObj) }
  }
}

function kingsideCastleAction(srcIndex, onDragState) {
  if (
    isSimulationGood(srcIndex, srcIndex + 1, srcIndex, onDragState) &&
    isSimulationGood(srcIndex, srcIndex + 2, srcIndex, onDragState)
  ) {
    let moveObj = {
      action: Action.KINGSIDE_CASTLE,
      algNote: "",
      onDragState,
      srcIndex,
      srcPiece: "K",
      tarIndex: srcIndex + 2,
      tarPiece: "",
    }

    return { ...moveObj, algNote: algebraicNotation(moveObj) }
  }
}

function queensideCastleAction(srcIndex, onDragState) {
  if (
    isSimulationGood(srcIndex, srcIndex - 1, srcIndex, onDragState) &&
    isSimulationGood(srcIndex, srcIndex - 2, srcIndex, onDragState)
  ) {
    let moveObj = {
      action: Action.QUEENSIDE_CASTLE,
      algNote: "",
      onDragState,
      srcIndex,
      srcPiece: "K",
      tarIndex: srcIndex - 2,
      tarPiece: "",
    }

    return { ...moveObj, algNote: algebraicNotation(moveObj) }
  }
}

export {
  captureAction,
  enPassantAction,
  movePieceAction,
  capturePromoteAction,
  movePromoteAction,
  kingsideCastleAction,
  queensideCastleAction,
}
