#include <stdio.h>

int main(int argc, char *argv[]) {
    int n, i, somma_serie, somma_formula;

    do {
        printf("Inserisci un numero maggiore di 1: ");
        scanf("%d", &n);

        if (n < 1) {
            printf("Errore! Il numero inserito deve essere maggiore o uguale a 1\n\n");
        }
    } while (n < 1);

    somma_serie = 0;

    i = 1;

    while (i <= n) {
        somma_serie += i*i;
        
        i++;
    }

    /*
    for (i = 1; i <= n; i++) {
        somma_serie += i*i;
    }
    */

    somma_formula = (n * (n+1) * (2*n + 1)) / 6;

    printf("Somma con serie:\t%d\nSomma con formula:\t%d\n\n", somma_serie, somma_formula);
    
    return 0;
}
