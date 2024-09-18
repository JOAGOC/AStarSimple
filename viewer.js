// app.js
// app.js
// grid.js
function createGrid(rows, cols) {
    console.log('Creando Grid');
    grid = [];
    
    const gridContainer = arreglarGrid(rows, cols);

    generarCeldas(rows, cols, gridContainer);

    return grid;
}

// app.js
document.addEventListener("DOMContentLoaded", () => {
    console.log('HTML Cargado');
    
    createGrid(20, 20); // Tamaño inicial del grid
    const cells = Array.from(document.querySelectorAll('.cell')); // Obtener todas las celdas del grid
    generateObstacles(cells, 20); // Generar los obstáculos
});

function generarCeldas(rows, cols, gridContainer) {
    console.log('Generando Celdas');
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            // Crea la representación en memoria (No visual)
            const cellData = {
                row: row,
                col: col,
                isStart: false,
                isEnd: false,
                isObstacle: false,
                isClosed: false,
                isFree: true
            };
            currentRow.push(cellData);

            // Crea la representación visual (Visual)
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.row = row;
            cellElement.dataset.col = col;

            // Agrega un manejador de eventos para cada celda visual (Interaccion)
            cellElement.addEventListener('mousedown', handleCellClick);

            gridContainer.appendChild(cellElement);
        }
        grid.push(currentRow);
    }
}

function arreglarGrid(rows, cols) {
    console.log('Arraglando visuales del grid');
    const gridContainer = document.getElementById("grid-container");
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.innerHTML = '';
    return gridContainer;
}

// app.js
function generateObstacles(cells, percentage) {
    console.log('Generando Obstaculos');
    
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
        cells[index].removeEventListener('mousedown',handleCellClick);
        setObstacle(grid,cells[index].dataset.row,cells[index].dataset.row)
    });
}

//TODO
function markCurrentCell(cell) {
    console.log('Marcando la casilla actual');

    const div = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
    div.classList.add('current');
    // // Remover la clase current de cualquier celda que la tenga
    // document.querySelectorAll('.current').forEach(c => c.classList.remove('current'));

    // // Agregar la clase current a la celda actual
    // cell.classList.add('current');
}

//TODO
function updateCellInfo(cell, row, col, g, h, f) {
    console.log('Actualizando información de la celda');
    // Modificar el contenido del div para mostrar información adicional
    cell.innerHTML = `
      <small>Row: ${row}, Col: ${col}</small><br/>
      <small>g: ${g}, h: ${h}, f: ${f}</small>
    `;
}

// ui.js
//TODO
function renderGrid(grid) {
    console.log('Renderizando el Grid');
    
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = ""; // Limpiar el contenido anterior

    grid.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("grid-row");

        row.forEach(cell => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("grid-cell");

            if (cell.isStart) {
                cellDiv.classList.add("start-cell");
            } else if (cell.isEnd) {
                cellDiv.classList.add("end-cell");
            } else if (cell.isObstacle) {
                cellDiv.classList.add("obstacle-cell");
            }

            rowDiv.appendChild(cellDiv);
        });

        gridContainer.appendChild(rowDiv);
    });
}
