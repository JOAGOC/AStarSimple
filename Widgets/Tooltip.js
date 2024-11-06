/**
 * TODO Construir el fucking tooltip
 */
class TooltipElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM
    this.tooltipText = this.getAttribute('data-tooltip') || 'Tooltip';
    this.hoverTimeout = null;

    this.shadowRoot.innerHTML = `
      <style>
        /* Tailwind classes embebidas */
        .tooltip {
          @apply bg-gray-700 text-white text-xs rounded py-1 px-2 hidden absolute;
          transition: opacity 0.2s ease;
          z-index: 10;
        }
        .tooltip.visible {
          @apply block;
        }
      </style>
      <div class="tooltip" id="tooltip">${this.tooltipText}</div>
      <slot></slot>
    `;

    this.tooltip = this.shadowRoot.getElementById('tooltip');
  }

  connectedCallback() {
    this.addEventListener('mouseenter', this.showTooltip.bind(this));
    this.addEventListener('mouseleave', this.hideTooltip.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener('mouseenter', this.showTooltip);
    this.removeEventListener('mouseleave', this.hideTooltip);
  }

  showTooltip() {
    this.hoverTimeout = setTimeout(() => {
      const { top, left, width } = this.getBoundingClientRect();
      this.tooltip.style.top = `${top - 30}px`;
      this.tooltip.style.left = `${left + width / 2 - this.tooltip.offsetWidth / 2}px`;
      this.tooltip.classList.add('visible');
    }, 1500); // Tiempo de espera
  }

  hideTooltip() {
    clearTimeout(this.hoverTimeout); // Cancela si se sale antes de tiempo
    this.tooltip.classList.remove('visible');
  }
}

// Define el nuevo elemento personalizado
customElements.define('tooltip-element', TooltipElement);