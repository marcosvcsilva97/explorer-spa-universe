export class Router {
    routes = {};

    add(routeName, page) {
        this.routes[routeName] = page;
    }

    route(event) {
        event = event || window.event; // Verifica se existe o event
        event.preventDefault(); // Evita fazer o padrão da página

        window.history.pushState({}, "", event.target.href);
        
        const links = document.querySelectorAll("nav a");
        links.forEach((link) => {
            link.classList.remove("active");
        });

        const clickLink = event.target;
        clickLink.classList.add("active");

        this.handle();
    }

    handle() {
        const { pathname } = window.location;
        const route = this.routes[pathname] || this.routes[404];

        fetch(route)
            .then(data => data.text())
            .then(html => {
                document.querySelector('#app').innerHTML = html;
            });
    }
}
