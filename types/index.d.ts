export type QFormData = {
  name: string;
  email: string;
  messageText: string;
  messageHtml: string;
};


export type TChartFieldData = {
  field: string;
  score: number;
  fill: string;
};

export type TChartDepartmentData = {
  department: string;
  score: number;
  fill: string;
};

export type TScore = {
  score: number;
  totalQuestions: number;
};

export type TDepartmentConfig = {
  label: string;
  color: string;
};

export type TChartDepartmentsConfig = {
  [key: string]: {
    [key: string]: TDepartmentConfig;
  };
};

export interface IChurch {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  updeatedAt: string;
}

export type QCardComponentProps = {
  questions: {
    question: string;
    answers: {
      answer: string;
      categories: string[];
    }[];
  }[];
};

export type ResultsComponentProps = {
  person: Person;
  responses: Responses;
};