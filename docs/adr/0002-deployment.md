# ADR-0002: Deployment on Home Server (Docker) via GH Actions

## Status
Accepted

## Context
- 배포 목표: main 브랜치 머지 시 자동 배포
- 홈서버에서 Docker Compose로 운영
- DB 볼륨 유지 + 백업 가이드 필요

## Decision
- CI: PR에서 test/lint/build 수행
- CD: main에서 Docker 이미지 빌드 → GHCR push → SSH로 홈서버 접속하여 compose pull/up
- Reverse proxy: nginx
- DB: postgres volume 유지
- 백업: pg_dump(예: cron) 가이드 제공

## Consequences
- 장점: 단순/안정, 포트폴리오에 “운영 경험” 어필 가능
- 단점: SSH 키/시크릿 관리 필요, 홈서버 장애 시 자동 복구 한계
