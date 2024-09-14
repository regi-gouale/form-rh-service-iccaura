# Projet d'orientation bénévole dans une association cultuelle

Ce projet consiste en une application web permettant d'orienter une personne souhaitant devenir bénévole dans une association cultuelle. L'application fonctionne en posant un questionnaire à l'utilisateur et en utilisant ses réponses pour le diriger vers le service qui lui correspond le mieux.

## Installation
```bash
$ cp .env.example .env
$ docker-compose up --build
```
Ouvrir un navigateur et aller à l'adresse `http://localhost:3000`

Une version de l'application est également disponible [ici](https://monservice.egliseiccaura.com/)

## Technologies utilisées

Le projet est développé en TypeScript et utilise le framework NestJS pour la création de l'application web.

Les technologies utilisées sont les suivantes:
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [SendGrid](https://sendgrid.com/)

## Étapes réalisées

Les étapes déjà réalisées dans le développement de l'application sont les suivantes:

- [x] Page d'accueil
- [x] Page d'identification du bénévole
- [x] Page du questionnaire
- [x] Page de résultat
- [x] Envoi de mails de confirmation au bénévole et à l'association
- [x] Affichage des résultats
- [x] Finalisation de la page de résultats avec des informations sur le service et des graphes
- [x] Intégration de toutes les données dans l'application

## Étapes restantes

Les étapes qui restent à réaliser dans le développement de l'application sont les suivantes:

- [ ] Enregistrement des réponses du questionnaire
- [ ] Mise en place de la base de données
