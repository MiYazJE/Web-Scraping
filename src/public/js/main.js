
const juegos = document.querySelector('#juegos');

const actualizarGrafica = async () => {
    let titulo = juegos.options[juegos.selectedIndex].value;
    
    let response = await fetch(`/${titulo}`);
    let data     = await response.json();

    console.log(data);
}

juegos.onchange = actualizarGrafica;