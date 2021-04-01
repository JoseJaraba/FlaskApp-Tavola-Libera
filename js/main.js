var splash, login_screen, registro, reset, reset_part2, lista_restaurantes, restaurante, menu, hacer_reserva, reserva_2, form_nuevo_restaurante, form_nuevo_restaurante_2, navbar, modal_container, modal_background_container, lista_reservas, creditos;
var btn_ingresar, btn_add_platos, btn_reset, btn_registro, btn_cont_reset, btn_confirm_login, btn_confirm_login_2, btn_confirm_login_3, btns_volver, btn_restaurantes, btn_menu, btn_reserva, btn_nav_menu, btn_confirmar_reserva_1, btn_confirmar_reserva_2, btn_form_nuevo_restaurante_continuar, btn_form_nuevo_restaurante_confirmar, btn_cerrar_sesion, btn_soy_restaurante, btn_edit_restaurant_img, btn_edit_restaurant_desc, btn_edit_confirm_restaurant_desc, btn_edit_restaurante_name, btn_edit_confirm_restaurante_name, btn_turn_agregar_plato, btn_confirmar_agregar_plato, btn_creditos;
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

class Reserva {
    constructor(date, hour, number_persons, platos, username) {
        this.date = date;
        this.hour = hour;
        this.number_persons = number_persons;
        this.platos = platos;
        this.user = username;
    }

    static confirmar_reserva_details_to_html(hacer_reserva) {
        return `<div class="row my-2">
                    <div class="col">
                        <strong>Fecha</strong>
                    </div>
                    <div class="col">
                        <span class="text-left"> ${hacer_reserva.date}</span>
                    </div>
                </div>
                <div class="row my-2">
                    <div class="col">
                        <strong>Hora</strong>
                    </div>
                    <div class="col">
                        <span class="text-left"> ${hacer_reserva.hour}</span>
                    </div>
                </div>
                <div class="row my-2">
                    <div class="col">
                        <strong>Número de Persona(s)</strong>
                    </div>
                    <div class="col">
                        <span class="text-left"> ${hacer_reserva.number_persons} </span>
                    </div>
                </div>
            </div>`
    }

    static preparar_vista_lista_reservas() {
        let lista_reservas_container = document.getElementById("lista_reservas_container");
        let list_reservas;

        //Por alguna razón la variable global de current_restaurant no me deja acceder a las reservas
        //Así que toca traerlo del localstorage
        let restaurantes = JSON.parse(localStorage.getItem("restaurantes"));
        for (let i = 0; i < restaurantes.length; i++) {
            const element = restaurantes[i];
            if (element.nombre === current_restaurant.nombre) {
                list_reservas = element.reservas;
            }
        }
        let html = '';

        if (list_reservas) {
            for (let i = 0; i < list_reservas.length; i++) {

                const reserva = list_reservas[i];
                if (!reserva) {
                    continue;
                }

                html += `<div class="container user_mode">
                        <div class="row">
                            <div class="col border-top pt-3">
                                <h4 class="text-center px-2"><strong>Reserva</strong></h4>
                                <p class="px-2 my-3">
                                    <strong> ${reserva.user} </strong>
                                </p>
                                <p class="px-2 my-3">
                                    <strong> ${reserva.number_persons} </strong> Persona(s).
                                </p>
                                <p class="px-2 my-2">
                                    <strong> 11/03/2021</strong> de <time>${reserva.hour}</time> a <time> (no especificado) </time>
                                </p>
                                <div id="btn_ver_platos_reserva" class="form-group row my-4 w-75 mx-1">
                                    <a href="javascript:void(0);" class="btn btn-optional w-100 my-4 btn_add_platos"> Ver Platos</a>
                                </div>
                            </div>
                            <div class="col">
                                <img src="img/dish.png" class="rounded mx-auto d-block" alt="">
                            </div>
                        </div>
                    </div>`;
            }
        } else {
            html = "No hay Reservas que mostrar";
        }

        lista_reservas_container.innerHTML = html;
    }

    static preparar_vista_hacer_reserva() {

        let view_title = document.getElementById("title_reserva_en");
        view_title.innerText = `Reserva en ${current_restaurant.nombre}`;

    }

    static preparar_vista_confirmar_reserva() {

        if (date.value == "" || hour.value == "" || number_persons.value == "") {
            alert("Se deben de llenar todos los campos");
            return false;
        }

        let input_date = document.getElementById("date_reserva");
        let input_hour = document.getElementById("hour_reserva");
        let input_n_persons = document.getElementById("number_persons");

        let new_reserva = new Reserva(
            input_date.value,
            input_hour.value,
            input_n_persons.value, [new Plato("provisional 1", "Prov1Desc")],
            current_user.name
        );

        let title_confirmar_reserva = document.getElementById("title_confirmar_reserva");
        title_confirmar_reserva.innerText = `Confirmar Reserva en ${current_restaurant.nombre}`;

        let details_container = document.getElementById("reserva_details_container");
        details_container.innerHTML = Reserva.confirmar_reserva_details_to_html(new_reserva);

        let platos_container = document.getElementById("container_platos_reserva");
        let html = '';

        //Iterar los platos de la nueva reserva
        for (let i = 0; i < new_reserva.platos.length; i++) {
            const plato = new_reserva.platos[i];
            html += `<div class="row my-2">
                        <div class="col">
                            <span>${plato.name}</span>
                        </div>
                        <div class="col text-center">
                            <strong id="${plato.name.replaceAll(" ", '-')}" class="">x</strong>
                        </div>
                    </div>`
        }
        platos_container.innerHTML = html;

        if (!current_restaurant.reservas) {
            current_restaurant.reservas = [];
        }

        current_restaurant.reservas.push(new_reserva);
        Restaurante.local_storage_actualizar_current_restaurant();
    }

    static guardar_reserva() {
        let new_reserva = current_restaurant.reservas[current_restaurant.reservas.length - 1];

        //Guardar cambios
        if (!current_restaurant.reservas)
            current_restaurant.reservas = [];

        if (!current_user.reservas)
            current_user.reservas = [];

        current_user.reservas.push(new_reserva);
        Restaurante.local_storage_actualizar_current_restaurant();
        local_storage_actualizar_current_user();
    }
}
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
    constructor(nombre, contrasena, confirmar_contrasena, pregunta_seguridad, respuesta_seguridad, hacer_reserva) {
        this.name = nombre;
        this.password = contrasena;
        this.confirm_password = confirmar_contrasena;
        this.security_question = pregunta_seguridad;
        this.security_answer = respuesta_seguridad;
        this.hacer_reserva = hacer_reserva;
    }
}

class Restaurante {
    constructor(nombre, direccion, telefono, ciudad, time_in, time_out, aforo, desc, platos) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.ciudad = ciudad;
        this.time_in = time_in;
        this.time_out = time_out;
        this.aforo = aforo;
        this.desc = desc;
        this.platos = platos;
        this.reservas = [];
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

    static preparar_vista_restaurante(restaurante) {
        let restaurante_name = document.getElementById("restaurante_name");
        restaurante_name.innerHTML = restaurante.nombre;

        let html_description_p = document.getElementById("restaurante_desc");
        html_description_p.innerHTML = restaurante.desc;

        if (current_restaurant === current_user.restaurante) {
            admin_login();
            display_admin_objects(true);
        } else {
            admin_logout();
            display_admin_objects(false);
        }
    }

    static preparar_vista_lista_restaurantes() {
        let div = document.getElementById("contenedor_restaurantes");

        div.innerHTML = Restaurante.restaurantes_list_to_html();

        // Agregar Eventos
        btn_restaurantes = document.getElementsByClassName("btn_restaurante");

        for (var i = 0; i < btn_restaurantes.length; i++) {
            btn_restaurantes[i].addEventListener("click", e => {

                current_restaurant = Restaurante.get_restaurante_from_btn_id(e.currentTarget.id);
                irA(restaurante);
            });
        }
    }

    static cargar_restaurantes() {
        let registro_restaurantes = JSON.parse(localStorage.getItem("restaurantes")) || [];

        if (registro_restaurantes.length <= 0) {

            let platos_pani_de_la_nona = [
                new Plato("Ciabatta", "Pan elaborado al horno y que tiene una capa crujiente por su exterior."),
                new Plato("Cannoli", "Masa enrollada en forma de tubo que dentro lleva ingredientes mezclados con queso ricota."),
                new Plato("Panettone", "Pan hecho con una masa de tipo brioche, relleno con pasas y frutas confitadas.")
            ];


            let platos_karak = [
                new Plato("Falafel", "Croquetas de Garbanzo"),
                new Plato("Tabbule", "Exquisita ensalada oirunda del Líbano y Siria"),
                new Plato("Tahine", "Hummus o Crema de Garbanzo")
            ];


            let platos_salino = [
                new Plato("Baba Ganoush", "Pasta a base de berenjenas asadas mezcladas con jugo de limón, tahini y especias, como comino."),
                new Plato("Bouillabaisse", "Sopa tradicional de la región francesa de Provenza a base de pescados, mariscos y verduras como puerros, tomates y ajo, y hierbas y especias."),
                new Plato("Briami griego", "Plato vegetariano tradicional griego que consiste en una cazuela de verduras al horno. Los ingredientes básicos son calabacín, patatas, cebolla, tomates, entre otros.")
            ];

            let pani_de_la_nona = new Restaurante("Pani Della Nonna", "Calle 47b #33-15", "1234567", "Roma", "12:00 PM", "8:00 PM", 20, "Los mejores panes de la ciudad.", platos_pani_de_la_nona);
            let karak = new Restaurante("Karak", "Calle 33 #47-15", "9876543", "Singapur", "3:00 PM", "11:00 PM", 8, "Comida árabe fusión.", platos_karak);
            let salino = new Restaurante("Salino", "Calle 20 #33-34", "6536242", "Túnez", "8:00 AM", "3:00 PM", 50, "Comida del mediterráneo.", platos_salino);

            registro_restaurantes.push(pani_de_la_nona);
            registro_restaurantes.push(karak);
            registro_restaurantes.push(salino);
        }

        localStorage.setItem("restaurantes", JSON.stringify(registro_restaurantes));
    }

    static agregar_restaurante(restaurante) {
        registro_restaurantes = JSON.parse(localStorage.getItem("restaurantes"));
        registro_restaurantes.push(restaurante);
        localStorage.setItem("restaurantes", JSON.stringify(registro_restaurantes));
        Restaurante.preparar_vista_lista_restaurantes();
    }

    static turn_edit(e) {
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

    static confirm_edit(e) {
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

        Restaurante.local_storage_actualizar_current_restaurant();

    }

    static local_storage_actualizar_current_restaurant() {
        for (var i = 0; i < registro_restaurantes.length; i++) {
            if (registro_restaurantes[i].nombre === current_restaurant.nombre) {
                registro_restaurantes[i] = current_restaurant;
            }
        }

        //Guardar Cambios
        localStorage.setItem("restaurantes", JSON.stringify(registro_restaurantes));
    }

}

let current_restaurant;

class Plato {
    constructor(name, desc) {
        this.name = name;
        this.desc = desc;
    }

    static get_plato_name_from_btn_id(btn_id) {
        //Format: btn_plato_<nombreplato>
        return btn_id.split('_')[2];
    }

    static get_plato_name_from_edit_btn_id(btn_id) {
        //Format: btn_edit_plato_<nombreplato>
        return btn_id.split('_')[3];
    }

    static get_plato_from_selected_restaurant_by_name(plato_name) {
        for (var i = 0; i < current_restaurant.platos.length; i++) {
            if (current_restaurant.platos[i].name === plato_name.replaceAll("-", " "))
                return current_restaurant.platos[i];
        }
    }

    static plato_to_html(plato) {
        return `<div class="container">
                    <div class="row btn_plato" id="btn_plato_${plato.name.replaceAll(" ", '-')}">
                        <div class="col border-top pt-3">
                            <div class="ocultar">
                                <input class="form-control w-75 mx-auto" type="text" id="edit_plato_${plato.name.replaceAll(" ", '-')}_name">
                            </div>
                            <h4 id="plato_${plato.name.replaceAll(" ", '-')}_name" class="text-center px-2">${plato.name}</h4>

                            <div class="ocultar">
                                <input class="form-control w-75 mx-auto" type="text" id="edit_plato_${plato.name.replaceAll(" ", '-')}_desc">
                            </div>
                            <p id="plato_${plato.name.replaceAll(" ", '-')}_desc" class="px-2 my-auto">
                                    ${plato.desc}
                                </p>
                        </div>
                        <div class="col">

                            <div id="plato_edit_confirm_control_${plato.name.replaceAll(" ", '-')}" class="mx-auto w-25 ocultar">
                                <a href="javascript:void(0);" id="btn_edit_plato_${plato.name.replaceAll(" ", '-')}" class="boton button button-primary admin_mode">✔</a>
                            </div>
                            
                            <!--- Icono de editar solo aparece si el usuario está loggeado como administrador de restaurante -->
                            <div id="plato_edit_turn_control_${plato.name.replaceAll(" ", '-')}"  class="mx-auto w-25">
                                <div  >
                                    <a href="javascript:void(0);" id="btn_edit_plato_${plato.name.replaceAll(" ", '-')}" class="boton button button-primary admin_mode ocultar btn_edit_plato">
                                        <img class="pencil-icon" src="img/pencil.png" alt="">
                                    </a>
                                </div>
                            </div>

                            <img src="img/dish.png" class="rounded mx-auto d-block" alt="">

                        </div>
                    </div>
                </div>`
    }

    static platos_list_to_html(platos) {
        let html = '';

        platos.forEach(plato => {
            html = html.concat(Plato.plato_to_html(plato));
        });

        return html;
    }

    static preparar_vista_menu() {
        let div = document.getElementById("contenedor_menu");

        div.innerHTML = Plato.platos_list_to_html(current_restaurant.platos);

        // Agregar Eventos
        let btn_platos = document.getElementsByClassName("btn_plato");
        for (var i = 0; i < btn_platos.length; i++) {
            btn_platos[i].addEventListener("click", e => {
                //console.log(e.currentTarget); TODO ?
            });
        }

        let btn_edit_platos = document.getElementsByClassName("btn_edit_plato");
        for (var i = 0; i < btn_edit_platos.length; i++) {
            btn_edit_platos[i].addEventListener("click", e => {
                Plato.turn_edit(e);
            });
        }

        if (current_restaurant === current_user.restaurante) {
            display_admin_objects(true);
        } else {
            display_admin_objects(false);
        }
    }

    static turn_edit(e) {

        let plato_name = Plato.get_plato_name_from_edit_btn_id(e.currentTarget.id);

        let edit_name_input = document.getElementById(`edit_plato_${plato_name.replaceAll(" ", '-')}_name`);
        let edit_desc_input = document.getElementById(`edit_plato_${plato_name.replaceAll(" ", '-')}_desc`);
        let name_h = document.getElementById(`plato_${plato_name.replaceAll(" ", '-')}_name`);
        let desc_p = document.getElementById(`plato_${plato_name.replaceAll(" ", '-')}_desc`);

        let edit_turn_control = document.getElementById(`plato_edit_turn_control_${plato_name.replaceAll(" ", '-')}`);
        let edit_confirm_control = document.getElementById(`plato_edit_confirm_control_${plato_name.replaceAll(" ", '-')}`);

        edit_name_input.value = name_h.innerText;
        edit_desc_input.value = desc_p.innerText;

        name_h.innerText = '';
        desc_p.innerText = '';

        edit_name_input.parentElement.classList.remove("ocultar");
        edit_desc_input.parentElement.classList.remove("ocultar");
        edit_turn_control.classList.add("ocultar");
        edit_confirm_control.classList.remove("ocultar");

        edit_confirm_control.addEventListener("click", e => {
            Plato.confirm_edit(e);
        });
    }

    static confirm_edit(e) {
        let plato_name = Plato.get_plato_name_from_edit_btn_id(e.target.id);
        let plato_to_edit = Plato.get_plato_from_selected_restaurant_by_name(plato_name);
        let edit_name_input = document.getElementById(`edit_plato_${plato_name.replaceAll(" ", '-')}_name`);
        let edit_desc_input = document.getElementById(`edit_plato_${plato_name.replaceAll(" ", '-')}_desc`);
        let name_h = document.getElementById(`plato_${plato_name.replaceAll(" ", '-')}_name`);
        let desc_p = document.getElementById(`plato_${plato_name.replaceAll(" ", '-')}_desc`);
        let edit_turn_control = document.getElementById(`plato_edit_turn_control_${plato_name.replaceAll(" ", '-')}`);
        let edit_confirm_control = document.getElementById(`plato_edit_confirm_control_${plato_name.replaceAll(" ", '-')}`);

        //Guardar nombre para hacer búsqueda en restaurante
        let old_name = plato_to_edit.name;
        for (var i = 0; i < current_restaurant.platos.length; i++) {
            // Buscar y hacer cambios a plato
            let plato = current_restaurant.platos[i];
            if (plato.name === old_name) {
                plato.name = edit_name_input.value;
                plato.desc = edit_desc_input.value;
            }
        }
        Restaurante.local_storage_actualizar_current_restaurant();

        name_h.innerText = edit_name_input.value;
        desc_p.innerText = edit_desc_input.value;

        edit_name_input.parentElement.classList.add("ocultar");
        edit_desc_input.parentElement.classList.add("ocultar");
        edit_confirm_control.classList.add("ocultar");
        edit_turn_control.classList.remove("ocultar");
    }

    static turn_agregar_plato() {
        let show_controls = document.getElementById("btn_turn_agregar_plato");
        show_controls.classList.add("ocultar");

        let input_controls = document.getElementById("agregar_plato_container");
        input_controls.classList.remove("ocultar");
    }

    static confirmar_agregar_plato() {
        let input_agregar_plato_name = document.getElementById("input_agregar_plato_name");
        let input_agregar_plato_desc = document.getElementById("input_agregar_plato_desc");

        let new_plato = new Plato(input_agregar_plato_name.value, input_agregar_plato_desc.value);

        current_restaurant.platos.push(new_plato);

        Restaurante.local_storage_actualizar_current_restaurant();
        Plato.preparar_vista_menu();

        let show_controls = document.getElementById("btn_turn_agregar_plato");
        show_controls.classList.remove("ocultar");

        let input_controls = document.getElementById("agregar_plato_container");
        input_controls.classList.add("ocultar");
    }
}

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
    hacer_reserva = document.getElementById("hacer_reserva");
    reserva_2 = document.getElementById("reserva_2");
    form_nuevo_restaurante = document.getElementById("form_nuevo_restaurante");
    form_nuevo_restaurante_2 = document.getElementById("form_nuevo_restaurante_2");
    navbar = document.getElementById("navbar");
    modal_container = document.getElementById("modal_container");
    modal_background_container = document.getElementById("modal_background_container");
    lista_reservas = document.getElementById("lista_reservas");
    creditos = document.getElementById("creditos");
    secciones = [splash, login_screen, registro, reset, reset_part2, lista_restaurantes, restaurante, menu, hacer_reserva, reserva_2, form_nuevo_restaurante, form_nuevo_restaurante_2, lista_reservas, creditos];


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
    btn_turn_agregar_plato = document.getElementById("btn_turn_agregar_plato");
    btn_confirmar_agregar_plato = document.getElementById("btn_confirmar_agregar_plato");
    btn_creditos = document.getElementById("btn_creditos");
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
    date = document.getElementById("date_reserva");
    hour = document.getElementById("hour_reserva");
    number_persons = document.getElementById("number_persons");

}

function agregarEventos() {
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
        if (admin_mode) {
            irA(lista_reservas);
        } else {
            irA(hacer_reserva);
        }
    });
    btn_confirmar_reserva_1.addEventListener("click", () => { irA(reserva_2) })
    btn_confirmar_reserva_2.addEventListener("click", () => {
        Reserva.guardar_reserva();
        irA(lista_restaurantes)
    })

    btn_soy_restaurante.addEventListener("click", () => {
        if (current_user.restaurante) {
            current_restaurant = current_user.restaurante;
            irA(restaurante);
        } else {
            irA(form_nuevo_restaurante)
        }

        turn_modal();
    });

    btn_cerrar_sesion.addEventListener("click", () => {
        admin_logout();
        irA(login_screen);
        turn_modal();
    });

    btn_creditos.addEventListener("click", () => {
        irA(creditos);
        turn_modal();
    });

    btn_form_nuevo_restaurante_continuar.addEventListener("click", () => { agregarRestauranteParte1(); });
    btn_form_nuevo_restaurante_confirmar.addEventListener("click", () => {
        agregarRestauranteParte2();
        irA(lista_restaurantes);
    });

    btn_edit_restaurant_desc.addEventListener("click", e => {
        Restaurante.turn_edit(e);
    });
    btn_edit_confirm_restaurant_desc.addEventListener("click", e => {
        Restaurante.confirm_edit(e);
    });
    btn_edit_restaurante_name.addEventListener("click", e => {
        Restaurante.turn_edit(e);
    });
    btn_edit_confirm_restaurante_name.addEventListener("click", e => {
        Restaurante.confirm_edit(e);
    });
    btn_turn_agregar_plato.addEventListener("click", () => {
        Plato.turn_agregar_plato();
    });
    btn_confirmar_agregar_plato.addEventListener("click", () => {
        Plato.confirmar_agregar_plato();
    });
    btn_nav_menu.addEventListener("click", () => { turn_modal(); });
    modal_background_container.addEventListener("click", () => {
        turn_modal();
    });

    btn_volver.addEventListener("click", () => {
        nav_history.pop();
        var last = nav_history.pop();
        if (nav_history.length > 0) {
            irA(last, true); //volver
        }
    });
}

function turn_modal() {
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
    if (seccion === splash ||
        seccion === login_screen ||
        seccion === registro) {
        navbar.classList.add("ocultar")
    } else {
        navbar.classList.remove("ocultar");

        if (seccion === lista_restaurantes) {
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

var admin_mode = false;

function admin_login() {
    admin_mode = true;
}

function admin_logout() {
    admin_mode = false;
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
    // usuario.hacer_reserva = null;

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
    var restaurante = new Restaurante(
        nombre.value,
        direccion.value,
        telefono.value,
        ciudad.value,
        time_in.value,
        time_out.value,
        aforo.value,
        "Bienvenido", [new Plato('Nombre del plato 1', 'Descipción del plato'),
            new Plato('Nombre del plato 2', 'Descipción del plato'),
            new Plato('Nombre del plato 3', 'Descipción del plato')
        ]);
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
            Restaurante.preparar_vista_restaurante(current_restaurant);
            break;
        case lista_restaurantes:
            Restaurante.preparar_vista_lista_restaurantes();
            break;
        case menu:
            Plato.preparar_vista_menu();
            break;
        case hacer_reserva:
            Reserva.preparar_vista_hacer_reserva();
            break;
        case reserva_2:
            Reserva.preparar_vista_confirmar_reserva();
            break;
        case lista_reservas:
            Reserva.preparar_vista_lista_reservas();
            break;
        default:
            break;
    }
}