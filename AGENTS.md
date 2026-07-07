# AGENTS.md — fat-loss-landing

## Build & deploy

После любых правок в `src/` (HTML, CSS, JS):
```bash
bun run build
```

Собранный сайт лежит в `dist/`. Для открытия в браузере:
```bash
open dist/index.html
```

Для деплоя на GitHub Pages — просто запушить в `main`. GitHub Actions автоматически:
1. Устанавливает bun
2. Запускает `bun install`
3. Запускает `bun run build`
4. Деплоит `dist/` на GitHub Pages

В настройках репозитория (Settings → Pages) должен быть выбран **GitHub Actions** как источник.

## Stacking context

Слои внутри section (в порядке отрисовки, снизу вверх):
- `z:0` — `.bg-img` (фоновое изображение + градиентная подложка)
- `z:1` — `.section-glow::before` (градиент + тёплое свечение)
- `z:2` — `.hero-panel::before/::after` (ambient mesh + микро-линии)
- `z:10` — контент
- `z:50` — floating island nav
- `z:60` — `.noise::after` (шум, фиксированный на весь экран)

## CSS структура

- `src/styles/base.css` — кастомные свойства (новая палитра), html/body, bg-img, section-glow, cwrap, reveal (blur + fade-up), нав, reduced-motion
- `src/styles/components.css` — double-bezel card, island CTA, tag, divider, bento-cell, pricing, hero-panel, noise (fixed), sticky-cta
- `src/input.css` — только импорты + @tailwind директивы. Импорты ДО @tailwind.

## Архитектура компонентов

- **Double-bezel card** (`.card-outer` + `.card-inner`) — вложенная архитектура: внешняя оболочка с тонким радиусом, внутреннее ядро с инсет-шадоу
- **Island CTA button** (`.cta-btn` + `.cta-icon`) — кнопка-пилюля с вложенным кружком-иконкой (button-in-button)
- **Bento cell** (`.bento-cell`) — ячейка асимметричной сетки
- **Pricing double-bezel** (`.pricing-outer` + `.pricing-inner`) — двойная оболочка для финального CTA блока
- **Floating island nav** (`.nav-island`) — откреплённый от верхнего края нав-бар с glassmorphism
- **Hero panel** (`.hero-panel`) — правая панель героя с ambient-градиентами и микро-линиями

## Sticky CTA

Нижняя плавающая CTA с градиентным скроллом (`.sticky-cta-outer`). Показывается после hero, скрывается на финале. Управляется из `main.js`.

## Дизайн-система

- Фон: `#0a0a0a`, поверхность: `#141414`, elevated: `#1e1e1e`
- Заголовки: `font-display` (Cormorant Garamond)
- Текст: Outfit (Google Fonts)
- Акцент: muted gold `#c9a97a` (`warm-v2`), muted amber `#d47b4a` (`ember`)
- Кнопки CTA: `.cta-btn` (pill, uppercase, button-in-button)
- Карточки: `.card-outer` + `.card-inner` (double-bezel)
- Теги: `.tag` (warm-v2 цвет, letter-spacing)
- Анимации: blur + translateY с кастомным cubic-bezier

## Layout-семьи (по секциям)

1. **Hero** — Asymmetric Split (текст слева, ambient панель справа)
2. **Pain** — Editorial Full-bleed (массивный фон, левый акцент)
3. **Product** — Centered Editorial (огромный шрифт, центровка на мобилке, слева на десктопе)
4. **Features** — Bento Grid (3-col асимметричная сетка, 2+1 / 1+2)
5. **Final CTA** — Double-bezel Pricing (центрированная карта с ценой)

## Eyebrow count

Максимум 2 на 5 секций: hero (tag) + features (tag). Pain, Product, Final — без eyebrow.
