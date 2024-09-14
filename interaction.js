// app.js
document.getElementById("set-grid").addEventListener("click", () => {
    const gridSize = document.getElementById("grid-size").value; // Número de filas y columnas
    const obstaclePercentage = document.getElementById("obstacle-percentage").value; // Porcentaje de obstáculos

    createGrid(gridSize, gridSize); // Crear la cuadrícula
    const cells = Array.from(document.querySelectorAll('.cell')); // Obtener todas las celdas del grid
    generateObstacles(cells, obstaclePercentage); // Generar los obstáculos
});
