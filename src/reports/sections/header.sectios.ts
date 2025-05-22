import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/bms.png',
  width: 100,
  height: 100,

};

const currentDate: Content = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  fontSize: 12,
  
};

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subTitle, showDate = true, showLogo = true } = options;

  const currentsubTitle: Content = subTitle
    ? {
        text: subTitle,
        alignment: 'center',
        style: {
          fontSize: 17,
        },
      }
    : '';

  const headerLogo: Content = showLogo ? logo : '';
  const headerDate: Content = showDate ? currentDate : '';
  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            margin: [0, 20, 0, 0],
            style: {
              alignment: 'center',
              bold: true,
              fontSize: 25,
            },
          },
          currentsubTitle,
        ],
      }
    : '';

  return {
    columns: [headerLogo, headerTitle, { width: 100, text: headerDate,  margin: [0,30,10,0], bold:true}],
  };
};
