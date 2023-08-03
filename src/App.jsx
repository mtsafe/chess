import { useState } from "react"

// FUNCTION COMPONENTS
import { GameBoard } from "./GameBoard"
import { GameStatusMsg } from "./GameStatusMsg"
import { AISelector } from "./AISelector"
import { NewGameButton } from "./NewGameButton"

// FUNCTIONS SUPPORTING STATE
import { getEnPassantOpp } from "./state/enPassantOpportunity"
import { castleabilityUpdater, newCastleability } from "./state/castleability"
import {
  newPieces1,
  newPieces2,
  killPiece,
  movePiece,
  promotePiece,
} from "./state/pieces"
import { newTiles } from "./state/tiles"

// OTHER FUNCTIONS
// import { aiChoosesTile, tie, winner } from "./lib/applib"
import { newStatusMsg, getGameStatus } from "./state/gamestatusmsg"
import { findDropTargets } from "./lib/ondrag"
import { computeOnDropStateChanges } from "./lib/ondrop"

import "./App.css"

function App() {
  const OFF_BOARD = -1
  // ***************************
  // STATE HOOKS
  const [tiles, setTiles] = useState(newTiles)
  const [pieces1, setPieces1] = useState(newPieces1)
  const [pieces2, setPieces2] = useState(newPieces2)
  const [dropTargetMoves, setDropTargetMoves] = useState([])
  const [moveActions, setMoveActions] = useState([])
  const [castleability, setCastleability] = useState(newCastleability())
  const [enPassantOpportunity, setEnPassantOpportunity] = useState(OFF_BOARD)

  // const [isCheck, setIsCheck] = useState(false)
  const [gamePlay, setGamePlay] = useState("3")

  const gameStatus = getGameStatus(gamePlay, moveActions)
  const statusMsg = newStatusMsg(gameStatus, pieces1, pieces2)

  function canCastle(isCheck) {
    if (isCheck)
      return {
        player1Kingside: false,
        player1Queenside: false,
        player2Kingside: false,
        player2Queenside: false,
      }
    return castleability
  }

  function getPieceMatchingIndexProp(tile_num) {
    let result
    if (pieces1?.length)
      result = pieces1.find(piece => piece.index === tile_num)

    if (typeof result === "undefined" && pieces2?.length)
      result = pieces2.find(piece => piece.index === tile_num)
    return result
  }

  function getMoveMatchingTarProp(tile_num) {
    if (dropTargetMoves?.length) {
      return dropTargetMoves.find(move => move.tarIndex === tile_num)
    }
    return undefined
  }

  // ***************************
  // EVENT HANDLERS

  function handleOnChange_AIAlgoMode(value) {
    const selection = parseInt(value)
    setGamePlay(selection)
  }

  function handleOnClick_RestartGame() {
    setCastleability(newCastleability())
    setPieces1(newPieces1())
    setPieces2(newPieces2())
    setTiles(newTiles())
    setEnPassantOpportunity(OFF_BOARD)
    setStatusMsg("Go!")
  }

  function handleOnDrag_SetDropzones(e) {
    console.log(
      `<==EVENT===\nhandleOnDrag_SetDropzones(): targetTileNum=${e.target.getAttribute(
        "tile_num"
      )}  classList="${e.target.classList}"`
    )

    const onDragState = {
      pieces1,
      pieces2,
      moveActions,
      enPassantOpportunity,
      castleability,
      canCastle,
    }
    setDropTargetMoves(findDropTargets(e.target, onDragState))
  }

  function handleOnDrop_ExecuteMove(e) {
    // prevent default action (open as link for some elements)
    e.preventDefault()
    console.log(
      `===EVENT==>\nhandleOnDrop_ExecuteMove(): targetTileNum=${e.target.getAttribute(
        "tile_num"
      )}  classList="${e.target.classList}"`
    )
    if (!e.target.classList.contains("dropzone")) return

    let move = getMoveMatchingTarProp(
      parseInt(e.target.getAttribute("tile_num"))
    )
    if (move === undefined) return

    const onDropState = {
      castleability,
      enPassantOpportunity: OFF_BOARD,
      move,
      pieces1,
      pieces2,
    }
    let refreshOnDropState = computeOnDropStateChanges(onDropState)
    setCastleability(refreshOnDropState.freshCastleability)
    if (refreshOnDropState.freshPieces1 !== undefined)
      setPieces1(refreshOnDropState.freshPieces1)
    if (refreshOnDropState.freshPieces2 !== undefined)
      setPieces2(refreshOnDropState.freshPieces2)
    setEnPassantOpportunity(refreshOnDropState.freshEnPassantOpp)
    setDropTargetMoves([])

    let moveAction = move
    setMoveActions([...moveActions, moveAction])
  }
  // ***************************
  // EXECUTION BEGINS (OTHER THAN STATE HOOK DECLARATIONS)

  let foot = tiles.map(tile => {
    return tile.letter
  })

  return (
    <>
      <h1>CHESS + Vite + React</h1>
      <h2>[You Against AI!]</h2>
      <GameBoard
        tiles={tiles}
        gameStatus={gameStatus}
        handleOnDrag_SetDropzones={handleOnDrag_SetDropzones}
        handleOnDrop_ExecuteMove={handleOnDrop_ExecuteMove}
        getPieceMatchingIndexProp={getPieceMatchingIndexProp}
        getMoveMatchingTarProp={getMoveMatchingTarProp}
      />
      <div>
        <GameStatusMsg statusMsg={statusMsg} />
        <div>
          <span>
            <NewGameButton
              handleOnClick_RestartGame={handleOnClick_RestartGame}
            />
            <AISelector handleOnChange_AIAlgoMode={handleOnChange_AIAlgoMode} />
          </span>
        </div>
      </div>
    </>
  )
}

export default App

// function playerClaimsTile(tile_id) {
//   toggleTile(tile_id, "X")
// }
// function aiClaimsTile(tile_id) {
//   toggleTile(tile_id, "O")
// }
// function displayWinner() {
//   setStatusMsg(() => "You Win!")
// }
// function displayLoser() {
//   setStatusMsg(() => "You Lose...")
// }
// function displayTie() {
//   setStatusMsg(() => "The cat got it.")
// }

// function playerMoved(tile_id, imgElement) {
//   if (statusMsg !== "Go!") return

//   let tileLetter = imgElement.attributes.letter.nodeValue
//   if (tileLetter !== "0") return
//   playerClaimsTile(tile_id)
//   if (winner(foot, "X")) {
//     displayWinner()
//     return
//   }
//   if (tie(foot)) {
//     displayTie()
//     return
//   }

//   aiClaimsTile(aiChoosesTile(gamePlay, foot))
//   if (winner(foot, "O")) {
//     displayLoser()
//     return
//   }
//   if (tie(foot)) {
//     displayTie()
//     return
//   }
// }

// function toggleTile(tile_id, letter) {
//   foot[tile_id] = letter
//   setTiles(tilesState => {
//     return tilesState.map(tile => {
//       if (tile.tile_id === tile_id) {
//         return { ...tile, letter }
//       }
//       return tile
//     })
//   })
// }
