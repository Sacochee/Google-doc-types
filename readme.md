# 🧾 TypeScript Types pour Google Docs JSON

Ce projet fournit une définition **TypeScript** presque complète du **schéma JSON** renvoyé par l’API Google Docs. Il est basé entièrement sur la [documentation officielle de Google Docs](https://developers.google.com/docs/api/reference/rest/v1/documents).

## 🧪 Installation

Pour installer la bibliothèque, exécute la commande suivante dans ton terminal :

```bash
npm install @saccoche/google-doc-types
```

## 🧪 Utilisation

Simplement des types.

```ts
import { Document, ParagraphElement, TextRun } from "@saccoche/google-doc-types";
```

## 📦 Contenu

- Représentation typée du document Google Docs en TypeScript
- Structure hiérarchique : `Document`, `Body`, `Paragraph`, `Element`, `TextRun`, etc.
- Typage partiellement complet (voir section [Limitations](#%EF%B8%8F-limitations))

## 🚧 État du projet

Ce projet est **partiellement terminé** :

- La majorité des types sont définis
- Les types liés aux suggestions ne sont pas encore définis
- Certains champs ne sont pas explicitement marqués comme `undefined` ou non, car la documentation de Google est parfois ambiguë à ce sujet
- Plusieurs commentaires `// TODO` marquent les zones à compléter
- Tous les types ne sont pas encore exportés depuis `type.d.ts`

> Ce projet est un **work in progress**. Toute contribution est la bienvenue !

## 🎯 Objectif

Fournir une base solide de typage pour la structure JSON retournée par l’API Google Docs, afin de faciliter son utilisation dans des projets TypeScript.

## 🤝 Contribuer

Tu veux participer ? Voici comment aider :

- Ajoute les types manquants (signalés avec `// TODO`)
- Corrige ou améliore les types existants
- Ouvre une *issue* pour signaler une erreur ou demander une clarification

Je serais ravi de recevoir vos retours ou contributions ! ✨


