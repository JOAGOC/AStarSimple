//TODO Marcar el camino resultante.
//TODO Añadir el temporizador.

document.addEventListener("DOMContentLoaded", () => {
    cargaInicial();
});

/**
 * Carga el primer mapa al cargar el contenido de la pagina.
 */
function cargaInicial() {
    console.log('HTML Cargado');

    const cells = createGrid(20, 20); // Tamaño inicial del grid
    generateObstacles(cells.flat(), 20); // Generar los obstáculos
    grid = cells;
}

/**
 * Crea y configura la representacion visual del grid y lo guarda en memoria
 * @param {number} rows 
 * @param {number} cols 
 * @returns {HTMLDivElement[][]} grid
 */
function createGrid(rows, cols) {
    console.log('Creando Grid');

    const gridContainer = arreglarGrid('grid-container', rows, cols);
    return generarCeldas(rows, cols, gridContainer);
}

/**
 * Genera la representación de las celdas y las muestra en pantalla. Almacena un arreglo bidimensional con las referencias a las celdas.
 * @param {number} rows 
 * @param {number} cols 
 * @param {HTMLElement} gridContainer 
 * @returns {Array<Array<HTMLDivElement>>}
 */
function generarCeldas(rows, cols, gridContainer) {
    console.log('Generando Celdas');
    const grid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            // Crea la representación en memoria (No visual)
            const cellData = {
                row: row,
                col: col,
                free: true // 1 libre, 0 obstaculo
            };
            // Before currentRow.push(cellData);

            // Crea la representación visual (Visual)
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.row = row;
            cellElement.dataset.col = col;

            // Agrega un manejador de eventos para cada celda visual (Interaccion)
            cellElement.addEventListener('mousedown', handleCellClick);

            gridContainer.appendChild(cellElement);
            currentRow.push(cellElement);
        }
        grid.push(currentRow);
    }
    return grid;
}

/**
 * Busca y configura un contenedor html por su id para mostrar el grid cuando sea llenado
 * @param {string} containerId 
 * @param {number} rows 
 * @param {number} cols 
 * @returns {HTMLElement}
 */
function arreglarGrid(containerId, rows, cols) {
    console.log('Arreglando visuales del grid');
    
    const gridContainer = document.getElementById(containerId);
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.innerHTML = '';
    return gridContainer;
}

/**
 * Transforma un porcentaje de las celdas recibidas en obstaculos.
 * @param {Array<HTMLDivElement>} cells 
 * @param {number} percentage 
 */
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
        cells[index].dataset = null;
    });
}

/**
 * Modifica la apariencia de la celda para marcarla como la celda ganadora o actual.
 * 
 * Esta función agrega la clase CSS 'current' a la celda proporcionada, lo que 
 * permite aplicar estilos que visualmente marquen la celda como la seleccionada o ganadora.
 * 
 * @param {HTMLDivElement} cell - El elemento HTML de tipo <div> que representa la celda a marcar.
 */
function markCurrentCell(cell) {
    console.log('Marcando la casilla actual');
    
    cell.classList.add('current');
}


/**
 * Marca la vista de las celdas en el openSet
 * @param {HTMLDivElement[]} openSet - Marca las celdas abiertas
 */
function markOpenSet(openSet) {
    console.log('Marcando las casillas abiertas');
    
    openSet.forEach( e => e.classList.add('open'));
}

//TODO
function updateCellInfo(cell, g, f) {
    console.log('Actualizando información de la celda');
    // Modificar el contenido del div para mostrar información adicional
    cell.innerHTML = `
      <small>Row: ${cell.row}, Col: ${cell.col}</small><br/>
      <small>g: ${g}, f: ${f}</small>
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

//TODO Revisar la eficiencia
/**
 * Marca visualmente todas las celdas del conjunto cerrado.
 * 
 * Esta función itera sobre una lista de elementos HTML de tipo <div>, 
 * agregando la clase 'closed' a cada uno. Esto permite aplicar estilos que 
 * visualmente indiquen que estas celdas están en un estado cerrado o inactivo.
 * 
 * @param {HTMLDivElement[]} closedSet - Un array de elementos HTML <div> que representan las celdas a marcar como cerradas.
 */
function markClosedSet(closedSet) {
    console.log('Marcando las casillas cerradas');

    closedSet.forEach( e => e.classList.add('closed'));
}