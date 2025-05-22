import * as Utils from 'src/helpers/chart-utils';

export const getBarsFloatingChart = (): Promise<string> => {
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

  const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => {
          return [Utils.rand(-100, 100), Utils.rand(-100, 100)];
        }),
        backgroundColor: Utils.NAMED_COLORS.red,
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => {
          return [Utils.rand(-100, 100), Utils.rand(-100, 100)];
        }),
        backgroundColor: Utils.NAMED_COLORS.blue,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
  };

  return Utils.chartJsonToImage(config /*  { width: 250, height: 200 } */).then(
    (result) => {
      if (result === null) {
        throw new Error('Failed to generate chart image');
      }
      return result;
    },
  );
};
