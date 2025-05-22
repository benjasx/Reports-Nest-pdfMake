import * as Utils from 'src/helpers/chart-utils'

interface DonutEntry {
    label: string;
    values: number;
}

interface DonutOptions{
    position?: 'left' | 'right' | 'top' | 'bottom';
    entries: DonutEntry[];
}

export const getDonutChat = async (options: DonutOptions): Promise<string> => {

    const { position = 'left' } = options;
    const data = {
        labels: options.entries.map((e) => e.label),
        datasets: [
            {
                label: 'Dataset 1',
                data: options.entries.map((e) => e.values),
                backgroundColor: Object.values(Utils.CHART_COLORS),
            },
        ],
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                position: position,
            },
            plugins: {
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: '14',
                    },
                },
                /* title: {
                  display: true,
                  text: 'Chart.js Doughnut Chart',
                }, */
            },
        },
    };

    const image = await Utils.chartJsonToImage(config, {
        width: 500,
        height: 300,
    });

    if (!image) {
        throw new Error('No se pudo generar la imagen del gráfico de dona');
    }

    return image;
};