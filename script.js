const header = document.querySelector(".site-header");
const pages = [...document.querySelectorAll("[data-page]")];
const routeLinks = [...document.querySelectorAll("[data-route]")];
const mapData = {
  italia: {
    kicker: "Italia",
    title: "Educazione civica e partecipazione giovanile",
    copy: "Nuovi programmi locali mettono insieme scuole, biblioteche e associazioni per aprire forum civici rivolti agli studenti.",
    country: "Italia",
    focus: "Educazione",
    source: "Osservatorio CiviOn",
  },
  brasile: {
    kicker: "Brasile",
    title: "Amazzonia, clima e diritti delle comunita",
    copy: "Le organizzazioni territoriali chiedono piu tutela ambientale e strumenti pubblici per monitorare deforestazione e accesso ai servizi.",
    country: "Brasile",
    focus: "Ambiente",
    source: "Brief settimanale",
  },
  india: {
    kicker: "India",
    title: "Citta, tecnologia e nuove disuguaglianze",
    copy: "La crescita urbana accelera servizi digitali e infrastrutture, ma apre nuovi divari su lavoro, formazione e accesso civico.",
    country: "India",
    focus: "Tecnologia",
    source: "Scheda Paese",
  },
  kenya: {
    kicker: "Kenya",
    title: "Giovani, innovazione sociale e partecipazione",
    copy: "Reti locali e piattaforme civiche sperimentano nuovi strumenti per discutere politiche pubbliche e formazione professionale.",
    country: "Kenya",
    focus: "Societa civile",
    source: "Forum globale",
  },
  giappone: {
    kicker: "Giappone",
    title: "Memoria pubblica e cultura visuale",
    copy: "Musei, archivi digitali e media educativi rinnovano il racconto storico rivolto a studenti e visitatori internazionali.",
    country: "Giappone",
    focus: "Memoria",
    source: "Culture desk",
  },
};

function setRoute(route) {
  const pageName = pages.some((page) => page.dataset.page === route) ? route : "home";

  pages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.page === pageName);
  });

  routeLinks.forEach((link) => {
    link.classList.toggle("is-current", link.dataset.route === pageName);
  });

  window.scrollTo(0, 0);
}

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
});

routeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const route = link.dataset.route;
    history.pushState(null, "", `#${route}`);
    setRoute(route);
  });
});

window.addEventListener("popstate", () => {
  setRoute(location.hash.replace("#", "") || "home");
});

document.querySelector(".search").addEventListener("click", () => {
  history.pushState(null, "", "#dictionary");
  setRoute("dictionary");
});

document.querySelectorAll("[data-map-point]").forEach((button) => {
  button.addEventListener("click", () => {
    const item = mapData[button.dataset.mapPoint];
    if (!item) return;

    document.querySelectorAll("[data-map-point]").forEach((point) => {
      point.classList.toggle("is-selected", point === button);
    });

    document.querySelector("#map-kicker").textContent = item.kicker;
    document.querySelector("#map-title").textContent = item.title;
    document.querySelector("#map-copy").textContent = item.copy;
    document.querySelector("#map-country").textContent = item.country;
    document.querySelector("#map-focus").textContent = item.focus;
    document.querySelector("#map-source").textContent = item.source;
  });
});

setRoute(location.hash.replace("#", "") || "home");
