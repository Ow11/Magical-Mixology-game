// Inspired by https://github.com/thedevdrawer/spa-routing

baseTitle = "Magical Mixology game"

function route(event) {
    event = event || window.event
    event.preventDefault()
    window.history.pushState({}, "", event.target.href)

    handleLocation()
}

const routes = {
    404: {
        template: "/pages/404.html",
        title: "404 | " + baseTitle,
        description: "Page not found",
    },
    "/": {
        template: "/pages/home.html",
        title: "Home | " + baseTitle,
        description: "Home page of Magical Mixology game",
    },
    "/game": {
        template: "/pages/game.html",
        title: baseTitle,
        description: "Magical Mixology game",
    },
    "/about": {
        template: "/pages/about.html",
        title: "Home | " + baseTitle,
        description: "About page of Magical Mixology game",
    },
}

async function handleLocation() {
    const path = window.location.pathname
    const route = routes[path] || routes[404]
    const mainContent = await fetch(route.template).then((data) => data.text())
    
    document.getElementsByTagName("main")[0].innerHTML = mainContent
    document.title = route.title
    document
		.querySelector('meta[name="description"]')
		.setAttribute("content", route.description);
}

window.onpopstate = handleLocation
window.route = route

handleLocation()