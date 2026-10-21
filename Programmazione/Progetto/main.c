#include "func.h"

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