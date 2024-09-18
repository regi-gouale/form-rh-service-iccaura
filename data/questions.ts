import { questionsAGP } from "@/data/questions/questions-agp";
import { questionsEAS } from "@/data/questions/questions-eas";
import { questionsMIC } from "@/data/questions/questions-mic";
import { questionsRT } from "@/data/questions/questions-rt";
import { questionsSBE } from "@/data/questions/questions-sbe";

export const questions = [
  ...questionsAGP,
  ...questionsEAS,
  ...questionsMIC,
  ...questionsRT,
  ...questionsSBE,
];
