function registra() {
    const form = document.forms['form-utente'];
    const cNome = form.elements['nome'].value;
    const cCognome = form.elements['cognome'].value;
    const cEmail = form.elements['email'].value;
    const cPassword = form.elements['password'].value;

    const user = {
        nome: cNome,
        cognome: cCognome,
        email: cEmail,
        password: cPassword
    };

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    fetch("http://localhost:3000/user", options).then(response => response.json()).then(result => console.log(result));
}

function aggiorna() {
    const form = document.forms['form-utente'];
    const cNome = form.elements['nome'].value;
    const cCognome = form.elements['cognome'].value;
    const cEmail = form.elements['email'].value;
    const cPassword = form.elements['password'].value;

    const user = {
        nome: cNome,
        cognome: cCognome,
        password: cPassword
    };

    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    fetch("http://localhost:3000/user/" + cEmail, options).then(response => response.json()).then(result => console.log(result));
}

function elimina() {
    const form = document.forms['form-utente'];
    const cEmail = form.elements['email'].value;

    const options = {
        method: "DELETE"
    };

    fetch("http://localhost:3000/user/" + cEmail, options).then(response => response.json()).then(result => console.log(result));

    logout();
}

function login() {
    const form = document.forms['form-login'];
    const cEmail = form.elements['email'].value;
    const cPassword = form.elements['password'].value;

    const user = {
        email: cEmail,
        password: cPassword
    };

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    fetch("http://localhost:3000/user/login", options).then(response => response.json()).then(result => {
        const alert_errore = document.getElementById('alert');

        if (result.error) {
            alert_errore.innerHTML = result.error;
            alert_errore.classList.remove('d-none');
        } else {
            alert_errore.classList.add('d-none');

            document.getElementById('login').classList.add('d-none');
            document.getElementById('utente').classList.remove('d-none');

            localStorage.setItem('user_id', result._id);

            dati_profilo();
        }
    });
}

function dati_profilo() {
    const id_utente = localStorage.getItem('user_id');

    fetch("http://localhost:3000/user/" + id_utente).then(response => response.json()).then(result => {
        const profilo = document.forms['form-utente'];

        profilo.elements['nome'].value = result.nome;
        profilo.elements['cognome'].value = result.cognome;
        profilo.elements['email'].value = result.email;
    });
}

function isLogged() {
    const form_login = document.getElementById('login');
    const scheda_profilo = document.getElementById('utente');

    if (localStorage.getItem('user_id')) {
        form_login.classList.add('d-none');
        scheda_profilo.classList.remove('d-none');

        dati_profilo();
    }
    else {
        form_login.classList.remove('d-none');
        scheda_profilo.classList.add('d-none');
    }
}

function logout() {
    localStorage.removeItem('user_id');
    isLogged();
}

function togglePassword() {
    const password = document.getElementById("password-login");
    const eye = document.getElementById("psw-eye");

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