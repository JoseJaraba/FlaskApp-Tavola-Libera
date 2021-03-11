var splash, login_screen, registro, reset, reset_part2, lista_restaurantes, restaurante, menu, reserva, reserva_2, form_nuevo_restaurante, form_nuevo_restaurante_2, navbar, modal_container, modal_background_container, lista_reservas;
var btn_ingresar, btn_reset, btn_registro, btn_cont_reset, btn_confirm_login, btn_confirm_login_2, btn_confirm_login_3, btns_volver, btn_restaurante, btn_menu, btn_reserva, btn_nav_menu, btn_confirmar_reserva_1, btn_confirmar_reserva_2, btn_form_nuevo_restaurante_continuar, btn_form_nuevo_restaurante_confirmar, btn_cerrar_sesion, btn_soy_restaurante;
var btn_add_platos = [];

var secciones;
var modal_is_open = false;
var nav_history = [];


window.onload = () => {
    crearReferencias();
    agregarEventos();
    setTimeout(() => {
        nav_history.push(login_screen);
        irA(login_screen);
    }, 0);
}

function crearReferencias() {
    splash = document.getElementById("splash");
    login_screen = document.getElementById("login");
    registro = document.getElementById("registro");
    reset = document.getElementById("reset");
    reset_part2 = document.getElementById("reset_part2");
    lista_restaurantes = document.getElementById("lista_restaurantes");
    restaurante = document.getElementById("restaurante");
    menu = document.getElementById("menu");
    reserva = document.getElementById("reserva");
    reserva_2 = document.getElementById("reserva_2");
    form_nuevo_restaurante = document.getElementById("form_nuevo_restaurante");
    form_nuevo_restaurante_2 = document.getElementById("form_nuevo_restaurante_2");
    navbar = document.getElementById("navbar");
    modal_container = document.getElementById("modal_container");
    modal_background_container = document.getElementById("modal_background_container");
    lista_reservas = document.getElementById("lista_reservas");
    secciones = [splash, login_screen, registro, reset, reset_part2, lista_restaurantes, restaurante, menu, reserva, reserva_2, form_nuevo_restaurante, form_nuevo_restaurante_2, lista_reservas];


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
    btn_add_platos = document.getElementsByClassName("btn_add_platos")
    btn_confirmar_reserva_1 = document.getElementById("btn_confirmar_reserva_1");
    btn_confirmar_reserva_2 = document.getElementById("btn_confirmar_reserva_2");
    btn_cerrar_sesion = document.getElementById("btn_cerrar_sesion");
    btn_soy_restaurante = document.getElementById("btn_soy_restaurante");
    btn_form_nuevo_restaurante_continuar = document.getElementById("btn_form_nuevo_restaurante_continuar");
    btn_form_nuevo_restaurante_confirmar = document.getElementById("btn_form_nuevo_restaurante_confirmar");
}

function agregarEventos() {
    btn_ingresar.addEventListener("click", () => {
        irA(lista_restaurantes);
    });
    btn_reset.addEventListener("click", () => { irA(reset); });
    btn_registro.addEventListener("click", () => { irA(registro); });
    btn_confirm_login.addEventListener("click", () => { irA(login_screen); });
    btn_confirm_login_2.addEventListener("click", () => { irA(login_screen); });
    btn_confirm_login_3.addEventListener("click", () => { irA(login_screen); });
    btn_cont_reset.addEventListener("click", () => { irA(reset_part2); });
    btn_restaurante.addEventListener("click", () => { irA(restaurante); });
    btn_menu.addEventListener("click", () => { irA(menu); });
    btn_reserva.addEventListener("click", () => {
        if (is_auth) {
            irA(lista_reservas);
        } else {
            irA(reserva);
        }
    });
    btn_confirmar_reserva_1.addEventListener("click", () => { irA(reserva_2) })
    btn_confirmar_reserva_1.addEventListener("click", () => { irA(lista_restaurantes) })

    btn_soy_restaurante.addEventListener("click", () => {

        if (is_auth) {
            irA(restaurante)
        } else {
            irA(form_nuevo_restaurante)
        }

        modal();
    });

    btn_cerrar_sesion.addEventListener("click", () => {
        logout();
        irA(login_screen);
        modal();
    });

    btn_form_nuevo_restaurante_continuar.addEventListener("click", () => { irA(form_nuevo_restaurante_2); });
    btn_form_nuevo_restaurante_confirmar.addEventListener("click", () => {
        admin_login();
        irA(restaurante)
    })

    for (var i = 0; i < btn_add_platos.length; i++) {
        btn = btn_add_platos[i];
        btn.addEventListener("click", () => { irA(menu); });
    }

    btn_nav_menu.addEventListener("click", () => { modal(); });
    modal_background_container.addEventListener("click", () => {
        modal();
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
    for (var i = 0; i < secciones.length; i++) {
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
        seccion == login_screen ||
        seccion == registro) {
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

/*
Auth
*/

var is_auth = false;

function admin_login() {
    var admin_objects = document.getElementsByClassName("admin_mode");
    for (let i = 0; i < admin_objects.length; i++) {
        var element = admin_objects[i];
        element.style.setProperty("display", "flex", "important");
    }
    is_auth = true;
}

function logout() {
    var admin_objects = document.getElementsByClassName("admin_mode");
    for (let i = 0; i < admin_objects.length; i++) {
        var element = admin_objects[i];
        element.style.setProperty("display", "none", "important");
    }
    is_auth = false;
    irA(login_screen);
}