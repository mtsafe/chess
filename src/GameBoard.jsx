import { SquareTile } from "./SquareTile"

export function GameBoard({ tiles, pieceMatchingIndex, playerMoved }) {
  return (
    <div className="game-board-chess">
      {tiles.map(tile => {
        return (
          <SquareTile
            {...tile}
            key={tile.tile_id}
            tile_id={tile.tile_id}
            tile_num={tile.tile_num}
            letter={tile.letter}
            pieceMatchingIndex={pieceMatchingIndex}
            playerMoved={playerMoved}
          />
        )
      })}
    </div>
  )
}
