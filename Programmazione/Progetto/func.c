#include "func.h"

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
    return (valore >= MIN_LOW && valore <= MAX_LOW ? 1 : valore >= MIN_MID && valore <= MAX_MID ? 0 : -1);          // Sistema di conteggio Hi-Lo (low = +1, mid = 0, high = -1)
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
    // Calcolo della bet corretta
    // TC <= 0  -> 1x
    // TC <= 1  -> 2x
    // TC <= 2  -> 4x
    // TC > 2   -> 8x

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
        char filename[25];

        sprintf(filename, "inputfiles/input%d.txt", N_MAZZI);

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

        deck_rest -= 1.0 / CARTE_MAZZO;                                 // Aggiornamento del deck rest togliendo una frazione di mazzo (1/52)

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