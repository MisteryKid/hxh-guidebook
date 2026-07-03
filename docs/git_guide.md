# Git 협업 및 브랜치 관리 방안

이 문서는 본 프로젝트의 안정적인 소스코드 관리와 협업을 위한 **Git 브랜치 전략 및 커밋 컨벤션** 규격입니다.

---

## 1. 브랜치 전략 (Git Flow)

본 프로젝트는 `main`, `develop`, `feature` 브랜치로 분리하여 코드를 관리합니다.

```text
  main (배포)    ───────● (v1.0.0 배포) ──────────────────────● (v1.1.0 배포)
                         ▲                                     ▲
  develop (통합) ────────┴─────●───────────●─────────●─────────┘
                               ▲           ▲         ▲
  feature (기능)               └── [setup] ┘         └── [lore-setup]
```

### 🌿 브랜치 종류 및 규칙
* **`main`**: 실제 서비스가 구동되는 배포 브랜치입니다. 버그가 없는 보장된 상태에서만 `develop` 브랜치로부터 병합(Merge)을 받습니다.
* **`develop`**: 개발 중인 기능들을 하나로 모으는 통합 브랜치입니다.
* **`feature/{기능명}`**: 새로운 기능이나 수정 작업을 개별적으로 진행하는 개발 브랜치입니다. `develop` 브랜치에서 파생되어 나오며, 개발 완료 후 `develop` 브랜치로 병합(PR) 요청을 보냅니다.
  - 예시: `feature/translator-setup`, `feature/lore-guidebook`

---

## 2. 커밋 메시지 컨벤션 (Commit Message Convention)

명확하고 일관된 Git 히스토리를 위해 커밋 메시지는 아래와 같은 규칙(Angular Style)을 준수합니다.

### 📝 기본 형식
```text
Type: 요약 메시지 (50자 이내)

- 상세 내용 (필요한 경우 추가 설명 작성)
```

### 🏷️ 커밋 타입 (Type)
| 타입 | 설명 | 예시 |
| :--- | :--- | :--- |
| **`feat`** | 새로운 기능 추가 | `feat: 헌터어 한국어 번역 API 구현` |
| **`fix`** | 버그 및 에러 수정 | `fix: DTO 클래스 Lombok 어노테이션 임포트 오류 수정` |
| **`docs`** | 문서 작성 및 수정 | `docs: Git 관리 방안 가이드라인 추가` |
| **`style`** | 코드 스타일 변경 (포맷팅, 세미콜론 등, 기능 변경 없음) | `style: WebConfig.java 들여쓰기 정렬` |
| **`refactor`** | 코드 리팩토링 (기능 변화 없이 가독성이나 구조 개선) | `refactor: TranslatorService 자모 매핑 리팩토링` |
| **`chore`** | 빌드 설정, 패키지 매니저 설정 변경 | `chore: frontend npm 의존성 라이브러리 추가` |

---

## 3. 실전 Git 작업 프로세스

### 🔄 1단계: 개발용 통합 브랜치(`develop`) 준비
처음 프로젝트를 세팅하고 올릴 때는 `develop` 브랜치를 기준으로 정비합니다.
```bash
# develop 브랜치 생성 및 전환
git checkout -b develop
```

### 🛠️ 2단계: 기능 개발을 위한 피처 브랜치 작업
기능을 개발할 때는 항상 `develop` 브랜치에서 독립된 피처 브랜치를 생성하여 작업합니다.
```bash
# 1. develop 브랜치로 이동 후 최신화
git checkout develop
git pull origin develop

# 2. 신규 기능 브랜치 생성 (예: 번역기 구현)
git checkout -b feature/translator-setup

# 3. 코드 작업 완료 후 파일 스테이징 및 커밋
git add .
git commit -m "feat: 헌터어 번역기 API 및 리액트 통합 연동 세팅"
```

### 🚀 3단계: 원격 저장소 업로드 및 병합 (Pull Request)
작업한 피처 브랜치를 원격(GitHub 등)에 올린 뒤 Pull Request를 보내 `develop`에 합칩니다.
```bash
# 1. 작업한 브랜치를 원격 저장소에 Push
git push origin feature/translator-setup

# 2. GitHub 등 원격 저장소 웹사이트에서 develop 브랜치로 Pull Request(PR) 생성
# 3. 코드 리뷰 및 병합(Merge) 완료 후 로컬 브랜치 정리
git checkout develop
git pull origin develop
git branch -d feature/translator-setup
```
