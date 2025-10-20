#include <stdio.h>

int main() {
    double a, b, risultato;
    unsigned short int operatore;

    printf("Inserisci il primo operando: ");
    scanf("%lf", &a);

    printf("Inserisci il secondo operando: ");
    scanf("%lf", &b);
    
    printf("Inserisci l'operatore (1, 2, 3, 4): ");
    scanf("%hu", &operatore);

    switch(operatore) {
        case 1: 
            risultato = a + b;
            break;

        case 2:
            risultato = a - b;
            break;

        case 3:
            risultato = a * b;
            break;

        case 4:
            risultato = a / b;
            break;
    }

    printf("Risultato: %lf\n", risultato);

    return 0;
}