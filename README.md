# MVP Application

Une application web moderne et sécurisée construite avec Express.js.

## Fonctionnalités

- Authentication sécurisée avec Passport.js
- Gestion des sessions
- Protection contre les attaques courantes (XSS, CSRF, etc.)
- Logging structuré
- Rate limiting
- Validation des données
- Tests automatisés
- Linting et formatage de code

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

## Installation

1. Cloner le repository :
```bash
git clone [votre-repo]
cd MVP-v2
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env
# Éditer .env avec vos configurations
```

## Scripts disponibles

- `npm start` : Démarrer l'application
- `npm run dev` : Démarrer en mode développement avec hot-reload
- `npm test` : Lancer les tests
- `npm run lint` : Vérifier le code avec ESLint
- `npm run lint:fix` : Corriger automatiquement les problèmes de linting
- `npm run format` : Formater le code avec Prettier

## Structure du projet

```
MVP-v2/
├── config/           # Configuration de l'application
├── controllers/      # Logique métier
├── middleware/       # Middlewares Express
├── models/          # Modèles de données
├── public/          # Fichiers statiques
├── routes/          # Routes de l'application
├── tests/           # Tests
└── views/           # Templates Handlebars
```

## Sécurité

L'application inclut plusieurs mesures de sécurité :
- Helmet pour les en-têtes HTTP sécurisés
- Rate limiting pour prévenir les attaques par force brute
- Validation des données avec express-validator
- Sessions sécurisées avec express-session
- CORS configuré

## Logging

Les logs sont gérés avec Winston et incluent :
- Logs d'erreur
- Logs d'accès
- Logs d'application

## Tests

Les tests sont écrits avec Jest et supertest. Pour lancer les tests :
```bash
npm test
```

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## License

MIT