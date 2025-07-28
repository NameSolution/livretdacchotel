# 🏨 Livret d'Accueil Hôtel - Guide de Modification

Une application web moderne pour livret d'accueil d'hôtel, construite avec React + Vite et Tailwind CSS.

## 🚀 Démarrage Rapide

1. **Lancer l'application** : Cliquez sur le bouton "Run" ou tapez `npm run dev`
2. **Accès** : L'application sera disponible sur le port 5173
3. **Build** : `npm run build` pour la production

## 📱 Aperçu de l'Application

L'application contient 3 sections principales :
- **Accueil** - Page d'accueil avec météo de Lourdes et informations pratiques
- **Découvrir** - Restaurants et activités recommandés à Lourdes
- **Contact** - Informations de contact et horaires de l'hôtel

## 📁 Structure du Projet

```
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── layout/         # En-tête et navigation mobile
│   │   ├── ui/             # Composants UI (boutons, toast, etc.)
│   │   ├── WeatherWidget.jsx # Widget météo avec API Open-Meteo
│   │   └── LanguageSwitcher.jsx # Sélecteur de langues
│   ├── sections/           # Sections principales de l'app
│   │   ├── AccueilSection.jsx
│   │   ├── DecouvrirSection.jsx
│   │   └── ContactSection.jsx
│   ├── lib/               # Données et utilitaires
│   │   ├── locales/       # Fichiers de traduction (fr, en, es, it)
│   │   └── data.js        # Données dynamiques
│   └── contexts/          # Contextes React (langues)
├── public/assets/         # Assets statiques
│   ├── css/              # Polices locales
│   └── images/           # Images et icônes
└── tools/                # Scripts utilitaires
```

## 🎨 Guide de Modification

### 1. **Modifier les Textes et Traductions**

**Fichiers :** `src/lib/locales/` (fr.js, en.js, es.js, it.js)

```javascript
export default {
  nav: {
    accueil: 'Accueil',
    decouvrir: 'Découvrir',
    contact: 'Contact'
  },
  accueil: {
    greeting: "Bonjour et bienvenue !",
    welcome: "Hôtel Majestic",
    subtitle: "Votre séjour de rêve à Lourdes"
  },
  // ... etc
}
```

### 2. **Modifier le Logo**

1. **Remplacer** : `public/assets/images/logo.png`
2. **Format recommandé** : PNG avec fond transparent, 200x80px max

### 3. **Modifier les Couleurs du Thème**

**Fichier :** `src/index.css`

```css
:root {
  --majestic-navy: #1e3a8a;     /* Bleu principal */
  --majestic-gold: #c89c0a;     /* Doré - accents */
  --majestic-light-gold: #fef9e7; /* Fond clair doré */
}
```

### 4. **Modifier la Météo**

**Fichier :** `src/components/WeatherWidget.jsx`

Le widget utilise l'API Open-Meteo gratuite pour afficher :
- Météo actuelle de Lourdes (coordonnées : 43.09°N, -0.05°E)
- Prévisions sur 3 jours côte à côte
- Actualisation automatique toutes les 15 minutes

Pour changer de ville, modifier les coordonnées dans la fonction `fetchWeather`.

### 5. **Modifier les Restaurants et Activités**

**Fichier :** `src/lib/data.js`

```javascript
export const getDiscoverData = (t) => {
  return {
    restaurants: [
      { 
        name: "Le Petit Gourmand",
        type: "Cuisine française traditionnelle",
        distance: "2 min à pied",
        mapLink: "https://www.google.com/maps/search/?api=1&query=...",
        img: '/assets/images/restaurant1.jpg'
      },
    ],
    activites: [
      { 
        name: "Sanctuaires de Lourdes",
        type: "Site spirituel",
        distance: "10 min à pied",
        mapLink: "https://www.google.com/maps/search/?api=1&query=...",
        img: '/assets/images/sanctuaires.jpg'
      },
    ]
  };
};
```

### 6. **Modifier les Informations de Contact**

**Dans :** `src/lib/locales/fr.js`

```javascript
contact: {
  title: "Nous Contacter",
  phone: "+33 5 62 94 35 44",
  email: "contact@hotel-majestic.fr",
  address: "10 Avenue Bernadette Soubirous, 65100 Lourdes",
  reception_hours: "24h/24",
  call_now: "Appeler",
  email_us: "Nous écrire",
  get_directions: "Itinéraire"
}
```

## 🛠️ Technologies Utilisées

- **React 18** - Framework frontend moderne
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes modernes
- **Open-Meteo API** - Données météo gratuites

## 📦 Scripts Disponibles

```bash
npm run dev         # Développement (port 5173)
npm run build       # Build pour production
npm run preview     # Prévisualiser le build
npm run check       # Vérifier les assets manquants
```

## 🎯 Raccourcis de Personnalisation

### **Changement Rapide - Nom de l'Hôtel**
1. Rechercher "Hôtel Majestic" dans `src/lib/locales/fr.js`
2. Remplacer par votre nom d'hôtel
3. Répéter pour les autres langues

### **Changement Rapide - Ville**
1. Rechercher "Lourdes" dans tous les fichiers `src/lib/locales/`
2. Modifier les coordonnées GPS dans `WeatherWidget.jsx`

### **Changement Rapide - Couleurs**
1. Modifier uniquement les 3 variables dans `src/index.css`
2. Le reste s'adapte automatiquement

## 🚀 Déploiement sur Replit

L'application est prête pour le déploiement :
1. **Build** : `npm run build`
2. **Déployer** : Utiliser l'outil de déploiement Replit
3. **URL** : Votre app sera accessible publiquement

## 💡 Support Multi-langues

L'application supporte 4 langues :
- 🇫🇷 Français (par défaut)
- 🇬🇧 Anglais
- 🇪🇸 Espagnol
- 🇮🇹 Italien

Pour ajouter une nouvelle langue, créer un nouveau fichier dans `src/lib/locales/` et l'ajouter dans `src/contexts/LanguageContext.jsx`.

## ⚠️ Bonnes Pratiques - Éviter les Bugs

### **Lors de l'ajout d'une nouvelle langue :**

1. **PRIORITÉ 1 - Configuration globale** : Ajouter toutes les traductions dans `src/lib/contentConfig.js`
2. **PRIORITÉ 2 - FAQ** : Ajouter les traductions dans `src/lib/faqConfig.js`
3. **Mettre à jour le contexte** : `src/contexts/LanguageContext.jsx` (tableau `supportedLangs`)
4. **Mettre à jour le sélecteur** : `src/components/LanguageSwitcher.jsx` (tableau `languages`)
5. **Météo** : Ajouter les traductions dans `src/components/WeatherWidget.jsx` :
   - Objets `descriptions` (sunny, rainy, snowy, cloudy, foggy)
   - Objet `dayLabels` (today, tomorrow)
   - Objet `locales` (format de date)

⚠️ **IMPORTANT** : Les anciens fichiers `src/lib/locales/XX.js` sont désormais **DÉSUETS**. Utilisez uniquement `contentConfig.js`.

### **Vérifications après ajout de langue :**

- ✅ Tester le changement de langue dans l'interface
- ✅ Vérifier que la météo se traduit correctement
- ✅ Contrôler l'affichage du sélecteur de langue (pas de doublons)
- ✅ Tester les horaires check-in/check-out (format correct)
- ✅ Vérifier que la FAQ s'affiche correctement dans toutes les langues

## 🔧 Structure Centralisée - TOUS LES CONTENUS

### **Configuration Globale (`src/lib/contentConfig.js`)**

**TOUTE** l'application utilise maintenant une structure centralisée qui garantit la cohérence entre toutes les langues :

```javascript
// Pour ajouter/modifier du contenu :
export const globalContent = {
  services: {
    wifi_details: {
      fr: "Gratuit (mot de passe disponible à la réception)",
      en: "Free (password available at reception)",
      es: "Gratuito (contraseña disponible en recepción)",
      // ... toutes les langues
    }
  }
};
```

### **Utilisation avec le hook `useTranslation` :**
```javascript
import { useTranslation } from '@/hooks/useTranslation';

const Component = () => {
  const { t } = useTranslation();
  
  return <p>{t('services.wifi_details')}</p>;
};
```

### **Avantages :**
- ✅ **UNE SEULE** modification met à jour toutes les langues
- ✅ Impossible d'oublier une traduction
- ✅ Structure cohérente garantie pour TOUT le contenu
- ✅ Plus de fichiers séparés à maintenir
- ✅ Détection automatique des contenus manquantsons vides ou manquantes

### **Template pour nouvelle langue :**

```javascript
// Dans WeatherWidget.jsx - Ajouter dans chaque objet :
de: 'Traduction', // Remplacer par la bonne traduction
pl: 'Traduction',
pt: 'Traduction'
```

---

🎯 **Application optimisée pour les hôtels avec météo en temps réel et design responsive !**