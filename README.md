# 🎸 Site Web Matias Durruty

Site web professionnel pour musicien solo - Guitare & Chant à Biarritz

## 📋 Description

Site vitrine moderne et responsive présentant les services de Matias Durruty, musicien professionnel basé à Biarritz. Le site met en avant ses prestations pour mariages, anniversaires, événements et bars en Nouvelle-Aquitaine et au Pays Basque.

## ✨ Fonctionnalités

- **Design responsive** : Optimisé pour mobile, tablette et desktop
- **Palette de couleurs chaude** : Inspirée du Pays Basque (rouge piment, terre cuite, or)
- **Animations fluides** : Effets de scroll, fade-in, transitions élégantes
- **Navigation intuitive** : Menu fixe avec liens smooth scroll
- **Sections complètes** :
  - Hero avec présentation
  - À propos avec storytelling
  - Prestations détaillées
  - Portfolio d'événements
  - Tarifs transparents
  - Contact facile (téléphone & email)

## 🚀 Déploiement

### Option 1 : Netlify (Recommandé - Gratuit et Simple)

1. Créer un compte sur [Netlify](https://www.netlify.com/)
2. Connecter votre repository Git ou glisser-déposer le dossier
3. Le site sera automatiquement déployé
4. Configurer le domaine `cv.matiousp.fr` dans les paramètres DNS

**Via Netlify CLI :**
```bash
npm install -g netlify-cli
cd /home/matiasdu/Documents/perso/musique/site_web
netlify deploy --prod
```

### Option 2 : GitHub Pages (Gratuit)

1. Créer un repository GitHub
2. Pousser les fichiers sur GitHub
3. Aller dans Settings > Pages
4. Sélectionner la branche main comme source
5. Le site sera accessible sur `username.github.io/repo-name`

**Commandes :**
```bash
git init
git add .
git commit -m "Initial commit: Site web Matias Durruty"
git branch -M main
git remote add origin https://github.com/votre-username/votre-repo.git
git push -u origin main
```

### Option 3 : Vercel (Gratuit et Rapide)

1. Créer un compte sur [Vercel](https://vercel.com/)
2. Importer le projet depuis Git ou glisser-déposer
3. Déploiement automatique en quelques secondes

**Via Vercel CLI :**
```bash
npm install -g vercel
cd /home/matiasdu/Documents/perso/musique/site_web
vercel --prod
```

### Option 4 : Hébergement Traditionnel (OVH, O2Switch, etc.)

1. Acheter un hébergement web
2. Se connecter via FTP (FileZilla recommandé)
3. Uploader tous les fichiers dans le dossier `public_html` ou `www`
4. Configurer le domaine `cv.matiousp.fr`

## 📁 Structure des Fichiers

```
site_web/
├── index.html          # Structure HTML du site
├── styles.css          # Styles CSS avec design responsive
├── script.js           # JavaScript pour animations et interactions
└── README.md          # Ce fichier
```

## 🎨 Personnalisation

### Remplacer les Photos

Les images placeholder doivent être remplacées par vos vraies photos :

1. **Photo Hero** : Photo professionnelle avec guitare (format portrait 3:4, ~800x1066px)
2. **Photos Portfolio** : Photos d'événements (format paysage 16:9, ~1200x675px)

**Étapes :**
1. Créer un dossier `images/` dans le répertoire du site
2. Ajouter vos photos (formats JPEG ou PNG optimisés)
3. Remplacer les `<div class="image-placeholder">` dans `index.html` par :

```html
<img src="images/votre-photo.jpg" alt="Description de la photo">
```

**Recommandations images :**
- Format JPEG pour les photos (meilleure compression)
- Optimiser avec [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/)
- Taille maximale : 500KB par image
- Résolution : 72-96 DPI pour le web

### Modifier les Couleurs

Les couleurs principales sont définies dans `styles.css` (lignes 14-24) :

```css
:root {
    --primary-color: #C62828;          /* Rouge basque */
    --secondary-color: #D84315;        /* Terre cuite */
    --accent-color: #FFB74D;           /* Or chaud */
    /* ... */
}
```

Modifiez ces valeurs pour changer toute la palette du site.

### Ajouter du Contenu

**Ajouter un événement au portfolio :**

Dupliquez et modifiez un bloc `.portfolio-card` dans la section `#portfolio` de `index.html`.

**Ajouter une prestation :**

Dupliquez et modifiez un bloc `.prestation-card` dans la section `#prestations`.

## 🔧 Configuration du Domaine

Pour utiliser `cv.matiousp.fr` :

1. **Chez votre registrar (OVH, Gandi, etc.) :**
   - Ajouter un enregistrement `A` pointant vers l'IP de votre hébergeur
   - OU ajouter un `CNAME` pointant vers votre service (Netlify, Vercel, etc.)

2. **Exemple pour Netlify :**
   - Aller dans Site Settings > Domain Management
   - Ajouter le domaine custom `cv.matiousp.fr`
   - Suivre les instructions DNS fournies

3. **Activer HTTPS (SSL) :**
   - Automatique sur Netlify, Vercel, GitHub Pages
   - Sur hébergement traditionnel : Let's Encrypt via cPanel

## 📱 Test Responsive

Testez le site sur différents appareils :

**Via navigateur (Chrome/Firefox) :**
1. F12 pour ouvrir les DevTools
2. Cliquer sur l'icône mobile (Ctrl+Shift+M)
3. Tester différentes résolutions :
   - Mobile : 375x667 (iPhone SE)
   - Tablette : 768x1024 (iPad)
   - Desktop : 1920x1080

**Points de rupture responsive :**
- Mobile : < 480px
- Tablette : 481px - 768px
- Desktop petit : 769px - 992px
- Desktop large : > 993px

## 🎯 SEO et Performance

### Optimiser pour Google

1. **Créer un fichier `sitemap.xml` :**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cv.matiousp.fr/</loc>
    <lastmod>2025-01-15</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

2. **Créer un fichier `robots.txt` :**
```
User-agent: *
Allow: /
Sitemap: https://cv.matiousp.fr/sitemap.xml
```

3. **Google Search Console :**
   - Ajouter et vérifier votre site
   - Soumettre le sitemap
   - Suivre les performances

### Google Business Profile

Créez un profil Google My Business pour améliorer votre visibilité locale :
- Nom : Matias Durruty - Musicien
- Catégorie : Musicien
- Zone : Biarritz, Nouvelle-Aquitaine
- Lien vers le site : cv.matiousp.fr

## 📊 Analytics (Optionnel)

### Ajouter Google Analytics

1. Créer un compte [Google Analytics](https://analytics.google.com/)
2. Obtenir votre ID de mesure (G-XXXXXXXXXX)
3. Ajouter avant `</head>` dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔒 Sécurité

- ✅ Pas de formulaire = pas de risque de spam
- ✅ Pas de base de données = pas de faille SQL
- ✅ Site statique = très sécurisé
- ✅ HTTPS automatique sur plateformes modernes

## 📞 Support & Maintenance

### Mettre à jour le contenu

1. **Modifier les textes** : Éditer `index.html`
2. **Changer les tarifs** : Section `#tarifs` dans `index.html`
3. **Ajouter des événements** : Section `#portfolio` dans `index.html`
4. **Sauvegarder** et re-déployer

### Problèmes fréquents

**Le menu mobile ne fonctionne pas :**
- Vérifier que `script.js` est bien chargé
- Ouvrir la console (F12) pour voir les erreurs

**Les animations ne se déclenchent pas :**
- Vérifier la compatibilité du navigateur (IntersectionObserver)
- Tester sur navigateur récent (Chrome, Firefox, Safari, Edge)

**Le site ne s'affiche pas correctement :**
- Vider le cache du navigateur (Ctrl+F5)
- Vérifier que tous les fichiers sont uploadés

## 🎵 Prochaines Étapes Possibles

- [ ] Ajouter un lecteur audio avec extraits musicaux
- [ ] Intégrer une galerie photo professionnelle
- [ ] Ajouter des vidéos de performances (YouTube/Vimeo)
- [ ] Créer un blog pour partager actualités et événements
- [ ] Ajouter un système de réservation en ligne
- [ ] Intégrer les réseaux sociaux (Instagram, Facebook)
- [ ] Multilingue (Français, Espagnol, Basque)

## 📄 Licence

© 2025 Matias Durruty. Tous droits réservés.

## 📧 Contact

**Matias Durruty**
- 📞 Téléphone : +33 6 52 06 73 80
- 📧 Email : matias.larrart@gmail.com
- 📍 Localisation : Biarritz, Pays Basque

---

*« La musique se partage, elle ne doit pas partager les gens. » - Sylvain Luc*
