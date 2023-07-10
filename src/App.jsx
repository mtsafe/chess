import { useState } from "react"

// FUNCTION COMPONENTS
import { GameBoard } from "./GameBoard"
import { GameStatus } from "./GameStatus"
import { AISelector } from "./AISelector"
import { NewGameButton } from "./NewGameButton"

// FUNCTIONS SUPPORTING STATE
import { getEnPassantOpp } from "./state/enPassantOpportunity"
import { verifyCastleability, newCastleability } from "./state/castleability"
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
import { computeOnDropStateChanges, findDropTargets } from "./lib/player1events"

import "./App.css"

function App() {
  const OFF_BOARD = -1
  // ***************************
  // STATE HOOKS
  const [tiles, setTiles] = useState(newTiles)
  const [pieces1, setPieces1] = useState(newPieces1)
  const [pieces2, setPieces2] = useState(newPieces2)
  const [dropTargetMoves, setDropTargetMoves] = useState([])
  const [recordedMoves, setRecordedMoves] = useState([])
  const [castleability, setCastleability] = useState(newCastleability())
  const [enPassantOpportunity, setEnPassantOpportunity] = useState(OFF_BOARD)

  //  const [moves, setMoves] = useState([])
  const [isCheck, setIsCheck] = useState(false)
  const [statusMsg, setStatusMsg] = useState("Go!")
  // const [aiStrategy, setAIStrategy] = useState(1)

  function canCastle() {
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

  function restartGame() {
    setCastleability(newCastleability())
    setPieces1(newPieces1())
    setPieces2(newPieces2())
    setTiles(newTiles())
    setStatusMsg("Go!")
    setEnPassantOpportunity(OFF_BOARD)
  }

  function changeAI(value) {
    setAIStrategy(parseInt(value))
  }

  // ***************************
  // EVENT HANDLERS
  function handleOnDragProp(e) {
    console.log(
      `handleOnDragProp(): targetTileNum=${e.target.getAttribute(
        "tile_num"
      )}  classList="${e.target.classList}"`
    )

    const onDragState = {
      pieces1,
      pieces2,
      recordedMoves,
      enPassantOpportunity,
      canCastle,
    }
    setDropTargetMoves(findDropTargets(e.target, onDragState))
  }

  function handleOnDropProp(e) {
    // prevent default action (open as link for some elements)
    e.preventDefault()
    console.log(
      `handleOnDropProp(): targetTileNum=${e.target.getAttribute(
        "tile_num"
      )}  classList="${e.target.classList}"`
    )
    if (!e.target.classList.contains("dropzone")) return

    let move = getMoveMatchingTarProp(
      parseInt(e.target.getAttribute("tile_num"))
    )
    if (move === undefined) return

    const onDropState = {
      move: move,
      pieces1: pieces1,
      pieces2: pieces2,
      castleability: castleability,
      enPassantOpportunity: OFF_BOARD,
    }
    let refreshOnDropState = computeOnDropStateChanges(onDropState)
    setCastleability(refreshOnDropState.castleability)
    if (refreshOnDropState.freshPieces1 !== undefined)
      setPieces1(refreshOnDropState.freshPieces1)
    if (refreshOnDropState.freshPieces2 !== undefined)
      setPieces2(refreshOnDropState.freshPieces2)
    setEnPassantOpportunity(refreshOnDropState.freshEnPassantOpp)
    setDropTargetMoves([])

    let instructions
    setRecordedMoves(instructions)
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
        <GameStatus statusMsg={statusMsg} isCheck={isCheck} />
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
