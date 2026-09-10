// -----------------------------------------------------------------------------------------------
//                                          FORM UTENTI
// -----------------------------------------------------------------------------------------------

function cambioForm() {
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

function getDatiForm(nomeForm) {
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

function dati_profilo() {
    const id_utente = localStorage.getItem('user_id');

    fetch("http://localhost:3000/user/" + id_utente).then(response => response.json()).then(result => {
        const profilo = document.forms['utente'];

        profilo.elements['nome'].value = result.nome;
        profilo.elements['cognome'].value = result.cognome;
        profilo.elements['email'].value = result.email;
        profilo.elements['password'].value = result.password;
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
//                      REGISTRAZIONE - MODIFICA - CANCELLAZIONE UTENTE
// -----------------------------------------------------------------------------------------------

function registra() {
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
            successo.classList.add('d-none');

            errore.innerHTML = '<i class="bi bi-exclamation-triangle"></i> ' + result.error;
            errore.classList.remove('d-none');

            setTimeout(() => {
                errore.classList.add('d-none');
            }, 3000);
        }
        else {
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

function aggiorna() {
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
            successo.classList.add('d-none');

            errore.innerHTML = '<i class="bi bi-exclamation-triangle"></i> ' + result.error;
            errore.classList.remove('d-none');

            setTimeout(() => {
                errore.classList.add('d-none');
            }, 3000);
        }
        else {
            errore.classList.add('d-none');

            successo.innerHTML = '<i class="bi bi-check-lg"></i> Dati aggiornati con successo';
            successo.classList.remove('d-none');

            setTimeout(() => {
                successo.classList.add('d-none');
            }, 3000);

            console.log(result);

            dati_profilo();
        }
    });
}

function elimina() {
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
//                                         LOGIN / LOGOUT
// -----------------------------------------------------------------------------------------------

function login() {
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

            dati_profilo();
        }
    });
}

function isLogged() {
    const form_login = document.getElementById('accesso');
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
    localStorage.removeItem('tipologia');
    isLogged();
}

// -----------------------------------------------------------------------------------------------
//                                      TOGGLE PASSWORD
// -----------------------------------------------------------------------------------------------

function togglePassword(form) {
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

// -----------------------------------------------------------------------------------------------
//                                          GENERICHE
// -----------------------------------------------------------------------------------------------

function pulisciDiv(modello) {
    let container = document.getElementById('container-' + modello);

    let struttura_modello = document.getElementById(modello);

    container.innerHTML = "";
    container.append(struttura_modello);
}

// -----------------------------------------------------------------------------------------------
//                                      LISTA RISTORANTI
// -----------------------------------------------------------------------------------------------

function mostraRistoranti() {
    fetch("http://localhost:3000/restaurant").then(response => response.json()).then(lista => {renderRistoranti(lista)})
}

function cercaRistoranti() {
    const query = document.getElementById('ricerca').value;

    if (query == "") {
        mostraRistoranti();
    }
    else {
        fetch("http://localhost:3000/restaurant/search?query=" + query).then(response => response.json()).then(lista => {renderRistoranti(lista)})
    }
}

function renderRistoranti(lista) {
    pulisciDiv("ristorante");

    for (let i = 0; i < lista.length; i++) {
        let ristorante = lista[i].ristorante;
        let id = lista[i]._id;

        let modello = document.getElementById('ristorante');

        let clone = modello.cloneNode(true);
        
        clone.getElementsByTagName('h5')[0].innerHTML = ristorante.nome;
        clone.getElementsByTagName('p')[0].innerHTML = ristorante.descrizione;
        clone.getElementsByTagName('img')[0].src = ristorante.url_foto;
        clone.getElementsByTagName('a')[0].href = "ristorante.html?id=" + id;
        clone.getElementsByTagName('a')[1].href = "ristorante.html?id=" + id;

        clone.classList.remove('d-none');

        clone.id += i;

        modello.before(clone);
    }
}

// -----------------------------------------------------------------------------------------------
//                                      DETTAGLI RISTORANTE
// -----------------------------------------------------------------------------------------------

function caricaDettagliRistorante() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    fetch("http://localhost:3000/restaurant/" + id).then(response => response.json()).then(result => {
        let dettagli = result.ristorante;

        document.getElementById('tab-title').innerHTML = dettagli.nome;

        document.getElementById('poster').src = dettagli.url_foto;

        document.getElementById('nome-ristorante').innerHTML = dettagli.nome;

        document.getElementById('indirizzo').innerHTML = "Indirizzo: " + dettagli.indirizzo.via + " " + dettagli.indirizzo.civico + ", " + dettagli.indirizzo.citta;
        document.getElementById('coordinate').innerHTML = "Coordinate: " + dettagli.coordinate.lat + "° " + dettagli.coordinate.lng + "°";

        const telefonocontainer = document.getElementById('telefono');
        telefonocontainer.textContent = "Telefono: ";
        const linktelefono = document.createElement('a');
        linktelefono.href = "tel:" + dettagli.telefono;
        linktelefono.className = "link-warning";
        linktelefono.textContent = dettagli.telefono;
        telefonocontainer.appendChild(linktelefono);

        const emailcontainer = document.getElementById('email');
        emailcontainer.textContent = "Email: ";
        const linkemail = document.createElement('a');
        linkemail.href = "mailto:" + result.email;
        linkemail.className = "link-warning";
        linkemail.textContent = result.email;
        emailcontainer.appendChild(linkemail);

        document.getElementById('piva').innerHTML = "Partita IVA: " + dettagli.piva;

        document.getElementById('descrizione').innerHTML = dettagli.descrizione;
    })
}

function dashboard() {
    caricaGestionePiatti();
}

function caricaGestionePiatti() {
    const ristoranteId = localStorage.getItem('user_id');

    fetch('http://localhost:3000/restaurant/menu/' + ristoranteId).then(res => res.json()).then(lista => renderGestionePiatti(lista));
}

function renderGestionePiatti(lista) {
    pulisciDiv("piatto");

    lista.sort((a, b) => b.inMenu - a.inMenu);

    for (let i = 0; i < lista.length; i++) {
        let piatto = lista[i];

        let modello = document.getElementById('piatto');
        let clone = modello.cloneNode(true);

        clone.getElementsByTagName('img')[0].src = piatto.strMealThumb;
        clone.getElementsByTagName('label')[0].htmlFor += i;
        
        clone.getElementsByTagName('label')[1].innerHTML = piatto.strMeal;
        clone.getElementsByTagName('label')[1].htmlFor += i;

        clone.getElementsByTagName('input')[0].id += i;

        clone.getElementsByTagName('input')[0].dataset.piattoId = piatto._id;
        clone.getElementsByTagName('input')[0].dataset.menuId = piatto.menu_id || '';

        if (piatto.inMenu) {
            clone.getElementsByTagName('input')[0].checked = true;
            clone.getElementsByTagName('input')[1].value = piatto.prezzo;
        }

        clone.classList.remove('d-none');
        clone.id += i;

        modello.before(clone);
    }
}

function aggiornaMenu() {
    const ristoranteId = localStorage.getItem('user_id');
    const checkboxes = document.querySelectorAll('input[type=checkbox]:not(#checkpiatto)');

    const menu = [];

    checkboxes.forEach(checkbox => {
        const riga = checkbox.closest('.col');
        const prezzo = riga.getElementsByTagName('input')[1].value;

        menu.push({
            piatto_id: checkbox.dataset.piattoId,
            menu_id: checkbox.dataset.menuId || null,
            incluso: checkbox.checked,
            prezzo: parseFloat(prezzo) || null
        });
    });

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ristorante_id: ristoranteId, menu })
    };

    console.log(JSON.stringify({ ristorante_id: ristoranteId, menu }));

    fetch('http://localhost:3000/restaurant/menu/save', options).then(res => res.json()).then(result => {
        if (result.error) {
            alert(result.error);
        } else {
            alert('Menu salvato!');
            window.location.reload();
        }
    });
}