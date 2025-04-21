"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ResultsDisplay from "@/components/ResultsDisplay";

// Definición de los textos para cada opción
const optionTexts = {
  pregunta1: {
    A: "No",
    B: "Sí, ocasionalmente",
    C: "Sí, cuando la tarea se lo permite",
    D: "Sí, es la práctica habitual"
  },
  pregunta2: {
    A: "No existe ningún procedimiento",
    B: "Sí, aunque en la práctica no se utiliza",
    C: "Sí, se utiliza ocasionalmente",
    D: "Sí, se utiliza habitualmente"
  },
  pregunta3: {
    A: "Sí, puede decidir",
    B: "No, por la continuidad del proceso",
    C: "No, por los requerimientos del trabajo",
    D: "No, por otras causas"
  },
  pregunta4: {
    A: "Sí",
    B: "No, algunas veces",
    C: "No, frecuentemente",
    D: "No, nunca"
  },
  pregunta5: {
    A: "Sí, siempre",
    B: "Sí, por escrito",
    C: "Sí, oralmente",
    D: "No"
  },
  pregunta6: {
    A: "Un compañero de otro puesto",
    B: "Una persona cualificada técnicamente",
    C: "Un encargado y/o jefe inmediato",
    D: "No tiene esa opción por cualquier motivo"
  },
  pregunta7: {
    A: "Sí, siempre",
    B: "Sí, a veces",
    C: "No",
    D: "No suelen existir conflictos"
  },
  pregunta8: {
    A: "Sí, totalmente",
    B: "Sí, dependiendo del período",
    C: "Sí, según necesidades del servicio",
    D: "No, la empresa cierra por vacaciones"
  },
  pregunta9: {
    A: "Sí, siempre",
    B: "Sí, a veces",
    C: "No, nunca"
  },
  pregunta10: {
    A: "Sí, las establecidas",
    B: "Sí, según necesidades",
    C: "No, por el proceso productivo",
    D: "No, por otras causas"
  },
  pregunta11: {
    A: "Sí, utilizan varios medios",
    B: "Sí, aunque solo mediante escritos",
    C: "Sí, aunque solo oralmente",
    D: "No"
  },
  pregunta12: {
    A: "Sí, a todos los niveles",
    B: "Sí, entre compañeros de trabajo",
    C: "Solo en algunos casos",
    D: "No"
  },
  pregunta13: {
    A: "Colaborativa",
    B: "Indiferente",
    C: "Autoritaria"
  },
  pregunta14: {
    A: "No",
    B: "Sí, durante las pausas",
    C: "Sí, incrementando el ritmo de trabajo",
    D: "Sí, alargando la jornada"
  },
  pregunta15: {
    A: "Salario fijo",
    B: "Salario por obra",
    C: "Salario fijo + incentivos"
  },
  pregunta16: {
    A: "Sí, siempre",
    B: "Sí, por escrito",
    C: "Sí, oralmente",
    D: "No"
  },
  pregunta17: {
    A: "Sí, siempre",
    B: "Sí, si no afecta al trabajo",
    C: "Sí, aunque afecte al trabajo",
    D: "Solo en las pausas",
    E: "No, nunca"
  },
  pregunta18: {
    A: "Sí, con formación específica",
    B: "Sí, con experiencia en el puesto",
    C: "Sí, han promocionado", 
    D: "No"
  },
  pregunta19: {
    A: "Sí, siempre",
    B: "Sí, en función del tipo de trabajo",
    C: "Sí, de forma excepcional",
    D: "No"
  },
  pregunta20: {
    A: "Sí, siempre",
    B: "Sí, frecuentemente",
    C: "Sí, ocasionalmente",
    D: "No, nunca"
  },
  pregunta21: {
    A: "Sí, habitualmente",
    B: "Sí, a veces",
    C: "Solo si la empresa lo organiza"
  },
  pregunta22: {
    A: "Sí, por cualquier motivo",
    B: "Sí, con motivo justificado",
    C: "Solo causas urgentes",
    D: "No, nunca"
  },
  pregunta23: {
    A: "Sí, siempre",
    B: "Frecuentemente",
    C: "A veces",
    D: "No"
  },
  pregunta24: {
    A: "Sí, siempre",
    B: "Sí, si lo pide",
    C: "A veces",
    D: "Nunca"
  },
  pregunta25: {
    A: "Sí, puede organizar su trabajo",
    B: "Sí, con limitaciones",
    C: "Sí, de forma excepcional",
    D: "No, nunca"
  },
  pregunta26: {
    A: "Sí, siempre",
    B: "Sí, por escrito",
    C: "Sí, oralmente",
    D: "No"
  },
  pregunta27: {
    A: "Relaciones competitivas",
    B: "Relaciones indiferentes",
    C: "Relaciones personales sin más",
    D: "Relaciones de colaboración"
  },
  pregunta28: {
    A: "Sí",
    B: "No"
  },
  pregunta29: {
    A: "Sí",
    B: "No"
  },
  pregunta30: {
    A: "Sí",
    B: "No"
  }
};

// Definición de las preguntas y páginas
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
  }
];

export default function Home() {
const [page, setPage] = useState(0);
const [answers, setAnswers] = useState({});
const [errors, setErrors] = useState({});
const [showResults, setShowResults] = useState(false);
const { toast } = useToast();

useEffect(() => {
  const storedAnswers = localStorage.getItem("answers");
  const storedResults = localStorage.getItem("results");
  
  if (storedAnswers) {
    setAnswers(JSON.parse(storedAnswers));
  }
  
  if (storedResults) {
    setShowResults(true);
  }
}, []);

useEffect(() => {
  localStorage.setItem("answers", JSON.stringify(answers));
}, [answers]);

const validatePage = () => {
  const currentPage = pages[page];
  let newErrors = {};

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

const handleInputChange = (id, value) => {
  setAnswers((prev) => ({ ...prev, [id]: value }));
  setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
};

const handleOptionChange = (id, value) => {
  setAnswers((prev) => ({ ...prev, [id]: value }));
  setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
};

const resetForm = () => {
  setAnswers({});
  localStorage.removeItem("answers");
  localStorage.removeItem("results");
  setShowResults(false);
  setPage(0);
};

const handleSubmit = () => {
  if (validatePage()) {
    // Tabla de puntuaciones para cada respuesta
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

    // Función auxiliar para obtener el puntaje de una pregunta
    const getScore = (questionId, scoresObj) => {
      const answer = answers[questionId];
      return answer && scoresObj[answer] !== undefined ? scoresObj[answer] : 0;
    };

    // Cálculo correcto de Participación, Implicación, Responsabilidad (PIR)
    // Preguntas: 1, 2, 8, 9, 13, 15, 17, 20, 22, 24, 25
    const pir =
      getScore("pregunta1", scores.pregunta1) +
      getScore("pregunta2", scores.pregunta2) +
      getScore("pregunta8", scores.pregunta8) +
      getScore("pregunta9", scores.pregunta9) +
      getScore("pregunta13", scores.pregunta13) +
      getScore("pregunta15", scores.pregunta15) +
      getScore("pregunta17", scores.pregunta17) +
      getScore("pregunta20", scores.pregunta20) +
      getScore("pregunta22", scores.pregunta22) +
      getScore("pregunta24", scores.pregunta24) +
      getScore("pregunta25", scores.pregunta25);

    // Cálculo correcto de Formación, Información, Comunicación (FIC)
    // Preguntas: 4, 5, 11, 16, 18, 24, 26
    const fic =
      getScore("pregunta4", scores.pregunta4) +
      getScore("pregunta5", scores.pregunta5) +
      getScore("pregunta11", scores.pregunta11) +
      getScore("pregunta16", scores.pregunta16) +
      getScore("pregunta18", scores.pregunta18) +
      getScore("pregunta24", scores.pregunta24) +
      getScore("pregunta26", scores.pregunta26);

    // Cálculo correcto de Gestión del Tiempo (GT)
    // Preguntas: 3, 10, 14, 15, 22
    const gdt =
      getScore("pregunta3", scores.pregunta3) +
      getScore("pregunta10", scores.pregunta10) +
      getScore("pregunta14", scores.pregunta14) +
      getScore("pregunta15", scores.pregunta15) +
      getScore("pregunta22", scores.pregunta22);

    // Cálculo correcto de Cohesión de Grupo (CG)
    // Preguntas: 6, 7, 12, 19, 21, 23, 27
    const cdg =
      getScore("pregunta6", scores.pregunta6) +
      getScore("pregunta7", scores.pregunta7) +
      getScore("pregunta12", scores.pregunta12) +
      getScore("pregunta19", scores.pregunta19) +
      getScore("pregunta21", scores.pregunta21) +
      getScore("pregunta23", scores.pregunta23) +
      getScore("pregunta27", scores.pregunta27);

    // Mobbing: Preguntas 28, 29, 30
    const mob =
      getScore("pregunta28", scores.pregunta28) +
      getScore("pregunta29", scores.pregunta29) +
      getScore("pregunta30", scores.pregunta30);

    // Determinación del nivel de riesgo para cada dimensión
    const getNivelRiesgo = (dimension, valor) => {
      switch (dimension) {
        case 'pir':
          if (valor >= 0 && valor <= 8) return "Muy adecuado";
          if (valor >= 9 && valor <= 17) return "Adecuado";
          if (valor >= 18 && valor <= 26) return "Inadecuado";
          if (valor >= 27) return "Muy inadecuado";
          break;
        case 'fic':
          if (valor >= 0 && valor <= 6) return "Muy adecuado";
          if (valor >= 7 && valor <= 13) return "Adecuado";
          if (valor >= 14 && valor <= 21) return "Inadecuado";
          if (valor >= 22) return "Muy inadecuado";
          break;
        case 'gdt':
          if (valor >= 0 && valor <= 4) return "Muy adecuado";
          if (valor >= 5 && valor <= 9) return "Adecuado";
          if (valor >= 10 && valor <= 14) return "Inadecuado";
          if (valor >= 15) return "Muy inadecuado";
          break;
        case 'cdg':
          if (valor >= 0 && valor <= 5) return "Muy adecuado";
          if (valor >= 6 && valor <= 10) return "Adecuado";
          if (valor >= 11 && valor <= 17) return "Inadecuado";
          if (valor >= 18) return "Muy inadecuado";
          break;
        case 'mob':
          if (valor === 0) return "Nulo";
          if (valor >= 1 && valor <= 3) return "Presente";
          break;
        default:
          return "No determinado";
      }
    };

    // Guardar resultados
    const results = {
      pir: { valor: pir, nivel: getNivelRiesgo('pir', pir) },
      fic: { valor: fic, nivel: getNivelRiesgo('fic', fic) },
      gdt: { valor: gdt, nivel: getNivelRiesgo('gdt', gdt) },
      cdg: { valor: cdg, nivel: getNivelRiesgo('cdg', cdg) },
      mob: { valor: mob, nivel: getNivelRiesgo('mob', mob) },
      fecha: new Date().toISOString(),
      datosEmpresa: {
        actividad: answers.empresa_actividad || "",
        sector: answers.sector || "",
        certificacion: answers.certificacion || "",
        jornada: answers.jornada || "",
        cargo: answers.cargo || "",
        comite: answers.comite_integrantes || ""
      }
    };
    
    localStorage.setItem("results", JSON.stringify(results));
    setShowResults(true);

    toast({
      title: "Evaluación completada",
      description: "Los resultados han sido calculados correctamente",
    });
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
                        <span>{option}: {optionTexts[question.id]?.[option] || option}</span>
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
                        <span>{option}: {optionTexts[question.id]?.[option] || option}</span>
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
                <span>{option}: {optionTexts[currentPage.id]?.[option] || option}</span>
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

if (showResults) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background py-8">
      <ResultsDisplay onReset={resetForm} />
    </div>
  );
}

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background py-2">
    <Card className="w-full max-w-2xl shadow-md rounded-lg">
      {renderPageContent()}
      <CardContent className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setPage(page - 1)} 
          disabled={page === 0}
        >
          Anterior
        </Button>
        {page === pages.length - 1 ? (
          <Button onClick={handleSubmit}>Finalizar</Button>
        ) : (
          <Button onClick={() => {
            if (validatePage()) {
              setPage(page + 1);
            } else {
              toast({
                title: "Error",
                description: "Por favor, complete todos los campos obligatorios.",
                variant: "destructive",
              });
            }
          }}>Siguiente</Button>
        )}
      </CardContent>
    </Card>
  </div>
);
}