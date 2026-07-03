import { useState } from 'react';
import TranslatorContainer from './features/translator/TranslatorContainer';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('translator');

  return (
    <div className="app-container">
      {/* 헌터 협회 테마의 카드 헤더 디자인 */}
      <header className="hunter-header glass-panel">
        <div className="license-badge">
          <div className="badge-logo">⭐</div>
          <div className="badge-text">
            <span>HUNTER ASSOCIATION</span>
            <span className="serial-number">LICENSED-2026-0703</span>
          </div>
        </div>
        <h1 className="main-title">헌터x헌터 가이드북 & 번역기</h1>
        <p className="main-subtitle">Hunter x Hunter Language & World Guide</p>
      </header>

      {/* 네비게이션 탭 */}
      <nav className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'translator' ? 'active' : ''}`}
          onClick={() => setActiveTab('translator')}
        >
          <span className="tab-icon">🌐</span> 헌터어 번역기
        </button>
        <button 
          className={`tab-btn ${activeTab === 'lore' ? 'active' : ''}`}
          onClick={() => setActiveTab('lore')}
        >
          <span className="tab-icon">📖</span> 세계관 도감 (준비중)
        </button>
      </nav>

      {/* 메인 컨텐츠 영역 */}
      <main className="content-area">
        {activeTab === 'translator' ? (
          <TranslatorContainer />
        ) : (
          <div className="lore-placeholder glass-panel">
            <div className="placeholder-icon">🔒</div>
            <h2>세계관 설명 페이지는 현재 준비 중입니다.</h2>
            <p>헌터 시험, 넨(Nen) 능력 체계 및 네테로 회장 전설 등의 도감이 추후 추가될 예정입니다.</p>
            <div className="glow-effect"></div>
          </div>
        )}
      </main>

      <footer className="hunter-footer">
        <p>© 2026 Hunter x Hunter Guidebook Project. Dedicated to Yoshihiro Togashi.</p>
      </footer>
    </div>
  );
}

export default App;
