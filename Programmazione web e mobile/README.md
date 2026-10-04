# Programmazione web e mobile (FAD005)

Questa cartella raccoglie esercizi, laboratori e progetti svolti durante il
corso di **Programmazione web e mobile**.


## Contenuto

Ogni sottocartella corrisponde a un esercizio o a un progetto.
- 1ª parte frontend
    - `1-CV/`
    - `2-CV-Bootstrap/`
    - `3-SchedaFilm/`
    - `4-JavaScript/`
- 2ª parte backend
    - `5-Nodejs/`
    - `6-MongoDB/`
- Esempi
    - `Esempi Bootstrap/`
    - `Esempi HTML/`
- Progetto fast food (DomiCibo)
    - `Progetto/`


## Linguaggi e strumenti

- HTML5
- CSS3
- Bootstrap
- JavaScript
- Node.js
- MongoDB


## Esecuzione

Per gli esercizi statici in HTML, CSS e JavaScript è sufficiente aprire il file `index.html` in un browser.

Per i progetti basati su Node.js, dalla cartella dell'esercizio o progetto eseguire:

```bash
> npm install
> nodemon main.js
```


## Progetto DomiCibo

Il progetto consiste nello sviluppo di un'applicazione web per la gestione degli ordini online all'interno di ristoranti appartenenti a una catena di fast food.
L'applicazione gestisce due tipologie di utenti: clienti e ristoratori.
I clienti possono registrarsi, effettuare il login, consultare i ristoranti e i relativi menu, cercare i piatti e effettuare ordini.
I ristoratori possono invece gestire le informazioni del proprio ristorante e i piatti disponibili nel menu.
Il sistema comprende inoltre la gestione del carrello, degli ordini e del loro stato, dalla fase di ordinazione fino alla consegna o al ritiro presso il ristorante.
Il progetto è stato sviluppato utilizzando HTML5, CSS3, Bootstrap e JavaScript per la parte client, mentre il backend è stato realizzato con Node.js e MongoDB.
Le informazioni vengono gestite tramite API REST e le API implementate sono descritte attraverso la documentazione Swagger.


## Note

Gli esercizi e i progetti presenti in questa cartella sono stati sviluppati a scopo didattico per approfondire lo sviluppo di applicazioni web e mobili, con particolare attenzione alla struttura delle pagine, allo stile, alla programmazione lato client e all'interazione con un backend Node.js e MongoDB.