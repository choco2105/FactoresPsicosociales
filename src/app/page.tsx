"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const pages = [
  {
    title: "FACTORES PSICOSOCIALES - IDENTIFICACIÓN DE SITUACIONES DE RIESGO",
    questions: [
      {
        label: "Actividad a la que se dedica su empresa:",
        type: "text",
        id: "empresa_actividad",
        required: true,
      },
      {
        label: "Sector o área a la que usted pertenece:",
        type: "text",
        id: "sector",
        required: true,
      },
      {
        label: "Certificación en calidad:",
        type: "text",
        id: "certificacion",
        required: true,
      },
      {
        label: "Jornada laboral:",
        type: "radio",
        id: "jornada",
        options: ["1 turno", "2 turnos", "3 turnos", "otros turnos"],
        required: true,
      },
      { label: "Cargo:", type: "text", id: "cargo", required: true },
      {
        label: "Número integrantes del comité de seguridad y salud en el trabajo:",
        type: "text",
        id: "comite_integrantes",
        required: true,
      },
    ],
  },
  {
    title: "Pregunta 1",
    questionText: "¿El trabajador tiene libertad para decidir cómo hacer su propio trabajo?",
    options: ["A", "B", "C", "D"],
    id: "pregunta1",
    required: true,
  },
  {
    title: "Pregunta 2",
    questionText: "¿Existe un procedimiento de atención a las posibles sugerencias y/o reclamaciones planteadas por los trabajadores?",
    options: ["A", "B", "C", "D"],
    id: "pregunta2",
    required: true,
  },
  {
    title: "Pregunta 3",
    questionText: "¿El trabajador tiene la posibilidad de ejercer el control sobre su ritmo de trabajo?",
    options: ["A", "B", "C", "D"],
    id: "pregunta3",
    required: true,
  },
  {
    title: "Pregunta 4",
    questionText: "¿El trabajador dispone de la información y de los medios necesarios (equipo, herramientas, etc.) para realizar su tarea?",
    options: ["A", "B", "C", "D"],
    id: "pregunta4",
    required: true,
  },
  {
    title: "Pregunta 5",
    questionText: "¿Ante la incorporación de nuevos trabajadores, ¿se les informa de los riesgos generales y específicos del puesto?",
    options: ["A", "B", "C", "D"],
    id: "pregunta5",
    required: true,
  },
  {
    title: "Pregunta 6",
    questionText: "¿Cuando el trabajador necesita ayuda y/o tiene cualquier duda acude a:",
    options: ["A", "B", "C", "D"],
    id: "pregunta6",
    required: true,
  },
  {
    title: "Pregunta 7",
    questionText: "¿Las situaciones de conflictividad entre trabajadores, ¿se intentan solucionar de manera abierta y clara?",
    options: ["A", "B", "C", "D"],
    id: "pregunta7",
    required: true,
  },
  {
    title: "Pregunta 8",
    questionText: "¿Pueden los trabajadores elegir sus días de vacaciones?",
    options: ["A", "B", "C", "D"],
    id: "pregunta8",
    required: true,
  },
  {
    title: "Pregunta 9",
    questionText: "¿El trabajador interviene y/o corrige los incidentes en su puesto de trabajo (equipo, máquina, etc.)?",
    options: ["A", "B", "C"],
    id: "pregunta9",
    required: true,
  },
  {
    title: "Pregunta 10",
    questionText: "¿El trabajador tiene posibilidad de realizar pausas dependiendo del esfuerzo (físico y/o mental) requerido por la actividad?",
    options: ["A", "B", "C", "D"],
    id: "pregunta10",
    required: true,
  },
  {
    title: "Pregunta 11",
    questionText: "¿Se utilizan medios formales para transmitir informaciones y comunicaciones a los trabajadores?",
    options: ["A", "B", "C", "D"],
    id: "pregunta11",
    required: true,
  },
  {
    title: "Pregunta 12",
    questionText: "En términos generales, ¿el ambiente de trabajo posibilita relaciones amistosas?",
    options: ["A", "B", "C", "D"],
    id: "pregunta12",
    required: true,
  },
  {
    title: "Pregunta 13",
    questionText: "La actuación del mando intermedio respecto a sus subordinados es:",
    options: ["A", "B", "C"],
    id: "pregunta13",
    required: true,
  },
  {
    title: "Pregunta 14",
    questionText: "¿Se recuperan los retrasos?",
    options: ["A", "B", "C", "D"],
    id: "pregunta14",
    required: true,
  },
  {
    title: "Pregunta 15",
    questionText: "¿Cuál es el criterio de retribución al trabajador?",
    options: ["A", "B", "C"],
    id: "pregunta15",
    required: true,
  },
  {
    title: "Pregunta 16",
    questionText: "¿Se facilitan las instrucciones precisas a los trabajadores sobre el modo correcto y seguro de realizar las tareas?",
    options: ["A", "B", "C", "D"],
    id: "pregunta16",
    required: true,
  },
  {
    title: "Pregunta 17",
    questionText: "¿El trabajador tiene la posibilidad de hablar durante la realización de su tarea?",
    options: ["A", "B", "C", "D", "E"],
    id: "pregunta17",
    required: true,
  },
  {
    title: "Pregunta 18",
    questionText: "¿Han recibido los mandos intermedios formación para el desempeño de sus funciones?",
    options: ["A", "B", "C", "D"],
    id: "pregunta18",
    required: true,
  },
  {
    title: "Pregunta 19",
    questionText: "¿Existe la posibilidad de organizar el trabajo en equipo?",
    options: ["A", "B", "C", "D"],
    id: "pregunta19",
    required: true,
  },
  {
    title: "Pregunta 20",
    questionText: "¿El trabajador controla el resultado de su trabajo y puede corregir los errores cometidos o defectos?",
    options: ["A", "B", "C", "D"],
    id: "pregunta20",
    required: true,
  },
  {
    title: "Pregunta 21",
    questionText: "¿Se organizan, de forma espontánea, eventos en los que participa la mayoría de la plantilla?",
    options: ["A", "B", "C"],
    id: "pregunta21",
    required: true,
  },
  {
    title: "Pregunta 22",
    questionText: "¿El trabajador puede detener el trabajo o ausentarse de su puesto?",
    options: ["A", "B", "C", "D"],
    id: "pregunta22",
    required: true,
  },
  {
    title: "Pregunta 23",
    questionText: "¿Existe, en general, un buen clima en el lugar de trabajo?",
    options: ["A", "B", "C", "D"],
    id: "pregunta23",
    required: true,
  },
  {
    title: "Pregunta 24",
    questionText: "¿El trabajador recibe información suficiente sobre los resultados de su trabajo?",
    options: ["A", "B", "C", "D"],
    id: "pregunta24",
    required: true,
  },
  {
    title: "Pregunta 25",
    questionText: "¿El trabajador tiene la opción de cambiar de puesto y/o de tarea a lo largo de su jornada laboral?",
    options: ["A", "B", "C", "D"],
    id: "pregunta25",
    required: true,
  },
  {
    title: "Pregunta 26",
    questionText: "¿Ante la incorporación de nuevas tecnologías, nueva maquinaria y/o nuevos métodos de trabajo ¿se instruye al trabajador para adaptarlo a esas nuevas situaciones?",
    options: ["A", "B", "C", "D"],
    id: "pregunta26",
    required: true,
  },
  {
    title: "Pregunta 27",
    questionText: "¿Qué tipo de relaciones son las habituales en la empresa?",
    options: ["A", "B", "C", "D"],
    id: "pregunta27",
    required: true,
  },
  {
    title: "Pregunta 28",
    questionText: "De los problemas que existen en un departamento, sección... ¿está siendo culpada alguna persona en concreto?",
    options: ["A", "B"],
    id: "pregunta28",
    required: true,
  },
  {
    title: "Pregunta 29",
    questionText: "¿Han aumentado las bajas de origen psicológico en la plantilla?",
    options: ["A", "B"],
    id: "pregunta29",
    required: true,
  },
  {
    title: "Pregunta 30",
    questionText: "¿Hay alguna persona que está siendo aislada, ignorada o excluida del grupo en virtud de características fisicas o personales?",
    options: ["A", "B"],
    id: "pregunta30",
    required: true,
  },
  {
    title: "Comentarios Adicionales",
    questionText: "¿Incluiría usted otros temas que no han sido tratados en esta ficha de evaluación de factores psicosociales? Por ejemplo, ¿cuáles?",
    type: "textarea",
    id: "comentarios_adicionales",
  },
];

export default function Home() {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    const storedAnswers = localStorage.getItem("answers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const validatePage = () => {
    const currentPage = pages[page];
    let newErrors: { [key: string]: string } = {};

    if (currentPage.questions) {
      currentPage.questions.forEach((question) => {
        if (question.required && !answers[question.id]) {
          newErrors[question.id] = "Este campo es obligatorio.";
        }
      });
    } else if (currentPage.required && !answers[currentPage.id]) {
      newErrors[currentPage.id] = "Este campo es obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handleOptionChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handleSubmit = () => {
    if (validatePage()) {
      const scores = {
        pregunta1: { A: 5, B: 3, C: 3, D: 0 },
        pregunta2: { A: 5, B: 5, C: 3, D: 0 },
        pregunta3: { A: 5, B: 3, C: 1, D: 0 },
        pregunta4: { A: 5, B: 3, C: 1, D: 0 },
        pregunta5: { A: 5, B: 3, C: 3, D: 0 },
        pregunta6: { A: 0, B: 1, C: 3, D: 5 },
        pregunta7: { A: 5, B: 3, C: 0, D: 0 },
        pregunta8: { A: 3, B: 4, C: 1, D: 0 },
        pregunta9: { A: 5, B: 3, C: 0 },
        pregunta10: { A: 5, B: 5, C: 2, D: 0 },
        pregunta11: { A: 5, B: 3, C: 3, D: 0 },
        pregunta12: { A: 5, B: 3, C: 1, D: 0 },
        pregunta13: { A: 5, B: 2, C: 0 },
        pregunta14: { A: 0, B: 5, C: 5, D: 5 },
        pregunta15: { A: 0, B: 0, C: 4 },
        pregunta16: { A: 5, B: 3, C: 3, D: 0 },
        pregunta17: { A: 5, B: 5, C: 5, D: 2, E: 0 },
        pregunta18: { A: 5, B: 5, C: 3, D: 0 },
        pregunta19: { A: 5, B: 3, C: 3, D: 0 },
        pregunta20: { A: 5, B: 3, C: 1, D: 0 },
        pregunta21: { A: 4, B: 2, C: 0 },
        pregunta22: { A: 5, B: 5, C: 3, D: 0 },
        pregunta23: { A: 5, B: 3, C: 1, D: 0 },
        pregunta24: { A: 5, B: 2, C: 2, D: 0 },
        pregunta25: { A: 5, B: 3, C: 1, D: 0 },
        pregunta26: { A: 5, B: 3, C: 3, D: 0 },
        pregunta27: { A: 0, B: 3, C: 3, D: 5 },
        pregunta28: { A: 1, B: 0 },
        pregunta29: { A: 1, B: 0 },
        pregunta30: { A: 1, B: 0 },
      };
  
      let pir = 0;
      let fic = 0;
      let gdt = 0;
      let cdg = 0;
      let mob = 0;
      
      const getScore = (questionId: string, scores: { [key: string]: number }) => {
        const answer = answers[questionId];
        return answer ? scores[answer] : 0;
      };
  
      pir =
        getScore("pregunta1", scores["pregunta1"]) +
        getScore("pregunta2", scores["pregunta2"]) +
        getScore("pregunta8", scores["pregunta8"]) +
        getScore("pregunta9", scores["pregunta9"]) +
        getScore("pregunta13", scores["pregunta13"]) +
        getScore("pregunta18", scores["pregunta18"]) +
        getScore("pregunta19", scores["pregunta19"]) +
        getScore("pregunta20", scores["pregunta20"]) +
        getScore("pregunta25", scores["pregunta25"]);
  
      fic =
        getScore("pregunta4", scores["pregunta4"]) +
        getScore("pregunta5", scores["pregunta5"]) +
        getScore("pregunta11", scores["pregunta11"]) +
        getScore("pregunta16", scores["pregunta16"]) +
        getScore("pregunta17", scores["pregunta17"]) +
        getScore("pregunta24", scores["pregunta24"]) +
        getScore("pregunta26", scores["pregunta26"]);
  
      gdt =
        getScore("pregunta3", scores["pregunta3"]) +
        getScore("pregunta10", scores["pregunta10"]) +
        getScore("pregunta14", scores["pregunta14"]) +
        getScore("pregunta15", scores["pregunta15"]) +
        getScore("pregunta22", scores["pregunta22"]);
  
      cdg =
        getScore("pregunta6", scores["pregunta6"]) +
        getScore("pregunta7", scores["pregunta7"]) +
        getScore("pregunta12", scores["pregunta12"]) +
        getScore("pregunta21", scores["pregunta21"]) +
        getScore("pregunta23", scores["pregunta23"]) +
        getScore("pregunta27", scores["pregunta27"]);
  
      mob =
        getScore("pregunta28", scores["pregunta28"]) +
        getScore("pregunta29", scores["pregunta29"]) +
        getScore("pregunta30", scores["pregunta30"]);
  
      toast({
        title: "Resultados",
        description: (
          <>
            Participación Implicación Responsabilidad: {pir}
            <br />
            Formación Información Comunicación: {fic}
            <br />
            Gestión del Tiempo: {gdt}
            <br />
            Cohesión de Grupo: {cdg}
            <br />
            Mobbing: {mob}
          </>
        ),
      });
  
      setAnswers({});
      localStorage.removeItem("answers");
      setPage(0);
    } else {
      toast({
        title: "Error",
        description: "Por favor, complete todos los campos obligatorios.",
        variant: "destructive",
      });
    }
  };

  const renderPageContent = () => {
    const currentPage = pages[page];

    if (currentPage.questions) {
      return (
        <>
          <CardHeader>
            <CardTitle>{currentPage.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {currentPage.questions.map((question) => (
              <div key={question.id}>
                {question.type === "text" && (
                  <>
                    <Label htmlFor={question.id} className="block text-sm font-medium text-gray-700">
                      {question.label}
                      {question.required && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      type="text"
                      id={question.id}
                      className="mt-1 p-2 border rounded-md w-full"
                      value={answers[question.id] || ""}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      required={question.required}
                    />
                    {errors[question.id] && <p className="text-red-500 text-sm">{errors[question.id]}</p>}
                  </>
                )}
                {question.type === "checkbox" && (
                  <>
                    <Label className="block text-sm font-medium text-gray-700">
                      {question.label}
                      {question.required && <span className="text-red-500">*</span>}
                    </Label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      {question.options?.map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={question.id + "_" + option.split(' ')[0]}
                            checked={answers[question.id] === option}
                            onCheckedChange={(checked) =>
                              handleOptionChange(question.id, option)
                            }
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors[question.id] && <p className="text-red-500 text-sm">{errors[question.id]}</p>}
                  </>
                )}
                {question.type === "radio" && (
                  <>
                    <Label className="block text-sm font-medium text-gray-700">
                      {question.label}
                      {question.required && <span className="text-red-500">*</span>}
                    </Label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      {question.options?.map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={question.id + "_" + option.split(' ')[0]}
                            checked={answers[question.id] === option}
                            onCheckedChange={(checked) =>
                              handleOptionChange(question.id, option)
                            }
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors[question.id] && <p className="text-red-500 text-sm">{errors[question.id]}</p>}
                  </>
                )}
              </div>
            ))}
          </CardContent>
        </>
      );
    } else if (currentPage.type === "textarea") {
      return (
        <>
          <CardHeader>
            <CardTitle>{currentPage.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor={currentPage.id} className="block text-sm font-medium text-gray-700">
              {currentPage.questionText}
            </Label>
            <Textarea
              id={currentPage.id}
              className="mt-1 p-2 border rounded-md w-full"
              value={answers[currentPage.id] || ""}
              onChange={(e) => handleInputChange(currentPage.id, e.target.value)}
            />
          </CardContent>
        </>
      );
    }
    else {
      return (
        <>
          <CardHeader>
            <CardTitle>{currentPage.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p>{currentPage.questionText}</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {currentPage.options?.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={currentPage.id + "_" + option.split(' ')[0]}
                    checked={answers[currentPage.id] === option}
                    onCheckedChange={(checked) =>
                      handleOptionChange(currentPage.id, option)
                    }
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors[currentPage.id] && <p className="text-red-500 text-sm">{errors[currentPage.id]}</p>}
            <Label htmlFor={`observaciones_${currentPage.id}`} className="block text-sm font-medium text-gray-700">
              Observaciones:
            </Label>
            <Textarea
              id={`observaciones_${currentPage.id}`}
              className="mt-1 p-2 border rounded-md w-full"
              value={answers[`observaciones_${currentPage.id}`] || ""}
              onChange={(e) => handleInputChange(`observaciones_${currentPage.id}`, e.target.value)}
            />
          </CardContent>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background py-2">
      <Card className="w-full max-w-2xl shadow-md rounded-lg">
        {renderPageContent()}
        <CardContent className="flex justify-between">
          <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Previous
          </Button>
          {page === pages.length - 1 ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={() => {
              if (validatePage()) {
                setPage(page + 1)
              } else {
                toast({
                  title: "Error",
                  description: "Por favor, complete todos los campos obligatorios.",
                  variant: "destructive",
                });
              }
            }}>Next</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
