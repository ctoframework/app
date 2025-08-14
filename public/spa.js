import { Routes } from "./lib/routes.js";

export function initSpa() {
  // Click listener that works for shadow DOM links
  document.addEventListener("click", (e) => {
    const link = e.composedPath().find((el) => el instanceof HTMLElement && el.matches?.("[data-link]"));
    if (link) {
      e.preventDefault();
      navigateTo(link.getAttribute("href"));
    }
  });

  window.addEventListener("hashchange", () => {
    loadPage(getCurrentRoute());
  });

  // Initial page load
  loadPage(getCurrentRoute());
}

function getCurrentRoute() {
  return location.hash.slice(1) || "/"; // remove "#" and default to "/"
}

function navigateTo(path) {
  location.hash = path; // e.g. "#/about"
}

const DefaultPage = {
  title: "CTO Framework",
  getData: () => ({}), // Default data for home page
};

async function loadPage(url) {
  let pagePath = "/pages/404.html";
  let part = "404";
  for (const route of Routes) {
    if (route === url) {
      part = route === "/" ? "home" : route.slice(1);
      pagePath = `/pages/${part}.html`;
      break;
    }
  }

  const res = await fetch(pagePath);
  const html = await res.text();
  const container = document.getElementById("content");

  const page = await importPage(part);
  document.title = page?.title || DefaultPage.title;
  if (page.functions) {
    Object.entries(page.functions).forEach(([name, fn]) => {
      window[name] = fn;
    });
  }
  container.innerHTML = nunjucks.renderString(html, page.getData());
}

async function importPage(container) {
  const path = `/pages/${container}.js`;
  try {
    const module = await import(path);
    return module.default || DefaultPage;
  } catch (err) {
    console.error(`Error loading custom elements for ${container}:`, err);
    return DefaultPage;
  }
}
