// -----------------------------------------------------------------------------------------------
//                                      ORDINI CLIENTE
// -----------------------------------------------------------------------------------------------

export function caricaOrdiniInviati() {
    const clienteId = localStorage.getItem('user_id');

    fetch('http://localhost:3000/orders/client/' + clienteId).then(res => res.json()).then(lista => {
        renderOrdiniInviati(lista)
    });
}

export function renderOrdiniInviati(lista) {
    pulisciDiv('ordine');

    if (lista.length === 0) {
        document.getElementById('nessun-ordine').classList.remove('d-none');

        return;
    }

    for (let i = 0; i < lista.length; i++) {
        let ordine = lista[i];

        let modello = document.getElementById('ordine');
        let clone = modello.cloneNode(true);

        clone.querySelector('#nome-ristorante-ordine').textContent = ordine.nome_ristorante || 'Ristorante non più disponibile';

        const badge = clone.querySelector('#stato-ordine');
        badge.textContent = ordine.stato.replace('_', ' ');
        badge.className = 'badge ' + coloreStato(ordine.stato);

        const piatti = ordine.piatti.map(p => '<span class="fw-bold">' + p.quantita + 'x</span> ' + p.nome).join('<br>');
        clone.querySelector('#piatti-ordine').innerHTML = piatti;

        clone.querySelector('#totale-ordine').textContent = ordine.totale.toFixed(2) + ' €';

        const tempo = clone.querySelector('#tempo-ordine');

        if (tempo) {
            if (ordine.tempoStimato) {
                tempo.innerHTML = 'Tempo stimato: circa <span class="fw-bold text-primary">' + ordine.tempoStimato + ' minuti</span>';
            }
            else {
                tempo.textContent = 'Tempo stimato non disponibile';
            }
        }

        const data = new Date(ordine.createdAt).toLocaleDateString('it-IT');
        const ora = new Date(ordine.createdAt).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

        clone.querySelector('#data-ordine').textContent = "Ordine del " + data + " alle " + ora;

        const pulsanteRecensione = clone.querySelector('.btn-recensione');

        if (ordine.stato !== 'Consegnato') {
            pulsanteRecensione.classList.add('d-none');
        }
        else {
            if (ordine.recensione) {
                pulsanteRecensione.disabled = true;
                pulsanteRecensione.innerHTML = '<i class="bi bi-star"></i> ' + ordine.recensione + '/5';
            }
            else {
                pulsanteRecensione.onclick = function () {
                    chiediRecensione(ordine);
                };
            }
        }

        clone.classList.remove('d-none');
        clone.id += i;
        modello.before(clone);
    }
}

export function chiediRecensione(ordine) {
    const input = prompt(
        'Dai una recensione da 1 a 5 stelle al ristorante ' + ordine.nome_ristorante
    );

    if (input === null) {
        return;
    }

    const recensione = Number(input);

    if (!Number.isInteger(recensione) || recensione < 1 || recensione > 5) {
        alert('Inserisci un numero intero da 1 a 5');

        return;
    }

    const options = {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recensione: recensione })
    };

    fetch('http://localhost:3000/order/' + ordine._id + '/review', options).then(response => response.json()).then(result => {
        if (result.error) {
            alert(result.error);

            return;
        }

        alert('Recensione inviata: ' + recensione + '/5');

        caricaOrdiniInviati();
    });
}

export function coloreStato(stato) {
    switch (stato) {
        case 'Ordinato': return 'bg-warning text-dark';
        case 'In preparazione': return 'bg-primary';
        case 'In consegna': return 'bg-success';
        default: return 'bg-secondary';
    }
}

// -----------------------------------------------------------------------------------------------
//                                      ORDINI RISTORANTE
// -----------------------------------------------------------------------------------------------

export function dashboard() {
    caricaGestionePiatti();
    caricaOrdiniRicevuti();
}

export function caricaOrdiniRicevuti() {
    const ristoranteId = localStorage.getItem('user_id');

    fetch('http://localhost:3000/orders/restaurant/' + ristoranteId).then(res => res.json()).then(lista => {
        renderOrdiniRicevuti(lista)
    });
}

export function renderOrdiniRicevuti(lista) {
    pulisciDiv('ordine');

    if (lista.length === 0) {
        document.getElementById('nessun-ordine').classList.remove('d-none');

        return;
    }

    for (let i = 0; i < lista.length; i++) {
        let ordine = lista[i];

        let modello = document.getElementById('ordine');
        let clone = modello.cloneNode(true);

        clone.querySelector('#nome-cliente-ordine').textContent = ordine.cognome_cliente && ordine.cognome_cliente ? ordine.nome_cliente + " " + ordine.cognome_cliente : 'Cliente non più disponibile';

        const badge = clone.querySelector('#stato-ordine');
        badge.textContent = ordine.stato.replace('_', ' ');
        badge.className = 'badge ' + coloreStato(ordine.stato);

        const piatti = ordine.piatti.map(p => '<span class="fw-bold">' + p.quantita + 'x</span> ' + p.nome).join('<br>');
        clone.querySelector('#piatti-ordine').innerHTML = piatti;

        clone.querySelector('#totale-ordine').textContent = ordine.totale.toFixed(2) + ' €';

        const tempo = clone.querySelector('#tempo-ordine');

        if (tempo) {
            if (ordine.tempoStimato) {
                tempo.innerHTML = 'Tempo stimato: circa <span class="fw-bold text-primary">' + ordine.tempoStimato + ' minuti</span>';
            }
            else {
                tempo.textContent = 'Tempo stimato non disponibile';
            }
        }

        const data = new Date(ordine.createdAt).toLocaleDateString('it-IT');
        const ora = new Date(ordine.createdAt).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

        clone.querySelector('#data-ordine').textContent = "Ordine del " + data + " alle " + ora;

        const pulsante = clone.querySelector(".btn-avanza");

        if (ordine.stato === "Consegnato") {
            pulsante.disabled = true;
            pulsante.innerHTML = '<i class="bi bi-check-lg"></i> Ordine consegnato';
        }
        else {
            pulsante.onclick = function () {
                avanzaStato(ordine);
            };
        }

        clone.classList.remove('d-none');
        clone.id += i;
        modello.before(clone);
    }
}

export function avanzaStato(ordine) {
    const stati = [
        'Ordinato',
        'In preparazione',
        'In consegna',
        'Consegnato'
    ];

    const posizione = stati.indexOf(ordine.stato);

    if (posizione === -1) {
        alert('Stato dell\'ordine non valido');

        return;
    }

    if (posizione === stati.length - 1) {
        alert('L\'ordine è già consegnato');

        return;
    }

    const nuovoStato = stati[posizione + 1];

    const options = {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stato: nuovoStato })
    }

    fetch('http://localhost:3000/order/' + ordine._id + '/status', options).then(response => response.json()).then(result => {
        if (result.error) {
            alert(result.error);
            
            return;
        }

        caricaOrdiniRicevuti();
    });
}

// -----------------------------------------------------------------------------------------------
//                                      GESTIONE MENU
// -----------------------------------------------------------------------------------------------

export function caricaGestionePiatti() {
    const ristoranteId = localStorage.getItem('user_id');

    fetch('http://localhost:3000/restaurant/' + ristoranteId + '/menu/gestione').then(res => res.json()).then(lista => {
        renderGestionePiatti(lista)
    });
}

export function renderGestionePiatti(lista) {
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

export function aggiornaMenu() {
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