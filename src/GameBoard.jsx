import { ToeButton } from "./ToeButton"

export function GameBoard({ toes, playerSelected }) {
  return (
    <div className="game-board-chess">
      {toes.map(toe => {
        return (
          <ToeButton
            {...toe}
            key={toe.toe_id}
            toe_id={toe.toe_id}
            toe_num={toe.toe_num}
            letter={toe.letter}
            playerSelected={playerSelected}
          />
        )
      })}
    </div>
  )
}
