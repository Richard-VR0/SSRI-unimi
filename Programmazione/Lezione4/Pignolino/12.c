#include <stdio.h>

int main() {
    /*
    se !domenica
        se !pioggia e previsioni_buone
            se giorno_pari
                giardini pubblici con libro

            altrimenti
                caffe con diario

        altrimenti
            non esce

    altrimenti
        se pioggia o !previsioni_buone
                visita da Precisina ombrello

        altrimenti
                visita da Precisina parasole
    */

    int domenica, pioggia, previsioni_buone, giorno_pari;
    char risposta;

    printf("E' domenica?");
    if (getchar() == 'S') {
        domenica = 1;
    }
    else {
        if (getchar() == 'N') {
            domenica = 0;
        }
    }

    domenica = getchar() % 2;
    
    getchar();

    printf("Piove?");
    pioggia = getchar() % 2;

    getchar();

    printf("Le previsioni sono buone?");
    previsioni_buone = getchar() % 2;

    getchar();

    printf("E' un giorno pari?");
    giorno_pari = getchar() % 2;

    getchar();

    if (!domenica) {
        if (!pioggia && previsioni_buone) {
            if (giorno_pari) {
                printf("\nIl signor Pignolino oggi e' uscito per recarsi ai giardini pubblici. Ha portato con se' un libro.\n");
            }
            else {
                printf("\nIl signor Pignolino oggi e' uscito per recarsi al Caffe'. Ha portato con se' il suo diario.\n");
            }
        }
        else {
            printf("\nIl signor Pignolino oggi non e' uscito.\n");
        }
    }
    else {
        if (!pioggia || !previsioni_buone) {
            printf("\n Il signor Pignolino oggi e' uscito per recarsi dalla signora Precisina. Ha portato con se' un ombrello.\n");
        }
        else {
            printf("\n Il signor Pignolino oggi e' uscito per recarsi dalla signora Precisina. Ha portato con se' un parasole.\n");
        }
    }

    printf("\n\nFlag\t%d\t%d\t%d\t%d\n\n", domenica, pioggia, previsioni_buone, giorno_pari);

    return 0;
}