
const juegos = document.querySelector('#juegos');
let ctx, canvas, myChart, details;

const actualizarGrafica = async () => {

    let titulo = juegos.options[juegos.selectedIndex].value;

    let response = await fetch(`/${titulo}`);
    let data     = await response.json();

    let prices = data.precios.map(precio => Number(precio.slice(0, -1)));
    let dates  = data.fechas.map(date => date);

    details.data.datasets[0].label = data.titulo;
    details.data.labels = dates;
    details.data.datasets[0].data = prices;

    myChart = new Chart(ctx, details);
}

juegos.onchange = actualizarGrafica;

const init = () => {
    ctx = document.getElementById('myChart').getContext('2d');
    details = {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: ' Euros',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }

    actualizarGrafica();
}

window.onload = init;