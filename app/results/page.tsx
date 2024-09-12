"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { categories } from "@/constants";

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
        </div>
      ) : (
        <Loader2 className="size-10 text-white animate-spin" />
      )}
    </div>
  );
};

export default ResultsPage;
