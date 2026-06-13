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

            printf("Risultato: %lf\n", risultato);
            break;

        case 2:
            risultato = a - b;

            printf("Risultato: %lf\n", risultato);
            break;

        case 3:
            risultato = a * b;

            printf("Risultato: %lf\n", risultato);
            break;

        case 4:
            if (!(b == 0 && operatore == 4)) {
                risultato = a / b;

                printf("Risultato: %lf\n", risultato);   
            }
            else {
                printf("Errore! Hai provato ad eseguire una divisione per 0\n");
            }
            break;

        default:
            printf("Errore! Operatore non valido\n");
    }

    return 0;
}