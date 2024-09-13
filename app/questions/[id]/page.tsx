import QCardComponent from "@/components/questions/qCard";
import React from "react";
import { promises as fs } from "fs";

async function getQuestions() {
  const file_agp = await fs.readFile(
    `${process.cwd()}/data/questions-agp.json`,
    "utf-8"
  );
  const questions_agp = JSON.parse(file_agp);
  const questions = [...questions_agp];
  questions.sort(() => Math.random() - 0.5);
  return questions;
}

const QuestionListPage = async () => {
  const questions = await getQuestions();

  return (
    <div className="grid items-center justify-items-center h-screen mx-auto">
      <main className="flex flex-col w-full gap-4 row-start-2 items-center sm:items-start">
        <QCardComponent questions={questions} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
};

export default QuestionListPage;
