// -----------------------------------------------------------------------------------------------
//                                          FORM DATI
// -----------------------------------------------------------------------------------------------

export function cambioForm() {
    const type = document.getElementById("tipologia").value;

    if (type == "cliente") {
        document.getElementById("cliente").classList.remove("d-none");
        document.getElementById("ristorante").classList.add("d-none");
    }
    else {
        if (type == "ristorante") {
            document.getElementById("ristorante").classList.remove("d-none");
            document.getElementById("cliente").classList.add("d-none");
        }
    }
}

export function getDatiForm(nomeForm) {
    const type = document.getElementById("tipologia").value;
    const form = document.forms[nomeForm];

    if (type == "cliente") {
        return {
            nome: form.elements['nome'].value,
            cognome: form.elements['cognome'].value,
            email: form.elements['email'].value,
            password: form.elements['password'].value,
            tipologia: form.elements['tipologia'].value,
            pagamento: {
                numerocarta: form.elements['numerocarta'].value,
                scadenza: form.elements['scadenza'].value,
                cvv: form.elements['cvv'].value
            }
        };
    }
    else {
        if (type == "ristorante") {
            return {
                nome: form.elements['nome'].value,
                cognome: form.elements['cognome'].value,
                email: form.elements['email'].value,
                password: form.elements['password'].value,
                tipologia: form.elements['tipologia'].value,
                ristorante: {
                    nome: form.elements['nomeristorante'].value,
                    descrizione: form.elements['descrizioneristorante'].value,
                    piva: form.elements['piva'].value,
                    url_foto: form.elements['url'].value,
                    telefono: form.elements['telefono'].value,
                    indirizzo: {
                        via: form.elements['via'].value,
                        civico: form.elements['civico'].value,
                        citta: form.elements['citta'].value
                    },
                    coordinate: {
                        latitudine:  form.elements['lat'].value,
                        longitudine:  form.elements['lng'].value
                    }
                }
            };
        }
    }
}

export function datiProfilo() {
    const id_utente = localStorage.getItem('user_id');

    fetch("http://localhost:3000/user/" + id_utente).then(response => response.json()).then(result => {
        const profilo = document.forms['utente'];

        profilo.elements['nome'].value = result.nome;
        profilo.elements['cognome'].value = result.cognome;
        profilo.elements['email'].value = result.email;
        profilo.elements['tipologia'].value = result.tipologia;

        if (result.tipologia == "cliente") {
            profilo.elements['numerocarta'].value = result.pagamento.numerocarta;
            profilo.elements['scadenza'].value = result.pagamento.scadenza;
            profilo.elements['cvv'].value = result.pagamento.cvv;
        }
        else {
            if (result.tipologia == "ristorante") {
                profilo.elements['nomeristorante'].value = result.ristorante.nome;
                profilo.elements['descrizioneristorante'].value = result.ristorante.descrizione;
                profilo.elements['piva'].value = result.ristorante.piva;
                profilo.elements['url'].value = result.ristorante.url_foto;
                profilo.elements['telefono'].value = result.ristorante.telefono;
                profilo.elements['via'].value = result.ristorante.indirizzo.via;
                profilo.elements['civico'].value = result.ristorante.indirizzo.civico;
                profilo.elements['citta'].value = result.ristorante.indirizzo.citta;
                profilo.elements['lat'].value = result.ristorante.coordinate.lat;
                profilo.elements['lng'].value = result.ristorante.coordinate.lng;
            }
        }

        cambioForm();
    });
}

// -----------------------------------------------------------------------------------------------
//                                  GESTIONE DATI UTENTE
//                          REGISTRAZIONE - MODIFICA - CANCELLAZIONE
// -----------------------------------------------------------------------------------------------

export function registra() {
    const user = getDatiForm('registrazione');

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    console.log(user);

    fetch("http://localhost:3000/user", options).then(response => response.json()).then(result => {
        const errore = document.getElementById('errore');
        const successo = document.getElementById('successo');

        if (result.error) {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            successo.classList.add('d-none');

            errore.innerHTML = '<i class="bi bi-exclamation-triangle"></i> ' + result.error;
            errore.classList.remove('d-none');

            setTimeout(() => {
                errore.classList.add('d-none');
            }, 3000);
        }
        else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            errore.classList.add('d-none');

            successo.innerHTML = '<i class="bi bi-check-lg"></i> Profilo creato con successo, <a href="utente.html">vai alla pagina di accesso</a>';
            successo.classList.remove('d-none');

            setTimeout(() => {
                successo.classList.add('d-none');
            }, 3000);

            console.log(result);
        }
    });
}

export function aggiorna() {
    const user = getDatiForm('utente');

    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    fetch("http://localhost:3000/user/" + localStorage.getItem('user_id'), options).then(response => response.json()).then(result => {
        const errore = document.getElementById('errore');
        const successo = document.getElementById('successo');

        if (result.error) {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            successo.classList.add('d-none');

            errore.innerHTML = '<i class="bi bi-exclamation-triangle"></i> ' + result.error;
            errore.classList.remove('d-none');

            setTimeout(() => {
                errore.classList.add('d-none');
            }, 3000);
        }
        else {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            errore.classList.add('d-none');

            successo.innerHTML = '<i class="bi bi-check-lg"></i> Dati aggiornati con successo';
            successo.classList.remove('d-none');

            setTimeout(() => {
                successo.classList.add('d-none');
            }, 3000);

            console.log(result);

            datiProfilo();
        }
    });
}

export function elimina() {
    const form = document.forms['utente'];
    const cEmail = form.elements['email'].value;

    const options = {
        method: "DELETE"
    };

    fetch("http://localhost:3000/user/" + localStorage.getItem('user_id'), options).then(response => response.json()).then(result => {
        const errore = document.getElementById('errore');
        const successo = document.getElementById('successo');

        if (result.error) {
            successo.classList.add('d-none');

            errore.innerHTML = '<i class="bi bi-exclamation-triangle"></i> ' + result.error;
            errore.classList.remove('d-none');

            setTimeout(() => {
                errore.classList.add('d-none');
            }, 3000);
        }
        else {
            errore.classList.add('d-none');

            successo.innerHTML = '<i class="bi bi-check-lg"></i> Utente eliminato con successo';
            successo.classList.remove('d-none');

            setTimeout(() => {
                successo.classList.add('d-none');
            }, 3000);

            console.log(result);

            logout();
        }
    });
}

// -----------------------------------------------------------------------------------------------
//                                  LOGIN - LOGOUT - CONTROLLI
// -----------------------------------------------------------------------------------------------

export function login() {
    const form = document.forms['accesso'];
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
        const errore = document.getElementById('errore');

        if (result.error) {
            errore.innerHTML = '<i class="bi bi-exclamation-triangle"></i> ' + result.error;
            errore.classList.remove('d-none');

            setTimeout(() => {
                errore.classList.add('d-none');
            }, 3000);
        }
        else {
            errore.classList.add('d-none');

            document.getElementById('accesso').classList.add('d-none');
            document.getElementById('utente').classList.remove('d-none');

            localStorage.setItem('user_id', result._id);
            localStorage.setItem('tipologia', result.tipologia);

            datiProfilo();
        }
    });
}

export function isLogged() {
    const form_login = document.getElementById('accesso');
    const scheda_profilo = document.getElementById('utente');

    if (localStorage.getItem('user_id')) {
        form_login.classList.add('d-none');
        scheda_profilo.classList.remove('d-none');

        datiProfilo();
    }
    else {
        form_login.classList.remove('d-none');
        scheda_profilo.classList.add('d-none');
    }
}

export function controlloRistorante() {
    if (!(localStorage.getItem('user_id')) || !(localStorage.getItem('tipologia')) || localStorage.getItem('tipologia') != "ristorante") {
        window.location.href = 'utente.html';

        return;
    }
    else {
        dashboard();
    }
}

export function controlloCliente() {
    if (!(localStorage.getItem('user_id')) || !(localStorage.getItem('tipologia')) || localStorage.getItem('tipologia') != "cliente") {
        window.location.href = 'utente.html';

        return;
    }
    else {
        const pagina = window.location.pathname.split('/').pop();

        if (pagina == "ordini.html") {
            caricaOrdiniInviati();
        }
        else {
            if (pagina == "carrello.html") {
                caricaCarrello();
                aggiornaBadge();
            }
        }
    }
}

export function logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('tipologia');
    localStorage.removeItem('carrello');
    localStorage.removeItem('ristorante_id');
    localStorage.removeItem('ristorante_nome');

    isLogged();
}