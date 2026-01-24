# Rick and Morty Color Scheme

## 🎨 Color Palette

All colors in this application are sourced from Rick and Morty character outfits for theme consistency.

### Primary Colors

| Color | Hex Code | Usage | Character Reference |
|-------|----------|-------|-------------------|
| **Cyan** | `#92D4D2` | Primary actions, buttons, links | Rick's lab coat |
| **Pink** | `#E08ACA` | Hover states, accents, active indicators | Accent color |
| **Coral/Red** | `#F96153` | Error messages, warnings | Morty's shirt |
| **Olive Green** | `#56632D` | Status badges (alive), earth tones | Earth/nature tones |
| **Yellow** | `#E7E367` | Highlights, bright accents | Bright accent |
| **Beige** | `#DAC79C` | Backgrounds, secondary elements | Neutral tones |
| **Brown** | `#827345` | Text, borders, secondary elements | Earth tones |
| **Dark Blue** | `#313B67` | Headers, footers, primary text | Dark elements |

## 🎯 Color Usage Strategy

### Primary Actions
- **Buttons**: `#92D4D2` (Cyan - Rick's lab coat)
- **Hover**: `#E08ACA` (Pink - accent)
- **Focus states**: `#92D4D2` with light opacity

### Backgrounds
- **Main background**: `#DAC79C` (Beige - neutral)
- **Card backgrounds**: `#ffffff` (White - clean)
- **Header gradient**: `#92D4D2` to `#E08ACA` (Cyan to Pink)

### Text
- **Primary text**: `#313B67` (Dark blue - high contrast)
- **Secondary text**: `#827345` (Brown - softer)

### Status Indicators
- **Alive**: `#56632D` (Olive green - natural)
- **Dead**: `#F96153` (Coral/Red - Morty's shirt)
- **Unknown**: `#827345` (Brown - neutral)

### Borders & Dividers
- **Borders**: `rgba(130, 115, 69, 0.3)` (Light brown - subtle)
- **Dividers**: Light brown with opacity

### Special Elements
- **Footer**: `#313B67` (Dark blue - contrast)
- **Error messages**: `#F96153` (Coral/Red - attention)
- **Active search/filters**: `#E08ACA` (Pink - highlight)

## 📐 CSS Custom Properties

All colors are defined as CSS custom properties (variables) in `index.css`:

```css
:root {
  --color-primary: #92D4D2;        /* Cyan */
  --color-primary-hover: #E08ACA;  /* Pink */
  --color-secondary: #DAC79C;      /* Beige */
  --color-accent: #E7E367;         /* Yellow */
  --color-error: #F96153;           /* Coral/Red */
  --color-dark: #313B67;           /* Dark blue */
  --color-text-primary: #313B67;   /* Primary text */
  --color-text-secondary: #827345; /* Secondary text */
  --color-background: #DAC79C;      /* Background */
  --color-background-light: #ffffff; /* Card background */
  --color-border: #827345;          /* Border */
  --color-border-light: rgba(130, 115, 69, 0.3); /* Light border */
}
```

### Benefits of CSS Variables

1. **Consistency**: All components use the same color values
2. **Maintainability**: Change colors in one place (`:root`)
3. **Theme Support**: Easy to add dark mode or other themes later
4. **Type Safety**: Prevents typos in color codes

## 🎨 Component Color Mapping

### App Header
- **Background**: Gradient from `#92D4D2` (cyan) to `#E08ACA` (pink)
- **Text**: White (for contrast)

### App Footer
- **Background**: `#313B67` (Dark blue)
- **Links**: `#92D4D2` (Cyan) with pink hover

### Search Component
- **Background**: White
- **Border**: Light brown
- **Focus**: Cyan with light shadow
- **Active indicator**: Pink

### Filter Component
- **Header background**: Beige (`#DAC79C`)
- **Active badge**: Pink (`#E08ACA`)
- **Toggle button**: Transparent with cyan hover
- **Primary button**: Cyan with pink hover
- **Secondary button**: Beige

### Character Cards
- **Background**: White
- **Border**: Light brown
- **Hover border**: Cyan
- **Status badges**: 
  - Alive: Olive green
  - Dead: Coral/red
  - Unknown: Brown

### Loading Spinner
- **Base**: Beige
- **Spinning**: Cyan

### Error Messages
- **Text**: Coral/red
- **Button**: Cyan with pink hover

### Pagination
- **Buttons**: Cyan with pink hover
- **Text**: Brown

## 🎯 Design Principles

### Contrast & Accessibility
- All text meets WCAG contrast requirements
- Primary text on white: 4.5:1+ contrast ratio
- Buttons have sufficient contrast for readability

### Visual Hierarchy
- **Primary actions**: Cyan (most prominent)
- **Secondary actions**: Beige (subtle)
- **Accents**: Pink (highlights important states)
- **Errors**: Coral/red (attention-grabbing)

### Consistency
- Same colors used consistently across components
- Hover states follow the same pattern (cyan → pink)
- Focus states use cyan with light shadow

## 🔄 Color Relationships

### Complementary Pairs
- Cyan (`#92D4D2`) ↔ Pink (`#E08ACA`) - Primary action pair
- Dark Blue (`#313B67`) ↔ Beige (`#DAC79C`) - Background pair
- Brown (`#827345`) ↔ White - Text pair

### Status Colors
- Alive: Green tones (natural, positive)
- Dead: Red tones (warning, negative)
- Unknown: Brown (neutral, uncertain)

## 📝 Usage Guidelines

### When to Use Each Color

**Cyan (`#92D4D2`)**:
- Primary buttons
- Links
- Focus states
- Active elements

**Pink (`#E08ACA`)**:
- Hover states
- Active indicators
- Highlights
- Accents

**Coral/Red (`#F96153`)**:
- Error messages
- Warnings
- Dead status
- Destructive actions

**Beige (`#DAC79C`)**:
- Backgrounds
- Secondary buttons
- Neutral elements

**Dark Blue (`#313B67`)**:
- Headers
- Footers
- Primary text
- Dark backgrounds

**Brown (`#827345`)**:
- Secondary text
- Borders
- Subtle elements

**Olive Green (`#56632D`)**:
- Alive status
- Natural elements

**Yellow (`#E7E367`)**:
- Highlights (if needed)
- Bright accents

## 🎨 Theme Consistency

All colors are derived from the Rick and Morty character palette to maintain:
- **Visual consistency** with the show's aesthetic
- **Brand recognition** through color association
- **Cohesive design** across all components
- **Thematic relevance** to the content

---

**Color Palette Source**: Character outfit colors from Rick and Morty
**Last Updated**: Application-wide color scheme implementation
