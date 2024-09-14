"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { categories } from "@/constants";
import { Bar, BarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { sendEmail } from "@/lib/send-email";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const categoriesScore: {
  [key: string]: { score: number; totalQuestions: number };
} = {
  AGP: {
    score: 0,
    totalQuestions: 10,
  },
  EAS: {
    score: 0,
    totalQuestions: 1,
  },
  SBE: {
    score: 0,
    totalQuestions: 3,
  },
  MIC: {
    score: 0,
    totalQuestions: 10,
  },
  RDDT: {
    score: 0,
    totalQuestions: 6,
  },
};

const departmentsScore: {
  [key: string]: { score: number; totalQuestions: number };
} = {
  "AGP-1": {
    score: 0,
    totalQuestions: 4,
  },
  "AGP-2": {
    score: 0,
    totalQuestions: 2,
  },
  "AGP-3": {
    score: 0,
    totalQuestions: 3,
  },
  "AGP-4": {
    score: 0,
    totalQuestions: 4,
  },
  "AGP-5": {
    score: 0,
    totalQuestions: 4,
  },
  "AGP-6": {
    score: 0,
    totalQuestions: 2,
  },
  "AGP-7": {
    score: 0,
    totalQuestions: 6,
  },
  "AGP-8": {
    score: 0,
    totalQuestions: 3,
  },
  "AGP-9": {
    score: 0,
    totalQuestions: 2,
  },
  "EAS-1": {
    score: 0,
    totalQuestions: 1,
  },
  "EAS-2": {
    score: 0,
    totalQuestions: 1,
  },
  "EAS-3": {
    score: 0,
    totalQuestions: 1,
  },
  "SBE-1": {
    score: 0,
    totalQuestions: 1,
  },
  "SBE-2": {
    score: 0,
    totalQuestions: 1,
  },
  "SBE-3": {
    score: 0,
    totalQuestions: 1,
  },
  "MIC-1": {
    score: 0,
    totalQuestions: 10,
  },
  "MIC-2": {
    score: 0,
    totalQuestions: 1,
  },
  "MIC-3": {
    score: 0,
    totalQuestions: 1,
  },
  "RDDT-1": {
    score: 0,
    totalQuestions: 1,
  },
  "RDDT-2": {
    score: 0,
    totalQuestions: 1,
  },
};

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const ResultsPage = () => {
  interface Person {
    id: string;
    qFirstName: string;
    qLastName: string;
    qEmail: string;
    qChurch: string;
  }

  interface Responses {
    [key: string]: number;
  }

  const [person, setPerson] = useState<Person | null>(null);
  const [responses, setResponses] = useState<Responses | null>(null);
  const [maxResponseCategoryId, setMaxResponseCategoryId] = useState("");
  const [maxResponseDepartmentId, setMaxResponseDepartmentId] = useState("");

  useEffect(() => {
    function dispatchResponsesToCategoriesAndDepartments() {
      for (const key in responses) {
        if (key.includes("-")) {
          departmentsScore[key].score = Math.ceil(
            (responses[key] / departmentsScore[key].totalQuestions) * 100
          );
        } else {
          categoriesScore[key].score = Math.ceil(
            (responses[key] / categoriesScore[key].totalQuestions) * 100
          );
        }
      }

      localStorage.setItem("categoriesScore", JSON.stringify(categoriesScore));
      localStorage.setItem(
        "departmentsScore",
        JSON.stringify(departmentsScore)
      );
    }

    if (responses) {
      dispatchResponsesToCategoriesAndDepartments();
    }
  }, [responses]);

  function getMaxResponseCategoryId() {
    return Object.keys(categoriesScore).reduce((a, b) =>
      categoriesScore[a].score > categoriesScore[b].score ? a : b
    );
  }

  function getMaxResponseDepartmentId() {
    return Object.keys(departmentsScore).reduce((a, b) =>
      departmentsScore[a].score > departmentsScore[b].score ? a : b
    );
  }

  function getMaxCategoryName() {
    // const categoryId = getMaxResponseCategoryId();

    return categories.find((category) => category.id === maxResponseCategoryId)
      ?.name;
  }

  function getDepartmentName() {
    // const departmentId = getMaxResponseDepartmentId();
    const categoryId = maxResponseDepartmentId.split("-")[0];

    const category = categories.find((category) => category.id === categoryId);
    if (category) {
      return category.departments.find(
        (department) => department.id === maxResponseDepartmentId
      )?.name;
    }
  }

  useEffect(() => {
    const storedPerson = localStorage.getItem("person");
    const storedResponses = localStorage.getItem("responses");

    if (!storedPerson) {
      console.error("No person found");
    }
    if (!storedResponses) {
      console.error("No responses found");
    }

    if (storedPerson && storedResponses) {
      setPerson(JSON.parse(storedPerson));
      setResponses(JSON.parse(storedResponses));
    }
  }, []);

  useEffect(() => {
    if (responses) {
      setMaxResponseCategoryId(getMaxResponseCategoryId());
      setMaxResponseDepartmentId(getMaxResponseDepartmentId());
    }
  }, [responses]);
  function onClickButtonSendEmail() {
    sendEmail({
      email: person!.qEmail,
      name: `${person!.qFirstName} ${person!.qLastName}`,
      messageText: `
      Bonjour ${person!.qFirstName}, 
      Après analyse des informations au regard des réponses données, le service qui te correspond le mieux relève de la filière :
        - ${getMaxCategoryName()}
        Le département qui te correspond le mieux est :
        - ${getDepartmentName()}
        
        Bonjour ${person!.qFirstName},

Après analyse des informations fournies, il semble que le service le mieux adapté à ta situation soit celui de la Filière ${getMaxCategoryName()}. Plus précisément, il s'agirait du Département des ${getDepartmentName()}. Ce département pourra répondre au mieux à tes besoins et t'apporter l'assistance nécessaire. N'hésite pas à me faire part de tes éventuelles questions ou préoccupations.

Bien cordialement,
Église Impact Centre Chrétien`,
      messageHtml: `
      <!DOCTYPE html>
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

    <p>Bonjour ${person!.qFirstName},</p>

    <p>Après analyse des informations fournies, il semble que le service le mieux adapté à ta situation soit celui de la
      <strong>${getMaxCategoryName()}</strong>.</p>

    <p>Plus précisément, il s'agirait du <strong>${getDepartmentName()}</strong>. Ce département pourra
      répondre au mieux à tes besoins et t'apporter l'assistance nécessaire.</p>

    <p>N'hésite pas à me faire part de tes éventuelles questions ou préoccupations.</p>

    <p class="signature">Bien cordialement,<br>Église Impact Centre Chrétien</p>
  </div>
</body>

</html>`,
    });
  }
  return (
    <div>
      {person && responses ? (
        <div>
          <h1 className="text-3xl sm:text-4xl text-center sm:text-left font-bold">
            {person.qFirstName}, voici le service qui te correspond le mieux
          </h1>
          <p className="text-center sm:text-left">
            Tu es plus orienté vers{" "}
            <span className="font-bold">{getMaxCategoryName()}</span>
          </p>
          <p className="text-center sm:text-left">
            Le département qui te correspond le mieux est{" "}
            <span className="font-bold">{getDepartmentName()}</span>
          </p>
          <button
            onClick={onClickButtonSendEmail}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Envoyer par email
          </button>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      ) : (
        <Loader2 className="size-10 text-white animate-spin" />
      )}
    </div>
  );
};

export default ResultsPage;
