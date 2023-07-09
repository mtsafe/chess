export function NewGameButton({ restartGame }) {
  return (
    <button id="restart-button" className="pill-button" onClick={restartGame}>
      Restart Game?
    </button>
  )
}
