---
name: skill-ui-design-system
description: UI design system rules for Tailwind, shadcn, CVA, and responsive composition.
---

# UI Design System & Styling

## Core Principle
Consistency through tokens and composition. UI scales via variants, not hardcoded classes. Mobile-first, accessible, theme-ready.

## Implementation Rules
1. **Semantic Tailwind Only**:
   - Use design tokens: `bg-primary`, `text-muted-foreground`, `border-input`, `ring-offset-background`.
   - Never use hardcoded hex/rgb or arbitrary values (`w-[123px]`, `bg-[#ff00ff]`) unless for layout hacks.
2. **CVA for Variants**:
   - Every reusable component with size/variant/state uses `class-variance-authority`.
   - Define `base`, `variants`, `compoundVariants`, `defaultVariants` explicitly.
   - Example structure: `buttonVariants({ variant: 'outline', size: 'lg', className })`.
3. **Class Merging**:
   - Always accept `className?: string`. Merge via `cn(base, variants({ ... }), className)`.
   - Use `tailwind-merge` + `clsx` in `@/lib/utils.ts`.
4. **Responsive & Touch**:
   - Mobile-first: base classes for `<640px`, `sm:`, `md:`, `lg:` for breakpoints.
   - Minimum touch target: `min-h-[44px] min-w-[44px]`.
   - Focus states: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`.
5. **Shadcn Composition**:
   - Extend primitives, don't override internals.
   - Use `Slot` from `@radix-ui/react-slot` for `asChild` polymorphism.
   - Keep `form`, `dialog`, `select`, `table` primitives separate from domain wrappers.

## Anti-Patterns
❌ `bg-blue-500`, `p-[17px]`, `text-[13px]` hardcoded.
❌ Conditional class strings: `` `${isOpen ? 'block' : 'hidden'} ${dark ? 'bg-black' : 'bg-white'}` ``.
❌ Overriding Shadcn internals with `!important` or deep CSS selectors.
❌ Ignoring `prefers-reduced-motion` and focus states.
