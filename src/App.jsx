import { useState } from "react"

// FUNCTION COMPONENTS
import { GameBoard } from "./GameBoard"
import { GameStatus } from "./GameStatus"
import { AISelector } from "./AISelector"
import { NewGameButton } from "./NewGameButton"

// FUNCTIONS SUPPORTING STATE
import { newTiles } from "./state/tiles"
import { newPieces1, newPieces2 } from "./state/pieces.jsx"

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
  const [draggedPiece, setDraggedPiece] = useState(null)
  const [dropTargetMoves, setDropTargetMoves] = useState([])
  // sample dropTargetMove = {
  //   src: tile_num,
  //   srcPiece: letter,
  //   action: "move",
  //   tar: targetLocation,
  //   tarPiece: "",
  // }) // take 1 step

  const [moves, setMoves] = useState([])
  const [statusMsg, setStatusMsg] = useState("Go!")
  const [aiStrategy, setAIStrategy] = useState(1)

  function getPieceMatchingIndex(tile_num) {
    let result
    if (pieces1?.length)
      result = pieces1.find(piece => piece.index === tile_num)

    if (typeof result === "undefined" && pieces2?.length)
      result = pieces2.find(piece => piece.index === tile_num)
    return result
  }

  function getMoveMatchingTar(tile_num) {
    return dropTargetMoves.find(move => move.tar === tile_num)
  }

  function movePiece(srcIndex, targetIndex) {
    let piece = getPieceMatchingIndex(targetIndex)
    if (piece !== undefined) return
    piece = getPieceMatchingIndex(srcIndex)
    if (piece === undefined) return
    if (piece.player === 1)
      setPieces1(
        pieces1.map(p => {
          if (p.index === srcIndex) p.index = targetIndex
          return p
        })
      )
    else
      setPieces2(
        pieces2.map(p => {
          if (p.index === srcIndex) p.index = targetIndex
          return p
        })
      )
  }

  function killPiece(targetIndex) {
    let piece = getPieceMatchingIndex(targetIndex)
    if (piece !== undefined) return
    if (piece.player === 1)
      setPieces1(
        pieces1.map(p => {
          if (p.index !== srcIndex) return p
        })
      )
    else
      setPieces2(
        pieces2.map(p => {
          if (p.index !== srcIndex) return p
        })
      )
  }

  function recordMove(instruction) {}

  function restartGame() {
    setPieces1(newPieces1())
    setPieces2(newPieces2())
    setTiles(newTiles())
    setStatusMsg(() => "Go!")
  }
  function playerClaimsTile(tile_id) {
    toggleTile(tile_id, "X")
  }
  function aiClaimsTile(tile_id) {
    toggleTile(tile_id, "O")
  }
  function displayWinner() {
    setStatusMsg(() => "You Win!")
  }
  function displayLoser() {
    setStatusMsg(() => "You Lose...")
  }
  function displayTie() {
    setStatusMsg(() => "The cat got it.")
  }

  function playerMoved(tile_id, imgElement) {
    if (statusMsg !== "Go!") return

    let tileLetter = imgElement.attributes.letter.nodeValue
    if (tileLetter !== "0") return
    playerClaimsTile(tile_id)
    if (winner(foot, "X")) {
      displayWinner()
      return
    }
    if (tie(foot)) {
      displayTie()
      return
    }

    aiClaimsTile(aiChoosesTile(aiStrategy, foot))
    if (winner(foot, "O")) {
      displayLoser()
      return
    }
    if (tie(foot)) {
      displayTie()
      return
    }
  }

  function toggleTile(tile_id, letter) {
    foot[tile_id] = letter
    setTiles(tilesState => {
      return tilesState.map(tile => {
        if (tile.tile_id === tile_id) {
          return { ...tile, letter }
        }
        return tile
      })
    })
  }

  function changeAI(value) {
    setAIStrategy(parseInt(value))
  }

  // ***************************
  // EVENT HANDLERS
  function handleOnDrag(e) {
    // Add the target element's id to the data transfer object
    let tile_num = e.target.attributes.getNamedItem("tile_num").value
    console.log("handleOnDrag triggered for tile_num=" + tile_num)
    setDraggedPiece(tile_num)
    let freshDropTargetMoves = findDropTargets(e.target, pieces1, pieces2)
    setDropTargetMoves(freshDropTargetMoves)
  }

  function handleOnDrop(e) {
    console.log("handleOnDrop()")
    // prevent default action (open as link for some elements)
    e.preventDefault()
    // move dragged element to the selected drop target
    console.log("handleOnDrop: classList='" + e.target.classList + "'")
    if (e.target.classList.contains("dropzone")) {
      // find Move that drops here
      let targetTileNum = e.target.getAttribute("tile_num")
      console.log("handleOnDrop: targetTileNum=" + targetTileNum)
      let move = getMoveMatchingTar(parseInt(e.target.getAttribute("tile_num")))
      // sample dropTargetMove = {
      //   src: tile_num,
      //   srcPiece: letter,
      //   action: "move",
      //   tar: targetLocation,
      //   tarPiece: "",
      // }) // take 1 step

      if (move.action === Action.MOVE) {
        movePiece(move.src, move.tar)
      } else if (move.action === Action.CAPTURE) {
        killPiece(move.tar)
        // if the instruction == capture
        // then set the list of pieces to exclude the target piece
        // then set the piece index to the new location
      }
    }
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
        handleOnDrag={handleOnDrag}
        handleOnDrop={handleOnDrop}
        getPieceMatchingIndex={getPieceMatchingIndex}
        dropTargetMoves={dropTargetMoves}
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
