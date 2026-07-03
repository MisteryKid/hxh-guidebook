# 헌터x헌터 가이드북 & 번역기 프로젝트 가이드

이 문서는 **Spring Boot (백엔드)**와 **React (프론트엔드)**로 구성된 헌터x헌터 번역기 및 세계관 가이드북 프로젝트의 아키텍처 사양과 실행 가이드를 정리한 문서입니다.

---

## 1. 프로젝트 폴더 구조 및 모듈 사양

본 프로젝트는 단일 저장소(Monorepo) 내에서 백엔드와 프론트엔드를 독립된 폴더로 나누어 관리하는 멀티 모듈 구조를 띱니다.

```text
hxh-guidebook/
├── docs/
│   └── project_guide.md                  # 본 프로젝트 가이드 문서
├── backend/                              # Spring Boot (Java 17 / Gradle)
│   └── src/main/java/com/hxh/guidebook/
│       ├── common/
│       │   └── config/WebConfig.java     # CORS 허용 설정 (React 포트 5173 연동)
│       ├── controller/
│       │   └── TranslatorController.java # 번역 API 엔드포인트
│       ├── service/
│       │   └── TranslatorService.java    # 번역 비즈니스 로직 및 로마자 변환 엔진
│       └── dto/
│           ├── TranslateRequestDto.java  # 번역 요청 데이터 객체
│           └── TranslateResponseDto.java # 번역 응답 데이터 객체
└── frontend/                             # React (Vite / Node.js 24.x)
    └── src/
        ├── assets/
        │   └── fonts/                    # 헌터어 폰트 (.ttf) 저장 위치
        ├── features/
        │   └── translator/               # 번역 기능 도메인 폴더
        │       ├── components/
        │       │   ├── InputArea.jsx     # 입력 폼 컴포넌트
        │       │   └── OutputArea.jsx    # 출력 뷰 및 토글 컨트롤러
        │       ├── TranslatorContainer.jsx # 번역 컨테이너 (실시간 API 바인딩)
        │       └── Translator.css        # 번역기 전용 스타일시트
        ├── App.jsx                       # 메인 레이아웃 및 탭 이동 
        ├── App.css                       # 앱 전체 테마 CSS
        ├── index.css                     # 네온 그린 & 골드 기반 CSS 디자인 시스템
        └── main.jsx                      # 진입점
```

---

## 2. API 규격 (API Specification)

### 헌터어 번역 요청
- **URL**: `POST /api/v1/translator/translate`
- **Content-Type**: `application/json`

#### Request Body
```json
{
  "text": "키르아",
  "mode": "KO_TO_HUNTER"
}
```
* `mode` 옵션:
  - `EN_TO_HUNTER`: 영어 알파벳 1:1 매핑 변환 (입력을 대문자로 규격화)
  - `KO_TO_HUNTER`: 한국어 발음을 영문 로마자로 변환 (분석 알고리즘 적용)

#### Response Body
```json
{
  "originalText": "키르아",
  "translatedText": "KIREUA",
  "mode": "KO_TO_HUNTER"
}
```

---

## 3. 로컬 실행 방법 (Run Instructions)

프로젝트를 실행하려면 백엔드와 프론트엔드를 각각 다른 터미널에서 실행해 주어야 합니다.

### ☕ 백엔드 (Spring Boot) 실행
```bash
cd backend
./gradlew bootRun
```
- API 서버가 `http://localhost:8080` 포트에서 실행됩니다.

### ⚛️ 프론트엔드 (React) 실행
```bash
cd frontend
npm install   # (최초 실행 시 패키지 의존성 설치)
npm run dev
```
- 로컬 웹 서버가 `http://localhost:5173` 포트에서 실행됩니다. 웹 브라우저를 통해 접속할 수 있습니다.

---

## 4. 헌터어 폰트 적용 가이드

헌터어는 별도의 고유 문자를 렌더링해야 하므로 웹 폰트 매핑 방식을 활용합니다.
1. `HunterLanguage.ttf` (혹은 헌터 문자 폰트 파일)을 다운로드합니다.
2. `frontend/src/assets/fonts/` 디렉터리 내에 해당 폰트 파일명을 **`HunterLanguage.ttf`**로 명명하여 붙여넣습니다.
3. 폰트가 적용되면 사이트 내 번역 결과창에 신비로운 헌터 문자가 출력됩니다. 
   *(만약 폰트 파일이 없어도 '영문 텍스트 보기' 토글 스위치 기능을 통해 번역된 알파벳 발음을 검증할 수 있습니다.)*

---

## 5. Git 브랜치 전략 (Git Branching Strategy)

기본적으로 `develop` 브랜치에서 기능별로 피처 브랜치를 독립적으로 생성하여 작업 후 병합합니다.

### 📝 번역기 초기 세팅 커밋 시나리오
```bash
# 1. develop 브랜치 이동
git checkout -b develop

# 2. 이번 번역기 작업 전용 피처 브랜치 생성
git checkout -b feature/translator-setup

# 3. 변경 사항 추가 및 커밋
git add .
git commit -m "feat: 헌터어 번역기 백엔드 API & 프론트엔드 UI 통합 구현"

# 4. develop 브랜치로 복귀 후 병합
git checkout develop
git merge feature/translator-setup
```

### 📖 추후 세계관 가이드 추가 시나리오
```bash
# 1. develop 브랜치 최신 상태에서 신규 피처 브랜치 생성
git checkout develop
git pull origin develop
git checkout -b feature/lore-guidebook

# 2. 세계관 관련 기능 개발 완료 후
git add .
git commit -m "feat: 세계관 가이드 도감 탭 및 API 추가"

# 3. 다시 develop에 병합
git checkout develop
git merge feature/lore-guidebook
```
