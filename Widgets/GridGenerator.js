/**
 * TODO
 * Funcionalidad de los botones
 * Colores
 * Tipografia
 */
class GridBoardGenerator extends HTMLElement {
  constructor() {
    super();

    // Constantes de configuración
    this.config = {
      gridSize: { min: 10, max: 50, initial: 30 },
      obstacleDensity: { min: 10, max: 90, initial: 50 },
    };

    // Contenedor principal
    const container = document.createElement("div");
    container.className =
      "grid gap-4 grid-cols-2 max-w-lg mx-auto mt-10 p-4 bg-gray-50 shadow-2xl rounded-lg";

    // Encabezado y título
    const headerContainer = document.createElement("div");
    headerContainer.className = "col-span-4 grid grid-cols-1";
    const title = document.createElement("h2");
    title.className = "text-2xl font-bold text-gray-800";
    title.textContent = "Generador del Tablero";
    headerContainer.appendChild(title);
    headerContainer.appendChild(document.createElement("hr"));
    container.appendChild(headerContainer);

    // Elementos de ajuste de Tamaño de Cuadrícula
    const gridSizeLabel = document.createElement("label");
    gridSizeLabel.setAttribute("for", "gridSize");
    gridSizeLabel.className = "col-span-3 text-gray-700 font-medium";
    gridSizeLabel.textContent = "Tamaño de Cuadrícula (N×N)";

    const gridSizeValue = document.createElement("input");
    gridSizeValue.type = "text";
    gridSizeValue.id = "gridSizeValue";
    gridSizeValue.value = this.config.gridSize.initial;
    gridSizeValue.className =
      "ml-auto w-12 bg-transparent rounded-md text-center";

    const gridSizeRange = document.createElement("input");
    gridSizeRange.type = "range";
    gridSizeRange.id = "gridSize";
    gridSizeRange.min = this.config.gridSize.min;
    gridSizeRange.max = this.config.gridSize.max;
    gridSizeRange.value = this.config.gridSize.initial;
    gridSizeRange.className =
      "col-span-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer";

    container.appendChild(gridSizeLabel);
    container.appendChild(gridSizeValue);
    container.appendChild(gridSizeRange);

    // Elementos de ajuste de Densidad de Obstáculos
    const obstacleDensityLabel = document.createElement("label");
    obstacleDensityLabel.setAttribute("for", "obstacleDensity");
    obstacleDensityLabel.className = "col-span-3 text-gray-700 font-medium";
    obstacleDensityLabel.textContent = "Densidad de Obstáculos (%)";

    const obstacleDensityValue = document.createElement("input");
    obstacleDensityValue.type = "text";
    obstacleDensityValue.id = "obstacleDensityValue";
    obstacleDensityValue.value = `${this.config.obstacleDensity.initial}`;
    obstacleDensityValue.className =
      "ml-auto w-12 bg-transparent rounded-md text-center";

    const obstacleDensityRange = document.createElement("input");
    obstacleDensityRange.type = "range";
    obstacleDensityRange.id = "obstacleDensity";
    obstacleDensityRange.min = this.config.obstacleDensity.min;
    obstacleDensityRange.max = this.config.obstacleDensity.max;
    obstacleDensityRange.value = this.config.obstacleDensity.initial;
    obstacleDensityRange.className =
      "col-span-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer";

    container.appendChild(obstacleDensityLabel);
    container.appendChild(obstacleDensityValue);
    container.appendChild(obstacleDensityRange);

    // Botones de acciones
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className =
      "col-span-4 grid grid-cols-2 justify-items-stretch";

    const resizeButton = document.createElement("button");
    resizeButton.id = "resizeGrid";
    resizeButton.className =
      "mx-2 border-2 border-sky-700 hover:border-sky-300 font-semibold py-2 px-4 rounded-lg transition duration-200";
    resizeButton.textContent = "Generar";

    const resetButton = document.createElement("button");
    resetButton.id = "resetBoard";
    resetButton.className =
      "mx-2 border-2 border-sky-700 hover:border-sky-300 font-semibold py-2 px-4 rounded-lg transition duration-200";
    resetButton.textContent = "Reiniciar";

    buttonsContainer.appendChild(resizeButton);
    buttonsContainer.appendChild(resetButton);
    container.appendChild(buttonsContainer);

    // Agregar estilos personalizados
    const style = document.createElement("style");
    style.textContent = `
            input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                height: 0.5rem;
                width: 0.5rem;
                background-color: #fff;
                border-radius: 50%;
                box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
            }
            input[type="range"]::-moz-range-thumb {
                height: 0.5rem;
                width: 0.5rem;
                background-color: #fff;
                border-radius: 50%;
                box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
            }
        `;

    this.replaceWith(container);
    document.head.appendChild(style);

    syncSliderWithText(gridSizeRange, gridSizeValue);
    syncSliderWithText(obstacleDensityRange, obstacleDensityValue);
  }
}

const updateSliderBackground = (slider) => {
  const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, #3b82f6 ${value}%, #e5e7eb ${value}%)`;
};

const syncSliderWithText = (rangeElement, textElement) => {
  const minValue = parseInt(rangeElement.min, 10);
  const maxValue = parseInt(rangeElement.max, 10);

  // Sincronizar el texto cuando cambia el slider
  rangeElement.addEventListener("input", () => {
    textElement.value = rangeElement.value;
    updateSliderBackground(rangeElement);
  });

  // Validar e implementar el valor del campo de texto
  const updateSliderFromText = () => {
    const value = parseInt(textElement.value, 10);
    if (!isNaN(value)) {
      rangeElement.value = Math.max(minValue, Math.min(maxValue, value));
      updateSliderBackground(rangeElement);
      textElement.value = rangeElement.value; // Asegura el límite en el texto
    } else {
      textElement.value = rangeElement.value; // Reestablece si no es un número
    }
  };

  // Escuchar cambios en el campo de texto (cuando se pierde el foco o se presiona Enter)
  textElement.addEventListener("change", updateSliderFromText);
  textElement.addEventListener("focusout", updateSliderFromText);
  textElement.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      updateSliderFromText();
    } else if (
      !/[0-9]/.test(event.key) &&
      !["Backspace", "Delete"].includes(event.key)
    ) {
      event.preventDefault();
    }
  });
};

// Definir el nuevo elemento personalizado
customElements.define("grid-board-generator", GridBoardGenerator);
