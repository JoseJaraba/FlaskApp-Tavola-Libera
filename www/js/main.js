var splash, login_screen, registro, reset, reset_part2, lista_restaurantes, restaurante, menu, reserva, reserva_2, form_nuevo_restaurante, form_nuevo_restaurante_2, navbar, modal_container, modal_background_container, lista_reservas;
var btn_ingresar, btn_add_platos, btn_reset, btn_registro, btn_cont_reset, btn_confirm_login, btn_confirm_login_2, btn_confirm_login_3, btns_volver, btn_restaurante, btn_menu, btn_reserva, btn_nav_menu, btn_confirmar_reserva_1, btn_confirmar_reserva_2, btn_form_nuevo_restaurante_continuar, btn_form_nuevo_restaurante_confirmar, btn_cerrar_sesion, btn_soy_restaurante;

var secciones;
var modal_is_open = false;
var nav_history = [];

var registro_usuarios = JSON.parse(localStorage.getItem("usuarios")) == null ? registro_usuarios = [] : JSON.parse(localStorage.getItem("usuarios"));
var registro_restaurantes = JSON.parse(localStorage.getItem("restaurantes")) == null ? registro_restaurantes = [] : JSON.parse(localStorage.getItem("restaurantes"));
var current_user = {};

/*Login*/
var userLogin;
var passwordLogin;

/*Objeto Usuario*/
var user;
var password;
var confirm_password;
var security_question;
var security_answer;

/*Objeto Reserva*/
var date;
var hour;
var number_persons;

/*Objeto Restaurante*/
var nombre;
var direccion;
var telefono;
var ciudad;
var time_in;
var time_out;
var aforo;

window.onload = () => {
    crearReferencias();
    agregarEventos();
    setTimeout(() => {
        nav_history.push(login_screen);
        irA(login_screen);
    }, 2500);
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
    btn_add_platos = document.getElementsByClassName("btn_add_platos");

    for (var i = 0; i < btn_add_platos.length; i++) {
        btn = btn_add_platos[i].addEventListener("click", () => { irA(menu); });
    }

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
    btn_confirmar_reserva_1 = document.getElementById("btn_confirmar_reserva_1");
    btn_confirmar_reserva_2 = document.getElementById("btn_confirmar_reserva_2");
    btn_cerrar_sesion = document.getElementById("btn_cerrar_sesion");
    btn_soy_restaurante = document.getElementById("btn_soy_restaurante");
    btn_form_nuevo_restaurante_continuar = document.getElementById("btn_form_nuevo_restaurante_continuar");
    btn_form_nuevo_restaurante_confirmar = document.getElementById("btn_form_nuevo_restaurante_confirmar");

    //Inputs
    //-Login-//
    userLogin = document.getElementById("userLogin");
    passwordLogin = document.getElementById("passwordLogin");

    //-Registro-//
    user = document.getElementById("user");
    password = document.getElementById("password");
    confirm_password = document.getElementById("confirm_password");
    security_question = document.getElementById("security_question");
    security_answer = document.getElementById("security_answer");

    //-Restaurante-//
    nombre = document.getElementById("nombre");
    direccion = document.getElementById("direccion");
    telefono = document.getElementById("telefono");
    ciudad = document.getElementById("ciudad");
    time_in = document.getElementById("time_in");
    time_out = document.getElementById("time_out");
    aforo = document.getElementById("aforo");

    //-Reserva-//
    date = document.getElementById("date");
    hour = document.getElementById("hour");
    number_persons = document.getElementById("number_persons");

}

function agregarEventos() {
    btn_ingresar.addEventListener("click", () => { inicioSesion() });
    btn_reset.addEventListener("click", () => { irA(reset); });
    btn_registro.addEventListener("click", () => { irA(registro); });
    btn_confirm_login.addEventListener("click", () => { agregarUsuario(), irA(login_screen); });
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
    btn_confirmar_reserva_2.addEventListener("click", () => { agregarReserva(), irA(lista_restaurantes) })

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

    btn_form_nuevo_restaurante_continuar.addEventListener("click", () => { agregarRestauranteParte1(); });
    btn_form_nuevo_restaurante_confirmar.addEventListener("click", () => {
        agregarRestauranteParte2(), admin_login(), irA(restaurante);
    });


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

function agregarUsuario() {
    // Validación de Campos vacios
    if (user.value == "" || password.value == "" || confirm_password.value == "" || security_question.value == "" || security_answer.value == "") {
        alert("Se deben de llenar todos los campos");
        return false;
    }
    // Valiadación contraseña
    if (password.value != confirm_password.value) {
        alert("Las contraseñas deben se ser iguales");
        return false;
    }

    var usuario = {};
    usuario.name = user.value;
    usuario.password = password.value;
    usuario.confirm_password = confirm_password.value;
    usuario.security_question = security_question.value;
    usuario.security_answer = security_answer.value;
    usuario.reserva = null;

    //Validación de la existencia de usuarios iguales
    for (var i in registro_usuarios) {
        if (registro_usuarios[i].name == user.value) {
            alert("Ya existe un usuario con ese nombre. Por favor asigne otro nombre");
            return false;
        }
    }
    registro_usuarios.push(usuario);
    current_user = usuario;
    localStorage.setItem("usuarios", JSON.stringify(registro_usuarios));

    //Limpieza inputs//
    user.value = "";
    password.value = "";
    confirm_password.value = "";
    security_answer.value = "";
}

function inicioSesion() {
    //Validación campos
    if (userLogin.value == "" || passwordLogin.value == "") {
        alert("Ingrese un usario y una constraseña");
        return false;
    }
    //Validación del usuario
    for (var i in registro_usuarios) {
        if (registro_usuarios[i].name === userLogin.value && registro_usuarios[i].password === passwordLogin.value) {
            current_user = registro_usuarios[i];
            irA(lista_restaurantes);

            //Limpieza inputs//
            userLogin.value = "";
            passwordLogin.value = "";

            return true;
        }
    }
    alert("El usuario y/o la contraseña son incorrectos");


}

function agregarReserva() {
    if (date.value == "" || hour.value == "" || number_persons.value == "") {
        alert("Se deben de llenar todos los campos");
        return false;
    }
    var reserva = {}
    reserva.date = date.value;
    reserva.hour = hour.value;
    reserva.number_persons = number_persons.value;

    current_user.reserva = reserva;

    for (var i in registro_usuarios) {
        if (registro_usuarios[i].name == current_user.name) {
            registro_usuarios[i] = current_user;
            localStorage.setItem("usuarios", JSON.stringify(registro_usuarios));
            return true;
        }
    }

}

function agregarRestauranteParte1() {
    // Validación de Campos vacios
    if (nombre.value == "" || direccion.value == "" || telefono.value == "" || ciudad.value == "") {
        alert("Se deben de llenar todos los campos");
        return false;
    }
    irA(form_nuevo_restaurante_2);
}
function agregarRestauranteParte2() {
    if (time_in.value == "" || time_out.value == "" || aforo.value == "") {
        alert("Se deben de llenar todos los campos");
        return false;
    }
    var restaurante = {};
    restaurante.name = nombre.value;
    restaurante.address = direccion.value;
    restaurante.phoneNumber = telefono.value;
    restaurante.city = ciudad.value;
    restaurante.time_in = time_in.value;
    restaurante.time_out = time_out.value;
    restaurante.amount = aforo.value;

    registro_restaurantes.push(restaurante);
    localStorage.setItem("restaurantes", JSON.stringify(registro_restaurantes));

    nombre.value = "";
    direccion.value = "";
    telefono.value = "";
    ciudad.value = "";
    time_in.value = "";
    time_out.value = "";
    aforo.value = "";

}