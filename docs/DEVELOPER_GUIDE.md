# ClinicHub Developer Guide

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone <repository-url>
cd clinichub

# 2. Install dependencies
npm install

# 3. Start SASS watcher
npm run sass:watch

# 4. Open index.html in browser
# Or use a local server (recommended)
npx serve .
```

## 📐 SASS Development

### File Organization

- **_variables.scss** - All design tokens (colors, spacing, typography)
- **_mixins.scss** - Reusable SASS functions
- **_base.scss** - Reset and base HTML styles
- **_utilities.scss** - Utility classes
- **components/** - Individual component styles

### Adding a New Component

1. Create `assets/scss/components/_component-name.scss`
2. Import in `assets/scss/main.scss`:
   ```scss
   @import 'components/component-name';
   ```
3. Use BEM naming convention:
   ```scss
   .component-name {
     &__element {
       // styles
     }
     
     &--modifier {
       // styles
     }
   }
   ```

### Using Design Tokens

```scss
// ✅ Good - Use variables
.button {
  padding: $spacing-md;
  color: $color-primary;
  border-radius: $border-radius;
}

// ❌ Bad - Hard-coded values
.button {
  padding: 16px;
  color: #0078d4;
  border-radius: 8px;
}
```

### Responsive Design

```scss
.component {
  // Mobile-first base styles
  padding: $spacing-md;
  
  // Tablet and up
  @include respond-to(md) {
    padding: $spacing-lg;
  }
  
  // Desktop and up
  @include respond-to(lg) {
    padding: $spacing-xl;
  }
  
  // Mobile only
  @include respond-below(md) {
    display: none;
  }
}
```

## 🎨 Styling Guidelines

### 1. Use Fluent Design Patterns

```scss
// Acrylic effect
.card {
  @include acrylic(0.7);
  @include fluent-shadow(8);
}

// Hover lift
.interactive-card {
  @include hover-lift(-4px, 16);
}
```

### 2. Maintain Consistency

- Use spacing scale: `$spacing-xs` to `$spacing-3xl`
- Use font sizes: `$font-size-xs` to `$font-size-5xl`
- Use border radius: `$border-radius-sm` to `$border-radius-xl`
- Use shadows: `$shadow-2` to `$shadow-64`

### 3. Dark Theme Support

```scss
.element {
  background: $color-white;
  color: $color-gray-800;
  
  [data-theme="dark"] & {
    background: $dark-bg-primary;
    color: $dark-text-primary;
  }
}
```

### 4. RTL Support

```scss
.element {
  margin-left: $spacing-md;
  
  [dir="rtl"] & {
    margin-left: 0;
    margin-right: $spacing-md;
  }
}
```

## 🧩 Component Development

### Button Example

```scss
.btn {
  // Base styles
  @include flex-center;
  padding: $spacing-md $spacing-xl;
  border-radius: $border-radius;
  @include transition(all);
  
  // Variants
  &--primary {
    background: $color-primary;
    color: $color-white;
    
    &:hover {
      background: $color-primary-dark;
    }
  }
  
  // Sizes
  &--large {
    padding: $spacing-lg $spacing-2xl;
    font-size: $font-size-lg;
  }
  
  // States
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
```

## 📱 Responsive Testing

Test on these breakpoints:
- 375px (iPhone SE)
- 768px (iPad)
- 1024px (iPad Pro)
- 1440px (Desktop)
- 1920px (Large Desktop)

## ♿ Accessibility Checklist

- [ ] Focus visible states
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Color contrast (WCAG AA)
- [ ] Screen reader support
- [ ] Reduced motion support

## 🎯 Performance Tips

1. **Use transform and opacity** for animations
2. **Avoid layout thrashing** - batch DOM reads/writes
3. **Lazy load images** - use loading="lazy"
4. **Minimize repaints** - use will-change sparingly
5. **Compress assets** - use npm run sass for production

## 🔧 Useful Mixins

```scss
// Flexbox center
@include flex-center;

// Grid auto-fit
@include grid-auto-fit(280px);

// Truncate text
@include truncate;

// Line clamp
@include line-clamp(3);

// Custom scrollbar
@include custom-scrollbar;

// Gradient text
@include gradient-text(linear-gradient(135deg, $color-primary, $color-accent));
```

## 🐛 Debugging

### SASS Compilation Errors

```bash
# Check syntax
npm run sass

# Watch with detailed errors
npm run sass:dev
```

### Browser DevTools

1. Enable source maps in development
2. Use "Inspect Element" to see compiled CSS
3. Check responsive design mode
4. Test dark theme toggle

## 📚 Resources

- [SASS Documentation](https://sass-lang.com/documentation)
- [Microsoft Fluent Design](https://www.microsoft.com/design/fluent/)
- [BEM Methodology](http://getbem.com/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 🤝 Contributing

1. Follow the existing code style
2. Use meaningful variable names
3. Comment complex logic
4. Test on multiple browsers
5. Ensure accessibility compliance
6. Update documentation

## 📝 Code Review Checklist

- [ ] Follows BEM naming convention
- [ ] Uses design tokens (no hard-coded values)
- [ ] Responsive on all breakpoints
- [ ] Dark theme support
- [ ] RTL support
- [ ] Accessibility compliant
- [ ] Performance optimized
- [ ] Browser tested
- [ ] Documentation updated
