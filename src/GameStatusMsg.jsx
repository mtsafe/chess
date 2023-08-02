export function GameStatusMsg({ statusMsg, isCheck }) {
  if (isCheck) return <h2>CHECK! {statusMsg}</h2>
  return <h2>{statusMsg}</h2>
}
