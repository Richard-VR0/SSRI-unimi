const base_poster = "https://www.themoviedb.org/t/p/w220_and_h330_face";
const api_key = "3bbea602f73996d48033d9c569bb8b1f";
const base_uri = "https://api.themoviedb.org/3";


function aggiornaTasti() {
    pcentrale.innerHTML = contatore;

    tsuccessiva = document.getElementById('tsuccessiva');
    tcentrale = document.getElementById('tcentrale');
    tprecedente = document.getElementById('tprecedente');

    if (contatore == 1) {
        tsuccessiva.classList.remove('active');
        tcentrale.classList.remove('active');
        tprecedente.classList.add('active');
        
        pcentrale.innerHTML = contatore + 1;
        psuccessiva.innerHTML = contatore + 2;
    }
    else {
        if (contatore > 499 ) {
            tcentrale.classList.remove('active');
            tsuccessiva.classList.add('active');
            
            pcentrale.innerHTML = contatore -1;
            pprecedente.innerHTML = contatore -2;
            psuccessiva.innerHTML = contatore;
        }else{
            tsuccessiva.classList.remove('active');
            tcentrale.classList.add('active');
            tprecedente.classList.remove('active');
            
            pprecedente.innerHTML = contatore - 1;
            psuccessiva.innerHTML = contatore + 1;
        }
    }
}

function prossimaPagina() {
    if (contatore < 500) {
        contatore = contatore + 1;
    }

    aggiornaTasti();

    ricerca();
}

function precedentePagina() {
    if (contatore > 1) {
        contatore = contatore - 1;
    }

    aggiornaTasti();

    ricerca();
}

function caricaLingue(lang) {
    var url_lang = "https://api.themoviedb.org/3/configuration/languages?api_key=3bbea602f73996d48033d9c569bb8b1f";

    fetch(url_lang).then(response => response.json()).then(languages => {
        var selettore_lingua = document.getElementById('lang');

        for(let i = 0; i < languages.length; i++) {
            var lingua = document.createElement("option");

            lingua.value = languages[i].iso_639_1;
            lingua.text = languages[i].english_name;

            if (lingua.value === lang) {
                lingua.selected = true;
            }

            selettore_lingua.add(lingua);
        }
    });
}

function cambiaLang(soggetto) {
    lang = document.getElementById('lang').value;

    var url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    history.replaceState({}, "", url);

    if (soggetto === "film") {
        caricaDettagliFilm();
    }
    else {
        caricaDettagliAttore();
    }
}

function pulisciDiv(modello) {
    var container = document.getElementById('container-' + modello);

    var struttura_modello = document.getElementById(modello);
    
    container.innerHTML = "";
    container.append(struttura_modello);
}

function ricerca() {
    var query = document.getElementById('ricerca').value;

    if (query == "") {
        mostraPopolari();
    }
    else {
        lang = document.getElementById('lang').value;

        var page = contatore
        var adulti = document.getElementById('adulti').value;

        var uri_ricerca = "https://api.themoviedb.org/3/search/movie?&api_key=3bbea602f73996d48033d9c569bb8b1f&query=" + query + "&language=" + lang + "&page=" + page + "&include_adult=" + adulti;

        uri_fetch(uri_ricerca, lang);
    }
}

function mostraPopolari() {
    var lang = 'en';

    var page = contatore;

    if (document.getElementById('lang').value != "") {
        lang = document.getElementById('lang').value;
    }

    var uri_popolari = "https://api.themoviedb.org/3/movie/popular?&api_key=3bbea602f73996d48033d9c569bb8b1f&language=" + lang + "&page=" + page;

    uri_fetch(uri_popolari, lang);
}

function uri_fetch(uri, lang) {
    pulisciDiv("popolare");

    fetch(uri).then(response => response.json()).then(lista => {
        
        for(let i = 0; i < lista.results.length; i++) {
            var film = lista.results[i];
            
            var modello = document.getElementById('popolare');
            
            var clone = modello.cloneNode(true);

            // Locandina card
            if (film.poster_path == null) {
                clone.getElementsByTagName('img')[0].src = "no_poster.png";
            }
            else {
                clone.getElementsByTagName('img')[0].src += film.poster_path;
            }
            
            clone.getElementsByTagName('h5')[0].innerHTML = film.title;                         // Titolo film
            clone.getElementsByTagName('small')[0].innerHTML = film.release_date;               // Data di rilascio
            clone.getElementsByTagName('a')[0].href += "?id=" + film.id + "&lang=" + lang;      // Link locandina
            clone.getElementsByTagName('a')[1].href += "?id=" + film.id + "&lang=" + lang;      // Link titolo film

            clone.classList.remove("d-none");

            clone.id += i;

            modello.before(clone);
        }
    });
}

function caricaDettagliFilm() {
    pulisciDiv("genere");
    pulisciDiv("attore");

    var uri_film = "https://api.themoviedb.org/3/movie/" + id + "?api_key=3bbea602f73996d48033d9c569bb8b1f&language=" + lang;

    document.getElementById('lang').value = lang;

    fetch(uri_film).then(response => response.json()).then(film => {
        // Titolo scheda
        document.getElementById('tab-title').innerHTML = film.title;

        // Immagini di background e locandina
        if (film.poster_path == null) {
            document.getElementById('back').src = "no_poster.png";
            document.getElementById('poster').src = "no_poster.png";
        }
        else {
            document.getElementById('back').src = "https://media.themoviedb.org/t/p/w220_and_h330_face" + film.poster_path;
            document.getElementById('poster').src = "https://media.themoviedb.org/t/p/w220_and_h330_face" + film.poster_path;
        }

        // Titolo
        document.getElementById('titolo').innerHTML = film.title;
        
        // Data di rilascio
        document.getElementById('data-di-rilascio').innerHTML = film.release_date + " ●";

        // Generi
        for(let i = 0; i < film.genres.length; i++) {
            var genere = document.getElementById('genere');

            let clone = genere.cloneNode(true);

            clone.innerHTML = film.genres[i].name;

            if (i != (film.genres.length - 1)) {
                clone.innerHTML += ",";
            }

            clone.classList.remove('d-none');

            clone.id += "-" + i;

            genere.before(clone);
        }

        // Tagline
        document.getElementById('tagline').innerHTML = film.tagline;

        // Votazioni utenti
        var vote_average = Math.floor(film.vote_average * 100) / 100;

        document.getElementById('vote_average').innerHTML = vote_average;

        vote_average *= 10;

        document.getElementById('vote_average').style.width = vote_average + '%';
        document.getElementById('vote-bar').setAttribute('aria-valuenow', vote_average);

        // Descrizione
        document.getElementById('descrizione').innerHTML = film.overview;

        // Titolo originale
        document.getElementById('titolo-originale').innerHTML = film.original_title;
        // Lingua originale
        document.getElementById('lingua-originale').innerHTML = film.original_language;
        // Budget
        document.getElementById('budget').innerHTML = "$" + film.budget + ".00";
        // Incasso
        document.getElementById('revenue').innerHTML = "$" + film.revenue + ".00";
    });

    var uri_attori = "https://api.themoviedb.org/3/movie/"+ id +"/credits?api_key=3bbea602f73996d48033d9c569bb8b1f&language=" + lang;

    fetch(uri_attori).then(response => response.json()).then(attori => {
        for(let i = 0; i < attori.cast.length; i++) {
            var attore = document.getElementById('attore');
            
            let clone = attore.cloneNode(true);

            // Nome attore
            clone.getElementsByTagName('p')[0].innerHTML = attori.cast[i].name;
            
            // Immagine attore
            if (attori.cast[i].profile_path == null) {
                clone.getElementsByTagName('img')[0].src = "unknown.png";
            }
            else {
                clone.getElementsByTagName('img')[0].src += attori.cast[i].profile_path;
                clone.getElementsByTagName('img')[0].alt = attori.cast[i].name;
            }
            
            clone.getElementsByTagName('a')[0].href += "?id=" + attori.cast[i].id + "&lang=" + lang;    // Link foto attore
            clone.getElementsByTagName('a')[1].href += "?id=" + attori.cast[i].id + "&lang=" + lang;    // Link nome attore

            clone.classList.remove('d-none');

            clone.id += "-" + i;

            attore.before(clone);
        }
    });
}

function caricaDettagliAttore() {
    pulisciDiv("film");

    var uri_attore = "https://api.themoviedb.org/3/person/" + id + "?api_key=3bbea602f73996d48033d9c569bb8b1f&language=" + lang;

    document.getElementById('lang').value = lang;

    fetch(uri_attore).then(response => response.json()).then(attore => {
        // Nome attore
        document.getElementById('nome').innerHTML = attore.name;

        // Foto attore
        if (attore.profile_path == null) {
            document.getElementById('poster').src = "unknown.png";
        }
        else {
            document.getElementById('poster').src += attore.profile_path;
        }

        // Data di nascita
        document.getElementById('data-di-nascita').innerHTML = attore.birthday;
        
        // Data di morte
        if(attore.deathday != null) {
            document.getElementById('data-di-morte').innerHTML = " - " + attore.deathday;
        }

        // Luogo di nascita
        document.getElementById('luogo-di-nascita').innerHTML = attore.place_of_birth;

        // Biografia
        document.getElementById('biografia').innerHTML = attore.biography;
        
        // Popolarità
        document.getElementById('popolarita').innerHTML = attore.popularity;
    });

    var uri_film = "https://api.themoviedb.org/3/person/" + id + "/movie_credits?api_key=3bbea602f73996d48033d9c569bb8b1f&language=" + lang;

    fetch(uri_film).then(response => response.json()).then(films => {
        for(let i = 0; i < films.cast.length; i++) {
            var film = document.getElementById('film');
            
            let clone = film.cloneNode(true);

            // Titolo film
            clone.getElementsByTagName('p')[0].innerHTML = films.cast[i].title;

            // Locandina film
            if (films.cast[i].poster_path == null) {
                clone.getElementsByTagName('img')[0].src = "no_poster.png";
            }
            else {
                clone.getElementsByTagName('img')[0].src += films.cast[i].poster_path;
            }
            
            clone.getElementsByTagName('a')[0].href += "?id=" + films.cast[i].id + "&lang=" + lang;     // Link locandina film
            clone.getElementsByTagName('a')[1].href += "?id=" + films.cast[i].id + "&lang=" + lang;     // Link titolo film

            clone.classList.remove('d-none');

            clone.id += "-" + i;

            film.before(clone);
        }
    });
}