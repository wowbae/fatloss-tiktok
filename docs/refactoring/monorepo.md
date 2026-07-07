Добавить nginx config в проект

Отлично. Делаем **универсальный шаблон** (boilerplate), который можно клонировать под любой новый проект: бот, веб-сервис, AI-платформа, маркетплейс — что угодно.

Назовём его: **`bun-modular-starter`**

---

## 📦 Универсальная структура проекта (Monorepo Workspaces)

```
bun-modular-starter/
│
├── apps/                           # ТОЧКИ ВХОДА: независимые приложения
│   ├── bot/                        # Telegram/Chat bot (GrammyJS/Telegraf)
│   │   ├── src/
│   │   │   ├── index.ts           # Entry point: инициализация бота
│   │   │   ├── context.ts         # Расширенный Context для типизации
│   │   │   ├── scenes/            # Сценарии диалога (Conversations)
│   │   │   ├── commands/          # Обработчики команд (/start, /help)
│   │   │   ├── middlewares/       # Глобальные мидлвары (logging, rate-limit)
│   │   │   └── config.ts          # Локальные настройки бота
│   │   ├── package.json           # Зависимости только для бота
│   │   └── tsconfig.json          # TS-настройки, наследуют корневые
│   │
│   ├── web/                        # Frontend (React + Vite + shadcn + TanStack)
│   │   ├── src/
│   │   │   ├── main.tsx           # Entry point: рендер приложения
│   │   │   ├── app/               # Root component + providers
│   │   │   ├── features/          # Фичи по доменам (auth, dashboard, settings)
│   │   │   ├── entities/          # Бизнес-сущности (User, Order, Product)
│   │   │   ├── shared/            # UI-кит, хуки, утилиты (локальные для веба)
│   │   │   ├── lib/               # API-клиенты, query-ключи, адаптеры
│   │   │   └── routes.tsx         # Маршрутизация (React Router)
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── api/                        # Backend API (Express/Fastify + REST/GraphQL)
│   │   ├── src/
│   │   │   ├── index.ts           # Entry point: запуск сервера
│   │   │   ├── app.ts             # Настройка Express/Fastify instance
│   │   │   ├── modules/           # Модули по доменам (users, orders, payments)
│   │   │   │   └── [module]/
│   │   │   │       ├── controller.ts  # HTTP-обработчики
│   │   │   │       ├── service.ts     # Бизнес-логика
│   │   │   │       ├── repository.ts  # Работа с БД
│   │   │   │       └── schema.ts      # Zod-валидация запросов/ответов
│   │   │   ├── middlewares/       # Auth, error-handler, validation
│   │   │   ├── lib/               # Swagger, rate-limit, cors настройки
│   │   │   └── config.ts          # Локальные настройки API
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── worker/                     # Background jobs (queues, cron, AI-tasks)
│       ├── src/
│       │   ├── index.ts           # Entry point: запуск воркера
│       │   ├── jobs/              # Определения задач (image-gen, email, sync)
│       │   ├── processors/        # Логика выполнения задач
│       │   ├── queues/            # Настройка очередей (BullMQ/Redis)
│       │   └── config.ts          # Настройки воркера
│       ├── package.json
│       └── tsconfig.json
│
├── packages/                       # ОБЩИЕ БИБЛИОТЕКИ: переиспользуемый код
│   ├── config/                     # 🎛 Конфигурация и валидация окружения
│   │   ├── src/
│   │   │   ├── env.ts             # Zod-схема для process.env
│   │   │   ├── app.ts             # Общие настройки приложения (timeouts, limits)
│   │   │   ├── features.ts        # Feature-flags, A/B тесты
│   │   │   └── index.ts           # Экспорты
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── db/                         # 🗄 Слой работы с данными (Prisma)
│   │   ├── prisma/
│   │   │   ├── schema.prisma      # Схема БД, модели, миграции
│   │   │   ├── migrations/        # История миграций (авто)
│   │   │   └── seeds/             # Сиды для тестов/демо
│   │   ├── src/
│   │   │   ├── client.ts          # Инициализация PrismaClient
│   │   │   ├── repositories/      # Базовые репозитории (CRUD)
│   │   │   └── index.ts           # Экспорты
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared/                     # 🔧 Кросс-каттинг утилиты
│   │   ├── src/
│   │   │   ├── types/             # Глобальные TypeScript типы (Result, UUID)
│   │   │   ├── errors/            # Классы ошибок (AppError, ValidationError)
│   │   │   ├── logger/            # Единый логгер (pino/winston wrapper)
│   │   │   ├── utils/             # Pure functions (formatDate, slugify)
│   │   │   ├── constants/         # Глобальные константы (HTTP_STATUS, ROLES)
│   │   │   └── index.ts           # Экспорты
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── auth/                       # 🔐 Аутентификация и авторизация (опционально)
│   │   ├── src/
│   │   │   ├── strategies/        # JWT, OAuth, Telegram Auth стратегии
│   │   │   ├── guards/            # Middleware для защиты роутов
│   │   │   ├── services/          # Логика выдачи/проверки токенов
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── core/                       # 🧠 Доменные абстракции (интерфейсы)
│       ├── src/
│       │   ├── ports/             # Интерфейсы для внешних сервисов (Storage, AI, Payment)
│       │   ├── usecases/          # Бизнес-правила (CreateOrder, GenerateContent)
│       │   ├── events/            # Доменные события (UserCreated, PaymentCompleted)
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── scripts/                        # 🛠 Утилиты для разработки и деплоя
│   ├── setup.sh                   # Инициализация проекта (copy .env, install)
│   ├── migrate.ts                 # Обёртка над prisma migrate для всех аппов
│   ├── seed.ts                    # Сидинг БД тестовыми данными
│   └── typecheck-all.ts          # Параллельная проверка типов во всех пакетах
│
├── .env.example                   # Шаблон переменных окружения (комментировать каждую)
├── .gitignore                     # Игноры: node_modules, .env, dist, .DS_Store
├── bunfig.toml                    # Настройка Bun workspaces и алиасов
├── package.json                   # 🔥 Root: workspace scripts и зависимости
├── tsconfig.json                  # Базовый TS-конфиг (наследуется везде)
├── tsconfig.node.json             # TS-конфиг для серверных пакетов
├── tsconfig.react.json            # TS-конфиг для React-приложений
└── README.md                      # Документация шаблона: как форкнуть, настроить, запустить
```

---

## ⚙️ Ключевые файлы шаблона

### `bunfig.toml` (настройка workspaces и алиасов)
```toml
[install]
workspaces = ["apps/*", "packages/*"]

# Алиасы для удобных импортов (работают в Bun нативно)
[resolve]
"@config/*" = ["packages/config/src/*"]
"@db/*" = ["packages/db/src/*"]
"@shared/*" = ["packages/shared/src/*"]
"@auth/*" = ["packages/auth/src/*"]
"@core/*" = ["packages/core/src/*"]
```

### `tsconfig.json` (базовый конфиг)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": ".",
    "paths": {
      "@config/*": ["packages/config/src/*"],
      "@db/*": ["packages/db/src/*"],
      "@shared/*": ["packages/shared/src/*"],
      "@auth/*": ["packages/auth/src/*"],
      "@core/*": ["packages/core/src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### `.env.example` (шаблон с комментариями)
```bash
# === ENVIRONMENT ===
NODE_ENV=development  # development | staging | production

# === SERVER ===
PORT=3000             # Порт для API/ботов

# === DATABASE ===
DATABASE_URL=postgresql://user:pass@localhost:5432/db  # Строка подключения

# === TELEGRAM (если используется бот) ===
TELEGRAM_BOT_TOKEN=   # Токен от @BotFather

# === AI PROVIDERS (пример, подключаются по необходимости) ===
AI_PROVIDER=replicate  # replicate | fal | stability
REPLICATE_API_KEY=
FAL_API_KEY=

# === STORAGE ===
TEMP_STORAGE_TTL_HOURS=24  # Время жизни временных файлов
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=

# === PAYMENTS ===
PAYMENT_PROVIDER=telegram  # telegram | yookassa | stripe
YOOKASSA_SHOP_ID=
YOOKASSA_SECRET_KEY=

# === FEATURE FLAGS ===
ENABLE_VIDEO_GEN=false     # Включить генерацию видео
ENABLE_CUSTOM_PROMPTS=true # Разрешить кастомные промпты
```

---

## 🚀 Root `package.json` — скрипты для запуска

```json
{
  "name": "bun-modular-starter",
  "version": "0.1.0",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "type": "module",
  "scripts": {
    "🔧 Setup": "",
    "setup": "bun run scripts/setup.sh",

    "🏃 Development": "",
    "dev": "bun run dev:all",
    "dev:all": "bun run --bun scripts/concurrent.mjs",
    "dev:bot": "bun run --filter bot dev",
    "dev:web": "bun run --filter web dev",
    "dev:api": "bun run --filter api dev",
    "dev:worker": "bun run --filter worker dev",

    "🔨 Build": "",
    "build": "bun run build:all",
    "build:all": "bun run --filter '*' build",
    "build:bot": "bun run --filter bot build",
    "build:web": "bun run --filter web build",
    "build:api": "bun run --filter api build",

    "✅ Quality": "",
    "typecheck": "bun run --filter '*' typecheck",
    "lint": "bun run --filter '*' lint",
    "format": "bun run --filter '*' format",
    "test": "bun run --filter '*' test",

    "🗄 Database": "",
    "db:generate": "bun run --filter db prisma generate",
    "db:push": "bun run --filter db prisma db push",
    "db:migrate": "bun run --filter db prisma migrate dev",
    "db:seed": "bun run scripts/seed.ts",

    "🧹 Cleanup": "",
    "clean": "rm -rf apps/*/dist packages/*/dist && find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +",
    "clean:cache": "bunx rimraf .bun node_modules apps/*/node_modules packages/*/node_modules"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.11.0",
    "prisma": "^5.10.0",
    "eslint": "^8.57.0",
    "prettier": "^3.2.5"
  },
  "dependencies": {
    "zod": "^3.22.4"
  }
}
```

---

## 🔥 Скрипт для запуска всех приложений в одном терминале

Создай файл `scripts/concurrent.mjs` (нативный ES-module для Bun):

```js
// scripts/concurrent.mjs
// Запускает все активные приложения параллельно в одном терминале
// Автоматически пропускает пустые папки в apps/

import { $ } from 'bun';
import { readdir } from 'fs/promises';
import { join } from 'path';

const APPS_DIR = './apps';

async function getActiveApps() {
  const apps = await readdir(APPS_DIR, { withFileTypes: true });
  const active = [];

  for (const app of apps) {
    if (app.isDirectory()) {
      const pkgPath = join(APPS_DIR, app.name, 'package.json');
      try {
        const pkg = await import(pkgPath, { with: { type: 'json' } });
        if (pkg.default?.scripts?.dev) {
          active.push(app.name);
        }
      } catch {
        // Нет package.json или скрипта dev — пропускаем
      }
    }
  }
  return active;
}

async function main() {
  const apps = await getActiveApps();

  if (apps.length === 0) {
    console.log('⚠️  Нет активных приложений с скриптом "dev" в папке apps/');
    process.exit(0);
  }

  console.log(`🚀 Запускаю ${apps.length} приложение(ий): ${apps.join(', ')}\n`);

  // Запускаем все процессы в фоне с цветным префиксом
  const processes = apps.map(app =>
    $`bun run --filter ${app} dev`
      .stdout('inherit')
      .stderr('inherit')
      .quiet()
  );

  // Ждём завершения любого из процессов (если один упал — останавливаем все)
  await Promise.any(processes);

  console.log('\n⚠️  Один из процессов завершился. Останавливаю все...');
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Ошибка запуска:', err);
  process.exit(1);
});
```

### Как это работает:
- `bun run dev:all` → автоматически находит все `apps/*` с `scripts.dev`
- Запускает их параллельно в одном терминале с общим выводом
- Если один процесс падает — скрипт завершается (чтобы не висели зомби-процессы)
- Цветной вывод сохраняется (Bun пробрасывает stdout/stderr)

### Альтернатива (проще, без JS-скрипта):
Если хочешь ещё проще — добавь в `package.json`:

```json
"dev:all": "bun run dev:bot & bun run dev:api & bun run dev:web & wait"
```

Но это менее гибко: нужно вручную перечислять аппы и не работает на Windows без `concurrently`.

---

## 📋 Чеклист: как использовать шаблон для нового проекта

1.  **Клонируй шаблон**:
    ```bash
    bun create git@github.com:your-org/bun-modular-starter.git my-new-project
    cd my-new-project
    ```

2.  **Запусти настройку**:
    ```bash
    bun run setup
    # Скопирует .env.example → .env, установит зависимости
    ```

3.  **Настрой под задачу**:
    - Удали ненужные `apps/*` (например, если не нужен `worker`)
    - Добавь свои пакеты в `packages/`
    - Отредактируй `.env` под свои API-ключи

4.  **Запусти разработку**:
    ```bash
    bun run dev          # Все приложения сразу
    # или
    bun run dev:bot      # Только бот
    ```

5.  **Добавь фичу**:
    - Новый тип в `packages/shared/src/types/`
    - Новый модуль в `apps/api/src/modules/`
    - Новый сценарий в `apps/bot/src/scenes/`

---

## ✅ Преимущества этого шаблона

| Что даёт | Как реализовано |
|----------|----------------|
| **Быстрый старт** | `bun run setup` → готовый проект за 30 секунд |
| **Единая конфигурация** | `@config/env` валидирует все переменные через Zod |
| **Типобезопасность** | Общие типы из `@shared/types` импортируются везде |
| **Гибкость** | Удаляй/добавляй `apps/*` без ломки архитектуры |
| **Масштабируемость** | Любой `apps/*` можно вынести в отдельный репо/сервис |
| **Нет дублирования** | Логика БД, конфиги, утилиты — в `packages/*` |
| **Один терминал** | `bun run dev:all` через `concurrent.mjs` |

---

## 🎁 Бонус: минимальный пример импорта общего конфига

**В `apps/bot/src/index.ts`:**
```ts
import { env } from '@config/env';
import { logger } from '@shared/logger';

logger.info(`Запускаю бота в режиме ${env.NODE_ENV}`);
```

**В `apps/web/src/lib/api.ts`:**
```ts
import { env } from '@config/env';

export const API_BASE = env.NODE_ENV === 'production'
  ? 'https://api.example.com'
  : `http://localhost:${env.PORT}`;
```

**В `apps/api/src/modules/users/service.ts`:**
```ts
import { prisma } from '@db/client';
import { AppError } from '@shared/errors';

export const UserService = {
  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError('User not found', 404);
    return user;
  }
};
```

---

## 🚀 Что дальше?

Этот шаблон — **готовая основа**. Теперь доделаем:

0. Добавить `.gitignore`, `README.md` и `LICENSE`
1.  **Для каждого нового проекта**: `bun create your-org/starter new-project`
2.  **Настраивать за 5 минут**: удалить лишнее, добавить доменную логику
3. добавить в качестве комментария в файле заготовки для аутентификации либу https://better-auth.com/docs/plugins/magic-link?utm_source=perplexity
4. Подготовлю `scripts/setup.sh` для автоматической инициализации
