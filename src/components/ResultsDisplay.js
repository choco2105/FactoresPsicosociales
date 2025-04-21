"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const ResultsDisplay = ({ onReset }) => {
  const [results, setResults] = useState(null);
  
  useEffect(() => {
    const storedResults = localStorage.getItem("results");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  if (!results) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>No hay resultados disponibles</CardTitle>
          <CardDescription>Complete el cuestionario para ver los resultados</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={onReset}>Iniciar evaluación</Button>
        </CardFooter>
      </Card>
    );
  }

  const chartData = [
    {
      name: 'PIR',
      valor: results.pir.valor,
      nivel: results.pir.nivel,
      umbralInadecuado: 18,
      umbralMuyInadecuado: 27,
      maxValue: 44
    },
    {
      name: 'FIC',
      valor: results.fic.valor,
      nivel: results.fic.nivel,
      umbralInadecuado: 14,
      umbralMuyInadecuado: 22,
      maxValue: 35
    },
    {
      name: 'GDT',
      valor: results.gdt.valor,
      nivel: results.gdt.nivel,
      umbralInadecuado: 10,
      umbralMuyInadecuado: 15,
      maxValue: 24
    },
    {
      name: 'CDG',
      valor: results.cdg.valor,
      nivel: results.cdg.nivel,
      umbralInadecuado: 11,
      umbralMuyInadecuado: 18,
      maxValue: 29
    }
  ];

  const getColorByNivel = (nivel) => {
    switch (nivel) {
      case 'Muy adecuado': return '#4CAF50'; // Verde
      case 'Adecuado': return '#8BC34A'; // Verde claro
      case 'Inadecuado': return '#FF9800'; // Naranja
      case 'Muy inadecuado': return '#F44336'; // Rojo
      default: return '#9E9E9E'; // Gris
    }
  };

  const getRecomendacion = (dimension, nivel) => {
    if (nivel === 'Muy adecuado') {
      return "Situación satisfactoria. Mantener el nivel actual.";
    } else if (nivel === 'Adecuado') {
      return "Situación favorable, aunque pueden implementarse acciones de mejora.";
    } else if (nivel === 'Inadecuado') {
      switch (dimension) {
        case 'pir':
          return "Promover mayor participación en decisiones, aumentar autonomía y mejorar la distribución de tareas.";
        case 'fic':
          return "Mejorar los canales de comunicación, establecer programas de formación y garantizar acceso a la información.";
        case 'gdt':
          return "Revisar la carga de trabajo, analizar ritmos y pausas, y flexibilizar horarios cuando sea posible.";
        case 'cdg':
          return "Fomentar el trabajo en equipo, mejorar la integración y promover actividades de cohesión grupal.";
        default:
          return "Implementar medidas correctoras a medio plazo.";
      }
    } else if (nivel === 'Muy inadecuado') {
      switch (dimension) {
        case 'pir':
          return "Situación crítica. Reestructurar el sistema de participación y responsabilidad de manera inmediata.";
        case 'fic':
          return "Situación crítica. Desarrollar e implementar un plan integral de comunicación y formación.";
        case 'gdt':
          return "Situación crítica. Reorganizar urgentemente la gestión del tiempo y la carga de trabajo.";
        case 'cdg':
          return "Situación crítica. Intervenir inmediatamente en la dinámica grupal y el clima laboral.";
        default:
          return "Situación crítica que requiere intervención inmediata.";
      }
    } else {
      return "No hay recomendaciones disponibles.";
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Resultados de Evaluación de Riesgos Psicosociales</CardTitle>
        <CardDescription>Método de Navarra - Fecha: {new Date(results.fecha).toLocaleDateString()}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Información de la empresa */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-medium text-lg mb-2">Datos de la empresa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><strong>Actividad:</strong> {results.datosEmpresa?.actividad}</div>
            <div><strong>Sector:</strong> {results.datosEmpresa?.sector}</div>
            <div><strong>Certificación:</strong> {results.datosEmpresa?.certificacion}</div>
            <div><strong>Jornada:</strong> {results.datosEmpresa?.jornada}</div>
            <div><strong>Cargo:</strong> {results.datosEmpresa?.cargo}</div>
            <div><strong>Comité SST:</strong> {results.datosEmpresa?.comite}</div>
          </div>
        </div>
        
        {/* Gráfico de resultados */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 'dataMax + 5']} />
              <Tooltip 
                formatter={(value, name, props) => [
                  `Valor: ${value} - ${props.payload.nivel}`, 
                  props.payload.name
                ]}
              />
              <Legend />
              <Bar 
                dataKey="valor" 
                name="Puntuación" 
                fill="#1E88E5"
                fillOpacity={0.8}
                stroke="#0D47A1"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tarjetas de resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-md shadow-sm" style={{ borderLeftColor: getColorByNivel(results.pir.nivel), borderLeftWidth: '4px' }}>
            <h3 className="font-medium text-lg">Participación, Implicación, Responsabilidad</h3>
            <p className="text-sm text-gray-500">Evalúa el nivel de autonomía y participación del trabajador</p>
            <div className="mt-2 flex justify-between items-center">
              <span>Puntuación: <strong>{results.pir.valor}</strong></span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: getColorByNivel(results.pir.nivel), color: 'white' }}>
                {results.pir.nivel}
              </span>
            </div>
          </div>
          
          <div className="p-4 border rounded-md shadow-sm" style={{ borderLeftColor: getColorByNivel(results.fic.nivel), borderLeftWidth: '4px' }}>
            <h3 className="font-medium text-lg">Formación, Información, Comunicación</h3>
            <p className="text-sm text-gray-500">Evalúa el flujo de información y la formación de los trabajadores</p>
            <div className="mt-2 flex justify-between items-center">
              <span>Puntuación: <strong>{results.fic.valor}</strong></span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: getColorByNivel(results.fic.nivel), color: 'white' }}>
                {results.fic.nivel}
              </span>
            </div>
          </div>
          
          <div className="p-4 border rounded-md shadow-sm" style={{ borderLeftColor: getColorByNivel(results.gdt.nivel), borderLeftWidth: '4px' }}>
            <h3 className="font-medium text-lg">Gestión del Tiempo</h3>
            <p className="text-sm text-gray-500">Evalúa el nivel de autonomía del trabajador para gestionar su tiempo</p>
            <div className="mt-2 flex justify-between items-center">
              <span>Puntuación: <strong>{results.gdt.valor}</strong></span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: getColorByNivel(results.gdt.nivel), color: 'white' }}>
                {results.gdt.nivel}
              </span>
            </div>
          </div>
          
          <div className="p-4 border rounded-md shadow-sm" style={{ borderLeftColor: getColorByNivel(results.cdg.nivel), borderLeftWidth: '4px' }}>
            <h3 className="font-medium text-lg">Cohesión de Grupo</h3>
            <p className="text-sm text-gray-500">Evalúa las relaciones entre compañeros y el sentido de pertenencia</p>
            <div className="mt-2 flex justify-between items-center">
              <span>Puntuación: <strong>{results.cdg.valor}</strong></span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: getColorByNivel(results.cdg.nivel), color: 'white' }}>
                {results.cdg.nivel}
              </span>
            </div>
          </div>
        </div>
        
        {/* Mobbing */}
        <div className="p-4 border rounded-md shadow-sm">
          <h3 className="font-medium text-lg">Mobbing</h3>
          <p className="text-sm text-gray-500">Preguntas complementarias sobre acoso laboral</p>
          <div className="mt-2">
            <span>Valor: <strong>{results.mob.valor}</strong> - {results.mob.nivel}</span>
            {results.mob.valor > 0 && (
              <p className="text-sm text-red-600 mt-1">
                Se han detectado posibles indicios de situaciones de acoso laboral. Se recomienda una evaluación específica.
              </p>
            )}
          </div>
        </div>
        
        {/* Tabla de rangos */}
        <div className="p-4 border rounded-md shadow-sm">
          <h3 className="font-medium text-lg mb-2">Rangos de valoración</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dimensión</TableHead>
                <TableHead>Muy adecuado</TableHead>
                <TableHead>Adecuado</TableHead>
                <TableHead>Inadecuado</TableHead>
                <TableHead>Muy inadecuado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">PIR</TableCell>
                <TableCell>0-8</TableCell>
                <TableCell>9-17</TableCell>
                <TableCell>18-26</TableCell>
                <TableCell>27-44</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">FIC</TableCell>
                <TableCell>0-6</TableCell>
                <TableCell>7-13</TableCell>
                <TableCell>14-21</TableCell>
                <TableCell>22-35</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">GDT</TableCell>
                <TableCell>0-4</TableCell>
                <TableCell>5-9</TableCell>
                <TableCell>10-14</TableCell>
                <TableCell>15-24</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CDG</TableCell>
                <TableCell>0-5</TableCell>
                <TableCell>6-10</TableCell>
                <TableCell>11-17</TableCell>
                <TableCell>18-29</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        {/* Recomendaciones */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-medium text-lg mb-2">Recomendaciones</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">Participación, Implicación, Responsabilidad:</h4>
              <p className="text-sm">{getRecomendacion('pir', results.pir.nivel)}</p>
            </div>
            <div>
              <h4 className="font-medium">Formación, Información, Comunicación:</h4>
              <p className="text-sm">{getRecomendacion('fic', results.fic.nivel)}</p>
            </div>
            <div>
              <h4 className="font-medium">Gestión del Tiempo:</h4>
              <p className="text-sm">{getRecomendacion('gdt', results.gdt.nivel)}</p>
            </div>
            <div>
              <h4 className="font-medium">Cohesión de Grupo:</h4>
              <p className="text-sm">{getRecomendacion('cdg', results.cdg.nivel)}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          Nueva evaluación
        </Button>
        <Button onClick={() => window.print()}>
          Imprimir resultados
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsDisplay;