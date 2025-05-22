import * as Utils from 'src/helpers/chart-utils';

export const getLineChart = (): Promise<string> => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Movimiento de inventario',
        data: Utils.numbers({ count: 6, min: -100, max: 100 }),
        borderColor: Utils.NAMED_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.red, 0.5),
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
   
  };

  return Utils.chartJsonToImage(config,{width:500,height:200}).then(result => {
    if (result === null) {
      throw new Error('Failed to generate chart image');
    }
    return result;
  });
};
