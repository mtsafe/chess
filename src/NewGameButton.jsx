export function NewGameButton({ handleOnClick_RestartGame }) {
  return (
    <button
      id="restart-button"
      className="pill-button"
      onClick={handleOnClick_RestartGame}
    >
      Restart Game?
    </button>
  )
}
