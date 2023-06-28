import { ToeImg } from "./ToeImg"

export function ToeButton({
  letter,
  toe_id,
  toe_num,
  playerSelected = { playerSelected },
}) {
  let squareShift = 0
  if (Math.floor(toe_num / 8) % 2 !== 0) squareShift = 1
  let className
  if ((toe_num + squareShift) % 2 === 0)
    className = "square-button light-square"
  else className = "square-button dark-square"
  return (
    <button
      className={className}
      toe_id={toe_id}
      letter={letter}
      onClick={e => playerSelected(toe_id, e.target)}
    >
      <ToeImg letter={letter} />
    </button>
  )
}
