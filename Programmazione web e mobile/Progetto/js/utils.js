// -----------------------------------------------------------------------------------------------
//                                      GENERICHE
// -----------------------------------------------------------------------------------------------

export function togglePassword(form) {
    let id_psw = "psw-" + form;
    const password = document.getElementById(id_psw);

    let id_eye = "eye-" + form;
    const eye = document.getElementById(id_eye);

    if (password.type == "password") {
        password.type = "text";

        eye.classList.add("bi-eye-slash-fill");
        eye.classList.remove("bi-eye-fill");
    }
    else {
        password.type = "password";

        eye.classList.remove("bi-eye-slash-fill");
        eye.classList.add("bi-eye-fill");
    }
}

export function pulisciDiv(modello) {
    let container = document.getElementById('container-' + modello);

    let struttura_modello = document.getElementById(modello);

    container.innerHTML = "";
    container.append(struttura_modello);
}