#include <stdio.h>
#include <time.h>
#include <stdlib.h>

#define N_SEMI 4            // Quantità dei semi
#define N_VALORI 13         // Quantità di carte per ogni seme
#define CARTE_MAZZO 52      // Quantità di carte contenute in ogni mazzo della shoe
#define N_MAZZI 1           // Quantità di mazzi che compongono la shoe

// Carte LOW 2 - 6
#define MIN_LOW 2
#define MAX_LOW 6

// Carte MID 7 - 9
#define MIN_MID 7
#define MAX_MID 9

typedef struct {
    int valore;
    int seme;
} Carta;

void init_mazzo(Carta[]);                               // Inizializzazione del mazzo con N_MAZZI mischiati con metodo Fisher-Yates
void trainer(Carta[]);                                  // Simulazione del mazzo e allenamento del conteggio
void save_stats(float, float, float, float, int);       // Salvataggio delle statistiche della sessione di conteggio
void stats();                                           // Lettura delle statistiche dal file stats.txt e stampa a video
int read_risposta(FILE*);                               // Funzione per leggere i true count da file di testo ("input.txt")

int main(int argc, char* argv[]) {
    char risposta;

    srand(time(NULL));

    do {
        printf("-----------------------------------\n A/a - Allenamento del conteggio\n S/s - Statistiche\n X/x - Esci\n-----------------------------------\n>");
        scanf(" %c", &risposta);

        switch (risposta) {
            case 'A':
            case 'a':
                Carta mazzo[N_MAZZI * CARTE_MAZZO];

                init_mazzo(mazzo);

                trainer(mazzo);

                break;

            case 'S':
            case 's':
                stats();
                break;

            default:
                printf("\nOperazione non disponibile!\n");
        }
    } while(risposta != 'x' && risposta != 'X');

    return 0;
}

void init_mazzo(Carta mazzo[]) {
    int m, s, v, indice = 0, i, j;

    for (m = 0; m < N_MAZZI; m++) {
        for (s = 0; s < N_SEMI; s++) {
            for (v = 1; v <= N_VALORI; v++) {
                mazzo[indice].valore = v;
                mazzo[indice].seme = s;

                indice++;
            }
        }
    }

    for (i = (N_MAZZI * CARTE_MAZZO) - 1; i > 0; i--) {
        j = rand() % (i + 1);

        Carta aux = mazzo[i];
        mazzo[i] = mazzo[j];
        mazzo[j] = aux;
    }
}

void trainer(Carta mazzo[]) {
    int running_count = 0, delta, carte_uscite = 0;
    int risposta;
    float decks_rest = (float) N_MAZZI;
    float accuracy_tot = 0.0f, accuracy_low = 0.0f, accuracy_mid = 0.0f, accuracy_high = 0.0f;

    // ↓ Decommetare se si vogliono leggere i true count da file di testo
    //FILE* in = fopen("input.txt", "r");

    while (carte_uscite < N_MAZZI * CARTE_MAZZO) {
        printf("\n\nRunning count: %d\tDecks rest: %.3f\tTrue count: %.3f", running_count, decks_rest, running_count / decks_rest);
        printf("\n\nCarta uscita: ");

        if (mazzo[carte_uscite].valore == 1 || (mazzo[carte_uscite].valore >= 11 && mazzo[carte_uscite].valore <= 13)) {
            switch (mazzo[carte_uscite].valore) {
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
            printf("%d ", mazzo[carte_uscite].valore);
        }

        switch (mazzo[carte_uscite].seme) {
            case 0:
                printf("%s\n", "Picche");
                break;

            case 1:
                printf("%s\n", "Fiori");
                break;

            case 2:
                printf("%s\n", "Cuori");
                break;

            case 3:
                printf("%s\n", "Quadri");
                break;
        }

        delta = (mazzo[carte_uscite].valore >= MIN_LOW && mazzo[carte_uscite].valore <= MAX_LOW ? 1 : mazzo[carte_uscite].valore >= MIN_MID && mazzo[carte_uscite].valore <= MAX_MID ? 0 : -1);
        running_count += delta;

        decks_rest -= 1.0 / CARTE_MAZZO;

        printf("\nInserisci il running count corrente: ");
        scanf("%d", &risposta);

        // ↓ Decommentare se si vogliono leggere i true count da file di testo e commentare la scanf ↑
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

    // ↓ Decommetare se si vogliono leggere i true count da file di testo
    //fclose(in);

    accuracy_tot /= (N_MAZZI * CARTE_MAZZO);
    accuracy_tot *= 100;

    accuracy_low /= 20;
    accuracy_low *= 100;

    accuracy_mid /= 12;
    accuracy_mid *= 100;

    accuracy_high /= 20;
    accuracy_high *= 100;

    save_stats(accuracy_tot, accuracy_low, accuracy_mid, accuracy_high, N_MAZZI*CARTE_MAZZO);

    printf("\n\n\nSTATISTICHE\nOverall accuracy:\t%.2f %%\nLow accuracy:\t\t%.2f %%\nMid accuracy:\t\t%.2f %%\nHigh accuracy:\t\t%.2f %%\n\n\n", accuracy_tot, accuracy_low, accuracy_mid, accuracy_high);
}

void save_stats(float acc_total, float acc_low, float acc_mid, float acc_high, int drills) {
    FILE* in = fopen("stats.txt", "a");
    if (in == NULL) {
        perror("stats.txt");
        printf("\n");
        return;
    }

    char data[11];
    time_t now = time(NULL);
    strftime(data, sizeof(data), "%Y-%m-%d", localtime(&now));

    fprintf(in, "%s,%.1f,%d,%.1f,%.1f,%.1f\n", data, acc_total, drills, acc_low, acc_mid, acc_high);

    fclose(in);
}

void stats() {
    FILE* in = fopen("stats.txt", "r");
    if (in == NULL) {
        perror("\nstats.txt");
        printf("\n");
        return;
    }

    char data[11];
    float acc_tot, acc_low, acc_mid, acc_high;
    int drills;

    printf("\nData\t\tOverall accuracy %%\tDrills\t\tLow %%\tMid %%\tHigh %%\n");
    printf("--------------------------------------------------------------------------------\n");

    while (fscanf(in, "%10[^,],%f,%d,%f,%f,%f\n", data, &acc_tot, &drills, &acc_low, &acc_mid, &acc_high) == 6) {
        printf("%s\t%3.1f\t\t\t%d\t\t%3.1f\t%3.1f\t%3.1f\n", data, acc_tot, drills, acc_low, acc_mid, acc_high);
    }

    fclose(in);

    printf("\n\n");
}

int read_risposta(FILE* in) {
    int lettura;

    fscanf(in, "%d\n", &lettura);

    return lettura;
}