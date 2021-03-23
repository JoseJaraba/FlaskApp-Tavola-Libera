var splash, login_screen, registro, reset, reset_part2, lista_restaurantes, restaurante, menu, reserva, reserva_2, form_nuevo_restaurante, form_nuevo_restaurante_2, navbar, modal_container, modal_background_container, lista_reservas;
var btn_ingresar, btn_add_platos, btn_reset, btn_registro, btn_cont_reset, btn_confirm_login, btn_confirm_login_2, btn_confirm_login_3, btns_volver, btn_restaurantes, btn_menu, btn_reserva, btn_nav_menu, btn_confirmar_reserva_1, btn_confirmar_reserva_2, btn_form_nuevo_restaurante_continuar, btn_form_nuevo_restaurante_confirmar, btn_cerrar_sesion, btn_soy_restaurante, btn_edit_restaurant_img, btn_edit_restaurant_desc, btn_edit_confirm_restaurant_desc, btn_edit_restaurante_name, btn_edit_confirm_restaurante_name;
var admin_objects;

var secciones;
var modal_is_open = false;
var nav_history = [];

var registro_usuarios = JSON.parse(localStorage.getItem("usuarios")) == null ? registro_usuarios = [] : JSON.parse(localStorage.getItem("usuarios"));
var registro_restaurantes = JSON.parse(localStorage.getItem("restaurantes")) == null ? registro_restaurantes = [] : JSON.parse(localStorage.getItem("restaurantes"));
var current_user = {};

/*Login*/
var userLogin;
var passwordLogin;

/*Reset Pass*/
var userReset;
var security_answerReset;
var passReset;
var confpassReset;

/*Objeto Usuario*/
var username;
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
var desc;

class Usuario {
    constructor(nombre, contrasena, confirmar_contrasena, pregunta_seguridad, respuesta_seguridad, reserva) {
        this.name = nombre;
        this.password = contrasena;
        this.confirm_password = confirmar_contrasena;
        this.security_question = pregunta_seguridad;
        this.security_answer = respuesta_seguridad;
        this.reserva = reserva;
    }
}

class Restaurante {
    constructor(nombre, direccion, telefono, ciudad, time_in, time_out, aforo, desc) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.ciudad = ciudad;
        this.time_in = time_in;
        this.time_out = time_out;
        this.aforo = aforo;
        this.desc = desc;
    }

    static restaurante_to_html(restaurante) {
        let html = `<div class="container">
                        <div class="row btn_restaurante" id="btn_restaurante_${restaurante.nombre}">
                            <div class="col border-top pt-3">
                                <h4 class="text-center px-2">${restaurante.nombre}</h4>
                                <p class="px-2 my-auto">${restaurante.desc}</p>
                            </div>
                            <div class="col">
                                <p>
                                    <a  href="javascript:void(0);">
                                    <img src="img/restaurant-logo.png" class="rounded mx-auto d-block" alt="">
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>`;

        return html;
    }

    static get_restaurante_from_btn_id(btn_id) {
        //Format: btn_restaurante_<nombrerestaurante>
        let nombre_restaurante = btn_id.split('_')[2];
        let registro_restaurantes = JSON.parse(localStorage.getItem("restaurantes"));

        for (var i = 0; i < registro_restaurantes.length; i++) {
            if (registro_restaurantes[i].nombre === nombre_restaurante)
                return registro_restaurantes[i];
        }
    }

    static restaurantes_list_to_html() {
        let html = '';
        let restaurantes = JSON.parse(localStorage.getItem("restaurantes"));

        restaurantes.forEach(restaurante => {

            html = html.concat(Restaurante.restaurante_to_html(restaurante));
        });


        return html;
    }

    static preparar_vista_lista_restaurantes() {
        let div = document.getElementById("contenedor_restaurantes");

        div.innerHTML = Restaurante.restaurantes_list_to_html();

        // Agregar Eventos
        btn_restaurantes = document.getElementsByClassName("btn_restaurante");

        for (var i = 0; i < btn_restaurantes.length; i++) {
            btn_restaurantes[i].addEventListener("click", e => {

                selected_restaurante = Restaurante.get_restaurante_from_btn_id(e.currentTarget.id);
                irA(restaurante);
            });
        }
    }

    static cargar_restaurantes() {
        let registro_restaurantes = JSON.parse(localStorage.getItem("restaurantes")) || [];

        if (registro_restaurantes.length <= 0) {

            registro_restaurantes.push(new Restaurante("Pani Della Nonna", "Calle 47b #33-15", "1234567", "Roma", "12:00 PM", "8:00 PM", 20, "Los mejores panes de la ciudad."));
            registro_restaurantes.push(new Restaurante("Karak", "Calle 33 #47-15", "9876543", "Singapur", "3:00 PM", "11:00 PM", 8, "Comida árabe fusión."));
            registro_restaurantes.push(new Restaurante("Salino", "Calle 20 #33-34", "6536242", "Túnez", "8:00 AM", "3:00 PM", 50, "Comida del mediterráneo."));
        }

        localStorage.setItem("restaurantes", JSON.stringify(registro_restaurantes));
    }

    static agregar_restaurante(restaurante) {
        registro_restaurantes = JSON.parse(localStorage.getItem("restaurantes"));
        registro_restaurantes.push(restaurante);
        localStorage.setItem("restaurantes", JSON.stringify(registro_restaurantes));
        Restaurante.preparar_vista_lista_restaurantes();
    }
}
let selected_restaurante;


window.onload = () => {
    Restaurante.cargar_restaurantes();

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
        btn_add_platos[i].addEventListener("click", () => { irA(menu); });
    }

    admin_objects = document.getElementsByClassName("admin_mode");
    btn_ingresar = document.getElementById("btn_ingresar");
    btn_confirm_login = document.getElementById("btn_confirm_login");
    btn_confirm_login_2 = document.getElementById("btn_confirm_login_2");
    btn_confirm_login_3 = document.getElementById("btn_confirm_login_3");
    btn_reset = document.getElementById("btn_reset");
    btn_registro = document.getElementById("btn_registro");
    btn_cont_reset = document.getElementById("btn_cont_reset");
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
    btn_edit_restaurant_desc = document.getElementById("btn_edit_restaurant_desc");
    btn_edit_confirm_restaurant_desc = document.getElementById("btn_edit_confirm_restaurant_desc");
    btn_edit_restaurante_name = document.getElementById("btn_edit_restaurante_name");
    btn_edit_confirm_restaurante_name = document.getElementById("btn_edit_confirm_restaurante_name");
    //Inputs
    //-Login-//
    userLogin = document.getElementById("userLogin");
    passwordLogin = document.getElementById("passwordLogin");

    //-Reset-//
    userReset = document.getElementById("userReset");
    security_answerReset = document.getElementById("security_answerReset");
    passReset = document.getElementById("passReset");
    confpassReset = document.getElementById("confpassReset");

    //-Registro-//
    username = document.getElementById("user");
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
    desc = document.getElementById("restaurante_desc");

    //-Reserva-//
    date = document.getElementById("date");
    hour = document.getElementById("hour");
    number_persons = document.getElementById("number_persons");

}

function agregarEventos() {
    irA(lista_restaurantes);
    btn_ingresar.addEventListener("click", () => {
        if (inicioSesion())
            irA(lista_restaurantes);
    });
    btn_reset.addEventListener("click", () => { irA(reset); });
    btn_registro.addEventListener("click", () => { irA(registro); });
    btn_confirm_login.addEventListener("click", () => { agregarUsuario(), irA(login_screen); });
    btn_confirm_login_2.addEventListener("click", () => { irA(login_screen); });
    btn_confirm_login_3.addEventListener("click", () => { editarPass(); });
    btn_cont_reset.addEventListener("click", () => { editarCheck(); });
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
        if (current_user.restaurante) {
            selected_restaurante = current_user.restaurante;
            irA(restaurante);
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
        agregarRestauranteParte2();
        admin_login();
        irA(lista_restaurantes);
    });

    btn_edit_restaurant_desc.addEventListener("click", e => {
        turn_edit(e);
    });
    btn_edit_confirm_restaurant_desc.addEventListener("click", e => {
        confirm_edit(e);
    });
    btn_edit_restaurante_name.addEventListener("click", e => {
        turn_edit(e);
    });
    btn_edit_confirm_restaurante_name.addEventListener("click", e => {
        confirm_edit(e);
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

    preparar_vista(seccion);

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
    is_auth = true;
}

function logout() {
    is_auth = false;
    irA(login_screen);
}

function agregarUsuario() {
    // Validación de Campos vacios
    if (username.value == "" || password.value == "" || confirm_password.value == "" || security_question.value == "" || security_answer.value == "") {
        alert("Se deben de llenar todos los campos");
        return false;
    }
    // Valiadación contraseña
    if (password.value != confirm_password.value) {
        alert("Las contraseñas deben se ser iguales");
        return false;
    }

    var usuario = new Usuario(username.value, password.value, confirm_password.value, security_question.value, security_answer.value, null);
    // usuario.name = username.value;
    // usuario.password = password.value;
    // usuario.confirm_password = confirm_password.value;
    // usuario.security_question = security_question.value;
    // usuario.security_answer = security_answer.value;
    // usuario.reserva = null;

    //Validación de la existencia de usuarios iguales
    for (var i in registro_usuarios) {
        if (registro_usuarios[i].name == username.value) {
            alert("Ya existe un usuario con ese nombre. Por favor asigne otro nombre");
            return false;
        }
    }
    registro_usuarios.push(usuario);
    current_user = usuario;
    localStorage.setItem("usuarios", JSON.stringify(registro_usuarios));

    //Limpieza inputs//
    username.value = "";
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

            //Limpieza inputs//
            userLogin.value = "";
            passwordLogin.value = "";

            if (current_user.restaurante)
                admin_login();

            return true;
        }
    }
    alert("El usuario y/o la contraseña son incorrectos");


}

function editarCheck() {
    //Validación de campos
    if (userReset.value == "" || security_answerReset.value == "") {
        alert("Los campos no pueden estar vacios")
        return false;
    }
    //Validación usuario y pregunta de seguridad 
    for (var i in registro_usuarios) {
        if (registro_usuarios[i].name === userReset.value && registro_usuarios[i].security_answer === security_answerReset.value) {
            current_user = registro_usuarios[i];

            //Limpieza inputs//
            userLogin.value = "";
            passwordLogin.value = "";

            irA(reset_part2);
            return true;

        }
    }
    alert("El usuario y/o la respuesta son incorrectos");
}

function editarPass() {
    //Validación de campos
    if (passReset.value == "" || confpassReset.value == "") {
        alert("Los campos no pueden estar vacios")
        return false;
    }
    if (passReset.value != confpassReset.value) {
        alert("Las contraseñas no coinciden");
        return false;
    }
    //Actualizar pass del usuario
    current_user.password = passReset.value;
    current_user.confirm_password = confpassReset.value;
    // Añadir
    for (var i in registro_usuarios) {
        if (registro_usuarios[i].name == current_user.name) {
            registro_usuarios[i] = current_user;
            localStorage.setItem("usuarios", JSON.stringify(registro_usuarios));
            irA(login_screen);
            return true;
        }
    }

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
    local_storage_actualizar_current_user();
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
    var restaurante = new Restaurante(nombre.value, direccion.value, telefono.value, ciudad.value, time_in.value, time_out.value, aforo.value, "Bienvenido");
    // restaurante.nombre = nombre.value;
    // restaurante.direccion = direccion.value;
    // restaurante.telefono = telefono.value;
    // restaurante.ciudad = ciudad.value;
    // restaurante.time_in = time_in.value;
    // restaurante.time_out = time_out.value;
    // restaurante.aforo = aforo.value;
    // restaurante.desc = desc.value;

    Restaurante.agregar_restaurante(restaurante);
    Restaurante.preparar_vista_lista_restaurantes();

    current_user.restaurante = registro_restaurantes[registro_restaurantes.length - 1];
    local_storage_actualizar_current_user();

    nombre.value = "";
    direccion.value = "";
    telefono.value = "";
    ciudad.value = "";
    time_in.value = "";
    time_out.value = "";
    aforo.value = "";
}

function display_admin_objects(show) {
    for (let i = 0; i < admin_objects.length; i++) {
        var element = admin_objects[i];

        show ? element.style.setProperty("display", "flex", "important") : element.style.setProperty("display", "none", "important");
    }
}

function local_storage_actualizar_current_user() {

    for (var i in registro_usuarios) {
        if (registro_usuarios[i].name == current_user.name) {
            registro_usuarios[i] = current_user;
            localStorage.setItem("usuarios", JSON.stringify(registro_usuarios));
            return true;
        }
    }
}

function preparar_vista(seccion) {
    switch (seccion) {
        case restaurante:
            preparar_vista_restaurante(selected_restaurante);
            break;
        case lista_restaurantes:
            Restaurante.preparar_vista_lista_restaurantes();
            break;

        default:
            break;
    }
}

function preparar_vista_restaurante(restaurante) {
    let restaurante_name = document.getElementById("restaurante_name");
    restaurante_name.innerHTML = restaurante.nombre;

    let html_description_p = document.getElementById("restaurante_desc");
    html_description_p.innerHTML = restaurante.desc;

    if (selected_restaurante === current_user.restaurante) {
        display_admin_objects(true);
    } else {
        display_admin_objects(false);
    }
}

function turn_edit(e) {
    switch (e.target) {
        case btn_edit_restaurant_desc: //Edit restaurant description
            btn_edit_restaurant_desc.style.setProperty("display", "none", "important");
            //Guardar estado de la descripción actual
            let description_p = desc.innerHTML;
            desc.innerHTML = '';

            //Actualizar input y mostrarlo
            let description_input = document.getElementById("edit_restaurant_desc");
            description_input.value = description_p;
            description_input.parentElement.classList.remove("ocultar");
            break;
        case btn_edit_restaurante_name:
            btn_edit_restaurante_name.style.setProperty("display", "none", "important");

            //Guardar estado del nombre actual
            let restaurante_name = document.getElementById("restaurante_name");
            let name = restaurante_name.innerHTML;
            restaurante_name.innerHTML = '';

            //Actualizar input y mostrarlo
            let name_input = document.getElementById("edit_restaurant_name");
            name_input.value = name;
            name_input.parentElement.classList.remove("ocultar");
            break;

        default:
            break;
    }
}

function confirm_edit(e) {
    switch (e.target) {
        case btn_edit_confirm_restaurant_desc: //Edit restaurant description

            //Guardar estado de la descripción actual
            let description_input = document.getElementById("edit_restaurant_desc");
            description_input.parentElement.classList.add("ocultar");

            current_user.restaurante.desc = description_input.value;
            local_storage_actualizar_current_user();

            //Actualizar descripción
            desc.innerHTML = description_input.value;
            btn_edit_restaurant_desc.style.setProperty("display", "flex", "important");

            break;
        case btn_edit_confirm_restaurante_name:
            //Guardar estado de la descripción actual
            let name_input = document.getElementById("edit_restaurant_name");
            name_input.parentElement.classList.add("ocultar");

            current_user.restaurante.nombre = name_input.value;
            local_storage_actualizar_current_user();

            //Actualizar vista
            let restaurante_name = document.getElementById("restaurante_name");
            restaurante_name.innerHTML = name_input.value;

            btn_edit_restaurante_name.style.setProperty("display", "flex", "important");

            break;

        default:
            break;
    }
}