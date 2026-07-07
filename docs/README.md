# Шаблон: React + Telegram Bot + Express + Clean Architecture

**Template (шаблон)** — стартовая заготовка для быстрого старта проекта с вебинтерфейсом и Telegram-ботом, построенная на принципах Clean Architecture и Feature-Driven Design.

---

## 🏗 Архитектура

Проект следует [архитектурным канонам](./architecture.md). Ключевые принципы:

- **Модульность** — каждая фича изолирована в `/backend/features/{name}`
- **Низкая связанность** — общение через `/shared/types` и `/shared/utils`
- **Feature Flags** — все модули контролируемы через `/shared/constants/features.ts`
- **Однонаправленный поток данных** — UI → TanStack Query → Express → Service → Response

### Структура проекта

```
├── .cursor/rules/          # Правила для AI агентов
├── config/                 # Конфигурационные объекты (без секретов)
├── ai/                     # AI модуль (провайдеры, модели)
├── shared/                 # Общий слой (frontend ↔ backend)
│   ├── types/              # TypeScript interfaces
│   ├── utils/              # Pure functions (logger, validators)
│   └── constants/          # Общие константы
├── backend/                # Backend (Express + Grammy)
│   ├── init.ts             # Точка входа (feature-driven)
│   ├── routes.ts           # Регистрация маршрутов
│   └── features/           # Фичи по модулям
│       ├── telegram/       # Telegram Bot и UserBot
│       ├── cron/           # Cron задачи
│       └── {feature}/      # Другие фичи
├── frontend/               # Frontend (React + TanStack)
│   └── src/
│       ├── components/     # React компоненты
│       ├── routes/         # TanStack Router маршруты
│       ├── hooks/          # Custom hooks (useApi)
│       ├── data/           # Data layer (TanStack Query)
│       └── lib/            # Утилиты (GSAP и др.)
├── prisma/                 # Схема БД и миграции
└── docs/                   # Документация
    ├── architecture.md     # Архитектурные каноны
    ├── refactoring/        # Задачи по улучшению
    ├── upgrades/           # План миграций
    └── archive/            # Архив устаревших документов
```

### Кратко

| Папка               | Назначение                                            |
| ------------------- | ----------------------------------------------------- |
| `shared/constants/` | Feature flags, лимиты, маршруты — блок управления     |
| `config/`           | Конфигурация модулей (БД, AI, Telegram, сервер)       |
| `ai/`               | AI провайдеры (OpenAI, Ollama), маппинг задач         |
| `shared/`           | Общие типы, утилиты, константы для frontend и backend |
| `backend/`          | Express API, Telegram Bot/Cron, фичи                  |
| `frontend/`         | React + TanStack Query/Router, GSAP анимации          |
| `prisma/`           | База данных (PostgreSQL)                              |
| `docs/`             | Документация проекта, архитектурные каноны            |

---

## 🚀 Быстрый старт

### Установка зависимостей

```bash
bun install
```

### Запуск в development режиме

```bash
bun run dev
```

- **Фронтенд:** http://localhost:3000
- **Бэкенд:** http://localhost:4000

### Сборка для продакшена

```bash
bun run build
```

### Запуск в продакшене

```bash
bun run start
```

---

## 🛠 Стек технологий

### Frontend

- **React 19** + TypeScript
- **TanStack Router** — маршрутизация
- **TanStack Query** — управление асинхронными данными (❌ Redux запрещён)
- **Tailwind CSS** + **shadcn/ui** — стилизация
- **GSAP** — сложные анимации
- **Vite** — сборка

### Backend

- **Express 5** + TypeScript
- **Bun** — runtime
- **Prisma 7** — ORM для PostgreSQL
- **grammY** — Telegram Bot
- **GramJS** — Telegram UserBot
- **node-cron** — планировщик задач

### AI

- **Vercel AI SDK** (`ai`, `@ai-sdk/openai`) — единый интерфейс
- **OpenAI API** — основной провайдер через SDK
- **Ollama** — локальный fallback через SDK

### База данных

- **PostgreSQL** — production
- **Prisma Migrate** — миграции

---

## ⚙️ Конфигурация

### Feature Flags

Все модули контролируются через `/shared/constants/features.ts`:

```typescript
export const FEATURES = {
    ENABLE_AI: true,
    ENABLE_TELEGRAM_BOT: true,
    ENABLE_TELEGRAM_USERBOT: false,
    ENABLE_CRON: true,
} as const;
```

### Переменные окружения

Создайте `.env` в корне проекта:

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_API_ID=your_api_id
TELEGRAM_API_HASH=your_api_hash
TELEGRAM_PHONE=+79999999999

# AI (опционально)
OPENAI_API_KEY=your_openai_key
OPENAI_API=https://api.openai.com/v1

# Server
PORT=4000
NODE_ENV=development
```

Смотрите [`.env.example`](../.env.example) для полного списка переменных.

---

## 📚 Документация

- [**Архитектурные каноны**](./architecture.md) — целевая структура и правила
- [**Деплой**](./DEPLOY.md) — развёртывание на сервере
- [**Package Info**](./package-info.md) — разделение зависимостей
- [**Refactoring: Redux → TanStack Query**](./refactoring/redux-to-tanstack.md) — миграция

---

## 📐 Правила разработки

### Стандарты кода

- **TypeScript strict mode** — без `any`
- **Файлы ≤200 строк** — разделять на модули
- **Функции ≤50 строк** — рефакторить
- **Глубина импортов ≤3 уровней**
- **Без магических чисел** — выносить в `/shared/constants/` или `/config/`
- **Logger вместо console.log** — использовать `@/shared/utils/logger`

### Именование

- **Английский язык** — без транслита
- **camelCase** — переменные и функции
- **PascalCase** — типы, интерфейсы
- **UPPER_CASE** — константы

### Комментарии

- **На русском** в ключевых местах
- Объясняют «почему», а не «что»

---

## 🔄 Процесс разработки

### Спринт 0: Подготовка

- [x] Инициализация проекта
- [x] Настройка TypeScript
- [x] Создание структуры папок
- [x] Feature flags система
- [x] Централизованная конфигурация
- [x] `.cursor/rules/` для AI

### Спринт 1: База данных

- [ ] Prisma schema
- [ ] Миграции

### Спринт 2+: Основная логика

- [ ] Модули по фичам
- [ ] Интеграция
- [ ] Тестирование

Смотрите [архитектурные каноны](./architecture.md) для полного плана.

---

## 🎯 Использование как шаблона

Этот проект — template для новых проектов. Для использования:

1. Скопируйте репозиторий
2. Заполните `.env` по примеру `.env.example`
3. Запустите `bun install`
4. Настройте feature flags в `/shared/constants/features.ts`
5. Создайте фичи в `/backend/features/{name}`
6. Следуйте [архитектурным канонам](./architecture.md)

---

**Версия:** 2.0
**Дата:** 2026-04-14
**Лицензия:** MIT
