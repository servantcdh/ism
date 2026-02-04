# 📦 ISM (Inventory & Sales Management) - Fullstack Monorepo

> **실제 운영을 목적으로 설계된 고성능 재고-판매 관리 시스템**  
> 안정적인 비즈니스 로직(TDD), 대용량 데이터 처리(Performance), 정량적 지표 수집(Metrics Pipeline)을 핵심 가치로 하며, 모노레포 구조를 통해 시스템의 확장성과 일관성을 확보했습니다.

---

## 🚀 Key Objectives

- **TDD 기반의 안정성**: 핵심 도메인 및 실패 사례에 대한 테스트 코드를 작성하여 코드의 신뢰성 확보
- **성능 중심의 UX**: 대규모 데이터(50,000+건) 환경에서도 부드러운 사용자 경험 유지 (Virtualization, API Prefetching)
- **정량적 데이터 기반 운영**: Web-Vitals 및 비즈니스 핵심 지표 수집을 통한 시스템 품질 모니터링
- **확장 가능한 선언적 UI**: 독립적인 Design System 패키지 운영을 통해 다중 앱 환경에서의 디자인 일관성 유지

---

## 🛠 Tech Stack

### Frontend

- **Framework**: `React 18`, `TypeScript`, `Vite`
- **State Management**: `TanStack Query (Server)`, `Zustand (Client)`
- **Routing**: `TanStack Router` (Type-safe routing)
- **Virtualization**: `TanStack Virtual` (대용량 리스트 최적화)
- **Styling/DS**: `Vanilla CSS` + `Shared Tokens (CSS Vars)` → `Storybook`

### Backend

- **Core**: `NestJS` (Fastify Adapter)
- **Database**: `PostgreSQL` with `Prisma ORM`
- **API Spec**: `REST API` with `Swagger` 문서화
- **Reliability**: `Idempotency (clientMutationId)`, `DB Transactions`, `No-negative-stock Constraints`

### DevOps & Infrastructure

- **Monorepo Tool**: `pnpm workspaces`, `Turborepo` (optional)
- **CI/CD**: `GitHub Actions`
- **Container**: `Docker`, `Docker Compose`
- **Deployment**: `GitHub Container Registry (GHCR)`, `NGINX`

---

## ✨ Key Features & Engineering Points

### 1. 고성능 데이터 핸들링 (Admin Web)

- **Virtualized Lists**: 수만 건의 재고 데이터를 끊김 없이 브라우징하기 위한 가상 렌더링 적용.
- **URL Sync State**: 검색 필터, 페이지네이션 상태를 URL 쿼리 파라미터와 동기화하여 '새로고침'이나 '공유하기' 시에도 상태를 유지.
- **Label Print System**: `@media print` 스타일 최적화를 통한 업무용 라벨 출력 시스템 지원.

### 2. 현장 최적화 PWA (Store App)

- **Scanning System**: `@zxing/browser`를 활용한 바코드/QR 스캔 기능 및 키보드 웨지 스캐너 대응.
- **Offline Resiliency**: `IndexedDB` 기반의 **Outbox Pattern** 구현. 네트워크 단절 시에도 판매 데이터를 큐에 저장하고, 연결 시 중복 없이 재전송.
- **Mobile First UX**: 터치 인터페이스와 실시간 검색 최적화.

### 3. 시스템 안정성 및 무결성 (API)

- **Idempotent Write**: 모든 쓰기(Create/Update) 작업에 `clientMutationId`를 필수화하여 네트워크 재시도 시 발생할 수 있는 데이터 중복 생성 방지.
- **Race Condition Prevention**: 재고 판매/입고 시 DB `Row locking`을 활용하여 동시성 이슈와 음수 재고 발생을 철저히 차단.
- **Auth Flow**: `JWT (Access)` + `HttpOnly Cookie (Refresh)` 기반의 보안 인증 체계 구축.

### 4. 디자인 시스템 (Atom-to-Product)

- **Token-based System**: `packages/tokens`에서 Primitive/Semantic 토큰을 정의하여 다크모드 및 테마 확장에 최적화.
- **Shared UI UI Library**: 독립적인 `packages/ui`에서 컴포넌트를 개발하고, Storybook을 통해 Interaction Test와 시각적 문서화 수행.

---

## 📁 Monorepo Structure

```text
.
├── apps
│   ├── admin-web   # 관리자용 고성능 웹 대시보드
│   ├── store-pwa   # 현장용 바코드 스캔 및 판매 PWA
│   ├── api         # NestJS 기반 백엔드 서비스
│   └── storybook   # UI 컴포넌트 문서화 및 테스트 환경
└── packages
    ├── tokens      # Design Tokens (Color, Spacing, Shadow, etc.)
    ├── ui          # Shared React Component Library
    └── shared      # 도메인 로직, 유틸리티 함수, 공통 타입 정의
```

---

## ⚙️ Development Guide

### Prerequisites

- Node.js >= 18
- pnpm >= 9
- Docker (for PostgreSQL)

### Setup

```bash
# 1. 의존성 설치
pnpm install

# 2. 환경 변수 설정
cp .env.example .env

# 3. 로컬 인프라 실행 (PostgreSQL)
docker-compose up -d

# 4. DB 마이그레이션 및 시드 데이터 생성 (상품 50,000개 등)
pnpm seed

# 5. 전체 서비스 개발 모드 실행
pnpm dev
```

---

## 📊 Metrics & Quality

- **Lighthouse CI**: Web-Vitals 점수 추적 및 INP(Interaction to Next Paint) 최적화.
- **Coverage**: 핵심 비즈니스 로직에 대해 80% 이상의 테스트 커버리지 유지 지향.
- **Dashboard**: 실시간 수집된 성능 지표를 Admin 대시보드에서 시각적으로 확인 가능.

---

**This project is a technical verification for full-stack engineering proficiency and high-performance web architecture.**
