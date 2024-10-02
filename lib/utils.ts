import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMailMessageText({
  firstname,
  field1,
  department1,
  field2,
  department2,
}: {
  firstname: string;
  field1: string;
  department1: string;
  field2: string;
  department2: string;
}) {
  return `
      Bonjour ${firstname},
Nous rendons grâce pour ta volonté de rejoindre la grande armée des Serviteurs Travaillant Activement pour le Royaume (STAR).
Au regard des réponses données, les départements qui correspondent à ton profil relève de : 
-	la catégorie ${field1} au sein du département ${department1} ;
-	la catégorie ${field2} au sein du département ${department2}.
Tu seras contacté par les Ressources Humaines pour un entretien. Les RH te présenteront de manière détaillée les différents départements en lien avec ton profil, répondront à tes questions, et te communiqueront toutes les informations nécessaires à ton intégration dans le service.

Sois béni(e)
`;
}

export function getMailMessageHtml({
  firstname,
  field1,
  department1,
  field2,
  department2,
}: {
  firstname: string;
  field1: string;
  department1: string;
  field2: string;
  department2: string;
}) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proposition de service adapté</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }

    .email-container {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 20px auto;
    }

    .email-content {
      margin-bottom: 20px;
    }

    .email-footer {
      margin-top: 20px;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-content">
      <p>Bonjour ${firstname},</p>
      <p>Nous rendons grâce pour ta volonté de rejoindre la grande armée des Serviteurs Travaillant Activement pour le Royaume (STAR).</p>
      <p>Au regard des réponses données, les départements qui correspondent à ton profil relèvent de :</p>
      <ul>
        <li>la catégorie ${field1} au sein du département ${department1} ;</li>
        <li>la catégorie ${field2} au sein du département ${department2}.</li>
      </ul>
      <p>Tu seras contacté par les Ressources Humaines pour un entretien. Les RH te présenteront de manière détaillée les différents départements en lien avec ton profil, répondront à tes questions, et te communiqueront toutes les informations nécessaires à ton intégration dans le service.</p>
    </div>
    <div class="email-footer">
      <p>Sois béni(e)</p>
    </div>
  </div>
</body>
</html>`;
}
