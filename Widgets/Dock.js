class Dock extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Estilo de Tailwind CSS, añadido como parte del shadow DOM
        shadow.innerHTML = `
            <style>
                @import "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
            </style>
            <nav class="max-w-[12.2rem] overflow-y-auto grid h-[92vh] max-h-[17rem] gap-1 rounded-lg border-2 fixed top-1/2 left-3 -translate-y-1/2">
                <button class="min-h-7 bg-white sticky top-0 border-2" id="toggleButton">&#9776;</button>
                <ul class="grid">
                    <li class="p-2 flex items-center overflow-hidden border-2">🎯
                        <span class="toggleClass transition-all duration-500 ease-in-out overflow-hidden inline-block w-0 whitespace-nowrap">&nbsp&nbspModo Single</span>
                    </li>
                    <li class="p-2 flex items-center overflow-hidden border-2">🆚
                        <span class="toggleClass transition-all duration-500 ease-in-out overflow-hidden inline-block w-0 whitespace-nowrap">&nbspModo Comparación</span>
                    </li>
                    <li class="p-2 flex items-center overflow-hidden border-2">🗺️
                        <span class="toggleClass transition-all duration-500 ease-in-out overflow-hidden inline-block w-0 whitespace-nowrap">&nbsp&nbspCrear Mapa</span>
                    </li>
                    <li class="p-2 flex items-center overflow-hidden border-2">⭐
                        <span class="toggleClass transition-all duration-500 ease-in-out overflow-hidden inline-block w-0 whitespace-nowrap">&nbsp&nbspSobre A*</span>
                    </li>
                    <li class="p-2 flex items-center overflow-hidden border-2">ℹ️
                        <span class="toggleClass transition-all duration-500 ease-in-out overflow-hidden inline-block w-0 whitespace-nowrap">&nbsp&nbspAcerca De</span>
                    </li>
                </ul>
            </nav>
        `;
    }

    connectedCallback() {
        // Añadir evento al botón de menú una vez montado
        this.shadowRoot.querySelector('#toggleButton').addEventListener('click', this.toggleMenu.bind(this));
    }

    toggleMenu() {
        const spans = this.shadowRoot.querySelectorAll('span.toggleClass');

        spans.forEach(span => {
            // Alterna entre ancho 0 (oculto) y "auto" (visible)
            if (span.style.width === '0px' || span.style.width === '') {
                span.style.width = `${span.scrollWidth}px`; // Usamos el ancho del contenido
            } else {
                span.style.width = '0px';
            }
        });
    }

    disconnectedCallback() {
        // Remueve el evento si el componente es desmontado
        this.shadowRoot.querySelector('#toggleButton').removeEventListener('click', this.toggleMenu.bind(this));
    }
}

customElements.define('dock-menu', Dock);
