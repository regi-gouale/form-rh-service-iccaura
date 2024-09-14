import QCardComponent from "@/components/questions/qCard";
import React from "react";
import { questions } from "@/data/questions";

async function getQuestions() {
  const questionList = questions;
  questionList.sort(() => Math.random() - 0.5);
  return questionList;
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
