# Programmazione (FAD0AI)

Questa cartella raccoglie gli esercizi, i laboratori e i progetti svolti durante il corso di **Programmazione**.


## Linguaggi e strumenti

| Linguaggio | Compilatore |
|---|---|
| C | gcc |
| Java | javac |


## Contenuto
### C
La cartella `C/` è organizzata per lezioni: ogni sottocartella contiene gli esercizi svolti durante la rispettiva lezione.

### Compilazione ed esecuzione
Dalla cartella della lezione:

```bash
> gcc nome_file.c -o nome_programma

> ./nome_programma
```

---

### Java
La cartella `Java/` è organizzata per esercizi: ogni sottocartella corrisponde a un esercizio e contiene tutte le relative classi Java.

### Compilazione ed esecuzione
Dalla cartella dell'esercizio, compilare tutti i file sorgente:

```bash
> javac Main.java
```

Eseguire la classe `Main`:

```bash
> java Main
```


## Progetto Conteggio nel Blackjack

Il progetto implementa un programma di allenamento per il conteggio nel Blackjack.
Il programma genera uno o più mazzi di carte, fino a un massimo di otto, e li mescola utilizzando l'algoritmo di **Fisher-Yates**, garantendo un ordine casuale delle carte.
Durante l'allenamento, il programma presenta progressivamente le carte e richiede all'utente di inserire il running count corrente e la puntata consigliata.
Ogni risposta viene confrontata con il valore atteso e il programma segnala immediatamente se la risposta è corretta o errata.
Al termine della simulazione vengono mostrate statistiche riepilogative sulle risposte fornite.
I risultati vengono inoltre salvati in un file `stats.txt`, in modo da poter consultare in seguito lo storico degli allenamenti, proprio per questo il programma include una funzione che consente di visualizzare il contenuto del file `stats.txt`, con tutte le statistiche relative agli allenamenti svolti.


## Note

Il codice è stato sviluppato a scopo didattico per il corso.
Può contenere soluzioni semplificate o limitazioni volutamente accettate nell'ambito degli esercizi assegnati.