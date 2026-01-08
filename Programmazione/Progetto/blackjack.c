#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <math.h>

#define N_SEMI 4            // Quantità dei semi
#define N_VALORI 13         // Quantità di carte per ogni seme
#define CARTE_MAZZO 52      // Quantità di carte contenute in ogni mazzo della shoe
#define N_MAZZI 1           // Quantità di mazzi che compongono la shoe

// Semi
#define PICCHE 0
#define FIORI 1
#define CUORI 2
#define QUADRI 3

// Carte LOW 2 - 6
#define MIN_LOW 2
#define MAX_LOW 6

// Carte MID 7 - 9
#define MIN_MID 7
#define MAX_MID 9

// Carte HIGH A - J - Q - K

#define TIMESTAMP 17        // Dimensione del timestamp

typedef struct {
    int valore;
    int seme;
} Carta;

void init_mazzo(Carta[]);                                   // Inizializzazione del mazzo con N_MAZZI mischiati con il metodo Fisher-Yates
void print_carta(Carta);                                    // Stampa della carta passata
int delta_carta(int);                                       // Funzione che ritorna il delta inerente alla carta (-1,0,+1)
void trainer(Carta[]);                                      // Simulazione del mazzo e allenamento del conteggio del running count
void save_stats(double, float, float, float, float, int);   // Salvataggio delle statistiche della sessione di conteggio
void stats();                                               // Lettura delle statistiche dal file stats.txt e stampa a video
int read_risposta(FILE*);                                   // Funzione per leggere i running count da file di testo ("input.txt") (da abilitare)

int main(int argc, char* argv[]) {
    char risposta;

    srand(time(NULL));

    Carta mazzo[N_MAZZI * CARTE_MAZZO];

    do {
        printf("-----------------------------------\n A/a - Allenamento del conteggio\n S/s - Statistiche\n X/x - Esci\n-----------------------------------\n>");
        scanf(" %c", &risposta);

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
                printf("\nOperazione non disponibile!\n");
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
    for (i = (N_MAZZI * CARTE_MAZZO) - 1; i > 0; i--) {
        j = rand() % (i + 1);

        Carta aux = mazzo[i];
        mazzo[i] = mazzo[j];
        mazzo[j] = aux;
    }
}

void print_carta(Carta carta) {
    if (carta.valore == 1 || (carta.valore >= 11 && carta.valore <= 13)) {
        switch (carta.valore) {
            case 1:
                printf("%c ", 'A');
                break;

            case 11:
                printf("%c ", 'J');
                break;

            case 12:
                printf("%c ", 'Q');
                break;

            case 13:
                printf("%c ", 'K');
                break;
        }
    }
    else {
        printf("%d ", carta.valore);
    }

    switch (carta.seme) {
        case PICCHE:
            printf("%s\n", "Picche");
            break;

        case FIORI:
            printf("%s\n", "Fiori");
            break;

        case CUORI:
            printf("%s\n", "Cuori");
            break;

        case QUADRI:
            printf("%s\n", "Quadri");
            break;
    }
}

int delta_carta(int valore) {
    return (valore >= MIN_LOW && valore <= MAX_LOW ? 1 : valore >= MIN_MID && valore <= MAX_MID ? 0 : -1);
}

void trainer(Carta mazzo[]) {
    int running_count = 0, carte_uscite = 0, risposta;
    float decks_rest = (float) N_MAZZI, true_count = running_count / decks_rest;
    float accuracy_tot = 0.0f, accuracy_low = 0.0f, accuracy_mid = 0.0f, accuracy_high = 0.0f;
    double tempo, tempo_sec;
    int tempo_min;
    struct timespec start, end;

    // ↓ Decommetare se si vogliono leggere i running count da file di testo
    //FILE* in = fopen("input.txt", "r");

    clock_gettime(CLOCK_MONOTONIC, &start);

    while (carte_uscite < N_MAZZI * CARTE_MAZZO) {
        printf("\n\nRunning count: %d\tDecks rest: %.3f\tTrue count: %.3f", running_count, decks_rest, true_count);
        printf("\n\nCarta uscita: ");

        print_carta(mazzo[carte_uscite]);

        running_count += delta_carta(mazzo[carte_uscite].valore);

        decks_rest -= 1.0 / CARTE_MAZZO;

        true_count = running_count / decks_rest;

        printf("\nInserisci il running count corrente: ");
        scanf("%d", &risposta);
        //risposta = 0;

        // ↓ Decommentare se si vogliono leggere i running count da file di testo e commentare la scanf ↑
        //risposta = read_risposta(in);

        if (risposta == running_count) {
            printf("\n-------------------------\nRunning count corretto\n-------------------------\n");

            accuracy_tot++;

            mazzo[carte_uscite].valore >= MIN_LOW && mazzo[carte_uscite].valore <= MAX_LOW ? accuracy_low++ : mazzo[carte_uscite].valore >= MIN_MID && mazzo[carte_uscite].valore <= MAX_MID ? accuracy_mid++ : accuracy_high++;
        }
        else {
            printf("\n-------------------------\nRunning count sbagliato\n-------------------------\n");
        }

        carte_uscite++;
    }

    clock_gettime(CLOCK_MONOTONIC, &end);

    tempo = (end.tv_sec - start.tv_sec) + ((end.tv_nsec - start.tv_nsec) / 1e9);

    tempo_min = tempo / 60;
    tempo_sec = fmod(tempo, 60);

    // ↓ Decommetare se si vogliono leggere i running count da file di testo
    //fclose(in);

    accuracy_tot /= (N_MAZZI * CARTE_MAZZO);
    accuracy_tot *= 100;

    accuracy_low /= 20;
    accuracy_low *= 100;

    accuracy_mid /= 12;
    accuracy_mid *= 100;

    accuracy_high /= 20;
    accuracy_high *= 100;

    save_stats(tempo, accuracy_tot, accuracy_low, accuracy_mid, accuracy_high, N_MAZZI*CARTE_MAZZO);

    printf("\n\n\nSTATISTICHE\nTempo:\t\t\t%02d:%05.2f\nOverall accuracy:\t%.2f %%\nLow accuracy:\t\t%.2f %%\nMid accuracy:\t\t%.2f %%\nHigh accuracy:\t\t%.2f %%\n\n\n", tempo_min, tempo_sec, accuracy_tot, accuracy_low, accuracy_mid, accuracy_high);
}

void save_stats(double tempo, float acc_total, float acc_low, float acc_mid, float acc_high, int drills) {
    FILE* in = fopen("stats.txt", "a");
    if (in == NULL) {
        perror("stats.txt");
        printf("\n");
        return;
    }

    char data[TIMESTAMP];
    time_t now = time(NULL);
    strftime(data, sizeof(data), "%Y-%m-%d %H:%M", localtime(&now));

    fprintf(in, "%s,%.2f,%.1f,%d,%.1f,%.1f,%.1f\n", data, tempo, acc_total, drills, acc_low, acc_mid, acc_high);

    fclose(in);
}

void stats() {
    FILE* in = fopen("stats.txt", "r");
    if (in == NULL) {
        perror("\nstats.txt");
        printf("\n");
        return;
    }

    char data[TIMESTAMP];
    double tempo_sec;
    int tempo_min;
    float acc_tot, acc_low, acc_mid, acc_high;
    float s_acc_tot = 0.0f, s_acc_low = 0.0f, s_acc_mid = 0.0f, s_acc_high = 0.0f;
    int drills, cont = 0;

    printf("\nData\t\t\tTempo\t\tOverall accuracy %%\tDrills\t\tLow %%\tMid %%\tHigh %%\n");
    printf("---------------------------------------------------------------------------------------------------------\n");

    while (fscanf(in, "%16[^,],%lf,%f,%d,%f,%f,%f\n", data, &tempo_sec, &acc_tot, &drills, &acc_low, &acc_mid, &acc_high) == 7) {
        tempo_min = tempo_sec / 60;
        tempo_sec = fmod(tempo_sec, 60);

        s_acc_tot += acc_tot;
        s_acc_low += acc_low;
        s_acc_mid += acc_mid;
        s_acc_high += acc_high;

        cont++;

        printf("%s\t%02d:%05.2f\t%3.1f\t\t\t%d\t\t%3.1f\t%3.1f\t%3.1f\n", data, tempo_min, tempo_sec, acc_tot, drills, acc_low, acc_mid, acc_high);
    }

    fclose(in);

    s_acc_tot /= cont;
    s_acc_low /= cont;
    s_acc_mid /= cont;
    s_acc_high /= cont;

    printf("\n\nAccuracy media\nOverall:\t%3.1f\nLow:\t\t%3.1f\nMid:\t\t%3.1f\nHigh:\t\t%3.1f\n\n", s_acc_tot, s_acc_low, s_acc_mid, s_acc_high);
}

int read_risposta(FILE* in) {
    int lettura;

    fscanf(in, "%d\n", &lettura);

    return lettura;
}