#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <math.h>

#define INPUT_FILE_TXT 1    // Utilizzo del file di testo come input

#define N_MAZZI     7       // Quantità di mazzi che compongono il sabot (1 - 8)
#define CARTE_MAZZO 52      // Quantità di carte contenute in ogni mazzo del sabot
#define N_SEMI      4       // Quantità dei semi
#define N_VALORI    13      // Quantità di carte per ogni seme

// Semi
#define PICCHE  0
#define FIORI   1
#define CUORI   2
#define QUADRI  3

// Quantità carte (TOT - LOW - MID - HIGH)
#define CARTE_TOT   N_MAZZI * CARTE_MAZZO
#define CARTE_LOW   N_MAZZI * 20                // Numero di carte LOW (2 - 6)
#define CARTE_MID   N_MAZZI * 12                // Numero di carte MID (7 - 9)
#define CARTE_HIGH  N_MAZZI * 20                // Numero di carte HIGH (A - 10 - J - Q - K)

// Carte LOW 2 - 6
#define MIN_LOW 2
#define MAX_LOW 6

// Carte MID 7 - 9
#define MIN_MID 7
#define MAX_MID 9

// Carte HIGH A - 10 - J - Q - K

#define TIMESTAMP 17        // Dimensione del timestamp

// Colori del testo
#define ROSSO   "\033[31m"
#define VERDE   "\033[32m"
#define GIALLO  "\033[33m"
#define BLU     "\033[34m"
#define VIOLA   "\033[35m"
#define RESET   "\033[0m"

// Struttura della carta da gioco
typedef struct {
    int valore;         // Valore della carta
    int seme;           // Seme della carta
} Carta;

void init_mazzo(Carta[]);                                                       // Inizializzazione del sabot con N_MAZZI mischiati con il metodo Fisher-Yates
void print_status(int, float, float);                                           // Stampa del running count, deck rest, true count
void print_carta(Carta);                                                        // Stampa della carta passata
int delta_carta(int);                                                           // Funzione che ritorna il delta inerente alla carta (-1,0,+1)
void read_running_count(Carta, int, float*, float*, float*, float*, FILE*);     // Lettura del running count e controllo correttezza
void read_bet(float, float*, FILE*);                                            // Lettura della bet e controllo correttezza
int calculate_right_bet(float);                                                 // Calcolo della bet consigliata per fare il confronto con quella inserita
void trainer(Carta[]);                                                          // Simulazione del sabot e allenamento del conteggio e del betting
void save_stats(double, float, float, float, float, float, int);                // Salvataggio delle statistiche della sessione di conteggio in file di testo
void stats(void);                                                               // Lettura delle statistiche dal file "stats.txt" e stampa a video