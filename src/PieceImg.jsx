import DarkKing from "./assets/chessSetShade/king-b164x294.png"
import DarkQueen from "./assets/chessSetShade/queen-b164x294.png"
import DarkBishop from "./assets/chessSetShade/bishop-b164x294.png"
import DarkKnight from "./assets/chessSetShade/knight-b164x294.png"
import DarkRook from "./assets/chessSetShade/rook-b164x294.png"
import DarkPawn from "./assets/chessSetShade/pawn-b164x294.png"
import LightKing from "./assets/chessSetShade/king-w164x294.png"
import LightQueen from "./assets/chessSetShade/queen-w164x294.png"
import LightBishop from "./assets/chessSetShade/bishop-w164x294.png"
import LightKnight from "./assets/chessSetShade/knight-w164x294.png"
import LightRook from "./assets/chessSetShade/rook-w164x294.png"
import LightPawn from "./assets/chessSetShade/pawn-w164x294.png"
import Empty from "./assets/Transparent100x100.png"

export function PieceImg({
  tile_num,
  tileShade,
  gameStatus,
  handleOnDrag_SetDropzones,
  getPieceMatchingIndexProp,
  isDropZone,
  handleOnDrop_ExecuteMove,
}) {
  let alt, src
  let pieceHere = getPieceMatchingIndexProp(tile_num)
  if (typeof pieceHere === "undefined") {
    alt = ""
    src = Empty
  } else if (pieceHere.player === 1) {
    switch (pieceHere.letter) {
      case "P":
        alt = "Your pawn"
        src = LightPawn
        break
      case "K":
        alt = "Your king"
        src = LightKing
        break
      case "Q":
        alt = "Your queen"
        src = LightQueen
        break
      case "B":
        alt = "Your bishop"
        src = LightBishop
        break
      case "N":
        alt = "Your knight"
        src = LightKnight
        break
      case "R":
        alt = "Your rook"
        src = LightRook
        break
    }
  } else {
    switch (pieceHere.letter) {
      case "P":
        alt = "Computer's pawn"
        src = DarkPawn
        break
      case "K":
        alt = "Computer's king"
        src = DarkKing
        break
      case "Q":
        alt = "Computer's queen"
        src = DarkQueen
        break
      case "B":
        alt = "Computer's bishop"
        src = DarkBishop
        break
      case "N":
        alt = "Computer's knight"
        src = DarkKnight
        break
      case "R":
        alt = "Computer's rook"
        src = DarkRook
        break
    }
  }

  let className
  if (tileShade === 0) className = "interact-img img-border-dark"
  else className = "interact-img img-border-light"

  let draggable, onDragStart, onDragOver, onDrop
  // if (isDropZone) console.log(`--- isDropZone=${isDropZone}`)
  if (isDropZone) {
    className += " dropzone"
    onDragOver = e => e.preventDefault()
    onDrop = e => handleOnDrop_ExecuteMove(e)
  } else if (typeof pieceHere !== "undefined") {
    if (gameStatus.whosTurn === pieceHere.player || gameStatus.whosTurn === 0) {
      onDragStart = e => handleOnDrag_SetDropzones(e)
      draggable = true
    }
  }
  return (
    <img
      src={src}
      className={className}
      alt={alt}
      tile_num={tile_num}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    />
  )
}
