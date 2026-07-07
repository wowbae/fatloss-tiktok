# Промты для генерации фонов

**Единый стиль:** Apple product photography, pure black background, один объект в вакууме, clean studio lighting, минимализм
**Модель:** `recraftv3`
**Стиль Recraft:** `Product photo`
**Цветовая схема:** Акцент #FF6B35, чёрный #000, белый #FFF, серый #F5F5F7
**Соотношение:** 9:16
**Формат:** WebP, max 200 KB

---

## Экран 1 — Hero

> **Не генерируется.**

---

## Экран 2 — Боль (Emotional Trigger)

**Концепция:** Сантиметровая лента на чёрном фоне. Композиция: объект справа, слева пустое тёмное пространство для текста.

**Параметры Recraft:**
```json
{
  "model": "recraftv3",
  "image_size": "9:16",
  "style": "Product photo",
  "n": 1
}
```

**Промт:**

> A yellow tailor measuring tape curled and tangled, placed in the RIGHT third of the frame. Left two-thirds is pure black empty negative space for text. Single dramatic studio light from above-right, creating a sharp metallic highlight on the curled tape edge. Deep black void surrounding. Asymmetric composition, Apple product photography, ultra-minimalist, clean. 9:16.

---

## Экран 3 — Книга (The Book)

**Концепция:** Книга в правой части кадра, слева тёмная пустая зона под текст. Премиально, чисто.

**Параметры Recraft:**
```json
{
  "model": "recraftv3",
  "image_size": "9:16",
  "style": "Product photo",
  "n": 1
}
```

**Промт:**

> A premium hardcover book positioned in the RIGHT third of the frame, angled slightly with the spine facing left. Left two-thirds is empty pure black negative space for text. Dark charcoal cover with warm gold foil typography. Single precise studio light from the left, creating a clean gradient and rim light on the right edge. Asymmetric composition, Apple product photography aesthetic, ultra-clean, minimal. 9:16.

---

## Экран 4 — Ценность (Features / Lifestyle)

**Концепция:** Половина граната в правом нижнем углу. Слева и сверху пустое тёмное пространство для текста.

**Параметры Recraft:**
```json
{
  "model": "recraftv3",
  "image_size": "9:16",
  "style": "Product photo",
  "n": 1
}
```

**Промт:**

> Half a fresh pomegranate cut crosswise, placed in the BOTTOM-RIGHT corner of the frame. Top-left area is pure black empty negative space for text. Extreme close-up — only part of the fruit visible. Ruby-red seeds glistening, one seed catching a bright studio highlight. Single precise light from above-left. Asymmetric composition, Apple product photography, ultra-minimalist food still life. 9:16.

---

## Экран 5 — Финальный CTA (Portrait)

**Концепция:** Портрет справа, лицо развёрнуто влево. Слева пустое пространство для текста.

**Параметры Recraft:**
```json
{
  "model": "recraftv3",
  "image_size": "9:16",
  "style": "Product photo",
  "n": 1
}
```

**Промт:**

> Tight portrait of a confident athletic woman in her 30s, positioned in the RIGHT third of the frame, facing left. Left two-thirds is pure black empty negative space for text overlay. Warm studio rim light tracing her jawline and shoulder from the left, the rest in deep shadow. Natural radiant skin, genuine slight smile. Asymmetric composition, Apple campaign aesthetic, clean editorial portrait. 9:16.

---

## Технические требования

| Параметр | Значение |
|---|---|
| Модель | Recraft `recraftv3` |
| Стиль | `Product photo` |
| Формат | WebP (Lossless или Quality 85) |
| Размер | 480×854 px (mobile) + 2x retina 960×1708 |
| Max вес | 200 KB на файл |
| Имена файлов | `bg-pain.webp`, `bg-book.webp`, `bg-features.webp`, `bg-portrait.webp` |
| Путь | `src/assets/` |

> **Важно:** `recraftv4_1` и `recraftv4_1_pro` НЕ поддерживают `input_style_id`. Использовать только `recraftv3` для применения стиля.
> После генерации заменить placeholder-градиенты в `src/index.html` на `<img>` теги с загрузчиком и scrim-наложением.
