import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChat } from './charts/donut.chart';
import { headerSection } from './sections/header.sectios';
import { getLineChart } from './charts/line.chart';
import { getBarsChart } from './charts/bars.chart';
import { getBarsFloatingChart } from './charts/barsFloating';

interface TopCountries {
  country?: string;
  customerCount?: number;
}

interface ReportOptions {
  title?: string;
  subtitle?: string;
  topCountries?: TopCountries[];
}

export const getStatisticReport = async (
  options: ReportOptions = {},
): Promise<TDocumentDefinitions> => {
  const [donutChart, lineChart, barsChart,floatingChart] = await Promise.all([
    getDonutChat({
      position: 'left',
      entries:
        options.topCountries?.map((e) => ({
          label: e.country ?? '',
          values: e.customerCount ?? 0,
        })) ?? [],
    }),
    getLineChart(),
    getBarsChart(),
    getBarsFloatingChart(),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title ?? 'Reporte de estadísticas',
      subTitle: options.subtitle ?? 'Estadísticas de clientes',
    }),
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: '10 mejores países',
                alignment: 'center',
                margin: [0, 0, 0, 10],
                fontSize: 20,
                bold: true,
              },
              {
                image: donutChart,
                width: 300,
              },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['País', 'Clientes'],
                ...(options.topCountries?.map((c) => [
                  c.country ?? '',
                  c.customerCount ?? 0,
                ]) ?? []), // Corrección aquí
              ],
            },
          },
        ],
      },
      {
        image: lineChart,
        width: 500,
        margin: [0, 20],
      },
      {
        columnGap: 10,
        columns: [
          {
            image: barsChart,
            width: 250,
           
          },
          {
            image: floatingChart,
            width: 250,
          
          }
        ],
      },
    ],
  };

  return docDefinition;
};
