import { useState } from "react"

// FUNCTION COMPONENTS
import { GameBoard } from "./GameBoard"
import { GameStatus } from "./GameStatus"
import { AISelector } from "./AISelector"
import { NewGameButton } from "./NewGameButton"

// FUNCTIONS SUPPORTING STATE
import { newTiles } from "./state/tiles"
import {
  newPieces1,
  newPieces2,
  killPiece,
  movePiece,
  promotePiece,
} from "./state/pieces"

// OTHER FUNCTIONS
import { aiChoosesTile, tie, winner } from "./lib/applib"
import { findDropTargets } from "./lib/player1eventlib"

// CONSTANTS
import * as Action from "./lib/actions"

import "./App.css"

function App() {
  // ***************************
  // STATE HOOKS
  const [tiles, setTiles] = useState(newTiles)
  const [pieces1, setPieces1] = useState(newPieces1)
  const [pieces2, setPieces2] = useState(newPieces2)
  //  const [draggedPiece, setDraggedPiece] = useState(null)
  const [dropTargetMoves, setDropTargetMoves] = useState([])
  // sample dropTargetMove = {
  //   srcIndex: tile_num,
  //   srcPiece: letter,
  //   action: "move",
  //   tarIndex: targetLocation,
  //   tarPiece: "",
  // }) // take 1 step

  //  const [moves, setMoves] = useState([])
  const [statusMsg, setStatusMsg] = useState("Go!")
  const [aiStrategy, setAIStrategy] = useState(1)

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

  function recordMove(instruction) {}

  function restartGame() {
    setPieces1(newPieces1())
    setPieces2(newPieces2())
    setTiles(newTiles())
    setStatusMsg(() => "Go!")
  }

  function changeAI(value) {
    setAIStrategy(parseInt(value))
  }

  // ***************************
  // EVENT HANDLERS
  function handleOnDragProp(e) {
    console.log("handleOnDragProp()")
    setDropTargetMoves(findDropTargets(e.target, pieces1, pieces2))
  }

  function handleOnDropProp(e) {
    console.log("handleOnDropProp()")
    // prevent default action (open as link for some elements)
    e.preventDefault()
    console.log(
      `handleOnDropProp: targetTileNum=${e.target.getAttribute(
        "tile_num"
      )}  classList="${e.target.classList}"`
    )
    if (!e.target.classList.contains("dropzone")) return
    // move dragged element to the selected drop target
    // find Move that drops here

    let move = getMoveMatchingTarProp(
      parseInt(e.target.getAttribute("tile_num"))
    )
    // sample move = {
    //   srcIndex: tile_num,
    //   srcPiece: letter,
    //   action: Action.MOVE,
    //   tarIndex: targetLocation,
    //   tarPiece: "",
    // }) // take 1 step
    if (move === undefined) return
    let freshPieces1, freshPieces2
    switch (move.action) {
      case Action.MOVE:
        freshPieces1 = movePiece(move.srcIndex, move.tarIndex, pieces1)
        break
      case Action.CAPTURE:
        freshPieces2 = killPiece(move.tarIndex, pieces2)
        freshPieces1 = movePiece(move.srcIndex, move.tarIndex, pieces1)
        break
      case Action.MOVE_PROMOTE:
        freshPieces1 = movePiece(move.srcIndex, move.tarIndex, pieces1)
        freshPieces1 = promotePiece(move.tarIndex, freshPieces1)
        break
      case Action.CAPTURE_PROMOTE:
        freshPieces2 = killPiece(move.tarIndex, pieces2)
        console.log("kill piece results:")
        console.dir(freshPieces2)
        freshPieces1 = movePiece(move.srcIndex, move.tarIndex, pieces1)
        console.log("move piece results:")
        console.dir(freshPieces1)
        freshPieces1 = promotePiece(move.tarIndex, freshPieces1)
        console.log("promote piece results:")
        console.dir(freshPieces1)
        break
    }
    if (freshPieces1 !== undefined) setPieces1(freshPieces1)
    if (freshPieces2 !== undefined) setPieces2(freshPieces2)
    setDropTargetMoves([])

    let instruction
    recordMove(instruction)
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
        handleOnDragProp={handleOnDragProp}
        handleOnDropProp={handleOnDropProp}
        getPieceMatchingIndexProp={getPieceMatchingIndexProp}
        getMoveMatchingTarProp={getMoveMatchingTarProp}
      />
      <div>
        <GameStatus statusMsg={statusMsg} />
        <div>
          <span>
            <NewGameButton restartGame={restartGame} />
            <AISelector changeAI={changeAI} />
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

//   aiClaimsTile(aiChoosesTile(aiStrategy, foot))
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
