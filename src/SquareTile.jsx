import { PieceImg } from "./PieceImg"
// import { TileImg } from "./TileImg"

export function SquareTile({
  letter,
  tile_id,
  tile_num,
  pieceMatchingIndex,
  playerMoved,
}) {
  let squareShift = 0
  let className, frameBorderClass, tileShade
  if (Math.floor(tile_num / 8) % 2 !== 0) squareShift = 1
  tileShade = (tile_num + squareShift) % 2
  if (tileShade === 0) {
    className = "square-tile light-tile"
    frameBorderClass = "interact-frame border-dark"
  } else {
    className = "square-tile dark-tile"
    frameBorderClass = "interact-frame border-light"
  }

  return (
    <div className={className} tile_id={tile_id} letter={letter}>
      <div className={frameBorderClass}>
        <PieceImg
          letter={letter}
          tile_num={tile_num}
          tileShade={tileShade}
          pieceMatchingIndex={pieceMatchingIndex}
        />
      </div>
    </div>
  )
}
{
  /* </button>
    <button
    className={className}
    tile_id={tile_id}
    letter={letter}
    onClick={e => playerMoved(tile_id, e.target)}
  >
    <TileImg letter={letter} tile_num={tile_num} tileShade={tileShade} />
    <div className={frameBorderClass}>
      <PieceImg
        letter={letter}
        tile_num={tile_num}
        tileShade={tileShade}
        pieceMatchingIndex={pieceMatchingIndex}
      />
    </div>
  </button> */
}
