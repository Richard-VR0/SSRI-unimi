// -----------------------------------------------------------------------------------------------
//                                      MENU RISTORANTE
// -----------------------------------------------------------------------------------------------

export function caricaMenu() {
    let params = new URLSearchParams(window.location.search);
    const ristoranteId = params.get('id');

    fetch('http://localhost:3000/restaurant/' + ristoranteId + '/menu').then(res => res.json()).then(lista => {
        renderMenu(lista)
    });
}

export function cercaMenu() {
    const paramsUrl = new URLSearchParams(window.location.search);
    const ristoranteId = paramsUrl.get('id');

    const query = document.getElementById('ricerca').value.trim();
    const categoria = document.getElementById('categoria').value;    

    if (!query && !categoria) {
        caricaMenu();

        return;
    }

    const params = new URLSearchParams();

    if (query) {
        params.append('query', query);
    }

    if (categoria) {
        params.append('categoria', categoria);
    }

    fetch('http://localhost:3000/restaurant/' + ristoranteId + '/menu/search?' + params.toString()).then(res => res.json()).then(lista => {
        renderMenu(lista);
    });
}


export function renderMenu(lista) {
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

export function apriRicetta(pulsante) {
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