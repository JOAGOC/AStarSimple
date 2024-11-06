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
      gridSize: { min: 20, max: 60, initial: 32 },
      obstacleDensity: { min: 1, max: 99, initial: 30 },
    };

    // Crear shadow DOM
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <div class="grid gap-4 grid-cols-2 max-w-lg mx-auto mt-10 p-4 bg-gray-50 shadow-2xl rounded-lg">
          <div class="col-span-4 grid grid-cols-1">
            <h2 class="text-2xl font-bold text-gray-800">Generador del Tablero</h2>
            <hr/>
          </div>

          <label for="gridSize" class="col-span-3 text-gray-700 font-medium">Ajustar Tamaño de Cuadrícula</label>
          <input type="text" id="gridSizeValue" value="${this.config.gridSize.initial}"
            class="ml-auto w-12 bg-transparent rounded-md text-center" />
          <input type="range" id="gridSize" min="${this.config.gridSize.min}" max="${this.config.gridSize.max}" value="${this.config.gridSize.initial}"
            class="col-span-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style="background: linear-gradient(to right, #3b82f6 30%, #e5e7eb 30%);" />

          <label for="obstacleDensity" class="col-span-3 text-gray-700 font-medium">Ajustar Densidad de Obstáculos</label>
          <input type="text" id="obstacleDensityValue" value="${this.config.obstacleDensity.initial}%"
            class="ml-auto w-12 bg-transparent rounded-md text-center" />
          <input type="range" id="obstacleDensity" min="${this.config.obstacleDensity.min}" max="${this.config.obstacleDensity.max}" value="${this.config.obstacleDensity.initial}"
            class="col-span-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />

          <div class="col-span-4 grid grid-cols-2 justify-items-stretch">
            <button id="resizeGrid"
              class="mx-2 border-2 border-sky-700 hover:border-sky-300 font-semibold py-2 px-4 rounded-lg transition duration-200">
              Generar
            </button>
            <button id="resetBoard"
              class="mx-2 border-2 border-sky-700 hover:border-sky-300 font-semibold py-2 px-4 rounded-lg transition duration-200">
              Reiniciar
            </button>
          </div>

          <style>
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              height: 8px;
              width: 8px;
              background-color: #fff;
              border-radius: 50%;
              box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
            }
            input[type="range"]::-moz-range-thumb {
              height: 8px;
              width: 8px;
              background-color: #fff;
              border-radius: 50%;
              box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
            }
          </style>
      </div>
    `;

    this.addEventListeners();
    this.replaceWith(this.shadowRoot);
  }

  // Agregar eventos para el componente
  addEventListeners() {
    const gridSizeRange = this.shadowRoot.getElementById("gridSize");
    const gridSizeValue = this.shadowRoot.getElementById("gridSizeValue");
    const obstacleDensityRange = this.shadowRoot.getElementById("obstacleDensity");
    const obstacleDensityValue = this.shadowRoot.getElementById("obstacleDensityValue");

    // Sincronización para gridSize
    gridSizeRange.addEventListener("input", () => {
      gridSizeValue.value = gridSizeRange.value;
      this.updateSliderBackground(gridSizeRange);
    });

    gridSizeValue.addEventListener("input", () => {
      const value = Math.min(Math.max(gridSizeValue.value, this.config.gridSize.min), this.config.gridSize.max);
      gridSizeRange.value = value;
      gridSizeValue.value = value;
      this.updateSliderBackground(gridSizeRange);
    });

    // Sincronización para obstacleDensity
    obstacleDensityRange.addEventListener("input", () => {
      obstacleDensityValue.value = `${obstacleDensityRange.value}%`;
      this.updateSliderBackground(obstacleDensityRange);
    });

    obstacleDensityValue.addEventListener("input", () => {
      const value = Math.min(Math.max(obstacleDensityValue.value.replace("%", ""), this.config.obstacleDensity.min), this.config.obstacleDensity.max);
      obstacleDensityRange.value = value;
      obstacleDensityValue.value = `${value}%`;
      this.updateSliderBackground(obstacleDensityRange);
    });
  }

  // Actualizar el fondo del slider
  updateSliderBackground(slider) {
    const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #3b82f6 ${value}%, #e5e7eb ${value}%)`;
  }
}

// Definir el nuevo elemento personalizado
customElements.define("grid-board-generator", GridBoardGenerator);