# PRE-PRD: Технический каркас проекта

## Роль документа

Этот документ фиксирует практический baseline проекта: стек, архитектурные ограничения и обязательные правила для разработки и AI-агентов. Документ должен отражать реальное состояние репозитория без шаблонных абстракций.

## Технологический стек (обязательный)

- Frontend: React + TypeScript + TanStack Router + TanStack Query + Tailwind + shadcn/ui
- Backend: Express + TypeScript
- Database: Prisma + PostgreSQL
- Bots: grammY (бот), GramJS (userbot)
- Runtime / toolchain: Bun
- AI: Vercel AI SDK (`ai`, `@ai-sdk/openai`) с fallback-провайдерами

## Ключевые архитектурные решения

1. Единый слой общих констант: `shared/constants/` (для frontend и backend).
2. Backend-код расположен в `backend/`, а не в абстрактном `src/`.
3. Frontend-данные работают через TanStack Query; Redux/RTK Query не используются.
4. Конфигурация централизована в `config/`, секреты хранятся только в `.env`.
5. Общие типы/утилиты находятся в `shared/types` и `shared/utils`.

## Целевая структура

```text
project-root/
├── .cursor/rules/
├── ai/
├── backend/
├── config/
├── docs/
│   ├── refactoring/
│   ├── upgrades/
│   └── archive/
├── frontend/
│   └── src/
├── prisma/
├── shared/
│   ├── constants/
│   ├── types/
│   └── utils/
├── .env
├── .env.example
└── package.json
```

## Нормы разработки

1. Только TypeScript strict mode, без `any`.
2. Только Bun-команды (`bun install`, `bun run`, `bunx ...`).
3. Никаких RTK Query/Redux/MobX.
4. Однонаправленный поток данных: UI -> Query -> API -> Service -> Prisma/AI -> UI.
5. Магические значения выносить в `shared/constants` или `config`.
6. Ошибки обрабатывать на границах модулей с логированием контекста.
7. Дизайн frontend собирать через дизайн-токены/переменные (цвета, скругления, шрифты, отступы), избегая хардкода значений в компонентах.

## Требования к документации

1. `docs/refactoring/` — активные технические улучшения.
2. `docs/upgrades/` — заметки по миграциям и апгрейдам.
3. `docs/archive/` — устаревшие документы и закрытые правила.

## Definition of Done для изменений

1. Код соответствует текущей структуре проекта.
2. Нет ссылок на удалённые/legacy-подсистемы.
3. TypeScript-проверка проходит (`backend` и `frontend`).
4. Документация обновлена, если менялась архитектура или процесс.
