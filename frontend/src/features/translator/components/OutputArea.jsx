import { useState } from 'react';

function OutputArea({ translatedText, loading, error }) {
  const [showRune, setShowRune] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="area-box output-box">
      <div className="area-header">
        <span className="title-tag">OUTPUT</span>
        <div className="header-actions">
          {translatedText && (
            <button 
              className={`toggle-font-btn ${showRune ? 'active' : ''}`}
              onClick={() => setShowRune(!showRune)}
            >
              {showRune ? '헌터어 폰트 ON' : '영문 텍스트 보기'}
            </button>
          )}
        </div>
      </div>

      <div className="output-content-wrapper">
        {loading && <div className="output-status">변역 중... ⚡</div>}
        
        {error && <div className="output-status error-text">{error}</div>}
        
        {!loading && !error && !translatedText && (
          <div className="output-status placeholder-text">번역 결과가 여기에 나타납니다.</div>
        )}

        {!loading && !error && translatedText && (
          <div className={`translated-result-box ${showRune ? 'hunter-font' : ''}`}>
            {translatedText}
          </div>
        )}
      </div>

      <div className="area-footer">
        {translatedText && (
          <button className="copy-btn" onClick={copyToClipboard}>
            {copied ? '복사 완료!' : '클립보드 복사'}
          </button>
        )}
      </div>
    </div>
  );
}

export default OutputArea;
