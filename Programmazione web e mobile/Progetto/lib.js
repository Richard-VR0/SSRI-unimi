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

function isRightLogged(user) {
    if (!(localStorage.getItem('user_id')) || !(localStorage.getItem('tipologia')) || localStorage.getItem('tipologia') != user) {        
        window.location.href = 'utente.html';

        return;
    }
}

function logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('tipologia');
    localStorage.removeItem('carrello');
    localStorage.removeItem('ristorante_id');
    localStorage.removeItem('ristorante_nome');

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

        clone.querySelector("#nome-ristorante").textContent = ristorante.nome;
        clone.querySelector("#descrizione-ristorante").textContent = ristorante.descrizione;
        clone.querySelector("#foto-ristorante").src = ristorante.url_foto;
        clone.querySelector("#link-foto-ristorante").href = "ristorante.html?id=" + id;
        clone.querySelector("#link-testo-ristorante").href = "ristorante.html?id=" + id;

        clone.classList.remove('d-none');

        clone.id += i;

        modello.before(clone);
    }
}

// -----------------------------------------------------------------------------------------------
//                                      VETRINA RISTORANTE
// -----------------------------------------------------------------------------------------------

function caricaDettagliRistorante() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    fetch("http://localhost:3000/restaurant/" + id).then(response => response.json()).then(result => {
        let dettagli = result.ristorante;

        document.getElementById('tab-title').innerHTML = dettagli.nome;
        
        localStorage.setItem('ristorante_nome', dettagli.nome);

        document.getElementById('poster').src = dettagli.url_foto;

        document.getElementById('nome-ristorante').innerHTML = dettagli.nome;

        document.getElementById('indirizzo').innerHTML = "<span class='fw-bolder'>Indirizzo: </span>" + dettagli.indirizzo.via + " " + dettagli.indirizzo.civico + ", " + dettagli.indirizzo.citta;
        document.getElementById('coordinate').innerHTML = "<span class='fw-bolder'>Coordinate: </span>" + dettagli.coordinate.lat + "° " + dettagli.coordinate.lng + "°";

        const telefonocontainer = document.getElementById('telefono');
        telefonocontainer.innerHTML = "<span class='fw-bolder'>Telefono: </span>";
        const linktelefono = document.createElement('a');
        linktelefono.href = "tel:" + dettagli.telefono;
        linktelefono.className = "link-warning";
        linktelefono.textContent = dettagli.telefono;
        telefonocontainer.appendChild(linktelefono);

        const emailcontainer = document.getElementById('email');
        emailcontainer.innerHTML = "<span class='fw-bolder'>Email: </span>";
        const linkemail = document.createElement('a');
        linkemail.href = "mailto:" + result.email;
        linkemail.className = "link-warning";
        linkemail.textContent = result.email;
        emailcontainer.appendChild(linkemail);

        document.getElementById('piva').innerHTML = "<span class='fw-bolder'>Partita IVA: </span>" + dettagli.piva;

        document.getElementById('descrizione').innerHTML = dettagli.descrizione;
    })
}

function caricaMenu() {
    let params = new URLSearchParams(window.location.search);
    const ristoranteId = params.get('id');

    fetch('http://localhost:3000/restaurant/' + ristoranteId + '/menu').then(res => res.json()).then(lista => renderMenu(lista));
}

function cercaMenu() {
    let params = new URLSearchParams(window.location.search);
    const ristoranteId = params.get('id');
    const query = document.getElementById('ricerca').value;

    if (query == "") {
        caricaMenu();
    }
    else {
        fetch("http://localhost:3000/restaurant/" + ristoranteId + "/menu/search?query=" + query).then(response => response.json()).then(lista => {renderMenu(lista)})
    }
}


function renderMenu(lista) {
    pulisciDiv("prodotto");

    for (let i = 0; i < lista.length; i++) {
        let piatto = lista[i];

        let modello = document.getElementById('prodotto');
        let clone = modello.cloneNode(true);

        clone.querySelector("#foto-prodotto").src = piatto.foto;
        clone.querySelector("#nome-prodotto").textContent = piatto.nome;
        clone.querySelector("#categoria-prodotto").innerHTML = "<span class='fw-bolder'>Categoria:</span> " + piatto.categoria;
        clone.querySelector("#area-prodotto").innerHTML = "<span class='fw-bolder'>Area:</span> " + piatto.area;
        clone.querySelector("#prezzo-prodotto").textContent = piatto.prezzo.toFixed(2) + " €";

        clone.dataset.ricetta = piatto.istruzioni || 'Ricetta non disponibile';
        clone.dataset.ingredienti = JSON.stringify(piatto.ingredienti || []);
        clone.dataset.misure = JSON.stringify(piatto.misure || []);

        clone.querySelector('.btn-primary').onclick = (event) => aggiungiAlCarrello(piatto, event);

        clone.classList.remove('d-none');
        clone.id += i;

        modello.before(clone);
    }
}

function apriRicetta(pulsante) {
    const card = pulsante.closest('.col');
    const ricetta = card.dataset.ricetta;

    let ingredienti = [];
    let misure = [];

    try {
        ingredienti = JSON.parse(card.dataset.ingredienti || '[]');
        misure = JSON.parse(card.dataset.misure || '[]');
    } catch (e) {
        ingredienti = [];
        misure = [];
    }

    const modalEl = document.getElementById('ricetta');
    const modalTitle = document.getElementById('ricettaTitle');
    const modalBody = document.getElementById('ricettaBody');

    const nomePiatto = card.querySelector('h5')?.textContent || 'Ricetta';
    modalTitle.textContent = nomePiatto;

    let htmlRicetta = '<h5 class="fs-5">Ingredienti</h5><ul class="mb-3">';

    if (ingredienti.length === 0) {
        htmlRicetta += '<li>Nessun ingrediente disponibile</li>';
    }
    else {
        for (let i = 0; i < ingredienti.length; i++) {
            const dose = misure[i] && misure[i].trim() !== '' ? misure[i] : 'q.b.';

            htmlRicetta += '<li>' + dose + ' ' + ingredienti[i] + '</li>';
        }
    }

    htmlRicetta += '</ul>';

    htmlRicetta += '<h5 class="fs-5">Preparazione</h5>';
    htmlRicetta += '<div style="white-space: pre-line;">' + (ricetta || 'Ricetta non disponibile') + '</div>';

    modalBody.innerHTML = htmlRicetta;

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}

// -----------------------------------------------------------------------------------------------
//                                      CARRELLO RISTORANTE
// -----------------------------------------------------------------------------------------------

function aggiungiAlCarrello(piatto) {
    let params = new URLSearchParams(window.location.search);
    let ristoranteId = params.get('id');
    
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];
    const ristoranteAttuale = localStorage.getItem('ristorante_id');

    // se il carrello non è vuoto e il ristorante è diverso
    if (carrello.length > 0 && ristoranteAttuale !== ristoranteId) {
        const conferma = confirm('Hai già piatti di un altro ristorante nel carrello.\nVuoi svuotarlo e aggiungere questo piatto?');
        if (conferma) {
            carrello = [];
        } else {
            return;
        }
    }

    localStorage.setItem('ristorante_id', ristoranteId);

    const esistente = carrello.find(p => p._id === piatto._id);

    if (esistente) {
        esistente.quantita++;
    }
    else {
        carrello.push({
            _id: piatto._id,
            nome: piatto.nome,
            prezzo: piatto.prezzo,
            foto: piatto.foto,
            quantita: 1
        });
    }

    localStorage.setItem('carrello', JSON.stringify(carrello));

    aggiornaBadge();
}

function aggiornaBadge() {
    const carrello = JSON.parse(localStorage.getItem('carrello')) || [];

    const totale = carrello.reduce((acc, p) => acc + p.quantita, 0);
    
    document.getElementById('badge-carrello').textContent = totale;
}

function caricaCarrello() {
    document.getElementById('nome-ristorante').innerHTML += localStorage.getItem('ristorante_nome');

    const carrello = JSON.parse(localStorage.getItem('carrello')) || [];

    if (carrello.length === 0) {
        document.getElementById('carrello-vuoto').classList.remove('d-none');
        return;
    }

    let totale = 0;

    for (let i = 0; i < carrello.length; i++) {
        let piatto = carrello[i];
        totale += piatto.prezzo * piatto.quantita;

        let modello = document.getElementById('prodotto');
        let clone = modello.cloneNode(true);

        clone.querySelector("#foto-prodotto").src = piatto.foto;
        clone.querySelector("#nome-prodotto").textContent = piatto.nome;
        clone.querySelector("#prezzo-prodotto").innerHTML = "<span class='fw-bolder'>Prezzo piatto:</span> " + piatto.prezzo.toFixed(2) + " €";
        clone.querySelector("#quantita-prodotto").innerHTML = "<span class='fw-bolder'>Quantità:</span> " + piatto.quantita;
        clone.querySelector("#totale-prodotto").innerHTML = "<span class='fw-bolder'>Prezzo:</span> " + (piatto.prezzo * piatto.quantita).toFixed(2) + " €";

        clone.querySelector('.btn-danger').onclick = () => rimuoviDalCarrello(piatto._id);

        clone.classList.remove('d-none');
        clone.id += i;
        modello.before(clone);
    }

    document.getElementById('totale').textContent = totale.toFixed(2) + " €";
}

function rimuoviDalCarrello(id) {
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];
    
    carrello = carrello.filter(p => p._id !== id);
    
    localStorage.setItem('carrello', JSON.stringify(carrello));
    
    window.location.reload();
}

// -----------------------------------------------------------------------------------------------
//                                      ORDINI UTENTE
// -----------------------------------------------------------------------------------------------

function concludiOrdine() {
    const carrello = JSON.parse(localStorage.getItem('carrello')) || [];
    const ristoranteId = localStorage.getItem('ristorante_id');
    const clienteId = localStorage.getItem('user_id');

    if (!clienteId) {
        window.location.href = 'utente.html';

        return;
    }

    if (carrello.length === 0) {
        alert('Il carrello è vuoto!');

        return;
    }

    const totale = carrello.reduce((acc, p) => acc + p.prezzo * p.quantita, 0);

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cliente_id: clienteId,
            ristorante_id: ristoranteId,
            piatti: carrello,
            totale: parseFloat(totale.toFixed(2))
        })
    }

    fetch('http://localhost:3000/order', options).then(res => res.json()).then(result => {
        if (result.error) {
            alert(result.error);
        }
        else {
            localStorage.removeItem('carrello');
            localStorage.removeItem('ristorante_id');
            localStorage.removeItem('ristorante_nome');
            
            window.location.href = 'ordini.html';
        }
    });
}

function caricaOrdini() {
    const clienteId = localStorage.getItem('user_id');

    fetch('http://localhost:3000/orders/client/' + clienteId).then(res => res.json()).then(lista => renderOrdini(lista));
}

function renderOrdini(lista) {
    pulisciDiv('ordine');

    if (lista.length === 0) {
        document.getElementById('nessun-ordine').classList.remove('d-none');

        return;
    }

    for (let i = 0; i < lista.length; i++) {
        let ordine = lista[i];

        let modello = document.getElementById('ordine');
        let clone = modello.cloneNode(true);

        clone.querySelector('#nome-ristorante-ordine').textContent = ordine.nome_ristorante || 'Ristorante';

        const badge = clone.querySelector('#stato-ordine');
        badge.textContent = ordine.stato.replace('_', ' ');
        badge.className = 'badge ' + coloreStato(ordine.stato);

        const piatti = ordine.piatti.map(p => '<span class="fw-bold">' + p.quantita + 'x</span> ' + p.nome).join('<br>');
        clone.querySelector('#piatti-ordine').innerHTML = piatti;

        clone.querySelector('#totale-ordine').textContent = ordine.totale.toFixed(2) + ' €';

        const data = new Date(ordine.createdAt).toLocaleDateString('it-IT');
        const ora = new Date(ordine.createdAt).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

        clone.querySelector('#data-ordine').textContent = "Ordine del " + data + " alle " + ora;

        clone.classList.remove('d-none');
        clone.id += i;
        modello.before(clone);
    }
}

function coloreStato(stato) {
    switch (stato) {
        case 'Ordinato': return 'bg-warning text-dark';
        case 'In_preparazione': return 'bg-primary';
        case 'In_consegna': return 'bg-success';
        default: return 'bg-secondary';
    }
}

// -----------------------------------------------------------------------------------------------
//                                      GESTIONE RISTORANTE
// -----------------------------------------------------------------------------------------------

function controlloRistorante() {
    if (localStorage.getItem('tipologia') == "ristorante") {
        dashboard();
    }
    else {
        window.location.href = "index.html";
    }
}

function dashboard() {
    caricaGestionePiatti();
}

function caricaGestionePiatti() {
    const ristoranteId = localStorage.getItem('user_id');

    fetch('http://localhost:3000/restaurant/' + ristoranteId + '/menu/gestione').then(res => res.json()).then(lista => renderGestionePiatti(lista));
}

function renderGestionePiatti(lista) {
    pulisciDiv("piatto");

    lista.sort((a, b) => b.inMenu - a.inMenu);

    for (let i = 0; i < lista.length; i++) {
        let piatto = lista[i];

        let modello = document.getElementById('piatto');
        let clone = modello.cloneNode(true);

        clone.querySelector("#foto-prodotto").src = piatto.strMealThumb;
        clone.querySelector("#label-foto-prodotto").htmlFor += i;

        clone.querySelector("#nome-prodotto").textContent = piatto.strMeal;
        clone.querySelector("#nome-prodotto").htmlFor += i;

        clone.querySelector("#checkpiatto").id += i;
        clone.getElementsByTagName('input')[0].dataset.piattoId = piatto._id;
        clone.getElementsByTagName('input')[0].dataset.menuId = piatto.menu_id || '';

        if (piatto.inMenu) {
            clone.getElementsByTagName('input')[0].checked = true;
            clone.getElementsByTagName('input')[1].value = piatto.prezzo.toFixed(2);
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
        body: JSON.stringify({ menu })
    };

    fetch('http://localhost:3000/restaurant/' + ristoranteId + '/menu/save', options).then(res => res.json()).then(result => {
        if (result.error) {
            alert(result.error);
        } else {
            alert('Menu salvato!');
            window.location.reload();
        }
    });
}