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
import { QCardComponentProps } from "@/types";

const answersScore: { [key: string]: number } = {
  AGP: 0,
  AGP_1: 0,
  AGP_2: 0,
  AGP_3: 0,
  AGP_4: 0,
  AGP_5: 0,
  AGP_6: 0,
  AGP_7: 0,
  AGP_8: 0,
  AGP_9: 0,

  EAS: 0,
  EAS_1: 0,
  EAS_2: 0,
  EAS_3: 0,

  SBE: 0,
  SBE_1: 0,
  SBE_2: 0,
  SBE_3: 0,

  MIC: 0,
  MIC_1: 0,
  MIC_2: 0,
  MIC_3: 0,

  RDDT: 0,
  RDDT_1: 0,
  RDDT_2: 0,
  RDDT_3: 0,
};

const QCardComponent = ({ questions }: QCardComponentProps) => {
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  // const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleNextQuestion = (answer: string) => {
    // setSelectedAnswer(answer);
    if (currentQuestionIndex === 0) {
      Object.keys(answersScore).forEach((key) => {
        answersScore[key] = 0;
      });
    }

    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      for (let i = 0; i < questions[currentQuestionIndex].answers.length; i++) {
        if (
          questions[currentQuestionIndex].answers[i].answer === answer
        ) {
          for (
            let j = 0;
            j < questions[currentQuestionIndex].answers[i].categories.length;
            j++
          ) {
            answersScore[
              questions[currentQuestionIndex].answers[i].categories[j]
            ] += 1;
          }
        }
      }
      // setSelectedAnswer("");
    } else {
      for (let i = 0; i < questions[currentQuestionIndex].answers.length; i++) {
        if (
          questions[currentQuestionIndex].answers[i].answer === answer
        ) {
          for (
            let j = 0;
            j < questions[currentQuestionIndex].answers[i].categories.length;
            j++
          ) {
            answersScore[
              questions[currentQuestionIndex].answers[i].categories[j]
            ] += 1;
          }
        }
      }
      // store in the local storage
      localStorage.setItem("responses", JSON.stringify(answersScore));
      router.push("/results");
    }
  };

  // const handleSelectAnswer = (answer: string) => {
  //   console.log("answer", answer);

  //   setSelectedAnswer(answer);
  //   console.log("selectedAnswer from handleSelectAnswer", selectedAnswer);
  //   handleNextQuestion();
  // };

  const handleQuit = () => {
    router.push("/");
  };

  if (!questions || questions.length === 0) {
    return <Loader2 className="size-10 text-white animate-spin" />;
  }
  return (
    <div className="flex w-full justify-center">
      <div className="max-w-3xl mx-8">
        <Card className="w-full p-3 space-y-3">
          <CardHeader>
            <Progress value={progress} />
            <CardTitle className="text-lg sm:text-2xl md:text-3xl text-justify">
              {questions[currentQuestionIndex].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup
              onValueChange={(value) => handleNextQuestion(value)}
            >
              {questions[currentQuestionIndex].answers.map((answer) => (
                <div key={answer.answer} className="flex items-center gap-3">
                  <RadioGroupItem
                    value={answer.answer}
                    id={answer.answer}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={answer.answer}
                    className="flex items-center justify-between w-full my-2 px-4 py-3 text-sm sm:text-base font-medium rounded-xl cursor-pointer bg-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground text-justify"
                  >
                    {answer.answer}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[0.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:hover:text-black"
              variant={"destructive"}
              onClick={handleQuit}
            >
              Quitter
            </Button>
            {/* <Button
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[0.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:hover:text-black"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              {currentQuestionIndex < questions.length - 1
                ? "Suivant"
                : "Résultats"}
            </Button> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default QCardComponent;
