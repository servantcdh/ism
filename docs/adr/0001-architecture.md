# ADR-0001: Architecture & Stack

## Status
Accepted

## Context
- 목표: TDD/성능/정량지표/디자인시스템 경험을 “실사용 가능한 포트폴리오”로 축적
- 프론트 직군이 주도하므로 LLM 바이브코딩에 유리한 정형 구조가 필요

## Decision
- Front: React/Vite, TanStack Query/Router/Virtual, Zustand, Axios, Jest
- Design System: packages/tokens + packages/ui + apps/storybook(autodocs + interaction tests)
- Backend: NestJS(Fastify) + Prisma
- DB: PostgreSQL
- Deploy: GitHub Actions → GHCR → Home server Docker Compose

## Consequences
- 장점: 정형 구조/타입 안정성/운영 용이, DS/지표/성능 어필이 명확
- 단점: 초기 세팅량 증가, Storybook 유지 비용 존재
