import { SquareTile } from "./SquareTile"

export function GameBoard({
  tiles,
  handleOnDrag,
  handleOnDrop,
  getPieceMatchingIndex,
  getMoveMatchingTar,
}) {
  return (
    <div id="chess-board" className="game-board-chess">
      {tiles.map(tile => {
        let isTarget = false

        if (getMoveMatchingTar(tile.tile_num) !== undefined)
          console.log("marking square " + tile.tile_num)
        if (getMoveMatchingTar(tile.tile_num) !== undefined) isTarget = true
        return (
          <SquareTile
            {...tile}
            key={tile.tile_id}
            tile_id={tile.tile_id}
            tile_num={tile.tile_num}
            handleOnDrag={handleOnDrag}
            handleOnDrop={handleOnDrop}
            getPieceMatchingIndex={getPieceMatchingIndex}
            isTarget={isTarget}
          />
        )
      })}
    </div>
  )
}
