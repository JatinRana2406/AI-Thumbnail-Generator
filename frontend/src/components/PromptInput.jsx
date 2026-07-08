function PromptInput({
  prompt,
  setPrompt,
  count,
  setCount,
}) {
  return (
    <div>

      <h3>Prompt</h3>

      <textarea
        rows="4"
        placeholder="Describe your thumbnail..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <br />
      <br />

      <label>Number of thumbnails</label>

      <select
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

    </div>
  );
}

export default PromptInput;