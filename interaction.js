//TODO Poder reiniciar el mapa o iniciar otro.

document.getElementById("startBtn").addEventListener("click", () => {
    clicBtnStart();
});

document.addEventListener('contextmenu', (event) => {
    prevenirContextMenu(event);
});

document.getElementById("set-grid").addEventListener("click", () => {
    nuevoGridPersonalizado(); // Generar los obstáculos
});

/**
 * @type {HTMLDivElement} - Elemento de fin, seleccionado en la UI
 */
let startCell = null;
/**
 * @type {HTMLDivElement} - Elemento de fin, seleccionado en la UI
 */
let endCell = null;

/**
 * Funcion que se ejecuta al hacer clic en el boton de nuevo grid.
 */
function nuevoGridPersonalizado() {
    console.log('Creando grid personalizado');

    const gridSize = document.getElementById("grid-size").value; // Número de filas y columnas
    const obstaclePercentage = document.getElementById("obstacle-percentage").value; // Porcentaje de obstáculos

    const cells = createGrid(gridSize, gridSize);
    generateObstacles(cells.flat(), obstaclePercentage);
    grid = cells;
}

/**
 * Previene el menu contextual al hacer clic derecho en las celdas
 * @param {Event} event 
 */
function prevenirContextMenu(event) {
    if (event.target.classList[0] === 'cell') {
        console.log('Previniendo el clic derecho');
        event.preventDefault();
    }
}

/**
 * Se ejecuta al hacer clic en el boton inicial
 */
function clicBtnStart() {
    console.log('Haciendo clic en iniciar');

    const start = document.querySelector('.start');
    const end = document.querySelector('.end');

    const path = aStar(start, end);
}

/**
 * Maneja el clic derecho o izquierdo de las celdas
 * @param {} event 
 * @returns 
 */
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

/**
 * Método que detiene el flujo de ejecución hasta que se haga clic en el botón de continuar.
 * 
 * Este método devuelve una promesa que se resuelve cuando el botón con 
 * el id especificado es clicado. Se asegura de que el listener se 
 * elimine después de la primera interacción.
 * 
 * @returns {Promise<void>} Una promesa que se resuelve cuando se hace clic en el botón.
 */
function esperarInteraccion() {
    console.log('Esperando el click');
    
    return new Promise((resolve) => {
        document.getElementById('>').addEventListener('click', () => resolve(), { once: true });
    });
}
