/**
 * TODO
 * Colorear
 */
class Dock extends HTMLElement {
  constructor(items = []) {
    super();
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    this.items = items.length > 0 ? items : this.getDefaultItems();

    // Crear el contenedor principal y su estructura
    const nav = document.createElement("nav");
    nav.className =
      "bg-gray-50 shadow-md overflow-y-auto grid h-[92vh] max-h-[17rem] gap-1 rounded-lg fixed top-1/2 left-3 -translate-y-1/2";

    // Crear botón de toggle
    const btnToggle = document.createElement("button");
    btnToggle.id = "btnToggle";
    btnToggle.className = "transition hover:bg-gray-200 font-bold min-h-7 bg-[#efffff] sticky top-0";
    btnToggle.innerHTML = "&#9776;";
    nav.appendChild(btnToggle);

    // Crear lista
    const ul = document.createElement("ul");
    ul.className = "grid";

    // Crear items de la lista
    this.items.forEach(({ icon, text }) => {
      const button = document.createElement("button");
      button.className = "py-2 px-3 transition hover:bg-gray-200";
      const li = document.createElement("li");
      li.className = "flex items-center overflow-hidden";

      // Crear ícono y texto
      const iconSpan = document.createElement("span");
      iconSpan.className = "material-icons";
      iconSpan.innerHTML = icon; // Asegúrate de que el icono se pase como texto aquí, ej: "person"

      const textSpan = document.createElement("span");
      textSpan.className =
        "toggleClass transition-all duration-500 ease-in-out overflow-hidden inline-block w-0 whitespace-nowrap";
      textSpan.textContent = `\u00A0\u00A0${text}`;

      // Añadir ícono y texto al elemento de lista
      li.appendChild(iconSpan);
      li.appendChild(textSpan);
      button.appendChild(li);
      ul.appendChild(button);
    });

    nav.appendChild(ul);
    this.replaceWith(nav);

    // Añadir listener para el botón de toggle
    btnToggle.addEventListener("click", () => this.toggleMenu());
  }

  toggleMenu() {
    const spans = document.querySelectorAll("span.toggleClass");
    spans.forEach((span) => {
      if (span.style.width === "0px" || span.style.width === "") {
        span.style.width = `${span.scrollWidth}px`;
      } else {
        span.style.width = "0px";
      }
    });
  }

  // Método para configurar ítems predeterminados si no se pasa un parámetro de items
  getDefaultItems() {
    return [
      {
        icon: '<span class="material-icons">person</span>',
        text: "Modo Single",
      },
      {
        icon: '<span class="material-icons">compare</span>',
        text: "Modo Comparación",
      },
      { icon: '<span class="material-icons">map</span>', text: "Crear Mapa" },
      { icon: '<span class="material-icons">star</span>', text: "Sobre A*" },
      { icon: '<span class="material-icons">info</span>', text: "Acerca De" },
    ];
  }
}

customElements.define("dock-menu", Dock);
