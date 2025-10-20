#include <stdio.h>

int main() {
    double a, b, risultato;
    unsigned short int operatore;

    do {
        printf("Inserisci il primo operando: ");
        scanf("%lf", &a);

        printf("Inserisci il secondo operando: ");
        scanf("%lf", &b);
    
        printf("Inserisci l'operatore (1, 2, 3, 4, 5 per uscire): ");
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
                if (!(operatore == 5)) {
                    printf("Errore! Operatore non valido\n");
                }
        }
    } while(operatore != 5);

    return 0;
}