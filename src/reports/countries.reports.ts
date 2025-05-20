import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.sectios';
import { countries as country } from '@prisma/client';
import { footerSecction } from './sections/footer.section';

interface ReportOption {
  title?: string;
  subTitle?: string;
  countries: country[];
}

export const getCountryReport = (
  options: ReportOption,
): TDocumentDefinitions => {
  const { title, subTitle, countries } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subTitle: subTitle ?? 'List Of Countries',
    }),
    footer: footerSecction,
    pageMargins: [40, 130, 40, 60],
    content: [
      {
        layout: 'customLayout01', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            [
              'ID',
              'ISO2',
              'ISO3',
              { text: 'Name', bold: true },
              'Continent',
              'Local Name',
            ],
            ...countries.map((country) => [
              String(country.id),
              country.iso2 ?? '',
              country.iso3 ?? '',
              { text: country.name, bold: true },
              country.continent ?? '',
              country.local_name ?? '',
            ]),

            ['', '', '', '', '', ''],
            [
              '',
              '',
              '',
              '',
              'Total',
              { text: `${countries.length} países`, bold: true },
            ],
          ],
        },
      },

      //Tabla de totales

      {
        text:'Totales',
        style:{
          fontSize:18,
          bold:true,
          margin:[0,40,0,0]
        },
      },

      {
        layout:'noBorders',
        table:{
          widths: [50, 50, 50, '*', 'auto', '*'],
          headerRows:1,
          body:[
            [
              {
                text:'Total de países',
                colSpan:3,
                bold:true
              },
              {},
              {},
              {
                text:countries.length.toString(),
                bold:true
              },
              {},
              {},
            ]
          ]
        }
      }
    ],
  };
};
