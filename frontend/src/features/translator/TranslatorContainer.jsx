import { useState, useEffect } from 'react';
import InputArea from './components/InputArea';
import OutputArea from './components/OutputArea';
import './Translator.css';

function TranslatorContainer() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [mode, setMode] = useState('EN_TO_HUNTER'); // EN_TO_HUNTER, KO_TO_HUNTER
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 실시간 번역을 위한 디바운스(Debounce) 처리 효과
  useEffect(() => {
    if (!inputText.trim()) {
      setTranslatedText('');
      return;
    }

    const delayDebounceTimer = setTimeout(() => {
      performTranslation();
    }, 250); // 250ms 대기 후 백엔드 요청

    return () => clearTimeout(delayDebounceTimer);
  }, [inputText, mode]);

  const performTranslation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/v1/translator/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          mode: mode,
        }),
      });

      if (!response.ok) {
        throw new Error('API 호출에 실패했습니다.');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (err) {
      console.error(err);
      setError('서버 연결 실패 (Spring Boot가 켜져 있는지 확인해 주세요)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="translator-container glass-panel">
      {/* 모드 선택기 */}
      <div className="mode-selector">
        <button 
          className={`mode-btn ${mode === 'EN_TO_HUNTER' ? 'selected' : ''}`}
          onClick={() => setMode('EN_TO_HUNTER')}
        >
          🇺🇸 영어 ➔ 헌터어
        </button>
        <button 
          className={`mode-btn ${mode === 'KO_TO_HUNTER' ? 'selected' : ''}`}
          onClick={() => setMode('KO_TO_HUNTER')}
        >
          🇰🇷 한국어 발음 ➔ 헌터어
        </button>
      </div>

      {/* 입출력 그리드 레이아웃 */}
      <div className="translator-grid">
        <InputArea 
          text={inputText} 
          setText={setInputText} 
          placeholder={
            mode === 'EN_TO_HUNTER' 
              ? '영어로 입력해 주세요... (예: GON FREECS)' 
              : '한국어로 입력해 주세요... (예: 키르아 조ル딕)'
          }
        />
        
        <div className="arrow-divider">⚡</div>

        <OutputArea 
          translatedText={translatedText} 
          loading={loading}
          error={error}
        />
      </div>

      {/* 웹 폰트 안내 배너 */}
      <div className="font-info-banner">
        <span>ℹ️</span> 헌터 문자를 완벽히 보려면 로컬 환경에 헌터어 폰트가 설치되어 있거나, 
        <code className="code-path">frontend/src/assets/fonts/HunterLanguage.ttf</code> 경로에 폰트 파일이 제공되어야 합니다.
      </div>
    </div>
  );
}

export default TranslatorContainer;
