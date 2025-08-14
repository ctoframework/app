const Links = [
  { href: "#/", text: "Home" },
  { href: "#/quotes", text: "Quotes" },
  { href: "#/self-assessment", text: "Self-assessments" },
  { href: "#/about", text: "About" },
];

// Returns css template literal
function css(strings, ...values) {
  return String.raw(strings, ...values);
}

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(css`
  nav {
    background-color: #333;
    padding: 1em;
    display: flex;
    gap: 1em;
  }

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`);

class MyHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [stylesheet];

    const nav = document.createElement("nav");
    nav.innerHTML = `
      <ul>
        ${Links.map((link) => `<li><a href="${link.href}" data-link>${link.text}</a></li>`).join("")}
      </ul>
    `;

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
