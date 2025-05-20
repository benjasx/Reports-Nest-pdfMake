import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.sectios';
import { DateFormatter } from 'src/helpers';

interface ReportValues {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}

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

export const getEmployementLetterByIdReport = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
  } = values;
  const docDefinition: TDocumentDefinitions = {
    header: headerSection({}),
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMMYYYY(employeeStartDate)}. \n\nDurante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. \n\nLa jornada laboral del Sr./Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa. \n\nEsta constancia se expide a solicitud del interesado para los fines que considere conveniente`,
        style: 'body',
      },
      { text: `Atentamente,`, style: 'signature' },
      { text: employerName, style: 'signature' },
      { text: employerPosition, style: 'signature' },
      { text: employerCompany, style: 'signature' },
      { text: DateFormatter.getDDMMMMYYYY(new Date()), style: 'signature' },
    ],
    footer: {
      text: ' Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
  };

  return docDefinition;
};
