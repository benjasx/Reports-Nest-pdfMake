import fs from 'fs';

import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generatChartImage = async () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: [2012, 2013, 2014, 2015, 2016], // Set X-axis labels
      datasets: [
        {
          label: 'Users', // Create the 'Users' dataset
          data: [120, 60, 50, 180, 120], // Add data to the chart
        },
      ],
    },
  };

  return Utils.chartJsonToImage(chartConfig);
};

const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const data = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: Object.values(Utils.CHART_COLORS),
    },
  ],
};

const generateDonut = async () => {
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
    },
  };
  return Utils.chartJsonToImage(config);
};

export const getBasicChatSvgReport =
  async (): Promise<TDocumentDefinitions> => {
    const [chart, chartDonut] = await Promise.all([
      generatChartImage(),
      generateDonut(),
    ]);
    /* const chart = await generatChartImage();
    const chartDonut = await generateDonut(); */

    const content: any[] = [];

    content.push({ svg: svgContent, width: 100, fit: [100, 100] });

    if (chart) {
      content.push({
        image: chart,
        width: 500,
      });
    }

    if (chartDonut) {
      content.push({
        image: chartDonut,
        width: 500,
      });
    }

    return { content };
  };
