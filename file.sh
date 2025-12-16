   npm run build
   ```

2. **Hébergement du bundle** :
   - Uploadez `dist/photo-grabber.js` sur votre serveur
   - Notez l'URL complète (ex: `https://votredomaine.com/photo-grabber.js`)

3. **Création du bookmarklet** :
   ```javascript
   javascript:(function(){const script=document.createElement('script');script.src='https://votredomaine.com/photo-grabber.js';document.head.appendChild(script);})();
   ```

---

## 📖 Guide d'Utilisation

### Étape 1 : Installation du Bookmarklet
1. Faites un clic droit sur votre barre de favoris Chrome
2. Choisissez "Ajouter une page"
3. Nommez-le "PhotoGrabber"
4. Collez le code JavaScript du bookmarklet dans le champ URL

### Étape 2 : Utilisation sur Google Photos
1. **Navigation** : Allez sur [photos.google.com](https://photos.google.com)
2. **Lancement** : Cliquez sur le bookmarklet PhotoGrabber
3. **Activation** : Cliquez sur "Select Photos" dans le panneau flottant
4. **Sélection** : Cochez les photos que vous voulez télécharger
5. **Téléchargement** : Cliquez sur "Download" pour générer le ZIP

### Étape 3 : Récupération des Fichiers
- Le fichier ZIP sera téléchargé automatiquement
- Nom par défaut : `google-photos-download.zip`
- Les images sont en pleine résolution

---

## 🎨 Personnalisation

### Thème et Couleurs
Le thème est défini dans `src/App.tsx` :