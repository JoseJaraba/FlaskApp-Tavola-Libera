var modal_container, modal_background_container;
var btn_nav_menu;

var modal_is_open = false;

window.onload = () => {
    createReferences();
    addEvents();
}

function createReferences(){
    modal_background_container = document.getElementById("modal_background_container");
    modal_container = document.getElementById("modal_container");
    btn_nav_menu = document.getElementById("btn_nav_menu");
}

function addEvents(){
    btn_nav_menu.addEventListener("click", () => { modalDisplay(); });
    modal_background_container.addEventListener("click", () => { modalDisplay(); });
}

function modalDisplay(){
    modal_is_open = !modal_is_open
    if (modal_is_open){
        modal_container.classList.add("show");
        modal_background_container.classList.add("show");
    }else {
        modal_container.classList.remove("show");
        modal_background_container.classList.remove("show");
    }
}