import { SquareTile } from "./SquareTile"

export function GameBoard({
  tiles,
  handleOnDrag,
  handleOnDrop,
  getPieceMatchingIndex,
  dropTargetMoves,
}) {
  return (
    <div id="chess-board" className="game-board-chess">
      {tiles.map(tile => {
        let isTarget = false
        if (
          dropTargetMoves?.length &&
          dropTargetMoves.find(record => record.tar === tile.tile_num)
        )
          isTarget = true
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
