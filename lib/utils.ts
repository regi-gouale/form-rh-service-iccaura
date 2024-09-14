import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMailMessageText({firstname, field, department}: {firstname: string, field: string, department: string}) {
  return `
      \nBonjour ${firstname},\n\nAprès analyse des informations fournies, il semblerait que le service le mieux adapté à votre situation soit celui de la Filière ${field}. Plus précisément, il s'agirait du Département des ${department}. \nCe département pourra répondre au mieux à tes besoins et t'apporter l'assistance nécessaire. N'hésite pas à me faire part de tes éventuelles questions ou préoccupations.\n\nBien cordialement,\nÉglise Impact Centre Chrétien`;

}

export function getMailMessageHtml({firstname, field, department}: {firstname: string, field: string, department: string}) {
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
      border: 1px solid #e1e1e1;
    }

    h1 {
      font-size: 20px;
      color: #CD2FC5;
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
      margin-bottom: 15px;
    }

    .signature {
      font-style: italic;
      color: #555;
    }
  </style>
</head>

<body>
  <div class="email-container">
    <h1>Proposition de service adapté</h1>

    <p>Bonjour ${firstname},</p>

    <p>Après analyse des informations fournies, il semble que le service le mieux adapté à ta situation soit celui de la
      <strong>${field}</strong>.</p>

    <p>Plus précisément, il s'agirait du <strong>${department}</strong>. Ce département pourra
      répondre au mieux à tes besoins et t'apporter l'assistance nécessaire.</p>

    <p>N'hésite pas à me faire part de tes éventuelles questions ou préoccupations.</p>

    <p class="signature">Bien cordialement,<br>Église Impact Centre Chrétien</p>
  </div>
</body>

</html>`;
}