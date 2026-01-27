# PROMPT.md — Inventory Portfolio Project (SSOT)

> **Single Source of Truth (SSOT)**  
> 이 문서는 프로젝트 요구사항/방향/스택/품질 기준의 단일 진실이다.  
> 코드/문서/LLM 제안이 충돌하면 **PROMPT.md가 우선**한다.  
> 큰 변경이 필요하면 **PROMPT.md → ADR → 코드** 순서로 반영한다.

---

## 0) 프로젝트 목적(우선순위)

1) **TDD 경험 확보**: 핵심 도메인/안정성 기능을 테스트로 고정  
2) **성능 주의 성향 어필**: 대용량에서도 UX 유지(가상화/캐시/프리패치)  
3) **정량 지표 수집**: 성능/운영/품질 지표 수집→저장→조회  
4) **디자인 시스템 경험**: tokens→ui→storybook(문서+interaction test)→제품 적용

---

## 1) 비협상 규칙(Non-negotiables)

### MUST
- pnpm workspaces 모노레포 유지
- Admin/Store는 반드시 `packages/ui` 컴포넌트를 사용(앱 내 스타일 중복 최소화)
- Storybook 적용(Autodocs + interaction tests)
- 서버는 idempotency(clientMutationId) + 트랜잭션 + 음수재고 방지를 강제
- 지표 파이프라인(수집→API→DB→Admin 조회) 구현
- GitHub Actions → GHCR → 홈서버 Docker Compose 배포

### MUST NOT
- 판매/입고/조정에서 트랜잭션 생략 금지
- clientMutationId 없이 write API 허용 금지
- 스택 변경은 ADR 없이 금지

---

## 2) 모노레포 구조(MUST)

- apps/admin-web
- apps/store-pwa
- apps/api
- apps/storybook
- packages/tokens
- packages/ui
- packages/shared
- packages/metrics (optional)

---

## 3) 프론트 스택(MUST)

- React + TypeScript + Vite
- TanStack Query / Router / Virtual
- Zustand
- Axios
- Jest (+ React Testing Library 가능하면)

### 상태 원칙(MUST)
- 서버 상태는 TanStack Query
- UI 상태는 Zustand
- Axios instance + interceptor로 인증/에러 표준화

---

## 4) 디자인 시스템(MUST)

### packages/tokens
- primitive + semantic tokens (colors/spacing/radius/typography/shadow/zIndex)
- light/dark 지원
- CSS variables로 빌드(`dist/tokens.css`)
- TS export 제공(타입 포함)

### packages/ui
- tokens 기반 컴포넌트 라이브러리(React+TS)
- 최소 컴포넌트:
  - Button / IconButton
  - Input / Select
  - Badge / Card
  - Dialog / Tabs
  - Toast (간단)
  - Table(virtual-friendly wrapper)
  - FormField(label/error/help)
- variant/size/state(loading/disabled/error) 표준화
- 접근성 기본(focus-visible, aria, keyboard)

### apps/storybook
- @storybook/react-vite 기반
- ui 스토리 로드 + Autodocs
- 스토리 12개 이상
- interaction tests(play) 6개 이상

---

## 5) 백엔드/DB/인프라(MUST)

- NestJS + Fastify adapter
- Prisma
- PostgreSQL(Docker)
- REST + Swagger(OpenAPI)
- Auth: Access JWT(예: 15m) + Refresh(예: 14d, HttpOnly cookie)
- Idempotency: clientMutationId 필수 + DB unique로 중복 방지(동일 키면 기존 결과 반환)
- 판매/입고/조정은 트랜잭션 + row locking(가능하면 FOR UPDATE)
- 음수 재고 금지(서버 검증 + 가능하면 DB 제약)

---

## 6) 도메인 정책(MUST)

- 기존 바코드(1D)는 그대로 재사용
- 바코드 없는 제품은 커스텀 QR 스티커
  - QR은 URL/토큰 기반 권장: https://<domain>/c/<token>
- 스캔 결과는 normalize 후 단일 lookup API로 조회

### 최소 데이터 모델
- Product(id, sku, name, price, active, createdAt)
- ProductCode(id, productId, type: BARCODE_1D|CUSTOM_QR, value unique, createdAt)
- Store(id, name)
- Inventory(storeId, productId, onHand, updatedAt)
- StockMovement(id, storeId, productId, type IN|ADJUST|SALE, qty, unitPrice?, reason?, createdAt, createdBy, clientMutationId unique)
- Sale(id, storeId, totalAmount, createdAt, createdBy, clientMutationId unique)
- SaleItem(saleId, productId, qty, unitPrice, lineAmount)
- ClientMetric(id, app, name, value, unit, tags json, createdAt)

---

## 7) API(MUST)

Auth
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout

Products/Codes
- GET /products
- POST /products
- PATCH /products/:id
- POST /products/:id/codes
- GET /products/lookup?code=

Inventory
- GET /inventory

Movements
- POST /stock-movements (IN/ADJUST, clientMutationId 필수)
- GET /stock-movements

Sales
- POST /sales (clientMutationId 필수)
- GET /sales

Dashboard
- GET /dashboard/quarterly?storeId=&year=

Metrics
- POST /metrics
- GET /metrics

---

## 8) 앱 요구사항(MUST)

### Admin Web
- Products/Codes 관리(가상화 + URL 쿼리 동기화)
- Inventory(가상화)
- Movements 사이드 패널
- 라벨 생성/인쇄(@media print, 템플릿 2개 이상)
- 분기 대시보드(HTML/SVG 최소 차트)
- Metrics 조회 화면

### Store PWA
- 검색 + 스캔
  - 주력: @zxing/browser(1D+QR)
  - 옵션: BarcodeDetector 가능 시 사용
  - 폴백: 수동 입력 + 키보드 웨지 스캐너 지원
- Cart(Zustand) + 판매 확정(POST /sales)
- 입고 등록(POST /stock-movements type=IN)
- Outbox(IndexedDB): 실패 큐 저장 → 온라인 복구 재전송, 중복 방지
- Metrics 수집

---

## 9) 테스트 기준(MUST)

- packages/shared: 12개 이상(도메인/normalize/경계값)
- store-pwa Outbox: 8개 이상
- api: 8개 이상(idempotency/음수방지/동시성 최소 1)
- ui: 6개 이상(Jest+RTL)
- storybook: interaction test 6개 이상
- CI에서 test/lint/build

---

## 10) 성능/정량 지표(MUST)

- web-vitals(INP/LCP/CLS) 수집 → /metrics 전송 → DB 저장 → Admin 조회
- 커스텀 마크:
  - Store: scan_start→scan_detected, scan_detected→product_loaded, sale_click→sale_success
  - Admin: filter_change→first_rows_rendered
- 번들 사이즈 출력 스크립트(SHOULD)
- Lighthouse CI 또는 로컬 스크립트(SHOULD)

---

## 11) 시드(MUST)

- 상품 50,000개 옵션
- Inventory/Sales/Movements도 적당량 생성
- `pnpm seed` 한 번으로 완료

---

## 12) 배포(MUST)

- docker compose: nginx, api, admin-web, store-pwa, postgres (+storybook optional)
- GitHub Actions:
  - PR: test + build (+ lighthouse 가능하면)
  - main: build/push(GHCR) + deploy(SSH로 compose pull/up)
- .env.example + required secrets 문서화

---

## 13) DoD(Definition of Done)

- 기능: Admin/Store 주요 플로우 동작
- 품질: 테스트 기준 충족 + 음수재고/idempotency 보장
- 성능: 가상화 체감 + 지표 DB 저장/조회
- DS: tokens/ui/storybook 완성(Autodocs + interaction tests)
- 배포: compose 로컬 + GH Actions 배포 가이드
