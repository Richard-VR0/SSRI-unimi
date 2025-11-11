#include <stdio.h>

#define VISUALIZZA_SALDO 1
#define DEPOSITO 2
#define PRELIEVO 3
#define CALCOLO_INTERESSE 4

#define TASSO 1.5

void visualizza_saldo(double);
void deposito(double*);
void prelievo(double*);
void calcolo_interesse(double*);

int main(int argc, char* argv[]) {
    double saldo;
    int scelta;

    printf("Inserisci il saldo iniziale: ");
    scanf("%lf", &saldo);

    do {
        printf("\n1. Visualizza saldo\n2. Deposito\n3. Prelievo\n4. Calcolo interesse\n5. Esci\n>");
        scanf("%d", &scelta);

        switch(scelta) {
            case VISUALIZZA_SALDO:
                visualizza_saldo(saldo);

                break;

            case DEPOSITO:
                deposito(&saldo);

                break;

            case PRELIEVO:
                prelievo(&saldo);

                break;

            case CALCOLO_INTERESSE:
                calcolo_interesse(&saldo);

                break;

            case 5:
                break;

            default:
                printf("Operazione non consentita");
        }
    } while (scelta != 5);
    
    return 0;
}

void visualizza_saldo(double saldo) {
    printf("\n\nSaldo attuale: %lf\n\n", saldo);
}

void deposito(double* saldo) {
    double dep;
    
    printf("\nQuanto vuoi depositare? ");
    scanf("%lf", &dep);

    if (dep > 0) {
        *saldo += dep;
        
        visualizza_saldo(*saldo);
    }
    else {
        printf("\nErrore, non è possibile depositare una cifra negativa\n");
    }
}

void prelievo(double* saldo) {
    double prel;

    printf("\nQuanto vuoi prelevare? ");
    scanf("%lf", &prel);

    if (prel > *saldo) {
        printf("\nErrore, saldo conto insufficiente\n");
    }
    else {
        if (prel <= 0) {
            printf("\nErrore, non è possibile prelevare una cifra negativa\n");
        }
        else {
            *saldo -= prel;
        }
    }

    visualizza_saldo(*saldo);
}

void calcolo_interesse(double* saldo) {
    int anni;
    double interesse;

    do {
        printf("\nQuanti anni vuoi considerare? ");
        scanf("%d", &anni);
    } while (anni <= 0);

    if (*saldo < 0) {
        printf("Errore, il saldo è negativo, quindi non è possibile calcolare interessi");
    }
    else {
        interesse = *saldo * TASSO * anni;

        visualizza_saldo(*saldo);
        printf("\nInteresse calcolato: %lf\n", interesse);
    }
}