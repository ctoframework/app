class MyFooter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "components/footer.css");

    const footer = document.createElement("footer");
    footer.innerHTML = `
            <p>&copy; ${new Date().getFullYear()} CTO Framework</p>
        `;

    shadow.appendChild(link);
    shadow.appendChild(footer);
  }
}

customElements.define("c-footer", MyFooter);
