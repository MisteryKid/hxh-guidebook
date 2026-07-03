function InputArea({ text, setText, placeholder }) {
  return (
    <div className="area-box input-box">
      <div className="area-header">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
        <span className="title-tag">INPUT</span>
      </div>
      <textarea
        className="textarea-editor"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        maxLength={500}
      />
      <div className="area-footer">
        <span>{text.length} / 500자</span>
        {text && (
          <button className="clear-btn" onClick={() => setText('')}>
            지우기
          </button>
        )}
      </div>
    </div>
  );
}

export default InputArea;
