export function AISelector({ changeAI }) {
  return (
    <div className="ai">
      <label htmlFor="ai-algo">AI Algo:</label>
      <select
        name="ai-algo"
        id="ai-algo"
        defaultValue={1}
        onChange={e => changeAI(e.target.value)}
      >
        <option value="0">Walker</option>
        <option value="1">Spit Baller</option>
        <option value="2">Offender</option>
        <option value="3">Defender</option>
        <option value="4">Boss Level 1</option>
      </select>
    </div>
  )
}
