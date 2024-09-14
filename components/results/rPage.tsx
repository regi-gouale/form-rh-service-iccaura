"use client";

import { sendEmail } from "@/lib/send-email";
import { getMailMessageHtml, getMailMessageText } from "@/lib/utils";
import { ResultsComponentProps, TScore } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { fields } from "@/constants";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { Separator } from "@/components/ui/separator";

const ResultsComponent = ({ person, responses }: ResultsComponentProps) => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleSendEmail = () => {
    sendEmail({
      email: person!.qEmail,
      name: `${person!.qFirstName} ${person!.qLastName}`,
      messageText: getMailMessageText({
        firstname: person!.qFirstName,
        field: getMaxFieldName()!,
        department: getMaxDepartmentName()!,
      }),
      messageHtml: getMailMessageHtml({
        firstname: person!.qFirstName,
        field: getMaxFieldName()!,
        department: getMaxDepartmentName()!,
      }),
    });
  };

  const calculateScores = () => {
    const fieldsScores: { [key: string]: TScore } = {
      AGP: {
        score: 0,
        totalQuestions: 39,
      },
      EAS: {
        score: 0,
        totalQuestions: 24,
      },
      SBE: {
        score: 0,
        totalQuestions: 25,
      },
      MIC: {
        score: 0,
        totalQuestions: 34,
      },
      RDDT: {
        score: 0,
        totalQuestions: 31,
      },
    };

    const departmentsScores: { [key: string]: TScore } = {
      AGP_1: {
        score: 0,
        totalQuestions: 4,
      },
      AGP_2: {
        score: 0,
        totalQuestions: 2,
      },
      AGP_3: {
        score: 0,
        totalQuestions: 3,
      },
      AGP_4: {
        score: 0,
        totalQuestions: 4,
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
        totalQuestions: 6,
      },
      AGP_8: {
        score: 0,
        totalQuestions: 3,
      },
      AGP_9: {
        score: 0,
        totalQuestions: 2,
      },
      EAS_1: {
        score: 0,
        totalQuestions: 8,
      },
      EAS_2: {
        score: 0,
        totalQuestions: 3,
      },
      EAS_3: {
        score: 0,
        totalQuestions: 8,
      },
      SBE_1: {
        score: 0,
        totalQuestions: 7,
      },
      SBE_2: {
        score: 0,
        totalQuestions: 7,
      },
      SBE_3: {
        score: 0,
        totalQuestions: 7,
      },
      MIC_1: {
        score: 0,
        totalQuestions: 7,
      },
      MIC_2: {
        score: 0,
        totalQuestions: 7,
      },
      MIC_3: {
        score: 0,
        totalQuestions: 7,
      },
      RDDT_1: {
        score: 0,
        totalQuestions: 4,
      },
      RDDT_2: {
        score: 0,
        totalQuestions: 100,
      },
      RDDT_3: {
        score: 0,
        totalQuestions: 4,
      },
    };

    if (!responses) return;

    for (const key in responses) {
      if (key.includes("_")) {
        departmentsScores[key].score = Math.round(
          (responses[key] / departmentsScores[key].totalQuestions) * 100
        );
      } else {
        fieldsScores[key].score = Math.round(
          (responses[key] / fieldsScores[key].totalQuestions) * 100
        );
      }
    }

    return { fieldsScores, departmentsScores };
  };

  const departmentsScoresOfAGPField = () => {
    const { departmentsScores } = calculateScores()!;
    const AGPDepartments = [
      "AGP_1",
      "AGP_2",
      "AGP_3",
      "AGP_4",
      "AGP_5",
      "AGP_6",
      "AGP_7",
      "AGP_8",
      "AGP_9",
    ];
    const AGPDepartmentsScores = {} as { [key: string]: TScore };
    for (const key of AGPDepartments) {
      AGPDepartmentsScores[key] = departmentsScores[key];
    }
    return AGPDepartmentsScores;
  };

  const departmentsScoresOfEASField = () => {
    const { departmentsScores } = calculateScores()!;
    const EASDepartments = ["EAS_1", "EAS_2", "EAS_3"];
    const EASDepartmentsScores = {} as { [key: string]: TScore };
    for (const key of EASDepartments) {
      EASDepartmentsScores[key] = departmentsScores[key];
    }
    return EASDepartmentsScores;
  };

  const departmentsScoresOfSBEField = () => {
    const { departmentsScores } = calculateScores()!;
    const SBEDepartments = ["SBE_1", "SBE_2", "SBE_3"];
    const SBEDepartmentsScores = {} as { [key: string]: TScore };
    for (const key of SBEDepartments) {
      SBEDepartmentsScores[key] = departmentsScores[key];
    }
    return SBEDepartmentsScores;
  };

  const departmentsScoresOfMICField = () => {
    const { departmentsScores } = calculateScores()!;
    const MICDepartments = ["MIC_1", "MIC_2", "MIC_3"];
    const MICDepartmentsScores = {} as { [key: string]: TScore };
    for (const key of MICDepartments) {
      MICDepartmentsScores[key] = departmentsScores[key];
    }
    return MICDepartmentsScores;
  };

  const departmentsScoresOfRDDTField = () => {
    const { departmentsScores } = calculateScores()!;
    const RDDTDepartments = ["RDDT_1", "RDDT_2", "RDDT_3"];
    const RDDTDepartmentsScores = {} as { [key: string]: TScore };
    for (const key of RDDTDepartments) {
      RDDTDepartmentsScores[key] = departmentsScores[key];
    }
    return RDDTDepartmentsScores;
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
      case "RDDT":
        return departmentsScoresOfRDDTField();
    }
  };

  const getFieldAndDepartmentIds = () => {
    const { fieldsScores: fieldScores, departmentsScores: departmentScores } =
      calculateScores()!;

    let maxScoreDepartment = 0;
    let maxDepartment = "";
    for (const key in departmentScores) {
      if (departmentScores[key].score > maxScoreDepartment) {
        maxScoreDepartment = departmentScores[key].score;
        maxDepartment = key;
      }
    }

    let maxScoreField = 0;
    let maxField = "";
    for (const key in fieldScores) {
      if (fieldScores[key].score > maxScoreField) {
        maxScoreField = fieldScores[key].score;
        maxField = key;
      }
    }

    return {
      fieldId: maxField,
      departmentId: maxDepartment,
    };
  };

  const getMaxFieldName = () => {
    const fieldId = getFieldAndDepartmentIds().fieldId;
    return getFieldName(fieldId);
  };

  const getFieldName = (fieldId: string) => {
    for (const field of fields) {
      if (field.id === fieldId) {
        return field.name;
      }
    }
  };

  const getMaxDepartmentName = () => {
    const departmentId = getFieldAndDepartmentIds().departmentId;
    return getDepartmentName(departmentId);
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

  const getChartMaxFieldData = () => {
    const { fieldsScores } = calculateScores()!;
    const chartData = [];
    for (const key in fieldsScores) {
      chartData.push({
        field: key,
        score: fieldsScores[key].score,
        fill: "#1a1e18",
      });
    }
    return chartData;
  };

  const getChartMaxDepartmentData = () => {
    const departmentId = getFieldAndDepartmentIds().departmentId;
    const fieldId = departmentId.split("_")[0];

    const departmentsScores = departmentsScoresOfField(fieldId);
    const chartData = [];
    for (const key in departmentsScores) {
      chartData.push({
        department: key,
        score: departmentsScores[key].score,
        fill: "#1a1e18",
      });
    }
    return chartData;
  };

  const getChartMaxFieldConfig = () => {
    const { fieldsScores } = calculateScores()!;
    const chartConfig = {} as ChartConfig;
    for (const key in fieldsScores) {
      chartConfig[key] = {
        label: key,
        color: "#1a1e18",
      };
    }
    return chartConfig;
  };

  const getChartMaxDepartmentConfig = () => {
    const departmentId = getFieldAndDepartmentIds().departmentId;
    const fieldId = departmentId.split("_")[0];

    const departmentsScores = departmentsScoresOfField(fieldId);
    const chartConfig = {} as ChartConfig;
    for (const key in departmentsScores) {
      chartConfig[key] = {
        label: key,
        color: "#1a1e18",
      };
    }
    return chartConfig;
  };

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-3xl mx-8">
        <h1 className="text-2xl sm:text-4xl text-center sm:text-justify font-bold mb-6 sm:mb-8">
          Proposition du Service Adapté
        </h1>
        <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6">
          Bonjour <strong> {person.qFirstName}</strong>,
        </h2>
        <p className="mb-2 sm:mb-3 text-justify">
          Après l&apos;analyse des réponses fournies, il semblerait que le
          service le mieux adapté à votre situation soit celui de la filière{" "}
          <strong>{getMaxFieldName()}</strong>. <br></br>
        </p>
        <p className="mb-2 sm:mb-3 text-justify">
          Plus précisement il s&apos;agirait du département{" "}
          <strong>{getMaxDepartmentName()}</strong>. Ce département répondra au
          mieux à vos attentes et besoins.
        </p>
        <p className="mb-2 sm:mb-3 text-justify">
          N&apos;hésitez pas à en discuter avec le département des réssources
          humaines, si vous avez des question ou des préocupations.
        </p>
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => {
              handleSendEmail();
              handleBackToHome();
            }}
            className="w-1/2 hover:bg-gray-600 mb-6 sm:mb-10"
          >
            Envoyer par email
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 w-full justify-between">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg">
                Tendance par filière
              </CardTitle>
              <CardContent>
                <Separator />
                <ChartContainer config={getChartMaxFieldConfig()}>
                  <BarChart
                    accessibilityLayer
                    layout="horizontal"
                    margin={{ left: 1, right: 1 }}
                    data={getChartMaxFieldData()}
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
                {getFieldName(
                  getFieldAndDepartmentIds()!.departmentId.split("_")[0]
                )}
              </CardTitle>
              <CardContent>
                <Separator />
                <ChartContainer config={getChartMaxDepartmentConfig()}>
                  <BarChart
                    accessibilityLayer
                    layout="vertical"
                    margin={{ left: 1, right: 16 }}
                    data={getChartMaxDepartmentData()}
                  >
                    <CartesianGrid horizontal={false} />
                    <YAxis
                      dataKey="department"
                      type="category"
                      tickLine={false}
                      tickMargin={1}
                      axisLine={false}
                      tick={{ fill: "var(--color-label)", fontSize: '60%' }}
                      tickFormatter={(value) =>
                        getDepartmentName(value)!
                          .split(" ")[0]
                          .split(",")[0]
                          .toUpperCase()
                      }
                      // hide
                    />
                    <XAxis dataKey="score" type="number" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar dataKey="score" fill="#8884d8" radius={4}>
                      {/* <LabelList
                        dataKey="department"
                        position="insideLeft"
                        offset={8}
                        className="fill-[--color-label]"
                      /> */}
                      <LabelList
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
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default ResultsComponent;
