
const juegos = document.querySelector('#juegos');

juegos.onchange = () => {
    let value = juegos.options[juegos.selectedIndex].value;
    console.log(value);
}