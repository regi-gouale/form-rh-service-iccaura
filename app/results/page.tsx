"use client";

import ResultsComponent from "@/components/results/rPage";
import { Loader2 } from "lucide-react";

const ResultsPage = () => {
  const person = getPerson();
  const responses = getResponses();

  function getPerson() {
    if (typeof window !== "undefined" && typeof localStorage !== undefined) {
      const storedPerson = localStorage.getItem("person");
      if (!storedPerson) {
        console.error("No person found");
      }
      return JSON.parse(storedPerson!);
    }
  }

  function getResponses() {
    if (typeof window !== "undefined" && typeof localStorage !== undefined) {
      const storedResponses = localStorage.getItem("responses");
      if (!storedResponses) {
        console.error("No responses found");
      }
      return JSON.parse(storedResponses!);
    }
  }

  return (
    <div className="grid items-center justify-items-center h-screen mx-auto">
      {person && responses ? (
        <ResultsComponent person={person} responses={responses} />
      ) : (
        <Loader2 className="size-10 text-white animate-spin" />
      )}
    </div>
  );
};

export default ResultsPage;
