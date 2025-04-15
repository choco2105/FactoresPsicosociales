"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        type: "checkbox",
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
    options: ["No", "Sí, ocasionalmente", "Sí, cuando la tarea se lo permite", "Sí, es la práctica habitual"],
    id: "pregunta1",
    required: true,
  },
  {
    title: "Pregunta 2",
    questionText: "¿Existe un procedimiento de atención a las posibles sugerencias y/o reclamaciones planteadas por los trabajadores?",
    options: ["No, no existe", "Sí, aunque en la práctica no se utiliza", "Sí, se utiliza ocasionalmente", "Sí, se utiliza habitualmente"],
    id: "pregunta2",
    required: true,
  },
  {
    title: "Pregunta 3",
    questionText: "¿El trabajador tiene la posibilidad de ejercer el control sobre su ritmo de trabajo?",
    options: ["No", "Sí, ocasionalmente", "Sí, habitualmente", "Sí, puede adelantar trabajo para luego tener más tiempo de descanso"],
    id: "pregunta3",
    required: true,
  },
  {
    title: "Pregunta 4",
    questionText: "¿El trabajador dispone de la información y de los medios necesarios (equipo, herramientas, etc.) para realizar su tarea?",
    options: ["No", "Sí, algunas veces", "Sí, habitualmente", "Sí, siempre"],
    id: "pregunta4",
    required: true,
  },
  {
    title: "Pregunta 5",
    questionText: "¿Ante la incorporación de nuevos trabajadores, ¿se les informa de los riesgos generales y específicos del puesto?",
    options: ["No", "Sí, oralmente", "Sí, por escrito", "Sí, por escrito y oralmente"],
    id: "pregunta5",
    required: true,
  },
  {
    title: "Pregunta 6",
    questionText: "¿Cuando el trabajador necesita ayuda y/o tiene cualquier duda acude a:",
    options: ["Un compañero de otro puesto", "Una persona asignada (mantenimiento, refuerzo...)", "Un encargado y/o jefe superior", "No tiene esa opción por cualquier motivo"],
    id: "pregunta6",
    required: true,
  },
  {
    title: "Pregunta 7",
    questionText: "¿Las situaciones de conflictividad entre trabajadores, ¿se intentan solucionar de manera abierta y clara?",
    options: ["No", "Sí, por medio de la intervención del mando", "Sí, entre todos los afectados", "Sí, mediante otros procedimientos"],
    id: "pregunta7",
    required: true,
  },
  {
    title: "Pregunta 8",
    questionText: "¿Pueden los trabajadores elegir sus días de vacaciones?",
    options: ["No, la empresa cierra por vacaciones en periodos fijos", "No, la empresa distribuye periodos vacacionales, sin tener en cuenta las necesidades de los trabajadores", "Sí, la empresa concede o no a demanda del trabajador", "Sí, los trabajadores se organizan entre ellos, teniendo en cuenta la continuidad de la actividad"],
    id: "pregunta8",
    required: true,
  },
  {
    title: "Pregunta 9",
    questionText: "¿El trabajador interviene y/o corrige los incidentes en su puesto de trabajo (equipo, máquina, etc.)?",
    options: ["No, es función del mando superior o persona encargada", "Sí, sólo incidentes menores", "Sí, cualquier incidente"],
    id: "pregunta9",
    required: true,
  },
  {
    title: "Pregunta 10",
    questionText: "¿El trabajador tiene posibilidad de realizar pausas dependiendo del esfuerzo (físico y/o mental) requerido por la actividad?",
    options: ["No, por la continuidad del proceso", "No, por otras causas", "Sí, las establecidas", "Sí, según necesidades"],
    id: "pregunta10",
    required: true,
  },
  {
    title: "Pregunta 11",
    questionText: "¿Se utilizan medios formales para transmitir informaciones y comunicaciones a los trabajadores?",
    options: ["No", "Charlas, asambleas", "Comunicados escritos", "Sí, medios orales y escritos"],
    id: "pregunta11",
    required: true,
  },
  {
    title: "Pregunta 12",
    questionText: "En términos generales, ¿el ambiente de trabajo posibilita relaciones amistosas?",
    options: ["No", "Sí, a veces", "Sí, habitualmente", "Sí, siempre"],
    id: "pregunta12",
    required: true,
  },
  {
    title: "Pregunta 13",
    questionText: "La actuación del mando intermedio respecto a sus subordinados es:",
    options: ["Únicamente marca los objetivos individuales a alcanzar por el trabajador", "Colabora con el trabajador en la consecución de fines", "Fomenta la consecución de objetivos en equipo"],
    id: "pregunta13",
    required: true,
  },
  {
    title: "Pregunta 14",
    questionText: "¿Se recuperan los retrasos?",
    options: ["No", "Sí, durante las pausas", "Sí, incrementando el ritmo de trabajo", "Sí, alargando la jornada"],
    id: "pregunta14",
    required: true,
  },
  {
    title: "Pregunta 15",
    questionText: "¿Cuál es el criterio de retribución al trabajador?",
    options: ["Salario por hora (fijo)", "Salario más prima colectiva", "Salario más prima individual"],
    id: "pregunta15",
    required: true,
  },
  {
    title: "Pregunta 16",
    questionText: "¿Se facilitan las instrucciones precisas a los trabajadores sobre el modo correcto y seguro de realizar las tareas?",
    options: ["No", "Sí, de forma oral", "Sí, de forma escrita (instrucciones)", "Sí, de forma oral y escrita"],
    id: "pregunta16",
    required: true,
  },
  {
    title: "Pregunta 17",
    questionText: "¿El trabajador tiene la posibilidad de hablar durante la realización de su tarea?",
    options: ["No, por la ubicación del trabajador", "No, por el ruido", "No, por otros motivos", "Sí, algunas palabras", "Sí, conversaciones más largas"],
    id: "pregunta17",
    required: true,
  },
  {
    title: "Pregunta 18",
    questionText: "¿Han recibido los mandos intermedios formación para el desempeño de sus funciones?",
    options: ["No", "Sí, aunque no ha habido cambios significativos en el estilo de mando", "Sí, algunos mandos han modificado sus estilos significativamente", "Sí, la mayoría ha modificado su estilo de mando"],
    id: "pregunta18",
    required: true,
  },
  {
    title: "Pregunta 19",
    questionText: "¿Existe la posibilidad de organizar el trabajo en equipo?",
    options: ["No", "Sí, cuando la tarea se lo permite", "Sí, en función del tiempo disponible", "Sí, siempre se hace en equipo"],
    id: "pregunta19",
    required: true,
  },
  {
    title: "Pregunta 20",
    questionText: "¿El trabajador controla el resultado de su trabajo y puede corregir los errores cometidos o defectos?",
    options: ["No", "Sí, ocasionalmente", "Sí, habitualmente", "Sí, cualquier error"],
    id: "pregunta20",
    required: true,
  },
  {
    title: "Pregunta 21",
    questionText: "¿Se organizan, de forma espontánea, eventos en los que participa la mayoría de la plantilla?",
    options: ["No", "Sí, una o dos veces al año", "Sí, varias veces al año, según surja el motivo"],
    id: "pregunta21",
    required: true,
  },
  {
    title: "Pregunta 22",
    questionText: "¿El trabajador puede detener el trabajo o ausentarse de su puesto?",
    options: ["No, por el proceso productivo", "No, por otros motivos", "Sí, con un sustituto", "Sí, sin que nadie le sustituya"],
    id: "pregunta22",
    required: true,
  },
  {
    title: "Pregunta 23",
    questionText: "¿Existe, en general, un buen clima en el lugar de trabajo?",
    options: ["No", "Sí, a veces", "Sí, habitualmente", "Sí, siempre"],
    id: "pregunta23",
    required: true,
  },
  {
    title: "Pregunta 24",
    questionText: "¿El trabajador recibe información suficiente sobre los resultados de su trabajo?",
    options: ["Se le informa de la tarea a desempeñar (cantidad y calidad)", "Se le informa de los resultados alcanzados con relación a los objetivos que tiene asignados", "Se le informa de los objetivos alcanzados por la empresa", "Se le anima a participar en el establecimiento de metas"],
    id: "pregunta24",
    required: true,
  },
  {
    title: "Pregunta 25",
    questionText: "¿El trabajador tiene la opción de cambiar de puesto y/o de tarea a lo largo de su jornada laboral?",
    options: ["No", "Se cambia de manera excepcional", "Sí, se rota entre compañeros de forma habitual", "Sí, se cambia según lo considera el trabajador"],
    id: "pregunta25",
    required: true,
  },
  {
    title: "Pregunta 26",
    questionText: "¿Ante la incorporación de nuevas tecnologías, nueva maquinaria y/o nuevos métodos de trabajo ¿se instruye al trabajador para adaptarlo a esas nuevas situaciones?",
    options: ["No", "Sí, oralmente", "Sí, por escrito", "Sí, oralmente y por escrito"],
    id: "pregunta26",
    required: true,
  },
  {
    title: "Pregunta 27",
    questionText: "¿Qué tipo de relaciones son las habituales en la empresa?",
    options: ["Relaciones de colaboración para el trabajo y relaciones personales positivas", "Relaciones personales positivas, sin relaciones de colaboración", "Relaciones sólo de colaboración para el trabajo", "Ni relaciones personales, ni colaboración para el trabajo"],
    id: "pregunta27",
    required: true,
  },
  {
    title: "Pregunta 28",
    questionText: "De los problemas que existen en un departamento, sección... ¿está siendo culpada alguna persona en concreto?",
    options: ["Sí", "No"],
    id: "pregunta28",
    required: true,
  },
  {
    title: "Pregunta 29",
    questionText: "¿Han aumentado las bajas de origen psicológico en la plantilla?",
    options: ["Sí", "No"],
    id: "pregunta29",
    required: true,
  },
  {
    title: "Pregunta 30",
    questionText: "¿Hay alguna persona que está siendo aislada, ignorada o excluida del grupo en virtud de características físicas o personales?",
    options: ["Sí", "No"],
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
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
          if (question.type === "checkbox") {
            // Checkbox group validation
            if (!answers[question.id] || (Array.isArray(answers[question.id]) && answers[question.id].length === 0)) {
              newErrors[question.id] = "Este campo es obligatorio.";
            }
          } else {
            newErrors[question.id] = "Este campo es obligatorio.";
          }
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

  const handleCheckboxChange = (id: string, value: string) => {
    setAnswers((prev) => {
      const currentValues = prev[id] ? (Array.isArray(prev[id]) ? prev[id] : [prev[id]]) : [];
      const isChecked = currentValues.includes(value);
  
      let updatedValues: string[] = [];
      if (!isChecked) {
        updatedValues = [value]; // Only allow one selection
      }
  
      return { ...prev, [id]: updatedValues };
    });
  };

  const handleOptionChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handleSubmit = () => {
    if (validatePage()) {
      console.log("Form submitted with answers:", answers);
      localStorage.removeItem("answers");
      window.alert(JSON.stringify(answers, null, 2));
      router.push("/");
    } else {
      window.alert("Por favor, complete todos los campos obligatorios.");
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
                            checked={Array.isArray(answers[question.id]) && answers[question.id].includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleCheckboxChange(question.id, option);
                              } else {
                                handleCheckboxChange(question.id, "");
                              }
                            }}
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
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleOptionChange(currentPage.id, option);
                      } else {
                        handleOptionChange(currentPage.id, "");
                      }
                    }}
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
                window.alert("Por favor, complete todos los campos obligatorios.");
              }
            }}>Next</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
