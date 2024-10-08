"use client";

import { useEffect, useState } from "react";
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
import { kAnswersScore } from "@/constants";
import { useStore } from "@/hooks/use-store";

const answersScore: { [key: string]: number } = kAnswersScore;

const QCardComponent = ({ questions }: QCardComponentProps) => {
  const router = useRouter();
  const [personId, setPersonId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPerson = useStore.getState().personId;

      if (storedPerson) {
        setPersonId(storedPerson);
      }
    }
  }, []);

  const saveResponse = async () => {
    if (personId) {
      try {
        await fetch("/api/result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personId: personId,
            scores: answersScore,
          }),
        });
      } catch (err) {
        console.error("Error saving response:", err);
      }
    } else {
      console.error("Person ID is not available");
    }
    if (currentQuestionIndex === questions.length - 1) {
      router.push(`/results/${personId}`);
    }
  };

  const handleNextQuestion = async () => {
    if (selectedAnswer === undefined) return;

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
          questions[currentQuestionIndex].answers[i].answer === selectedAnswer
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
            answersScore[
              questions[currentQuestionIndex].answers[i].categories[j]
            ] += 1;
          }
        }
      }

      await saveResponse();
    }
    setSelectedAnswer(undefined);
  };

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
            <Progress
              value={progress}
              className="[&>*]:bg-indigo-400 bg-indigo-100"
            />
            <CardTitle className="text-lg sm:text-2xl md:text-3xl text-center">
              {questions[currentQuestionIndex].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup value={selectedAnswer} onValueChange={(value) => setSelectedAnswer(value)}>
              {questions[currentQuestionIndex].answers.map((answer) => (
                <div key={answer.answer} className="flex items-center gap-3">
                  <RadioGroupItem
                    value={answer.answer}
                    id={answer.answer}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={answer.answer}
                    className="flex items-center justify-between w-full my-2 px-4 py-3 text-sm sm:text-base font-medium rounded-xl cursor-pointer bg-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-indigo-400 peer-data-[state=checked]:text-white text-justify"
                  >
                    {answer.answer}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              className="rounded-full border border-solid border-black/[.08] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 font-semibold"
              variant={"destructive"}
              onClick={handleQuit}
            >
              Quitter
            </Button>
            <Button
              className="rounded-full border border-solid border-indigo-400 transition-colors flex items-center bg-indigo-700 justify-center hover:bg-indigo-800 hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 font-semibold"
              onClick={handleNextQuestion}
            >
              Question suivante
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default QCardComponent;
