# fat-loss-landing

Mobile-first лендинг для продажи электронной книги по похудению. Apple-минимализм, целевой рынок — Азербайджан (Баку).

## Стек

- **HTML5** + **Tailwind CSS v3** (PostCSS) + **Vanilla JS** — без JS-фреймворков
- **Bun** — пакетный менеджер и запуск скриптов
- **Intersection Observer API** — scroll-анимации без библиотек

## Быстрый старт

```bash
bun install          # установить зависимости
bun run dev          # запустить Tailwind в --watch (генерит src/assets/styles.css)
open src/index.html  # открыть лендинг в браузере
```

## Команды

| Команда | Действие |
|---|---|
| `bun run dev` | Tailwind в watch-режиме → `src/assets/styles.css` |
| `bun run build` | Минифицированная сборка в `dist/` |
| `bun run preview` | Сборка + открытие `dist/index.html` |
| `bun run clean` | Удалить `dist/` |

## Структура

```
fat-loss-landing/
├── docs/prd/            # PRD и исходные документы
├── src/
│   ├── assets/          # Сгенерированный CSS (gitignored)
│   ├── index.html       # 5 экранов лендинга
│   ├── input.css        # Tailwind directives + дизайн-токены, анимации, book mockup
│   └── main.js          # Intersection Observer + sticky CTA
├── dist/                # Продакшн-сборка (gitignored)
├── tailwind.config.js   # Дизайн-токены (цвета, шрифты, тайминги)
├── postcss.config.js
└── package.json
```

## Дизайн-решения

- **Палитра:** `ink` (#000), `paper` (#FFF), `mist` (#F5F5F7), `accent` (#FF6B35 — тёплый коралл для CTA)
- **Шрифты:** Inter (основной) + Cormorant italic (акцидентный антиквенный контраст на экранах боли и финала)
- **Анимации:** emotion-driven — `ease-out-expo`, blur-in для драматичных заголовков, scale-in для продукта, staggered fade для списков
- **Текстуры:** noise overlay (inline SVG) на чёрных экранах, gradient mesh на белом, grid pattern на сером
- **Доступность:** `prefers-reduced-motion`, focus-visible ring, touch-target ≥ 44px, семантический HTML

## Что заменить перед продакшеном

- `[Имя Блогера]` → реальное имя (4 места в `src/index.html`)
- `29 AZN` → реальная цена
- Placeholder-градиенты → реальные фото (экраны 1 и 5) и обложка книги (экран 3) в WebP
- `href="#"` на финальной CTA → ссылка на платёжную форму
