"use client";

import { fields } from "@/data/fields";
import { TScore } from "@/types";
import { Person, Prisma, Result } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import {
//   ChartConfig,
//   // ChartContainer,
//   // ChartTooltip,
//   // ChartTooltipContent,
// } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { sendEmail } from "@/lib/send-email";
import { getMailMessageHtml } from "@/lib/utils";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   LabelList,
//   XAxis,
//   YAxis,
// } from "recharts";
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

  }, 1000);

  const onBackAndSendEmail = () => {
    sendEmail({
      email: person!.email,
      name: `${person!.firstName} ${person!.lastName}`,
      messageText: `\nBonjour ${
        person!.firstName
      },\n\nAprès analyse des informations fournies, il semblerait que les services les mieux adaptés à votre situation soit celui de la Filière ${getFieldName(
        getFieldsAndDepartmentsRecommandations().firstRecommandation.field
      )}. Plus précisément, il s'agirait du Département des ${getDepartmentName(
        getFieldsAndDepartmentsRecommandations().firstRecommandation.department
      )}. Ou bien celui de la filière ${getFieldName(
        getFieldsAndDepartmentsRecommandations().secondRecommandation.field
      )}, plus précisement le département : ${getDepartmentName(
        getFieldsAndDepartmentsRecommandations().secondRecommandation.department
      )} \nCes départements pourront répondre au mieux à vos besoins et vous apporter l'assistance nécessaire. N'hésitez pas à faire part de vos éventuelles questions ou préoccupations à l'équipe des ressources humaines.\n\nBien cordialement,\nÉglise Impact Centre Chrétien`,
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
    router.push("/");
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

  // const getChartFirstRecommandationData = () => {
  //   const { firstRecommandation } = getFieldsAndDepartmentsRecommandations();
  //   const fieldId = firstRecommandation.field;

  //   const fieldDepartmentsScores = departmentsScoresOfField(fieldId);

  //   const chartData = [];
  //   for (const key in fieldDepartmentsScores) {
  //     chartData.push({
  //       department: key,
  //       score: fieldDepartmentsScores[key].score,
  //       fill: "#1a1e18",
  //     });
  //   }
  //   return chartData;
  // };

  // const getChartFirstRecommandationConfig = () => {
  //   const { firstRecommandation } = getFieldsAndDepartmentsRecommandations();
  //   const fieldId = firstRecommandation.field;

  //   const fieldDepartmentsScores = departmentsScoresOfField(fieldId);
  //   const chartConfig = {} as ChartConfig;
  //   for (const key in fieldDepartmentsScores) {
  //     chartConfig[key] = {
  //       label: key,
  //       color: "#1a1e18",
  //     };
  //   }
  //   return chartConfig;
  // };

  // const getChartSecondRecommandationData = () => {
  //   const { secondRecommandation } = getFieldsAndDepartmentsRecommandations();
  //   const fieldId = secondRecommandation.field;

  //   const fieldDepartmentsScores = departmentsScoresOfField(fieldId);

  //   const chartData = [];
  //   for (const key in fieldDepartmentsScores) {
  //     chartData.push({
  //       department: key,
  //       score: fieldDepartmentsScores[key].score,
  //       fill: "#1a1e18",
  //     });
  //   }
  //   return chartData;
  // };

  // const getChartSecondRecommandationConfig = () => {
  //   const { secondRecommandation } = getFieldsAndDepartmentsRecommandations();
  //   const fieldId = secondRecommandation.field;

  //   const fieldDepartmentsScores = departmentsScoresOfField(fieldId);
  //   const chartConfig = {} as ChartConfig;
  //   for (const key in fieldDepartmentsScores) {
  //     chartConfig[key] = {
  //       label: key,
  //       color: "#1a1e18",
  //     };
  //   }
  //   return chartConfig;
  // };

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-3xl mx-8">
        <h1 className="text-2xl sm:text-4xl text-center sm:text-justify font-semibold mb-6 sm:mb-8">
          Proposition d&apos;Orientation pour le Service
        </h1>
        <div className="flex justify-center mt-8">
          <Button
            onClick={onBackAndSendEmail}
            className="w-1/2 bg-purple-600 hover:bg-purple-800 mb-6"
          >
            Envoyer par mail
          </Button>
        </div>
        <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6">
          Bonjour <strong>{person?.firstName}</strong>,
        </h2>
        <p className="mb-2 sm:mb-3 text-justify">
          Après l&apos;analyse des réponses fournies, nous vous proposons les
          récommandations suivantes:
        </p>
        <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2 sm:gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl font-extrabold">
                1ère Récommandation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <p className="text-center text-base sm:text-lg mb-4 sm:mb-6">
                <span className="font-semibold">Filière</span> :{" "}
                {getFieldName(
                  getFieldsAndDepartmentsRecommandations().firstRecommandation
                    .field
                )}
              </p>
              <Separator className="mb-2" />
              <p className="text-center text-base sm:text-lg mb-4 sm:mb-6">
                <span className="font-semibold">Département</span> :{" "}
                {getDepartmentName(
                  getFieldsAndDepartmentsRecommandations().firstRecommandation
                    .department
                )}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl font-extrabold">
                2ème Récommandation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <p className="text-center text-base sm:text-lg mb-4 sm:mb-6">
                <span className="font-semibold">Filière</span> :{" "}
                {getFieldName(
                  getFieldsAndDepartmentsRecommandations().secondRecommandation
                    .field
                )}
              </p>
              <Separator className="mb-2" />
              <p className="text-center text-base sm:text-lg mb-4 sm:mb-6">
                <span className="font-semibold">Département</span> :{" "}
                {getDepartmentName(
                  getFieldsAndDepartmentsRecommandations().secondRecommandation
                    .department
                )}
              </p>
            </CardContent>
          </Card>
        </div>
        {/* <div className="grid grid-cols-1 gap-6 md:gap-8 w-full justify-between">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg">
                Tendance par filière
              </CardTitle>
              <CardContent>
                <Separator />
                <ChartContainer config={getChartFirstRecommandationConfig()}>
                  <BarChart
                    accessibilityLayer
                    layout="horizontal"
                    margin={{ left: 1, right: 1 }}
                    data={getChartFirstRecommandationData()}
                  >
                    <XAxis
                      dataKey="field"
                      type="category"
                      tickLine={false}
                      tickMargin={10}
                    />
                    <YAxis dataKey="score" type="number" hide />
                    <Bar dataKey="score" fill="#8884d8" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-base">
                Filière{" "}
                {/* {getFieldName(
                  getFieldAndDepartmentIds()!.departmentId.split("_")[0]
                )} */}
        {/* </CardTitle>
              <CardContent>
                <Separator />
                <ChartContainer config={getChartSecondRecommandationConfig()}>
                  <BarChart
                    accessibilityLayer
                    layout="vertical"
                    margin={{ left: 1, right: 16 }}
                    data={getChartSecondRecommandationData()}
                  >
                    <CartesianGrid horizontal={false} />
                    <YAxis
                      dataKey="department"
                      type="category"
                      tickLine={false}
                      tickMargin={1}
                      axisLine={false}
                      tick={{ fill: "var(--color-label)", fontSize: "60%" }}
                      tickFormatter={(value) =>
                        getDepartmentName(value)!
                          .split(" ")[0]
                          .split(",")[0]
                          .toUpperCase()
                      }
                      
                    />
                    <XAxis dataKey="score" type="number" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar dataKey="score" fill="#8884d8" radius={4}> */}
        {/* <LabelList
                        dataKey="department"
                        position="insideLeft"
                        offset={8}
                        className="fill-[--color-label]"
                      /> */}
        {/* <LabelList
                        dataKey="score"
                        position="right"
                        offset={2}
                        className="fill-[--color-label]"
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </CardHeader>
          </Card>
        </div> */}
      </div>
    </div>
  );
};
export default ShowResultsComponent;
