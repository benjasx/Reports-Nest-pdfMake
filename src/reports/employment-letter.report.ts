import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.sectios';

export const employmentLetterReport = (): TDocumentDefinitions => {
  const styles: StyleDictionary = {
    header: {
      fontSize: 22,
      bold: true,
      alignment: 'center',
      margin: [0, 100, 0, 20],
    },
    signature: {
      bold: true,
      fontSize: 14,
    },
    body: {
      margin: [0, 50, 0, 50],
      alignment: 'justify',
    },
    footer: {
      margin: [0, 0, 0, 20],
      alignment: 'center',
      fontSize: 10,
      italics: true,
    },
  };

  const docDefinition: TDocumentDefinitions = {
    header: headerSection({ }),
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado]. \n\nDurante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. \n\nLa jornada laboral del Sr./Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y procedimientos establecidos por la empresa. \n\nEsta constancia se expide a solicitud del interesado para los fines que considere conveniente`,
        style: 'body',
      },
      { text: `Atentamente,`, style: 'signature' },
      { text: `[Nombre del Empleador],`, style: 'signature' },
      { text: `[Cargo del Empleador],`, style: 'signature' },
      { text: `[Nombre de la Empresa],`, style: 'signature' },
      { text: `[Fecha de Emisión],`, style: 'signature' },
    ],
    footer: {
      text: ' Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
  };

  return docDefinition;
};
