# 헌터어 번역기 기능 개발 위치 가이드

이 문서는 헌터어 번역기 기능을 직접 고민하고 구현해 나갈 때, **어떤 파일의 어느 메서드를 채우면 되는지** 작업 위치를 명시한 문서입니다. (React의 폰트 및 UI 설정 방법은 하단에 유지되어 있습니다.)

---

## 1. 백엔드 (Spring Boot) 작업 위치

헌터어 번역의 핵심 비즈니스 로직(번역 사전 연동, 변환 규칙 구현 등)은 모두 다음 파일의 내부 메서드를 채우시면 됩니다.

* **대상 파일**: `backend/src/main/java/com/hxh/guidebook/service/TranslatorService.java`

### 📍 채워야 할 메서드
1. **`public TranslateResponseDto translate(TranslateRequestDto request)`**
   * **역할**: 번역의 전체적인 흐름을 분기하고 결과를 반환하는 진입점입니다.
   * **작업**: 전달된 `mode`(영어 ↔ 헌터어, 한국어 ↔ 헌터어 등)에 맞게 어떤 변환 과정을 거치게 할 것인지의 제어 흐름을 구현합니다.

2. **`private String convertKoreanToRoman(String text)`**
   * **역할**: 한국어 문자열을 영문 로마자 발음으로 변환하는 메서드입니다.
   * **작업**: 한글 음절을 파싱하여 영문 텍스트로 바꾸는 세부 매핑 알고리즘 및 예외 처리를 직접 설계하여 구현합니다.

---

## 2. 프론트엔드 (React) 작업 및 설정 가이드

프론트엔드에서 번역기와 연동되는 파일은 **`frontend/src/features/translator/`** 아래에 모여 있습니다.

### 📍 1) 헌터어 웹 폰트 적용하기
번역된 영문 대문자 텍스트에 헌터어 폰트 스타일을 적용해 실제 헌터 문자로 브라우저에 그리는 핵심 설정입니다.

* **관련 파일**: `frontend/src/index.css` 및 `frontend/src/assets/fonts/`
* **작업 방법**:
  1. 헌터x헌터 폰트 파일(`.ttf` 또는 `.woff`)을 구합니다.
  2. 파일명을 **`HunterLanguage.ttf`**로 변경하여 `frontend/src/assets/fonts/` 폴더에 넣습니다.
  3. `index.css`에 이미 아래와 같이 웹 폰트 정의 및 적용 클래스가 작성되어 있으므로, 폰트 파일이 정상 위치하면 브라우저가 자동으로 헌터 문자를 렌더링합니다.
     ```css
     @font-face {
       font-family: 'HunterLanguage';
       src: url('./assets/fonts/HunterLanguage.ttf') format('truetype');
     }
     .hunter-font {
       font-family: 'HunterLanguage', sans-serif;
     }
     ```

### 📍 2) 번역기 화면 UI 레이아웃 및 효과 개선
* **관련 파일**: 
  * `frontend/src/features/translator/TranslatorContainer.jsx` (컨테이너 상태 및 API 바인딩)
  * `frontend/src/features/translator/components/OutputArea.jsx` (결과 및 토글 처리)
  * `frontend/src/features/translator/Translator.css` (글라스모피즘 스타일)
* **개선 포인트**:
  * 헌터 문자 간의 간격을 조절하고 싶다면 `Translator.css`에서 `.translated-result-box.hunter-font` 클래스의 `letter-spacing` 속성 값을 조절합니다.
  * API 에러 처리 메시지 스타일이나 로딩 중일 때 애니메이션 효과(Spinner 등)를 수정하고 싶다면 `OutputArea.jsx`와 `Translator.css`를 편집합니다.
