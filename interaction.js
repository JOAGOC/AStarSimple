// app.js
document.getElementById("startBtn").addEventListener("click", () => {
    console.log('Haciendo clic en iniciar');

    const start = document.querySelector('.start').dataset;
    const end = document.querySelector('.end').dataset;


    const path = aStar(start, end);
});

// app.js
document.getElementById("set-grid").addEventListener("click", () => {
    console.log('Creando grid personalizado');
    

    const gridSize = document.getElementById("grid-size").value; // Número de filas y columnas
    const obstaclePercentage = document.getElementById("obstacle-percentage").value; // Porcentaje de obstáculos

    createGrid(gridSize, gridSize); // Crear la cuadrícula
    const cells = Array.from(document.querySelectorAll('.cell')); // Obtener todas las celdas del grid
    generateObstacles(cells, obstaclePercentage); // Generar los obstáculos
});

// app.js
let startCell = null;
let endCell = null;

function handleCellClick(event) {
    console.log('Haciendo clic en una celda');

    const cell = event.target;

    // Asegúrate de que solo se pueda seleccionar celdas
    if (!cell.classList.contains('cell')) return;

    if (event.button === 0) { // Clic izquierdo
        if (startCell) startCell.classList.remove('start');
        startCell = cell;
        startCell.classList.add('start');
    } else if (event.button === 2) { // Clic derecho
        if (endCell) endCell.classList.remove('end');
        endCell = cell;
        endCell.classList.add('end');
    }

    event.preventDefault(); // Prevenir el menú contextual del clic derecho
}

// // Agregar evento de clic a todas las celdas
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('Añadiendo el evento clic a las celdas');

//     const cells = document.querySelectorAll('.cell');
//     cells.forEach(cell => cell.addEventListener('mousedown', handleCellClick));
// });

// app.js
document.addEventListener('contextmenu', (event) => {
    if (event.target.classList[0] === 'cell'){
        console.log('Previniendo el clic derecho');
        event.preventDefault(); // Prevenir el menú contextual del navegador
    }
});