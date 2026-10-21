// -----------------------------------------------------------------------------------------------
//                                      GESTIONE CARRELLO
// -----------------------------------------------------------------------------------------------

export function aggiungiAlCarrello(piatto) {
    if (localStorage.getItem('tipologia') !== 'cliente') {
        alert('Solo i clienti possono aggiungere al carrello!');

        return;
    }

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

export function aggiornaBadge() {
    const carrello = JSON.parse(localStorage.getItem('carrello')) || [];

    const totale = carrello.reduce((acc, p) => acc + p.quantita, 0);
    
    document.getElementById('badge-carrello').textContent = totale;
}

export function caricaCarrello() {
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

export function rimuoviDalCarrello(id) {
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];
    
    carrello = carrello.filter(p => p._id !== id);
    
    localStorage.setItem('carrello', JSON.stringify(carrello));
    
    window.location.reload();
}

export function concludiOrdine() {
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

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cliente_id: clienteId,
            ristorante_id: ristoranteId,
            piatti: carrello
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