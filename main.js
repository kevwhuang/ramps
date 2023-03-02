Chart.defaults.borderColor = '#ddd';
Chart.defaults.color = '#333';
Chart.defaults.font.size = 24;

const graph = new Chart('graph', {
    type: 'scatter',

    data: {
        datasets: [{
            color: '#222',
            data: [],
            label: 'Ramps (y) vs. Samples (x)',
            pointBackgroundColor: 'peru',
            pointBorderColor: 'peru',
            pointRadius: 2,
        }],
    },

    options: {
        layout: {
            padding: 24,
        },

        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Verdana, Arial, sans-serif',
                    },
                },
            },
        },

        scales: {
            x: {
                min: 0,
                position: 'bottom',
                ticks: {
                    stepSize: 1,
                },
                type: 'linear',
            },

            y: {
                min: 0,
                position: 'right',
                ticks: {
                    stepSize: 1,
                },
                type: 'linear',
            },
        },
    },
});

const ramp = n => {
    let total = 0, xy = [];

    for (let i = 0; i < n; i++) {
        const num = i.toString();
        const len = num.length;
        let state = true;

        for (let j = 0; j < len; j++) {
            if (num[j] > num[j + 1]) {
                state = false;
                break;
            }
        }

        if (state) total++;
        xy.push({ x: i + 1, y: total });
    }

    graph.data.datasets[0].data = xy;
    graph.update();

    return total;
}

document.querySelector('input[type="submit"]').addEventListener('click', () => {
    const $ = document.querySelector('input[type="text"]');

    if ($.checkValidity()) document.getElementsByTagName('h1')[0].innerText =
        'Ramps: ' + ramp($.value);
});
