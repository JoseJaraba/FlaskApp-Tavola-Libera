var splash, login, registro, reset, reset_part2, lista_restaurantes, restaurante, menu, reserva, navbar, modal_container, modal_background_container;
var btn_ingresar, btn_reset, btn_registro, btn_cont_reset, btn_confirm_login, btn_confirm_login_2, btn_confirm_login_3, btns_volver, btn_restaurante, btn_menu, btn_reserva, btn_add_platos, btn_nav_menuw;
var secciones;
var modal_is_open = false;
var nav_history = [];

window.onload = () => {
    crearReferencias();
    agregarEventos();
    setTimeout(() => { irA(login); }, 2000);
}

function crearReferencias() {
    splash = document.getElementById("splash");
    login = document.getElementById("login");
    registro = document.getElementById("registro");
    reset = document.getElementById("reset");
    reset_part2 = document.getElementById("reset_part2");
    lista_restaurantes = document.getElementById("lista_restaurantes");
    restaurante = document.getElementById("restaurante");
    menu = document.getElementById("menu");
    reserva = document.getElementById("reserva");
    navbar = document.getElementById("navbar");
    modal_container = document.getElementById("modal_container");
    modal_background_container = document.getElementById("modal_background_container");

    // Botones
    btn_ingresar = document.getElementById("btn_ingresar");
    btn_confirm_login = document.getElementById("btn_confirm_login");
    btn_confirm_login_2 = document.getElementById("btn_confirm_login_2");
    btn_confirm_login_3 = document.getElementById("btn_confirm_login_3");
    btn_reset = document.getElementById("btn_reset");
    btn_registro = document.getElementById("btn_registro");
    btn_cont_reset = document.getElementById("btn_cont_reset");
    btn_restaurante = document.getElementById("btn_restaurante");
    btn_menu = document.getElementById("btn_menu");
    btn_volver = document.getElementById("btn_volver");
    btn_nav_menu = document.getElementById("btn_nav_menu");
    btn_close_modal = document.getElementById("btn_close_modal");
    btn_reserva = document.getElementById("btn_reserva");
    btn_add_platos = document.getElementById("btn_add_platos")
    secciones = [splash, login, registro, reset, reset_part2, lista_restaurantes, restaurante, menu, reserva];
}

function agregarEventos() {
    btn_ingresar.addEventListener("click", () => { irA(lista_restaurantes); });
    btn_reset.addEventListener("click", () => { irA(reset); });
    btn_registro.addEventListener("click", () => { irA(registro); });
    btn_confirm_login.addEventListener("click", () => { irA(login); });
    btn_confirm_login_2.addEventListener("click", () => { irA(login); });
    btn_confirm_login_3.addEventListener("click", () => { irA(login); });
    btn_cont_reset.addEventListener("click", () => { irA(reset_part2); });
    btn_restaurante.addEventListener("click", () => { irA(restaurante); });
    btn_menu.addEventListener("click", () => { irA(menu); });
    btn_reserva.addEventListener("click", () => { irA(reserva); });
    btn_add_platos.addEventListener("click", () => { irA(menu); });
    btn_nav_menu.addEventListener("click", () => { modal(); });

    modal_background_container.addEventListener("click", () => {
        modal_container.classList.remove("show");
        modal_background_container.classList.remove("show");
    });

    btn_volver.addEventListener("click", () => {
        nav_history.pop();
        var last = nav_history.pop();
        if (nav_history.length > 0) {
            irA(last, true); //volver
        }
    });
}

function modal() {
    modal_is_open = !modal_is_open
    if (modal_is_open) {
        modal_container.classList.add("show");
        modal_background_container.classList.add("show");
    } else {
        modal_container.classList.remove("show");
        modal_background_container.classList.remove("show");
    }

}

function ocultarSecciones() {
    for (i in secciones) {
        secciones[i].classList.add("ocultar");
    }
}

function irA(seccion) {
    navbar_is_visible(seccion); //Comprobar si la navbar debería ser visible en la sección que se va a visitar
    nav_history.push(seccion);
    ocultarSecciones();
    seccion.classList.remove("ocultar");
}

/*

    Navbar

*/

function navbar_is_visible(seccion) {
    if (seccion == splash ||
        seccion == login ||
        seccion == registro ||
        seccion == reset ||
        seccion == reset_part2) {
        navbar.classList.add("ocultar")
    } else {
        navbar.classList.remove("ocultar");

        if (seccion == lista_restaurantes) {
            btn_nav_menu.classList.remove("ocultar");
            btn_volver.classList.add("ocultar");
        } else {
            btn_nav_menu.classList.add("ocultar");
            btn_volver.classList.remove("ocultar");
        }
    }

}