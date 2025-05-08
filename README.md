# Upcycle

UpCycle est une marketplace créative dédiée aux petits créateurs de mode. Ils y vendent des pièces uniques issues de vêtements transformés, tout en personnalisant leur page (couleurs, polices, stickers…). Un tremplin pour exprimer leur style et, peut-être, lancer leur propre marque.

## Technologies Utilisées

- **Framework**: Next.js 14
- **Langage**: TypeScript
- **Base de données**: PostgreSQL avec Prisma ORM
- **Authentification**: NextAuth.js
- **UI/UX**:
  - Tailwind CSS
  - Radix UI
  - Shadcn/ui
- **Gestion des images**: Cloudinary
- **Validation**: Zod
- **Formulaires**: React Hook Form

## Prérequis

- Node.js 18+
- pnpm 10+
- PostgreSQL
- Docker (optionnel)

## Installation

1. Cloner le repository :

```bash
git clone [URL_DU_REPO]
cd upcycle
```

2. Installer les dépendances :

```bash
pnpm install
```

3. Configurer les variables d'environnement :

```bash
cp .env.example .env
```

Remplir les variables nécessaires dans le fichier `.env`

4. Initialiser la base de données :

```bash
pnpm db:push
pnpm db:seed
```

## Développement

Lancer le serveur de développement :

```bash
pnpm dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## Scripts Disponibles

- `pnpm dev` : Lance le serveur de développement
- `pnpm build` : Compile l'application pour la production
- `pnpm start` : Démarre l'application en mode production
- `pnpm lint` : Vérifie le code avec ESLint
- `pnpm format` : Formate le code avec Prettier
- `pnpm type-check` : Vérifie les types TypeScript
- `pnpm db:push` : Met à jour le schéma de la base de données
- `pnpm db:seed` : Remplit la base de données avec des données de test

## Structure du Projet

```
upcycle/
├── app/              # Routes et pages de l'application
├── components/       # Composants React réutilisables
├── lib/             # Utilitaires et configurations
├── prisma/          # Schéma et migrations de la base de données
├── public/          # Fichiers statiques
├── types/           # Types TypeScript
└── hooks/           # Hooks React personnalisés
```

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
