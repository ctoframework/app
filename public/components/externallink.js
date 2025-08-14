class ExternalLink extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<a href="${this.getAttribute("href")}" target="_blank" rel="noopener">
            ${this.getAttribute("href")}
        </a>`;
  }
}

customElements.define("c-externallink", ExternalLink);
