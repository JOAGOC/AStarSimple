// app.js
// app.js
function createGrid(rows, columns) {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gridContainer.innerHTML = '';

    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gridContainer.appendChild(cell);
    }

    // Asegúrate de agregar el manejador de eventos después de crear las celdas
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('mousedown', handleCellClick));
}


// app.js
window.addEventListener('resize', () => {
    const gridContainer = document.getElementById('grid-container');
    const newSize = Math.min(window.innerWidth, window.innerHeight) * 0.4; // Ajustar el 40% del menor lado
    gridContainer.style.width = `${newSize}px`;
    gridContainer.style.height = `${newSize}px`;
});

// app.js
document.addEventListener("DOMContentLoaded", () => {
    createGrid(20, 20); // Tamaño inicial del grid
});

// app.js
function generateObstacles(cells, percentage) {
    const totalCells = cells.length;
    const obstacleCount = Math.floor((percentage / 100) * totalCells);

    // Crear un conjunto de índices aleatorios para obstáculos
    const obstacleIndexes = new Set();
    while (obstacleIndexes.size < obstacleCount) {
        const randomIndex = Math.floor(Math.random() * totalCells);
        obstacleIndexes.add(randomIndex);
    }

    // Aplicar la clase de obstáculo a las celdas correspondientes
    obstacleIndexes.forEach(index => {
        cells[index].classList.add('obstacle');
    });
}

// app.js
let startCell = null;
let endCell = null;

function handleCellClick(event) {
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

// Agregar evento de clic a todas las celdas
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('mousedown', handleCellClick));
});

// app.js
document.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Prevenir el menú contextual del navegador
});
