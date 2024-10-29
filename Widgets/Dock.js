class Dock extends HTMLElement {
  constructor() {
    super();
    const nav = document.createElement("nav");
    nav.innerHTML = `
<nav
  class="bg-white max-w-[12.2rem] overflow-y-auto grid h-[92vh] max-h-[17rem] gap-1 rounded-lg border-2 fixed top-1/2 left-3 -translate-y-1/2"
>
  <button id="btnToggle" class="min-h-7 bg-[#efffff] sticky top-0 border-2">
    &#9776;
  </button>
  <ul class="grid">
    <li class="p-2 flex items-center overflow-hidden border-2">
      🎯
      <span
        class="toggleClass transition-all duration-500 ease-in-out overflow-hidden inline-block w-0 whitespace-nowrap"
        >&nbsp&nbspModo Single</span
      >
    </li>
    <li class="p-2 flex items-center overflow-hidden border-2">
      🆚
      <span
        class="toggleClass transition-all duration-500 ease-in-out overflow-hidden inline-block w-0 whitespace-nowrap"
        >&nbspModo Comparación</span
      >
    </li>
    <li class="p-2 flex items-center overflow-hidden border-2">
      🗺️
      <span
        class="toggleClass transition-all duration-500 ease-in-out overflow-hidden inline-block w-0 whitespace-nowrap"
        >&nbsp&nbspCrear Mapa</span
      >
    </li>
    <li class="p-2 flex items-center overflow-hidden border-2">
      ⭐
      <span
        class="toggleClass transition-all duration-500 ease-in-out overflow-hidden inline-block w-0 whitespace-nowrap"
        >&nbsp&nbspSobre A*</span
      >
    </li>
    <li class="p-2 flex items-center overflow-hidden border-2">
      ℹ️
      <span
        class="toggleClass transition-all duration-500 ease-in-out overflow-hidden inline-block w-0 whitespace-nowrap"
        >&nbsp&nbspAcerca De</span
      >
    </li>
  </ul>
</nav>
        `;
    this.replaceWith(nav.firstElementChild);
    document
      .getElementById("btnToggle")
      .addEventListener("click", () => this.toggleMenu());
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
}

customElements.define("dock-menu", Dock);
