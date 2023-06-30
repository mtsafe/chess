import { useState } from "react"
import { GameBoard } from "./GameBoard"
import { GameStatus } from "./GameStatus"
import { AISelector } from "./AISelector"
import { aiChoosesTile, rf2Index, tie, winner } from "./lib/applib"
import { NewGameButton } from "./NewGameButton"
import "./App.css"

// A gameboard consists of 64 tiles arranged 8x8.

function App() {
  const [tiles, setTiles] = useState(newTiles)
  const [pieces1, setPieces1] = useState(newPieces1)
  const [pieces2, setPieces2] = useState(newPieces2)
  const [statusMsg, setStatusMsg] = useState("Go!")
  const [aiStrategy, setAIStrategy] = useState(1)

  function newTiles() {
    let result = []
    for (let i = 0; i < 64; i++) {
      result = [...result, { tile_id: i.toString(), tile_num: i, letter: "0" }]
    }
    return result
  }

  function pieceMatchingIndex(tile_num) {
    let result = pieces1.find(piece => piece.index === tile_num)
    if (typeof result === "undefined")
      result = pieces2.find(piece => piece.index === tile_num)
    return result
  }

  function newPieces1() {
    // player one is light shade
    let result = [
      { name: "Queen", code: "Q", letter: "Q", index: rf2Index(1, "d") },
      { name: "King", code: "K", letter: "K", index: rf2Index(1, "e") },
      { name: "Bishop", code: "QB", letter: "B", index: rf2Index(1, "c") },
      { name: "Bishop", code: "KB", letter: "B", index: rf2Index(1, "f") },
      { name: "Knight", code: "QN", letter: "N", index: rf2Index(1, "b") },
      { name: "Knight", code: "KN", letter: "N", index: rf2Index(1, "g") },
      { name: "Rook", code: "QR", letter: "R", index: rf2Index(1, "a") },
      { name: "Rook", code: "KR", letter: "R", index: rf2Index(1, "h") },
      { name: "Pawn", code: "Pa", letter: "P", index: rf2Index(2, "a") },
      { name: "Pawn", code: "Pb", letter: "P", index: rf2Index(2, "b") },
      { name: "Pawn", code: "Pc", letter: "P", index: rf2Index(2, "c") },
      { name: "Pawn", code: "Pd", letter: "P", index: rf2Index(2, "d") },
      { name: "Pawn", code: "Pe", letter: "P", index: rf2Index(2, "e") },
      { name: "Pawn", code: "Pf", letter: "P", index: rf2Index(2, "f") },
      { name: "Pawn", code: "Pg", letter: "P", index: rf2Index(2, "g") },
      { name: "Pawn", code: "Ph", letter: "P", index: rf2Index(2, "h") },
    ]
    result = result.map(piece => {
      piece.player = 1
      return piece
    })
    return result
  }

  function newPieces2() {
    // player two is dark shade
    let result = [
      { name: "Queen", code: "Q", letter: "Q", index: rf2Index(8, "d") },
      { name: "King", code: "K", letter: "K", index: rf2Index(8, "e") },
      { name: "Bishop", code: "QB", letter: "B", index: rf2Index(8, "c") },
      { name: "Bishop", code: "KB", letter: "B", index: rf2Index(8, "f") },
      { name: "Knight", code: "QN", letter: "N", index: rf2Index(8, "b") },
      { name: "Knight", code: "KN", letter: "N", index: rf2Index(8, "g") },
      { name: "Rook", code: "QR", letter: "R", index: rf2Index(8, "a") },
      { name: "Rook", code: "KR", letter: "R", index: rf2Index(8, "h") },
      { name: "Pawn", code: "Pa", letter: "P", index: rf2Index(7, "a") },
      { name: "Pawn", code: "Pb", letter: "P", index: rf2Index(7, "b") },
      { name: "Pawn", code: "Pc", letter: "P", index: rf2Index(7, "c") },
      { name: "Pawn", code: "Pd", letter: "P", index: rf2Index(7, "d") },
      { name: "Pawn", code: "Pe", letter: "P", index: rf2Index(7, "e") },
      { name: "Pawn", code: "Pf", letter: "P", index: rf2Index(7, "f") },
      { name: "Pawn", code: "Pg", letter: "P", index: rf2Index(7, "g") },
      { name: "Pawn", code: "Ph", letter: "P", index: rf2Index(7, "h") },
    ]
    result = result.map(piece => {
      piece.player = 2
      return piece
    })
    return result
  }

  function restartGame() {
    setPieces1(newPieces1())
    setPieces2(newPieces2())
    setTiles(newTiles())
    setStatusMsg(() => "Go!")
  }

  let foot = tiles.map(tile => {
    return tile.letter
  })

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

  return (
    <>
      <h1>CHESS + Vite + React</h1>
      <h2>[You Against AI!]</h2>
      <GameBoard
        tiles={tiles}
        pieces1={pieces1}
        pieces2={pieces2}
        pieceMatchingIndex={pieceMatchingIndex}
        playerMoved={playerMoved}
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
