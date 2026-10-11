# Sistemi Operativi (FAD003 - FAD0A0)

Questa cartella raccoglie esercizi, laboratori e progetti svolti durante il corso di **Sistemi Operativi**.


## Contenuto

Ogni sottocartella corrisponde a un esercizio, a un laboratorio o a un progetto relativo agli argomenti trattati durante il corso.


## Tecnologie utilizzate

- Assembly
- C
- Python


## Materiale teorico

Per approfondire gli argomenti teorici del corso viene utilizzato il libro online *Operating Systems: Three Easy Pieces* di Remzi H. Arpaci-Dusseau e Andrea C. Arpaci-Dusseau.

[OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/)

## Repository di supporto

Per lo svolgimento di alcuni esercizi teorici viene utilizzata una repository GitHub separata contenente emulatori dedicati alla simulazione di concetti e meccanismi dei sistemi operativi.
Gli emulatori permettono di svolgere esercizi in modo interattivo e di osservare il comportamento dei meccanismi analizzati durante il corso.

[Remzi Arpaci-Dusseau OS](https://github.com/remzi-arpacidusseau/ostep-homework)

### Virtualizzazione della CPU
- CPU Scheduling ([`cpu-sched`](https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/cpu-sched)):
simula il comportamento dei principali algoritmi di scheduling (FIFO, SJF, RR) per l'analisi delle metriche di performance (turnaround, risposta, attesa).

- Multi-Level Feedback Queue ([`cpu-sched-mlfq`](https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/cpu-sched-mlfq)):
esercizi incentrati sulle code a feedback multi-livello, gestione delle priorità dinamiche e prevenzione della starvation.

### Virtualizzazione della memoria
- Segmentazione ([`vm-segmentation`](https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/vm-segmentation)):
simulazione della traduzione degli indirizzi di memoria, registri base-bound e analisi della frammentazione.

<br>

> 💡 **Nota**: Per lanciare gli emulatori, clonare la repository ufficiale di supporto e avviare i rispettivi script Python passando i parametri desiderati (es. `python3 <nome_script>.py -h` per visualizzare la guida).


## Note

Gli esercizi e i progetti presenti in questa cartella sono stati sviluppati a
scopo didattico per approfondire il funzionamento dei sistemi operativi e la
programmazione a basso livello.