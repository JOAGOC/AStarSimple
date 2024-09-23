//TODO Revisar el algoritmo original.

/**
 * @type {Set<HTMLDivElement>} - Contiene las celdas competidoras
 */
const openSet = new Set();

/**
 * @type {Set<HTMLDivElement>} - Contiene las celdas ya visitadas
 */
const closedSet = new Set();

//TODO
const gScore = new Map();
const fScore = new Map();
const cameFrom = new Map();

/**
 * El grid principal que se muestra en el algoritmo
 * @type {HTMLDivElement[][]}
 */
let grid;

/**
 * Inicializa las estructuras de datos para el algoritmo A Star.
 * @param {HTMLDivElement} start - La celda seleccionada de inicio
 * @param {HTMLDivElement} end - La celda seleccionada de fin
 */
function initialize(start, end) {
    console.log('Inicializando el algoritmo A*');
    
    openSet.add(start);
    gScore.set(start, 0);
    fScore.set(start, manhattanDistance(start, end));
}

/**
 * Usa el dataset de los div .cell para calcular la distancia faltante desde el punto A al punto B
 * 
 * @param {HTMLDivElement} pointA - Div del punto de partida
 * @param {HTMLDivElement} pointB - Div del punto de destino
 * @returns {Number} la distancia del origen al destino
 */
function manhattanDistance(pointA, pointB) {
    console.log('Calculando distancia manhatan');
    let {row, col} = pointA.dataset;
    const rowA = parseInt(row);
    const colA = parseInt(col);

    ({row, col} = pointB.dataset);
    const rowB = parseInt(row);
    const colB = parseInt(col);

    const costo = Math.abs(rowA - rowB) + Math.abs(colA - colB);
    console.log(costo);
    return costo;
}

//TODO
function getLowestFScoreNode() {
    console.log('Encontrando el nodo con menor FScore');

    let lowest = null;
    openSet.forEach(node => {
        if (lowest === null || fScore.get(node) < fScore.get(lowest)) {
            lowest = node;
        }
    });
    return lowest;
}

//TODO revisar lo del GScore, muy extraño
//TODO
/**
 * Calcula los scores de los vecinos para la siguiente iteracion del algoritmo
 * @param {HTMLDivElement} current - La celda actual 
 * @param {HTMLDivElement[]} neighbors - Los vecinos de la celda actual
 * @param {HTMLDivElement} end - La celda final a la que llegar
 */
function processNeighbors(current, neighbors, end) {
    console.log('Procesando a los vecinos');
    
    neighbors.forEach(neighbor => {
        if (closedSet.has(neighbor)) return;

        const tentativeGScore = gScore.get(current) + 1; // Asume que el costo de movimiento es 1

        if (!openSet.has(neighbor)) {
            openSet.add(neighbor);
        } else if (tentativeGScore >= gScore.get(neighbor)) {
            return;
        }

        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, manhattanDistance(neighbor, end));
    });
}

//TODO VW
function reconstructPath(current) {
    console.log('Reconstruyendo el camino');
    
    const path = [];
    while (cameFrom.has(current)) {
        path.push(current);
        current = cameFrom.get(current);
    }
    path.reverse();
    return path;
}

//TODO
/**
 * Es el orquestador de todos los algoritmos necesarios para resolver y visualizar el algoritmo A Star.
 * @param {HTMLDivElement} start - Celda seleccionada origen 
 * @param {HTMLDivElement} end - Celda seleccionada destino
 * @returns {HTMLDivElement} - El camino mas corto del origen al destino
 */
async function aStar(start, end) {
    console.log('LLamando al algoritmo principal');
    
    initialize(start, end);

    while (openSet.size > 0) {
        const current = getLowestFScoreNode();

        if (current === end) {
            return reconstructPath(current);
        }

        markClosedSet(closedSet);
        markCurrentCell(current);
        // TODO updateCellInfo(current,gScore.get(current),fScore.get(current));
        openSet.delete(current);
        fScore.delete(current);
        closedSet.add(current);

        console.log(openSet,fScore,closedSet);
        await esperarInteraccion();

        const neighbors = getNeighbors(current, grid);
        processNeighbors(current, neighbors, end);

        markOpenSet(openSet);
        console.log(openSet);

        console.log(openSet,fScore,closedSet);
        await esperarInteraccion();
    }

    return []; // No se encontró un camino
}

/**
 * Obtiene los vecinos adyacentes en sus 4 magnitudes (Arriba, abajo, izquierda y derecha).
 * Los vecinos válidos se añaden al arreglo.
 * @param {HTMLDivElement} cell 
 * @param {HTMLDivElement[][]} grid 
 * @returns {HTMLDivElement[]}
 */
function getNeighbors(cell, grid) {
    console.log('Obteniendo Vecinos');

    let { row, col } = cell.dataset;
    row = parseInt(row);
    col = parseInt(col);
    
    const neighbors = [];

    // Posiciones de los posibles vecinos: arriba, abajo, izquierda, derecha
    const directions = [
        { rowOffset: -1, colOffset: 0 }, // Arriba
        { rowOffset: 1, colOffset: 0 },  // Abajo
        { rowOffset: 0, colOffset: -1 }, // Izquierda
        { rowOffset: 0, colOffset: 1 },  // Derecha
    ];

    // Verificar cada dirección y agregar a vecinos si está dentro de los límites
    for (const direction of directions) {
        const newRow = row + direction.rowOffset;
        const newCol = col + direction.colOffset;

        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
            const neighbor = grid[newRow][newCol];
            if (!neighbor.classList.contains('obstacle')) {
                neighbors.push(neighbor);
            }
        }
    }
    return neighbors;
}