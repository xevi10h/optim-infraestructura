export const generateMockReport = (prompt: string): string => {
	const currentDate = new Date().toLocaleDateString('es-ES');

	const getReportType = () => {
		if (
			prompt.includes('material') ||
			prompt.includes('suministro') ||
			prompt.includes('ordenador')
		) {
			return 'Suministro de material informático para modernización del equipamiento de la oficina.';
		}
		if (prompt.includes('limpieza') || prompt.includes('neteja')) {
			return 'Contratación de servicios de limpieza para el mantenimiento de las instalaciones.';
		}
		if (
			prompt.includes('obra') ||
			prompt.includes('mejora') ||
			prompt.includes('millora')
		) {
			return 'Ejecución de obras de mejora y mantenimiento de las instalaciones.';
		}
		return 'Contratación de servicios necesarios para el funcionamiento administrativo.';
	};

	return `INFORME JUSTIFICATIVO
  
  1. IDENTIFICACIÓN DEL OBJETO
  ${getReportType()}
  
  2. JUSTIFICACIÓN TÉCNICA
  La adquisición/contratación propuesta responde a la necesidad de mantener la eficiencia operativa de la administración, garantizando el cumplimiento de los estándares de calidad exigidos por la normativa vigente.
  
  Las características técnicas del objeto del contrato se ajustan a las necesidades identificadas y permiten alcanzar los objetivos previstos de manera óptima.
  
  3. JUSTIFICACIÓN ECONÓMICA
  El presupuesto estimado se considera ajustado a precios de mercado, habiendo realizado un análisis comparativo de ofertas disponibles y consultado diferentes proveedores del sector.
  
  La propuesta económica resulta la más ventajosa en términos de relación calidad-precio, considerando tanto el coste inicial como los costes de mantenimiento posteriores.
  
  4. BENEFICIOS ESPERADOS
  - Mejora significativa de la productividad administrativa
  - Reducción de costes operativos a medio y largo plazo
  - Garantía de continuidad del servicio público
  - Cumplimiento de los objetivos de modernización tecnológica
  - Mejora de la calidad del servicio prestado a la ciudadanía
  
  5. MARCO NORMATIVO
  El presente informe se fundamenta en la legislación vigente en materia de contratación pública, especialmente:
  - Ley 9/2017, de 8 de noviembre, de Contratos del Sector Público
  - Normativa autonómica aplicable
  - Reglamentos internos de la entidad
  
  6. CONCLUSIONES Y RECOMENDACIONES
  Se recomienda proceder con la contratación/adquisición propuesta, dado que:
  - Cumple con todos los requisitos técnicos establecidos
  - Se ajusta al presupuesto disponible
  - Responde a una necesidad real y justificada
  - Contribuye a la mejora de la eficiencia administrativa
  
  La propuesta se considera técnica y económicamente viable, recomendándose su aprobación para proceder con el correspondiente procedimiento de contratación.
  
  Fecha: ${currentDate}
  Responsable: [Nombre del funcionario responsable]
  Departamento: [Denominación del departamento]`;
};
