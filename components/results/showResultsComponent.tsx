"use client";

import { fields } from "@/data/fields";
import { TScore } from "@/types";
import { Person, Prisma, Result } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { sendEmail } from "@/lib/send-email";
import { getMailMessageHtml, getMailMessageText } from "@/lib/utils";

import {
  kAGPDepartmentsIds,
  kDepartmentsScores,
  kEASDepartmentsIds,
  kFieldsScores,
  kMICDepartmentsIds,
  kRTDepartmentsIds,
  kSBEDepartmentsIds,
} from "@/constants";
import { useStore } from "@/hooks/use-store";

const ShowResultsComponent = () => {
  const router = useRouter();

  const [personId, setPersonId] = useState<string | null>(null);

  const [person, setPerson] = useState<Person | null>(null);
  const [results, setResults] = useState<Result | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPerson = useStore.getState().personId;
      if (storedPerson) {
        setPersonId(storedPerson);
      }
    }
  }, []);

  useEffect(() => {
    const fetchPersonData = async (id: string) => {
      try {
        const response = await fetch(`/api/person?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setPerson(data);
        } else {
          console.error("Error fetching person data:", response.statusText);
        }
      } catch (err) {
        console.error("Error fetching person data:", err);
      }
    };
    if (personId) {
      fetchPersonData(personId);
    }
  }, [personId]);

  useEffect(() => {
    const fetchResponsesData = async (id: string) => {
      try {
        const response = await fetch(`/api/result?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error("Error fetching responses data:", response.statusText);
        }
      } catch (err) {
        console.error("Error fetching responses data:", err);
      }
    };
    if (personId) {
      fetchResponsesData(personId);
    }
  }, [personId]);

  setTimeout(() => {
    if (personId) {
      onSendEmail();
    }
  }, 3000);

  const onBackHome = () => {
    router.push("/");
  };

  const onSendEmail = () => {
    sendEmail({
      email: person!.email,
      name: `${person!.firstName} ${person!.lastName}`,
      messageText: getMailMessageText({
        firstname: person!.firstName!,
        field1: getFieldName(
          getFieldsAndDepartmentsRecommandations().firstRecommandation.field
        )!,
        department1: getDepartmentName(
          getFieldsAndDepartmentsRecommandations().firstRecommandation
            .department
        )!,
        field2: getFieldName(
          getFieldsAndDepartmentsRecommandations().secondRecommandation.field
        )!,
        department2: getDepartmentName(
          getFieldsAndDepartmentsRecommandations().secondRecommandation
            .department
        )!,
      }),
      messageHtml: getMailMessageHtml({
        firstname: person!.firstName!,
        field1: getFieldName(
          getFieldsAndDepartmentsRecommandations().firstRecommandation.field
        )!,
        department1: getDepartmentName(
          getFieldsAndDepartmentsRecommandations().firstRecommandation
            .department
        )!,
        field2: getFieldName(
          getFieldsAndDepartmentsRecommandations().secondRecommandation.field
        )!,
        department2: getDepartmentName(
          getFieldsAndDepartmentsRecommandations().secondRecommandation
            .department
        )!,
      }),
    });
  };

  const calculateScores = () => {
    const fieldsScores: { [key: string]: TScore } = kFieldsScores;

    const departmentsScores: { [key: string]: TScore } = kDepartmentsScores;

    if (
      results &&
      results.scores &&
      typeof results.scores === "object" &&
      !Array.isArray(results.scores)
    ) {
      const responses = results.scores as Prisma.JsonObject;

      Object.keys(responses!).forEach((key) => {
        if (key.includes("_")) {
          if (responses[key] !== null && responses[key] !== undefined) {
            departmentsScores[key].score = Math.ceil(
              (Number(responses[key]) / departmentsScores[key].totalQuestions) *
                100
            );
          }
        } else {
          fieldsScores[key].score = Math.ceil(
            (Number(responses[key]) / fieldsScores[key].totalQuestions) * 100
          );
        }
      });
    }
    return { fieldsScores, departmentsScores };
  };

  const departmentsScoresOfAGPField = () => {
    const { departmentsScores } = calculateScores()!;
    const AGPDepartments = kAGPDepartmentsIds;
    const AGPDepartmentsScores = {} as { [key: string]: TScore };
    for (const key of AGPDepartments) {
      AGPDepartmentsScores[key] = departmentsScores[key];
    }
    return AGPDepartmentsScores;
  };

  const departmentsScoresOfEASField = () => {
    const { departmentsScores } = calculateScores()!;
    const EASDepartments = kEASDepartmentsIds;
    const EASDepartmentsScores = {} as { [key: string]: TScore };
    for (const key of EASDepartments) {
      EASDepartmentsScores[key] = departmentsScores[key];
    }
    return EASDepartmentsScores;
  };

  const departmentsScoresOfSBEField = () => {
    const { departmentsScores } = calculateScores()!;
    const SBEDepartments = kSBEDepartmentsIds;
    const SBEDepartmentsScores = {} as { [key: string]: TScore };
    for (const key of SBEDepartments) {
      SBEDepartmentsScores[key] = departmentsScores[key];
    }
    return SBEDepartmentsScores;
  };

  const departmentsScoresOfMICField = () => {
    const { departmentsScores } = calculateScores()!;
    const MICDepartments = kMICDepartmentsIds;
    const MICDepartmentsScores = {} as { [key: string]: TScore };
    for (const key of MICDepartments) {
      MICDepartmentsScores[key] = departmentsScores[key];
    }
    return MICDepartmentsScores;
  };

  const departmentsScoresOfRTField = () => {
    const { departmentsScores } = calculateScores()!;
    const RTDepartments = kRTDepartmentsIds;
    const RTDepartmentsScores = {} as { [key: string]: TScore };
    for (const key of RTDepartments) {
      RTDepartmentsScores[key] = departmentsScores[key];
    }
    return RTDepartmentsScores;
  };

  const departmentsScoresOfField = (fieldId: string) => {
    switch (fieldId) {
      case "AGP":
        return departmentsScoresOfAGPField();
      case "EAS":
        return departmentsScoresOfEASField();
      case "SBE":
        return departmentsScoresOfSBEField();
      case "MIC":
        return departmentsScoresOfMICField();
      case "RT":
        return departmentsScoresOfRTField();
    }
  };

  const findMaxFieldAndDepartmentIds = () => {
    const { fieldsScores, departmentsScores } = calculateScores()!;

    let maxScoreDepartment: number = 0;
    let maxDepartmentId: string = "";

    for (const key in departmentsScores) {
      if (departmentsScores[key].score > maxScoreDepartment) {
        maxScoreDepartment = departmentsScores[key].score;
        maxDepartmentId = key;
      }
    }

    let maxScoreField: number = 0;
    let maxFieldId: string = "";

    for (const key in fieldsScores) {
      if (fieldsScores[key].score > maxScoreField) {
        maxScoreField = fieldsScores[key].score;
        maxFieldId = key;
      }
    }

    return { maxDepartmentId, maxFieldId };
  };

  const findMaxDepartmentScoreOfField = (fieldId: string) => {
    const departmentsScores: { [key: string]: TScore } =
      departmentsScoresOfField(fieldId)!;
    let maxScoreDepartment: number = 0;
    let maxDepartmentId: string = "";

    for (const key in departmentsScores) {
      if (key.includes(fieldId)) {
        if (departmentsScores[key].score > maxScoreDepartment) {
          maxScoreDepartment = departmentsScores[key].score;
          maxDepartmentId = key;
        }
      }
    }

    return { maxDepartmentId };
  };

  const getFieldName = (fieldId: string) => {
    for (const field of fields) {
      if (field.id === fieldId) {
        return field.name;
      }
    }
  };

  const getDepartmentName = (departmentId: string) => {
    const fieldId = departmentId.split("_")[0];

    for (const field of fields) {
      if (field.id === fieldId) {
        for (const department of field.departments) {
          if (department.id === departmentId) {
            return department.name;
          }
        }
      }
    }
  };

  const getFieldsAndDepartmentsRecommandations = () => {
    const { maxDepartmentId, maxFieldId } = findMaxFieldAndDepartmentIds();
    const firstRecommandation = {
      field: maxFieldId,
      department: findMaxDepartmentScoreOfField(maxFieldId).maxDepartmentId,
    };

    const secondRecommandation = {
      field: maxDepartmentId.split("_")[0],
      department: maxDepartmentId,
    };

    return { firstRecommandation, secondRecommandation };
  };

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-3xl mx-8">
        <h1 className="text-2xl sm:text-4xl text-center font-semibold mb-6 sm:mb-8">
          Félicitations <strong>{person?.firstName}</strong>! Tu as terminé ton
          test d’orientation.
        </h1>
        <div className="flex justify-center mt-8">
          <Button
            onClick={onBackHome}
            className="w-1/2 bg-purple-600 hover:bg-purple-800 mb-6 rounded-full p-2"
          >
            Retour à l&apos;accueil
          </Button>
        </div>
        <p className="text-lg md:text-xl mb-4 md:mb-6">
          Au regard des réponses données, les départements qui correspondent à
          ton profil relève de :{" "}
        </p>
        <ul className="list-inside mb-4 md:mb-6 space-y-2 flex flex-col">
          <li className="text-lg md:text-xl flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
            <div className="">
              la catégorie{" "}
              <span className="font-semibold text-purple-600">
                {getDepartmentName(
                  getFieldsAndDepartmentsRecommandations().firstRecommandation
                    .department
                )}
              </span>{" "}
              au sein du département{" "}
              <span className="font-semibold text-purple-600">
                {getFieldName(
                  getFieldsAndDepartmentsRecommandations().firstRecommandation
                    .field
                )}
              </span>
            </div>
          </li>
          <li className="text-lg md:text-xl flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
            <div className="">
              la catégorie{" "}
              <span className="font-semibold text-purple-600">
                {getDepartmentName(
                  getFieldsAndDepartmentsRecommandations().secondRecommandation
                    .department
                )}
              </span>{" "}
              au sein du département{" "}
              <span className="font-semibold text-purple-600">
                {getFieldName(
                  getFieldsAndDepartmentsRecommandations().secondRecommandation
                    .field
                )}
              </span>
            </div>
          </li>
        </ul>
        <p className="text-lg md:text-xl text-justify mb-4 md:mb-6">
          Tu seras contacté(e) par les Ressources Humaines pour un entretien.
          Les RH te présenteront de manière détaillée les différents
          départements en lien avec ton profil, répondront à tes questions, et
          te communiqueront toutes les informations nécessaires à ton
          intégration dans le service.
        </p>
        <p className="text-lg md:text-xl text-right">Soit béni(e)</p>
      </div>
    </div>
  );
};
export default ShowResultsComponent;
