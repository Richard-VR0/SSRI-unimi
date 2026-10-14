#include "func.h"

int main(int argc, char* argv[]) {
    int lette, n, i;

    if (argc != 3) {
        printf("Argomenti errati o mancanti\n");
        return -1;
    }

    n = atoi(argv[2]);

    if (n <= 0) {
        printf("Numero di triplette non valido\n");
        return -1;
    }

    FILE *fp = fopen(argv[1], "r");
    if (fp == NULL) {
        printf("Errore in apertura del file\n");
        return -1;
    }

    tripletta *array_triplette = (tripletta*) malloc(n * sizeof(tripletta));
    if (array_triplette == NULL) {
        printf("Errore di allocazione della memoria\n");
        
        fclose(fp);
        return -1;
    }

    lette = leggi_triplette(fp, array_triplette, n);

    if (lette < n) {
        printf("Errore, EOF raggiunto troppo presto\n");

        free(array_triplette);
        fclose(fp);
        return -1;
    }
    
    stampa_triplette(array_triplette, n);

    free(array_triplette);
    fclose(fp);
    
    return 0;
}