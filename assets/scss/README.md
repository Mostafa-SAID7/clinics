# ClinicHub SASS Architecture

## 📁 Structure

```
scss/
├── _variables.scss          # Design tokens & configuration
├── _mixins.scss             # Reusable SASS mixins
├── _base.scss               # Reset & base styles
├── _utilities.scss          # Utility classes
├── components/
│   ├── _buttons.scss        # Button components
│   ├── _navigation.scss     # Header & navigation
│   ├── _hero.scss           # Hero sections
│   ├── _cards.scss          # Card components
│   ├── _forms.scss          # Form elements
│   ├── _footer.scss         # Footer
│   ├── _theme-controls.scss # Theme & language controls
│   ├── _chat.scss           # AI chat widget
│   ├── _toast.scss          # Toast notifications
│   └── _animations.scss     # Keyframes & animations
└── main.scss                # Main entry point
```

## 🎨 Design System

### Microsoft Fluent Design Principles

1. **Acrylic Material** - Translucent surfaces with blur
2. **Fluent Shadows** - Depth-based shadow system
3. **Smooth Animations** - Cubic-bezier transitions
4. **Responsive Typography** - Fluid font sizes using clamp()
5. **Modern Color Palette** - Primary, secondary, accent colors

### Breakpoints

- **xs**: 375px (Small phones)
- **sm**: 576px (Phones)
- **md**: 768px (Tablets)
- **lg**: 992px (Small laptops)
- **xl**: 1200px (Desktops)
- **xxl**: 1400px (Large screens)

## 🛠️ Usage

### Compile SASS

```bash
# Install dependencies
npm install

# One-time compilation (compressed)
npm run sass

# Watch mode (expanded, for development)
npm run sass:watch

# Watch mode with source maps
npm run sass:dev
```

### Using Mixins

```scss
// Responsive breakpoints
.element {
  @include respond-to(md) {
    // Styles for tablets and up
  }
  
  @include respond-below(md) {
    // Styles for mobile only
  }
}

// Acrylic effect
.card {
  @include acrylic(0.7, 30px);
}

// Fluent shadow
.button {
  @include fluent-shadow(8);
}

// Hover lift effect
.card {
  @include hover-lift(-4px, 16);
}

// Grid auto-fit
.grid {
  @include grid-auto-fit(280px, $spacing-lg);
}
```

### Using Variables

```scss
// Colors
color: $color-primary;
background: $color-gray-100;

// Spacing
padding: $spacing-lg;
margin: $spacing-2xl;

// Typography
font-size: $font-size-xl;
font-weight: $font-weight-bold;

// Shadows
box-shadow: $shadow-8;

// Border radius
border-radius: $border-radius-lg;
```

## 🎯 Best Practices

1. **Mobile-First** - Start with mobile styles, add desktop with `respond-to()`
2. **BEM Naming** - Use Block__Element--Modifier convention
3. **Semantic Variables** - Use design tokens instead of hard-coded values
4. **Reusable Mixins** - DRY principle for common patterns
5. **Component Isolation** - Each component in its own file
6. **Performance** - Use `will-change` sparingly, prefer `transform` and `opacity`

## 🌈 Color System

### Light Theme
- Primary: #0078d4
- Secondary: #00b7c3
- Accent: #8764b8
- Success: #107c10
- Warning: #ff8c00
- Error: #d13438

### Dark Theme
- Automatically adjusted using `[data-theme="dark"]` selector
- Maintains WCAG AA contrast ratios

## 📱 Responsive Design

All components are fully responsive with:
- Fluid typography using `clamp()`
- Flexible grid layouts
- Mobile-optimized navigation
- Touch-friendly interactive elements
- Optimized for all screen sizes

## ♿ Accessibility

- Focus visible states
- ARIA-compliant markup
- Keyboard navigation support
- Reduced motion support
- Screen reader friendly
- High contrast ratios

## 🚀 Performance

- Compressed CSS output
- Minimal specificity
- Efficient selectors
- Hardware-accelerated animations
- Optimized for Core Web Vitals
