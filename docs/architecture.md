# Архитектурные каноны проекта

> **Версия:** 3.0 (Monorepo)
> **Дата:** 2026-04-23
> **Статус:** КАНОН — не менять без обсуждения

---

## 📁 Структура проекта (Monorepo)

```
bun-modular-starter/
├── apps/                           # ТОЧКИ ВХОДА
│   ├── bot/                       # Telegram Bot (grammY)
│   │   ├── src/
│   │   │   ├── index.ts          # Entry point
│   │   │   ├── context.ts        # Типизация контекста
│   │   │   ├── scenes/          # Сценарии
│   │   │   ├── commands/        # Обработчики команд
│   │   │   └── middlewares/     # Мидлвары
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── web/                      # Frontend (React + Vite)
│   │   ├── src/
│   │   │   ├── app/             # Root component
│   │   │   ├── features/       # Фичи по доменам
│   │   │   ├── entities/        # Бизнес-сущности
│   │   │   ├── shared/          # UI-кит, хуки
│   │   │   └── routes.tsx      # Маршрутизация
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── api/                      # Backend API (Express)
│   │   ├── backend/
│   │   │   ├── init.ts         # Entry point
│   │   │   ├── app.ts         # Express instance
│   │   │   ├── modules/       # Модули по доменам
│   │   │   └── middlewares/   # Auth, validation
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── worker/                   # Background jobs
│       ├── src/
│       └── package.json
│
├── packages/                     # ОБЩИЕ БИБЛИОТЕКИ
│   ├── config/                 # Конфигурация (Zod)
│   │   └── src/
│   ├── db/                    # Prisma
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/
│   ├── shared/               # Утилиты, типы
│   │   └── src/
│   ├── auth/                # Аутентификация
│   │   └── src/
│   └── core/                # AI модуль
│       ├── ai/
│       │   ├── providers/
│       │   └── models/
│       └── src/
│
├── scripts/                    # Утилиты
├── docs/                     # Документация
├── .cursor/rules/            # Правила для AI
├── .env                     # Секреты
├── bunfig.toml              # Workspace настройка
└── package.json           # Root скрипты
```

---

## 🎯 Принципы

| Принцип          | Реализация                    | Запрещено              |
| ---------------| ---------------------------- | ---------------------- |
| **Модульность**| Каждый app/package независим  | Смешивание фич        |
| **Алиасы**     | `@config/*`, `@db/*`, `@shared/*` | Прямые относительные пути |
| **Feature Flags** | В `packages/shared/src/constants/features.ts` | Hardcoded |
| **Типобезопасность** | strict TypeScript | `any` |

---

## 🔄 Поток данных

### Web → API
```
[React] → [TanStack Query] → [Express] → [Service] → [Prisma/AI]
```

### Bot
```
[Telegram Update] → [grammY] → [Handler] → [Service] → [Prisma/AI]
```

---

## 🛠 Технологический стек

- **Bun** — runtime, package manager
- **React 19** + TypeScript
- **TanStack Router/Query** — маршрутизация и данные
- **Express 5** + TypeScript
- **Prisma 7** — ORM
- **Vercel AI SDK** — AI
- **grammY** — Telegram Bot

---

## 🚫 Запрещено

1. ❌ Redux, MobX — только TanStack Query
2. ❌ Файлы >200 строк
3. ❌ Функции >50 строк
4. ❌ `any` — использовать `unknown`
5. ❌ Транслит в именовании
6. ❌ Hardcoded secrets — через `.env`
7. ❌ `console.log` — использовать logger
8. ❌ Прямые fetch к AI API — только Vercel SDK

---

## ✅ Best Practices

1. ✅ Workspace алиасы через bunfig.toml
2. ✅ Feature flags для всех модулей
3. ✅ Строгий TypeScript
4. ✅ Early returns
5. ✅ Комментарии на русском в ключевых местах

---

## 📝 Правила для AI

1. Прочитать `.cursor/rules/00-pre-check.md`
2. Следовать `.cursor/rules/01-structure.md`
3. Использовать `.cursor/rules/02-coding.md`
4. Документировать в `docs/refactoring/`