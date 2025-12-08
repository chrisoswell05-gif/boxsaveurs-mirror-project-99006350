# 📋 Spécifications Design - Box Saveurs de Ferme
## Guide pour recréer le site dans GemPages/Shopify

---

## 🎨 PALETTE DE COULEURS

### Couleurs Principales
| Nom | HEX | RGB | Utilisation |
|-----|-----|-----|-------------|
| **Navy (Primary)** | `#1a3a5f` | rgb(26, 58, 95) | Header, footer, boutons principaux, titres |
| **Yellow (Accent)** | `#FFD700` | rgb(255, 215, 0) | Boutons CTA, accents, highlights, prix |
| **Cream (Background)** | `#FAF9F7` | rgb(250, 249, 247) | Arrière-plan principal |
| **Cream Dark** | `#EDEBE6` | rgb(237, 235, 230) | Sections alternées |
| **White** | `#FFFFFF` | rgb(255, 255, 255) | Cartes, conteneurs |

### Couleurs de Texte
| Nom | HEX | Utilisation |
|-----|-----|-------------|
| **Foreground** | `#1a3048` | Texte principal |
| **Muted** | `#5a6a7a` | Texte secondaire, descriptions |
| **White** | `#FFFFFF` | Texte sur fond navy |

### Couleurs Système
| Nom | HEX | Utilisation |
|-----|-----|-------------|
| **Destructive** | `#e53935` | Erreurs, alertes |
| **Border** | `#d0d5dc` | Bordures, séparateurs |

---

## 🔤 TYPOGRAPHIE

### Police Principale
- **Famille**: `Montserrat` (Google Fonts)
- **Lien**: https://fonts.google.com/specimen/Montserrat
- **Fallback**: `-apple-system, BlinkMacSystemFont, sans-serif`

### Hiérarchie des Tailles
| Élément | Taille Desktop | Taille Mobile | Poids | Line-height |
|---------|---------------|---------------|-------|-------------|
| **H1 (Hero)** | 64px (4rem) | 36px (2.25rem) | 700 (Bold) | 1.1 |
| **H2 (Section)** | 48px (3rem) | 30px (1.875rem) | 700 (Bold) | 1.2 |
| **H3 (Sous-titre)** | 32px (2rem) | 24px (1.5rem) | 600 (Semi-bold) | 1.3 |
| **H4 (Card title)** | 24px (1.5rem) | 20px (1.25rem) | 600 (Semi-bold) | 1.4 |
| **Body Large** | 18px (1.125rem) | 16px (1rem) | 400 (Regular) | 1.7 |
| **Body** | 16px (1rem) | 14px (0.875rem) | 400 (Regular) | 1.6 |
| **Small** | 14px (0.875rem) | 12px (0.75rem) | 400 (Regular) | 1.5 |
| **Caption** | 12px (0.75rem) | 11px | 500 (Medium) | 1.4 |

---

## 📐 ESPACEMENTS

### Système de Spacing (en rem/px)
| Token | Valeur | Utilisation |
|-------|--------|-------------|
| `xs` | 4px (0.25rem) | Micro-espacements |
| `sm` | 8px (0.5rem) | Espacement interne compact |
| `md` | 16px (1rem) | Espacement standard |
| `lg` | 24px (1.5rem) | Espacement entre éléments |
| `xl` | 32px (2rem) | Espacement de section |
| `2xl` | 48px (3rem) | Séparation majeure |
| `3xl` | 64px (4rem) | Padding sections (desktop) |
| `4xl` | 96px (6rem) | Grande séparation |

### Padding Sections
- **Desktop**: `80px` (5rem) haut/bas, `32px` (2rem) côtés
- **Tablette**: `64px` (4rem) haut/bas, `24px` (1.5rem) côtés
- **Mobile**: `48px` (3rem) haut/bas, `16px` (1rem) côtés

### Container
- **Max-width**: `1400px`
- **Padding horizontal**: `32px` (2rem)

---

## 🔲 BORDURES ET ARRONDIS

### Border Radius
| Token | Valeur | Utilisation |
|-------|--------|-------------|
| `sm` | 4px | Petits éléments, badges |
| `md` | 6px | Inputs, petits boutons |
| `lg` | 8px | Cartes, conteneurs |
| `xl` | 12px | Grandes cartes |
| `2xl` | 16px | Sections highlight |
| `full` | 9999px | Boutons ronds, avatars |

### Bordures
- **Standard**: `1px solid #d0d5dc`
- **Accent**: `2px solid #FFD700`
- **Navy**: `2px solid #1a3a5f`

---

## 🌫️ OMBRES (Box Shadows)

```css
/* Ombre légère - Cartes au repos */
--shadow-sm: 0 2px 4px rgba(26, 48, 72, 0.05);

/* Ombre moyenne - Cartes hover */
--shadow-md: 0 4px 12px rgba(26, 48, 72, 0.08);

/* Ombre large - Éléments flottants */
--shadow-lg: 0 10px 30px rgba(26, 48, 72, 0.12);

/* Ombre extra-large - Modales, popups */
--shadow-xl: 0 20px 40px rgba(26, 48, 72, 0.15);

/* Ombre jaune - Boutons CTA */
--shadow-yellow: 0 8px 24px rgba(255, 215, 0, 0.25);

/* Ombre navy - Éléments importants */
--shadow-navy: 0 8px 24px rgba(26, 58, 95, 0.3);
```

---

## 🎯 COMPOSANTS

### Boutons

#### Bouton Primaire (Navy)
```css
background: linear-gradient(135deg, #1a3a5f 0%, #2d5a8c 100%);
color: #FFFFFF;
padding: 16px 32px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
box-shadow: 0 8px 24px rgba(26, 58, 95, 0.3);
transition: all 0.3s ease;

/* Hover */
transform: translateY(-2px);
box-shadow: 0 12px 28px rgba(26, 58, 95, 0.4);
```

#### Bouton Secondaire (Yellow/Accent)
```css
background: linear-gradient(135deg, #FFD700 0%, #FFE44D 100%);
color: #1a3a5f;
padding: 16px 32px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
box-shadow: 0 8px 24px rgba(255, 215, 0, 0.25);

/* Hover */
transform: translateY(-2px);
box-shadow: 0 12px 28px rgba(255, 215, 0, 0.35);
```

#### Bouton Outline
```css
background: transparent;
color: #1a3a5f;
border: 2px solid #1a3a5f;
padding: 14px 30px;
border-radius: 8px;
font-weight: 600;

/* Hover */
background: #1a3a5f;
color: #FFFFFF;
```

### Cartes

```css
background: #FFFFFF;
border-radius: 12px;
padding: 24px;
box-shadow: 0 4px 12px rgba(26, 48, 72, 0.08);
transition: all 0.3s ease;

/* Hover */
transform: translateY(-4px);
box-shadow: 0 10px 30px rgba(26, 48, 72, 0.12);
```

### Input Fields

```css
background: #FFFFFF;
border: 1px solid #d0d5dc;
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
color: #1a3048;
transition: all 0.2s ease;

/* Focus */
border-color: #1a3a5f;
box-shadow: 0 0 0 3px rgba(26, 58, 95, 0.1);
outline: none;
```

---

## 🖼️ STRUCTURE DES SECTIONS

### 1. Announcement Bar (Barre d'annonce)
- **Hauteur**: 40px
- **Background**: `#1a3a5f` (Navy)
- **Texte**: `#FFFFFF`, 14px, Medium
- **Animation**: Marquee horizontal

### 2. Navigation
- **Hauteur**: 80px (desktop), 64px (mobile)
- **Background**: `#FFFFFF` avec blur au scroll
- **Logo**: 120px largeur
- **Links**: 16px, Medium, couleur navy
- **Hover links**: Soulignement jaune

### 3. Hero Section
- **Hauteur**: 100vh (plein écran)
- **Background**: Image plein écran avec overlay
- **Overlay**: `rgba(26, 58, 95, 0.4)`
- **Titre**: 64px, Bold, Blanc
- **Sous-titre**: 20px, Regular, Blanc
- **CTA Button**: Style secondaire (jaune)

### 4. Sections Standards
- **Padding**: 80px vertical (desktop)
- **Background alternant**: Cream / Blanc
- **Titre section**: Centré, Navy, 48px
- **Sous-titre**: Muted, 18px, max-width 600px

### 5. Pricing Cards
- **3 colonnes (desktop), 1 colonne (mobile)**
- **Card milieu**: Mise en avant avec bordure jaune
- **Badge "Populaire"**: Background jaune, texte navy
- **Prix**: 48px, Bold, Navy
- **Liste features**: Icônes check jaunes

### 6. Footer
- **Background**: `#1a3a5f` (Navy)
- **Texte**: Blanc
- **Links**: Blanc avec hover jaune
- **Sections**: 4 colonnes (desktop)

---

## 🎬 ANIMATIONS

### Transitions Standards
```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Hover Effects
- **Lift**: `transform: translateY(-4px)`
- **Scale**: `transform: scale(1.02)`
- **Glow**: Augmentation de l'ombre

### Scroll Animations (optionnel dans GemPages)
- **Fade Up**: Apparition de bas en haut
- **Fade In**: Opacité de 0 à 1
- **Délai**: 0.1s entre chaque élément

---

## 📱 BREAKPOINTS RESPONSIVE

| Nom | Largeur | Usage |
|-----|---------|-------|
| **Mobile** | < 640px | 1 colonne, navigation hamburger |
| **Tablet** | 640px - 1024px | 2 colonnes, navigation complète |
| **Desktop** | > 1024px | 3-4 colonnes, layout complet |
| **Large** | > 1400px | Container max-width atteint |

---

## 🖼️ ASSETS REQUIS

### Images à exporter
1. **Logo** - PNG transparent, 240x80px
2. **Hero Background** - JPG, 1920x1080px minimum
3. **Box Product** - PNG transparent, 800x800px
4. **Founder Photo** - JPG, 600x800px
5. **Step Icons** - PNG transparent, 200x200px (x3)
6. **Gallery Images** - JPG, 800x600px (6-8 images)

### Icônes
- Utiliser **Lucide Icons** ou équivalent dans GemPages
- Taille standard: 24px
- Couleur: Navy ou Jaune selon contexte

---

## 📝 TEXTES CLÉS

### Hero
- **Titre**: "Le Terroir Français Livré Chez Vous"
- **Sous-titre**: "Découvrez chaque mois une sélection de produits fermiers authentiques"
- **CTA**: "Découvrir Nos Box"

### Pricing
- **Box 1**: "LA BASE DU GOÛT" - 34,99$/mois - Sans engagement
- **Box 2**: "SAVEURS CACHÉES" - 29,99$/mois - Engagement 3 mois (POPULAIRE)
- **Box 3**: "L'ANNÉE GOURMANDE" - 24,99$/mois - Engagement 12 mois

---

## ✅ CHECKLIST D'IMPLÉMENTATION

- [ ] Installer la police Montserrat
- [ ] Configurer les couleurs globales
- [ ] Créer les styles de boutons
- [ ] Créer les styles de cartes
- [ ] Importer toutes les images
- [ ] Construire le header/navigation
- [ ] Construire la hero section
- [ ] Construire les sections de contenu
- [ ] Construire les pricing cards
- [ ] Construire le footer
- [ ] Tester responsive mobile/tablet
- [ ] Ajouter les animations hover

---

*Document généré depuis le projet Lovable - Box Saveurs de Ferme*
*Pour toute question technique, référez-vous au code source original.*
