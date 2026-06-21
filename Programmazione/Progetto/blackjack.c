#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <math.h>

#define INPUT_FILE_TXT 1    // Utilizzo del file di testo come input

#define N_MAZZI 1           // Quantità di mazzi che compongono il sabot (1 - 8)
#define CARTE_MAZZO 52      // Quantità di carte contenute in ogni mazzo del sabot
#define N_SEMI 4            // Quantità dei semi
#define N_VALORI 13         // Quantità di carte per ogni seme

// Semi
#define PICCHE 0
#define FIORI 1
#define CUORI 2
#define QUADRI 3

// Quantità carte (TOT - LOW - MID - HIGH)
#define CARTE_TOT N_MAZZI*CARTE_MAZZO
#define CARTE_LOW 20*N_MAZZI                        // Numero di carte LOW (2 - 6)
#define CARTE_MID 12*N_MAZZI                        // Numero di carte MID (7 - 9)
#define CARTE_HIGH 20*N_MAZZI                       // Numero di carte HIGH (A - 10 - J - Q - K)

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

typedef struct {
    int valore;
    int seme;
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

int main(void) {
    char risposta;

    srand(time(NULL));

    Carta mazzo[CARTE_TOT];

    // Menù
    do {
        printf("+-----------------------------------+\n|              MENU                 |\n|                                   |\n|  A/a - Allenamento del conteggio  |\n|  S/s - Statistiche                |\n|  X/x - Esci                       |\n|                                   |\n+-----------------------------------+\n>");
        scanf(" %c", &risposta);
        while (getchar() != '\n');

        switch (risposta) {
            case 'A':
            case 'a':
                init_mazzo(mazzo);
                trainer(mazzo);
                break;

            case 'S':
            case 's':
                stats();
                break;

            case 'X':
            case 'x':
                break;

            default:
                printf(ROSSO "\nOperazione non disponibile!\n\n" RESET);
        }
    } while(risposta != 'x' && risposta != 'X');

    return 0;
}

void init_mazzo(Carta mazzo[]) {
    int m, s, v, indice = 0, i, j;

    // Caricamento del mazzo in ordine crescente (P → F → C → Q)
    for (m = 0; m < N_MAZZI; m++) {
        for (s = 0; s < N_SEMI; s++) {
            for (v = 1; v <= N_VALORI; v++) {
                mazzo[indice].valore = v;
                mazzo[indice].seme = s;

                indice++;
            }
        }
    }

    // Metodo Fisher-Yates
    for (i = (CARTE_TOT) - 1; i > 0; i--) {
        j = rand() % (i + 1);

        Carta aux = mazzo[i];
        mazzo[i] = mazzo[j];
        mazzo[j] = aux;
    }
}

void print_status(int rc, float dr, float tc) {
    printf("\n----------------------------------------------------------------------\nRunning count: %d\tDeck rest: %.2f\t\tTrue count: %.2f\n----------------------------------------------------------------------", rc, dr, tc);
}

void print_carta(Carta carta) {
    printf("\n\nCarta uscita: ");

    // Stampa del valore (2 - 10 - A - J - Q - K)
    if (carta.valore == 1 || (carta.valore >= 11 && carta.valore <= 13)) {
        switch (carta.valore) {
            case 1:
                printf(GIALLO "%c ", 'A');
                break;

            case 11:
                printf(GIALLO "%c " , 'J');
                break;

            case 12:
                printf(GIALLO "%c ", 'Q');
                break;

            case 13:
                printf(GIALLO "%c ", 'K');
                break;
        }
    }
    else {
        printf(GIALLO "%d ", carta.valore);
    }

    // Stampa del seme (♠ - ♣ - ♦ - ♥)
    switch (carta.seme) {
        case PICCHE:
            printf("%s\n" RESET, "Picche");
            break;

        case FIORI:
            printf("%s\n" RESET, "Fiori");
            break;

        case CUORI:
            printf("%s\n" RESET, "Cuori");
            break;

        case QUADRI:
            printf("%s\n" RESET, "Quadri");
            break;
    }
}

int delta_carta(int valore) {
    return (valore >= MIN_LOW && valore <= MAX_LOW ? 1 : valore >= MIN_MID && valore <= MAX_MID ? 0 : -1);
}

void read_running_count(Carta carta, int running_count, float* accuracy_tot, float* accuracy_low, float* accuracy_mid, float* accuracy_high, FILE* in) {
    int risposta_rc;

    #if defined(INPUT_FILE_TXT) && INPUT_FILE_TXT == 1
        fscanf(in, "%d\n", &risposta_rc);
        printf("\n");
    #else
        printf("\nInserisci il running count corrente: ");
        scanf("%d", &risposta_rc);
    #endif

    if (risposta_rc == running_count) {
        printf(VERDE "\nRunning count corretto!\n" RESET);

        (*accuracy_tot)++;

        (carta.valore >= MIN_LOW && carta.valore <= MAX_LOW) ? (*accuracy_low)++ : (carta.valore >= MIN_MID && carta.valore <= MAX_MID) ? (*accuracy_mid)++ : (*accuracy_high)++;
    }
    else {
        printf(ROSSO "\nRunning count sbagliato! -> Corretto: %d\n" RESET, running_count);
    }
}

void read_bet(float true_count, float* accuracy_bet, FILE* in) {
    int risposta_bet;

    #if defined(INPUT_FILE_TXT) && INPUT_FILE_TXT == 1
        fscanf(in, "%d\n", &risposta_bet);
        printf("\n");
    #else
        do {
            printf("\nInserisci la bet (1/2/4/8): ");
            scanf("%d", &risposta_bet);
        } while (risposta_bet != 1 && risposta_bet != 2 && risposta_bet != 4 && risposta_bet != 8);
    #endif

    if (risposta_bet == calculate_right_bet(true_count)) {
        printf(VERDE "\nBet corretta\n" RESET);

        (*accuracy_bet)++;
    }
    else {
        printf(ROSSO "\nBet inserita sfavorevole -> Bet consigliata: %dx\n" RESET, calculate_right_bet(true_count));
    }
}

int calculate_right_bet(float true_count) {
    return (true_count <= 0.0f) ? 1 : ((true_count <= 1.0f) ? 2 : ((true_count <= 2.0f) ? 4 : 8));
}

void trainer(Carta mazzo[]) {
    int running_count = 0, carte_uscite = 0;
    float deck_rest = (float) N_MAZZI, true_count = running_count / deck_rest;
    float accuracy_tot = 0.0f, accuracy_low = 0.0f, accuracy_mid = 0.0f, accuracy_high = 0.0f, accuracy_bet = 0.0f;
    double tempo, tempo_sec;
    int tempo_min;
    struct timespec start, end;

    clock_gettime(CLOCK_MONOTONIC, &start);         // Salvataggio del tempo iniziale

    FILE* in;

    #if defined(INPUT_FILE_TXT) && INPUT_FILE_TXT == 1
        char filename[15];

        sprintf(filename, "input%d.txt", N_MAZZI);

        in= fopen(filename, "r");

        if (in == NULL) {
            perror(filename);
            return;
        }
    #else
        in = NULL;
    #endif

    while (carte_uscite < CARTE_TOT) {
        print_status(running_count, deck_rest, true_count);

        print_carta(mazzo[carte_uscite]);

        running_count += delta_carta(mazzo[carte_uscite].valore);       // Aggiornamento del running count con il delta relativo alla carta uscita

        deck_rest -= 1.0 / CARTE_MAZZO;                                 // Aggiornamento del deck rest

        true_count = running_count / deck_rest;                         // Aggiornamento del true count tenendo conto del running count e del deck rest

        read_running_count(mazzo[carte_uscite], running_count, &accuracy_tot, &accuracy_low, &accuracy_mid, &accuracy_high, in);

        read_bet(true_count, &accuracy_bet, in);

        carte_uscite++;
    }

    #if defined(INPUT_FILE_TXT) && INPUT_FILE_TXT == 1
        if (in != NULL) {
            fclose(in);
        }
    #endif

    clock_gettime(CLOCK_MONOTONIC, &end);           // Salvataggio del tempo finale

    tempo = (end.tv_sec - start.tv_sec) + ((end.tv_nsec - start.tv_nsec) / 1e9);        // Calcolo dei secondi passati tra inizio e fine della sessione di allenamento

    tempo_min = tempo / 60;
    tempo_sec = fmod(tempo, 60);

    // Calcolo delle percentuali di accuracy
    accuracy_tot /= CARTE_TOT; accuracy_tot *= 100;

    accuracy_low /= CARTE_LOW; accuracy_low *= 100;

    accuracy_mid /= CARTE_MID; accuracy_mid *= 100;

    accuracy_high /= CARTE_HIGH; accuracy_high *= 100;

    accuracy_bet /= CARTE_TOT; accuracy_bet *= 100;

    printf("\n\n\nSTATISTICHE ALLENAMENTO\nTempo:\t\t\t%02d:%05.2f\nOverall accuracy:\t%.2f %%\nLow accuracy:\t\t%.2f %%\nMid accuracy:\t\t%.2f %%\nHigh accuracy:\t\t%.2f %%\nAccuracy bet:\t\t%.2f %%\n\n\n", tempo_min, tempo_sec, accuracy_tot, accuracy_low, accuracy_mid, accuracy_high, accuracy_bet);

    save_stats(tempo, accuracy_tot, accuracy_low, accuracy_mid, accuracy_high, accuracy_bet, CARTE_TOT);
}

void save_stats(double tempo, float acc_total, float acc_low, float acc_mid, float acc_high, float acc_bet, int drills) {
    FILE* in = fopen("stats.txt", "a");
    if (in == NULL) {
        perror("stats.txt");
        printf("\n");
        return;
    }

    char data[TIMESTAMP];
    time_t now = time(NULL);
    strftime(data, sizeof(data), "%Y-%m-%d %H:%M", localtime(&now));

    fprintf(in, "%s,%.2f,%.1f,%d,%.1f,%.1f,%.1f,%.1f\n", data, tempo, acc_total, drills, acc_low, acc_mid, acc_high, acc_bet);

    fclose(in);
}

void stats(void) {
    char data[TIMESTAMP];
    double tempo_sec;
    int tempo_min;
    float acc_tot, acc_low, acc_mid, acc_high, acc_bet;
    float s_acc_tot = 0.0f, s_acc_low = 0.0f, s_acc_mid = 0.0f, s_acc_high = 0.0f, s_acc_bet = 0.0f;
    int drills, cont = 0;

    FILE* in = fopen("stats.txt", "r");

    if (in != NULL) {
        while (fscanf(in, "%16[^,],%lf,%f,%d,%f,%f,%f,%f\n", data, &tempo_sec, &acc_tot, &drills, &acc_low, &acc_mid, &acc_high, &acc_bet) == 8) {
            if (cont == 0) {
                printf("\nData\t\t\tTempo\t\tOverall accuracy %%\tDrills\tLow %%\tMid %%\tHigh %%\t\tBet %%\n");
                printf("-------------------------------------------------------------------------------------------------------------------\n");
            }
            
            tempo_min = tempo_sec / 60;
            tempo_sec = fmod(tempo_sec, 60);

            s_acc_tot += acc_tot;
            s_acc_low += acc_low;
            s_acc_mid += acc_mid;
            s_acc_high += acc_high;

            s_acc_bet += acc_bet;

            cont++;

            printf("%s\t%02d:%05.2f\t", data, tempo_min, tempo_sec);
            printf(BLU "%3.1f\t\t\t" RESET, acc_tot);
            printf(VIOLA "%d\t" RESET, drills);
            printf("%3.1f\t%3.1f\t%3.1f\t\t", acc_low, acc_mid, acc_high);
            printf(VERDE "%3.1f\n" RESET, acc_bet);
        }

        fclose(in);
    }

    if (cont == 0) {
        printf(ROSSO "\nNessuna statistica presente\n\n" RESET);
        return;
    }

    s_acc_tot /= cont;
    s_acc_low /= cont;
    s_acc_mid /= cont;
    s_acc_high /= cont;

    s_acc_bet /= cont;

    printf("\n\nAccuracy media\nOverall:\t%3.1f %%\nLow:\t\t%3.1f %%\nMid:\t\t%3.1f %%\nHigh:\t\t%3.1f %%\n\nAccuracy bet:\t%3.1f %%\n\n", s_acc_tot, s_acc_low, s_acc_mid, s_acc_high, s_acc_bet);
}