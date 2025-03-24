import initHomeScript from "./public/js/home.js";
import initEmailScript from "./public/js/email.js";

function initRouter() {
  window.addEventListener("hashchange", () => {
    handleViewChange();
  });
}

async function handleViewChange() {
  let view = "home";

  if (location.hash) {
    view = location.hash.substring(1);

    updateNavbar(view);
    await initView(view);
    initCorespondingScript(view);
  } else {
    initView(view);
  }
}

function updateNavbar(location) {
  const activeTab = document.querySelector(".activeTab");
  if (activeTab) {
    activeTab.classList.remove("activeTab");
    activeTab.classList.add("inactiveTab");
  }

  const inactiveTabs = document.querySelectorAll(".inactiveTab");
  inactiveTabs.forEach((navLink) => {
    const navLinkHref = navLink.getAttribute("href").substring(1);

    if (location === navLinkHref) {
      navLink.classList.remove("inactiveTab");
      navLink.classList.add("activeTab");
    }
  });
}

async function initView(view) {
  const app = document.getElementById("app");

  try {
    const response = await fetch(`./public/views/${view}.html`);
    const result = await response.text();

    app.innerHTML = result;
  } catch (error) {
    app.innerHTML = "<h1><b>Error the site does not exist</b></h1>";
    console.error(error);
  }
}

function initCorespondingScript(view) {
  switch (view) {
    case "home": {
      initHomeScript();
      break;
    }

    case "email": {
      initEmailScript();
      break;
    }
  }
}

export { initRouter };
