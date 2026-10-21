// -----------------------------------------------------------------------------------------------
//                                      LISTA RISTORANTI
// -----------------------------------------------------------------------------------------------

export function mostraRistoranti() {
    fetch("http://localhost:3000/restaurants").then(response => response.json()).then(lista => {
        renderRistoranti(lista)
    });
}

export function cercaRistoranti() {
    const query = document.getElementById('ricerca').value;

    if (query == "") {
        mostraRistoranti();
    }
    else {
        fetch("http://localhost:3000/restaurants/search?query=" + query).then(response => response.json()).then(lista => {
            renderRistoranti(lista)
        });
    }
}

export function renderRistoranti(lista) {
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
//                                      DATI RISTORANTE
// -----------------------------------------------------------------------------------------------

export function caricaDettagliRistorante() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    caricaMediaRecensioni(id);

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
        linktelefono.className = "link-light";
        linktelefono.textContent = dettagli.telefono;
        telefonocontainer.appendChild(linktelefono);

        const emailcontainer = document.getElementById('email');
        emailcontainer.innerHTML = "<span class='fw-bolder'>Email: </span>";
        const linkemail = document.createElement('a');
        linkemail.href = "mailto:" + result.email;
        linkemail.className = "link-light";
        linkemail.textContent = result.email;
        emailcontainer.appendChild(linkemail);

        document.getElementById('piva').innerHTML = "<span class='fw-bolder'>Partita IVA: </span>" + dettagli.piva;

        document.getElementById('descrizione').innerHTML = dettagli.descrizione;
    });
}

export function caricaMediaRecensioni(ristoranteId) {
    fetch('http://localhost:3000/restaurant/' + ristoranteId + '/reviews').then(response => response.json()).then(result => {
        const contenitore = document.getElementById('media-recensioni');

        if (!contenitore) {
            return;
        }

        if (result.numeroRecensioni === 0) {
            contenitore.innerHTML = '<i class="bi bi-star-fill"></i> Nessuna recensione';
            
            return;
        }

        const media = result.media.toFixed(1);

        contenitore.innerHTML = '<i class="bi bi-star-fill"></i> ' + media + '/5 (' + result.numeroRecensioni + ' recensioni)';
    });
}