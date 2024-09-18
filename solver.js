// aStar.js
const openSet = new Set();
const closedSet = new Set();
const gScore = new Map();
const fScore = new Map();
const cameFrom = new Map();
let grid = [];

function initialize(start, end) {
    console.log('Inicializando el algoritmo A*');
    
    openSet.add(start);
    gScore.set(start, 0);
    fScore.set(start, manhattanDistance(start, end));
}

// heuristics.js
function manhattanDistance(pointA, pointB) {
    console.log('Calculando distancia manhatan');
    
    return Math.abs(pointA.row - pointB.row) + Math.abs(pointA.col - pointB.col);
}

// aStar.js
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

// aStar.js
//TODO VW
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
        fScore.set(neighbor, gScore.get(neighbor) + manhattanDistance(neighbor, end));
    });
}

// aStar.js
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

// aStar.js
//TODO
function aStar(start, end) {
    console.clear()
    console.log('LLamando al algoritmo principal');
    

    initialize(start, end);

    while (openSet.size > 0) {
        const current = getLowestFScoreNode();

        if (current === end) {
            return reconstructPath(current);
        }

        markCurrentCell(current);
        openSet.delete(current);
        closedSet.add(current);

        const neighbors = getNeighbors(current, grid);
        processNeighbors(current, neighbors, end);
        break;
    }

    return []; // No se encontró un camino
}

// neighbors.js
//TODO
function getNeighbors(cell, grid) {
    console.log('Obteniendo Vecinos');

    const { row, col } = cell;
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
            if (!neighbor.isObstacle) {
                neighbors.push(neighbor);
            }
        }
    }
    return neighbors;
}

// grid.js
function setStartCell(grid, row, col) {
    console.log('Guardando celda de inicio en memoria');

    grid[row][col].isStart = true;
    grid[row][col].isFree = false;
}

function setEndCell(grid, row, col) {
    console.log('Guardando celda final en memoria');

    grid[row][col].isEnd = true;
    grid[row][col].isFree = false;
}

function setObstacle(grid, row, col) {
    console.log('Guardando celda bloqueada en memoria');

    grid[row][col].isObstacle = true;
    grid[row][col].isFree = false;
}

function setClosed(grid,row,col){
    console.log('Guardando celda cerrada en memoria');
    
    grid[row][col].isClosed = true;
    grid[row][col].isFree = false;
}
