const Links = [
  { href: "#/", text: "Home" },
  { href: "#/quotes", text: "Quotes" },
  { href: "#/self-assessment", text: "Self-assessments" },
  { href: "#/about", text: "About" },
];

class MyHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "components/header.css";

    const nav = document.createElement("nav");
    nav.innerHTML = `
      <ul>
        ${Links.map((link) => `<li><a href="${link.href}" data-link>${link.text}</a></li>`).join("")}
      </ul>
    `;

    shadow.appendChild(link);
    shadow.appendChild(nav);

    // Intercept clicks inside shadow DOM
    nav.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        window.dispatchEvent(
          new CustomEvent("spa-navigate", {
            detail: { url: e.target.getAttribute("href") },
          })
        );
      }
    });
  }
}

customElements.define("c-header", MyHeader);
