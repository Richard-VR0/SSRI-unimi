// -----------------------------------------------------------------------------------------------
//                                      FUNZIONI DI SUPPORTO
// -----------------------------------------------------------------------------------------------

// FUNZIONE PER IL CONTROLLO VALIDITÀ DEI DATI INSERITI
function convalida_dati(user, passwordObbligatoria = true) {
    if (!user.nome || user.nome.length < 2) {
        return 'Nome troppo corto';
    }
    if (!user.cognome || user.cognome.length < 2) {
        return 'Cognome troppo corto';
    }

    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
    if (!user.email || !emailRegex.test(user.email)) {
        return 'Email non valida';
    }
    
    if (passwordObbligatoria) {
        if (typeof user.password !== 'string' || user.password.length < 8) {
            return 'Password troppo corta';
        }
    }
    else {
        if (user.password !== undefined && user.password !== null && user.password !== '' && (typeof user.password !== 'string' || user.password.length < 8)) {
            return 'Password troppo corta';
        }
    }

    if (user.tipologia == "cliente") {
        if (!user.pagamento.numerocarta || user.pagamento.numerocarta.length != 16) {
            return 'Numero di carta non valido';
        }

        const scadenzaRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
        if (!user.pagamento.scadenza || !scadenzaRegex.test(user.pagamento.scadenza)) {
            return 'Data di scadenza non valida';
        }

        if (!user.pagamento.cvv || user.pagamento.cvv.length != 3) {
            return 'CVV non valido';
        }
    }
    else {
        if (user.tipologia == "ristorante") {
            const nomeristoranteLength = 30;
            const descrizioneristoranteLength = 200;
            const pivaLength = 11;
            const urlLength = 200;
            const telefonoLength = 18;
            const viaLength = 50;
            const civicoLength = 8;
            const cittaLength = 30;
            const latLength = 5;
            const lngLength = 5;


            if (!user.ristorante.nome || user.ristorante.nome.length < 3) {
                return 'Nome del ristorante troppo corto';
            }
            if (user.ristorante.nome.length > nomeristoranteLength) {
                return 'Nome del ristorante troppo lungo';
            }

            if (user.ristorante.descrizione.length > descrizioneristoranteLength) {
                return 'Descrizione del ristorante troppo lunga';
            }

            const pivaRegex = /^\d{11}$/;
            if (!user.ristorante.piva || !pivaRegex.test(user.ristorante.piva)) {
                return 'Formato partita iva non valido';
            }
            if (user.ristorante.piva.length > pivaLength) {
                return 'Partita iva troppo lunga';
            }

            if (user.ristorante.url_foto) {
                if (user.ristorante.url_foto.length > urlLength) {
                    return 'URL della foto troppo lungo';
                }

                try {
                    const urlFoto = new URL(user.ristorante.url_foto);

                    if (urlFoto.protocol !== 'http:' && urlFoto.protocol !== 'https:') {
                        return 'Protocollo URL non valido';
                    }
                } catch {
                    return 'URL della foto non valido';
                }
            }

            const telefonoRegex = /^\+?\d{8,15}$/;
            if (!user.ristorante.telefono || !telefonoRegex.test(user.ristorante.telefono)) {
                return 'Formato telefono non valido';
            }
            if (user.ristorante.telefono.length > telefonoLength) {
                return 'Numero di telefono troppo lungo';
            }

            const viaRegex = /^[A-Za-zÀ-ÿ0-9\s.,'\-]{1,50}$/;
            if (!user.ristorante.indirizzo.via || !viaRegex.test(user.ristorante.indirizzo.via)) {
                return 'Via non valida';
            }
            if (user.ristorante.indirizzo.via.length > viaLength) {
                return 'Nome via troppo lungo';
            }

            const civicoRegex = /^[0-9A-Za-z\/\s]{1,8}$/;
            if (!user.ristorante.indirizzo.civico || !civicoRegex.test(user.ristorante.indirizzo.civico)) {
                return 'Civico non valida';
            }
            if (user.ristorante.indirizzo.civico.length > civicoLength) {
                return 'Civico troppo lungo';
            }

            const cittaRegex = /^[A-Za-zÀ-ÿ\s']{1,30}$/;
            if (!user.ristorante.indirizzo.citta || !cittaRegex.test(user.ristorante.indirizzo.citta)) {
                return 'Città non valida';
            }
            if (user.ristorante.indirizzo.citta.length > cittaLength) {
                return 'Nome città troppo lungo';
            }

            if (typeof user.ristorante.coordinate.lat !== 'number' || isNaN(user.ristorante.coordinate.lat) || user.ristorante.coordinate.lat < -90 || user.ristorante.coordinate.lat > 90) {
                return "Latitudine non valida";
            }

            if (typeof user.ristorante.coordinate.lng !== 'number' || isNaN(user.ristorante.coordinate.lng) || user.ristorante.coordinate.lng < -180 || user.ristorante.coordinate.lng > 180) {
                return "Longitudine non valida";
            }
        }
    }

    return null;
}

module.exports = convalida_dati;