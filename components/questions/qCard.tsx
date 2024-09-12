"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

type QCardComponentProps = {
  questions: {
    question: string;
    answers: {
      answer: string;
      categories: string[];
    }[];
  }[];
  // person: {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  //   church: string;
  // };
};

const AnswersScore: { [key: string]: number } = {
  AGP: 0,
  "AGP-1": 0,
  "AGP-2": 0,
  "AGP-3": 0,
  "AGP-4": 0,
  "AGP-5": 0,
  "AGP-6": 0,
  "AGP-7": 0,
  "AGP-8": 0,
  "AGP-9": 0,

  EAS: 0,
  "EAS-1": 0,
  "EAS-2": 0,
  "EAS-3": 0,

  SBE: 0,
  "SBE-1": 0,
  "SBE-2": 0,
  "SBE-3": 0,

  MIC: 0,
  "MIC-1": 0,
  "MIC-2": 0,
  "MIC-3": 0,

  RDDT: 0,
  "RDDT-1": 0,
  "RDDT-2": 0,
};

const QCardComponent = ({ questions }: QCardComponentProps) => {
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleNextQuestion = () => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      for (let i = 0; i < questions[currentQuestionIndex].answers.length; i++) {
        if (
          questions[currentQuestionIndex].answers[i].answer === selectedAnswer
        ) {
          for (
            let j = 0;
            j < questions[currentQuestionIndex].answers[i].categories.length;
            j++
          ) {
            AnswersScore[
              questions[currentQuestionIndex].answers[i].categories[j]
            ] += 1;
          }
        }
      }
      setSelectedAnswer("");
    } else {
      for (let i = 0; i < questions[currentQuestionIndex].answers.length; i++) {
        if (
          questions[currentQuestionIndex].answers[i].answer === selectedAnswer
        ) {
          for (
            let j = 0;
            j < questions[currentQuestionIndex].answers[i].categories.length;
            j++
          ) {
            AnswersScore[
              questions[currentQuestionIndex].answers[i].categories[j]
            ] += 1;
          }
        }
      }
      // store in the local storage
      localStorage.setItem("responses", JSON.stringify(AnswersScore));
      router.push("/results");
    }
  };

  const handleQuit = () => {
    router.push("/");
  };

  if (!questions || questions.length === 0) {
    return <Loader2 className="size-10 text-white animate-spin" />;
  }
  return (
    <div className="flex w-full justify-center">
      <Card className="w-full p-6 space-y-6 dark:">
        <CardHeader>
          <Progress value={progress} />
          <CardTitle className="text-2xl">
            {questions[currentQuestionIndex].question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup onValueChange={(value) => setSelectedAnswer(value)}>
            {questions[currentQuestionIndex].answers.map((answer) => (
              <div key={answer.answer} className="flex items-center gap-3">
                <RadioGroupItem
                  value={answer.answer}
                  id={answer.answer}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={answer.answer}
                  className="flex items-center justify-between w-full my-2 px-4 py-3 text-lg font-medium rounded-xl cursor-pointer bg-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                >
                  {answer.answer}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[0.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:hover:text-black"
            variant={"destructive"}
            onClick={handleQuit}
          >
            Quitter le questionnaire
          </Button>
          <Button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[0.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:hover:text-black"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            {currentQuestionIndex < questions.length - 1
              ? "Question Suivante"
              : "Résultats"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QCardComponent;
