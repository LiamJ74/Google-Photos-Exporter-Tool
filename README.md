PhotoGrabber
Outil de téléchargement bulk pour Google Photos

PhotoGrabber est une application React innovante qui s'intègre directement à Google Photos pour permettre la sélection et le téléchargement en masse de photos. Fonctionnant comme un bookmarklet, l'outil s'injecte dans l'interface existante de Google Photos sans nécessiter d'extension ou de logiciel externe.

🎯 Objectif
PhotoGrabber résout un problème courant : l'impossibilité de télécharger facilement plusieurs photos de Google Photos en une seule fois. L'application ajoute une interface de sélection intuitive directement dans Google Photos, permettant aux utilisateurs de :

Sélectionner visuellement des photos avec des cases à cocher
Télécharger les photos sélectionnées dans un fichier ZIP
Tout faire directement dans le navigateur, sans serveur externe
🚀 Fonctionnalités
📸 Sélection de Photos
Interface flottante : Panneau de contrôle non intrusif dans le coin supérieur droit
Cases à cocher : Ajout automatique sur chaque miniature de photo
Feedback visuel : Contour bleu sur les photos sélectionnées
Compteur en temps réel : Affiche le nombre de photos sélectionnées
📦 Téléchargement Bulk
Génération ZIP : Création côté client d'un fichier ZIP contenant toutes les photos
Conversion automatique : Transforme les vignettes en images pleine résolution
Progression visuelle : Indicateur de chargement pendant la création du ZIP
Notification de succès : Message de confirmation une fois le téléchargement terminé
🔧 Intégration Bookmarklet
Injection en un clic : Lancement via bookmarklet depuis la barre de favoris
Détection automatique : Vérifie si l'utilisateur est sur photos.google.com
Gestion d'erreurs : Message clair si utilisé sur la mauvaise page
Nettoyage automatique : Suppression propre de l'interface après utilisation
🛠️ Architecture Technique
Structure du Projet
photo-grabber/ ├── src/ │ ├── App.tsx # Composant principal de l'application │ ├── index.tsx # Point d'entrée et logique d'injection │ ├── main.tsx # Exposition globale des fonctions │ ├── components/ │ │ ├── ControlPanel.tsx # Panneau de contrôle flottant │ │ ├── PhotoSelector.tsx # Logique de sélection des photos │ │ ├── ui/ │ │ │ ├── button.tsx # Composant Button (Shadcn) │ │ │ └── badge.tsx # Composant Badge (Shadcn) │ ├── utils/ │ │ ├── photoUtils.ts # Utilitaires de traitement d'images │ │ └── cn.ts # Utilitaire de fusion de classes │ └── types/ # Définitions TypeScript ├── public/ │ └── photo-grabber.js # Script bundle pour bookmarklet └── README.md

Stack Technique
React 18 : Framework principal avec hooks modernes
TypeScript : Typage strict pour la robustesse du code
Tailwind CSS : Styling utilitaire et design responsive
Shadcn UI : Composants UI pré-construits et personnalisables
Lucide React : Icônes modernes et cohérentes
Framer Motion : Animations fluides et micro-interactions
📦 Installation
Prérequis
Node.js 18+
npm ou yarn
Navigateur Chrome (recommandé pour Google Photos)
Installation Locale
file.sh
Build de Production
file.sh
🔧 Configuration
Variables d'Environnement
Créez un fichier .env.local à la racine :

file.txt
Configuration du Bookmarklet
Build du projet :

npm run build
Hébergement du bundle :

Uploadez dist/photo-grabber.js sur votre serveur
Notez l'URL complète (ex: https://votredomaine.com/photo-grabber.js)
Création du bookmarklet :

javascript:(function(){const script=document.createElement('script');script.src='https://votredomaine.com/photo-grabber.js';document.head.appendChild(script);})();
📖 Guide d'Utilisation
Étape 1 : Installation du Bookmarklet
Faites un clic droit sur votre barre de favoris Chrome
Choisissez "Ajouter une page"
Nommez-le "PhotoGrabber"
Collez le code JavaScript du bookmarklet dans le champ URL
Étape 2 : Utilisation sur Google Photos
Navigation : Allez sur photos.google.com
Lancement : Cliquez sur le bookmarklet PhotoGrabber
Activation : Cliquez sur "Select Photos" dans le panneau flottant
Sélection : Cochez les photos que vous voulez télécharger
Téléchargement : Cliquez sur "Download" pour générer le ZIP
Étape 3 : Récupération des Fichiers
Le fichier ZIP sera téléchargé automatiquement
Nom par défaut : google-photos-download.zip
Les images sont en pleine résolution
🎨 Personnalisation
Thème et Couleurs
Le thème est défini dans src/App.tsx :

file.tsx
Modification des Sélecteurs CSS
Adaptez les sélecteurs dans src/components/PhotoSelector.tsx :

file.tsx
Personnalisation de l'UI
Modifiez le composant ControlPanel.tsx pour changer :

Position du panneau
Taille et couleurs des boutons
Textes et labels
🔍 Débogage et Tests
Mode Développement
file.sh
Tests Manuels
Test d'injection :

// Dans la console
injectPhotoGrabber()
Vérification de l'API :

// Vérifier les fonctions exposées
console.log(window.PhotoGrabberAPI)
Test sur différentes pages :

Google Photos (devrait fonctionner)
Autres sites (message d'erreur attendu)
Débogage des Sélecteurs
file.js
🚨 Limitations et Solutions
Limitations Actuelles
CORS : Les images doivent être accessibles via le même domaine
Performance : Le téléchargement de nombreuses photos peut être lent
DOM Dynamique : Google Photos modifie son DOM fréquemment
Solutions Implémentées
Détection automatique : Vérification continue des changements de page
Gestion d'erreurs : Messages clairs pour l'utilisateur
Nettoyage : Suppression propre des éléments ajoutés
Améliorations Futures
[ ] Support du défilement infini
[ ] Filtrage par date/album
[ ] Compression d'images optionnelle
[ ] Support d'autres plateformes (Instagram, Facebook)
🤝 Contribution
Guidelines de Contribution
Fork le projet
Créer une branche feature : git checkout -b feature/nouvelle-fonctionnalite
Commit les changements : git commit -m 'Ajout de nouvelle fonctionnalité'
Push : git push origin feature/nouvelle-fonctionnalite
Pull Request avec description détaillée
Standards de Code
TypeScript strict activé
ESLint pour la qualité du code
Prettier pour le formatage
Conventional Commits pour les messages
Tests
file.sh
📄 Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

Points Clés de la Licence
✅ Utilisation commerciale autorisée
✅ Modification autorisée
✅ Distribution autorisée
✅ Utilisation privée autorisée
❌ Responsabilité limitée
❌ Pas de garantie
🆘 Support et Aide
Documentation Complémentaire
API Reference
Guide de Développement
FAQ
Signalement de Bugs
Vérifier les issues existantes
Créer une nouvelle issue avec :
Description détaillée du problème
Screenshots si applicable
Étapes pour reproduire
Configuration du navigateur/OS
Contact
Email : contact@photograbber.dev
Discord : Serveur Discord
Twitter : @PhotoGrabberApp
🎉 Remerciements
Contributeurs
Merci à tous les contributeurs qui ont rendu ce projet possible
Support de la communauté open source
Technologies Utilisées
React - Framework frontend
Tailwind CSS - Framework CSS
Shadcn UI - Composants UI
Lucide - Icônes
TypeScript - Typage JavaScript
📈 Roadmap
Version 1.1 (Prochaine)
[ ] Support du drag-and-drop pour la sélection
[ ] Miniatures dans le panneau de contrôle
[ ] Options de qualité d'image
Version 1.2
[ ] Support multi-langues
[ ] Thèmes clairs/sombres
[ ] Raccourcis clavier
Version 2.0
[ ] Extension Chrome officielle
[ ] API pour développeurs
[ ] Intégration cloud (Google Drive, Dropbox)
