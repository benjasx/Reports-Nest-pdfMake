import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';
import { footerSecction } from './sections/footer.section';
import { blob } from 'stream/consumers';

const logo: Content = {
  image: 'src/assets/bms.png',
  width: 100,
  height: 100,
  margin: [63, 20],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 60],
  },
};

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subtitle?: string;
  data: CompleteOrder;
}
export const orderByIdReport = (values: ReportValues): TDocumentDefinitions => {
  const { data } = values;
  const { customers, order_details } = data;

  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );

  const total = subTotal * 1.16; // Assuming a 16% tax rate

  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    footer: footerSecction,
    content: [
      {
        text: 'Benjasx Code Corp.',
        style: 'header',
      },
      {
        columns: [
          {
            text: 'Esteban Baca Calderon #7\nCol: 25 Abril\nC.P: 63784, Xalisco, Nayarit\n',
          },
          {
            text: [
              { text: `Recibo No. BNX - ${data.order_id}\n`, bold: true },
              `Fecha del recibo ${DateFormatter.getDDMMMMYYYY(data.order_date)}\nPagar antes del ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
            ],
            alignment: 'right',
          },
        ],
      },

      //QR
      {
        qr: 'https://github.com/benjasx/Reports-Nest-pdfMake',
        fit: 100,
        alignment: 'right',
        margin: [0, 20],
      },
      {
        //Direccion del Cliente
        text: [
          {
            text: 'Cobrar a: \n',
            bold: true,
            fontSize: 14,
          },
          `Razon social: ${customers.customer_name}\n ${customers.address}`,
        ],
      },

      //Tabla del detalle de la orden
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            ...order_details.map((item) => {
              return [
                item.order_detail_id,
                item.products.product_name,
                item.quantity,
                {
                  text: CurrencyFormatter.formatCurrency(+item.products.price),
                  alignment: 'right',
                },
                {
                  text: CurrencyFormatter.formatCurrency(
                    item.quantity * parseFloat(item.products.price),
                  ),
                  alignment: 'right',
                },
              ];
            }),
          ],
        },
      },
      '\n',
      {
        //Totales
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'SUBTOTAL',
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  'IVA 16%',
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal * 0.16),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'TOTAL', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
