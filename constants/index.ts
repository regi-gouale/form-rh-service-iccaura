import { TScore } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const kChurches = [
  {
    id: uuidv4(),
    value: "Campus Lyon - Vaulx-En-Vélin",
    label: "Campus Lyon - Vaulx-En-Vélin",
    address: "",
  },
  {
    id: uuidv4(),
    value: "Église de Grenoble",
    label: "Église de Grenoble",
    address: "",
  },
  {
    id: uuidv4(),
    value: "Église de Clermont-Ferrand",
    label: "Église de Clermont-Ferrand",
    address: "",
  },
  {
    id: uuidv4(),
    value: "Église de Sain-Etienne",
    label: "Église de Saint-Etienne",
    address: "",
  },
  {
    id: uuidv4(),
    value: "Église de Lyon - Centre",
    label: "Église de Lyon - Centre",
    address: "",
  },

  {
    id: uuidv4(),
    address: "",
    value: "Famille d'Annecy",
    label: "Famille d'Annecy",
  },
  {
    id: uuidv4(),
    address: "",
    value: "Famille d'Annemasse",
    label: "Famille d'Annemasse",
  },
  {
    id: uuidv4(),
    address: "",
    value: "Famille de Bourg-en-Bresse",
    label: "Famille de Bourg-en-Bresse",
  },
  {
    id: uuidv4(),
    address: "",
    value: "Famille de Chambéry",
    label: "Famille de Chambéry",
  },
  {
    id: uuidv4(),
    address: "",
    value: "Famille de Valence",
    label: "Famille de Valence",
  },
  {
    id: uuidv4(),
    address: "",
    value: "Famille de Vichy",
    label: "Famille de Vichy",
  },
];

export const kFieldsScores: { [key: string]: TScore } = {
  AGP: {
    score: 0,
    totalQuestions: 10,
  },
  EAS: {
    score: 0,
    totalQuestions: 10,
  },
  SBE: {
    score: 0,
    totalQuestions: 12,
  },
  MIC: {
    score: 0,
    totalQuestions: 9,
  },
  RT: {
    score: 0,
    totalQuestions: 8,
  },
};

export const kDepartmentsScores: { [key: string]: TScore } = {
  AGP_1: {
    score: 0,
    totalQuestions: 3,
  },
  AGP_2: {
    score: 0,
    totalQuestions: 2,
  },
  AGP_3: {
    score: 0,
    totalQuestions: 2,
  },
  AGP_4: {
    score: 0,
    totalQuestions: 3,
  },
  AGP_5: {
    score: 0,
    totalQuestions: 4,
  },
  AGP_6: {
    score: 0,
    totalQuestions: 2,
  },
  AGP_7: {
    score: 0,
    totalQuestions: 7,
  },
  AGP_8: {
    score: 0,
    totalQuestions: 3,
  },
  AGP_9: {
    score: 0,
    totalQuestions: 2,
  },
  AGP_10: {
    score: 0,
    totalQuestions: 2,
  },
  AGP_11: {
    score: 0,
    totalQuestions: 1,
  },
  EAS_1: {
    score: 0,
    totalQuestions: 6,
  },
  EAS_2: {
    score: 0,
    totalQuestions: 8,
  },
  EAS_3: {
    score: 0,
    totalQuestions: 2,
  },
  EAS_4: {
    score: 0,
    totalQuestions: 2,
  },
  SBE_1: {
    score: 0,
    totalQuestions: 4,
  },
  SBE_2: {
    score: 0,
    totalQuestions: 4,
  },
  SBE_3: {
    score: 0,
    totalQuestions: 4,
  },
  MIC_1: {
    score: 0,
    totalQuestions: 3,
  },
  MIC_2: {
    score: 0,
    totalQuestions: 2,
  },
  MIC_3: {
    score: 0,
    totalQuestions: 4,
  },
  RT_1: {
    score: 0,
    totalQuestions: 4,
  },
  RT_2: {
    score: 0,
    totalQuestions: 4,
  },
};

export const kAGPDepartmentsIds = [
  "AGP_1",
  "AGP_2",
  "AGP_3",
  "AGP_4",
  "AGP_5",
  "AGP_6",
  "AGP_7",
  "AGP_8",
  "AGP_9",
  "AGP_10",
  "AGP_11",
];

export const kEASDepartmentsIds = ["EAS_1", "EAS_2", "EAS_3", "EAS_4"];

export const kSBEDepartmentsIds = ["SBE_1", "SBE_2", "SBE_3"];

export const kMICDepartmentsIds = ["MIC_1", "MIC_2", "MIC_3"];

export const kRTDepartmentsIds = ["RT_1", "RT_2"];

export const kAnswersScore: { [key: string]: number } = {
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
  AGP_10: 0,
  AGP_11: 0,

  EAS: 0,
  EAS_1: 0,
  EAS_2: 0,
  EAS_3: 0,
  EAS_4: 0,

  SBE: 0,
  SBE_1: 0,
  SBE_2: 0,
  SBE_3: 0,

  MIC: 0,
  MIC_1: 0,
  MIC_2: 0,
  MIC_3: 0,

  RT: 0,
  RT_1: 0,
  RT_2: 0,
};