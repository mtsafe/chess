export function AISelector({ handleOnChange_AIAlgoMode }) {
  return (
    <div className="ai">
      <label htmlFor="ai-algo">AI Algo:</label>
      <select
        name="ai-algo"
        id="ai-algo"
        defaultValue={1}
        onChange={e => handleOnChange_AIAlgoMode(e.target.value)}
      >
        <option value="0">Test Mode 1</option>
        <option value="1">2 Player Mode</option>
        <option value="2">Walker</option>
        <option value="3">Spit Baller</option>
        <option value="4">Offender</option>
        <option value="5">Defender</option>
        <option value="6">Boss Level 1</option>
      </select>
    </div>
  )
}
