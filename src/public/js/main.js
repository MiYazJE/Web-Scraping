
const juegos = document.querySelector('#juegos');
let ctx, canvas, myChart, details;

const actualizarGrafica = async () => {
    let titulo = juegos.options[juegos.selectedIndex].value;
    
    let response = await fetch(`/${titulo}`);
    let data     = await response.json();

    let prices = data.map(juego => Number(juego.precio.slice(0, -1)));
    let dates  = data.map(juego => juego.fecha);

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
                fill: false,
                lineTension: 0.1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                data: [12, 19, 3, 5, 2, 3]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }

    myChart = new Chart(ctx, details);
}

window.onload = init;