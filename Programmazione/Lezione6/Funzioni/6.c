#include <stdio.h>

#define TASSO 1.5

double read_saldo();
void stampa_saldo(double saldo);
double deposito(double saldo);
double prelievo(double saldo);
double calcolo_interesse(double saldo);

int main(int argc, char* argv[]) {
    int scelta;
    double saldo;

    saldo = read_saldo();

    do {
        printf("\n1. Visualizza saldo\n2. Deposito\n3. Prelievo\n4. Calcolo interesse\n5. Esci\n>");
        scanf("%d", &scelta);

        if (scelta > 0 && scelta < 5) {
            switch (scelta) {
                case 1:
                    stampa_saldo(saldo);
                    break;

                case 2:
                    saldo = deposito(saldo);
                    break;

                case 3:
                    saldo = prelievo(saldo);
                    break;

                case 4:
                    saldo = calcolo_interesse(saldo);
            }
        }
        else {
            if (scelta != 5) {
                printf("\nErrore, operazione non disponibile\n");
            }
        }
    } while(scelta != 5);
    
    return 0;
}

double read_saldo() {
    double numero;

    printf("Inserisci il saldo del conto corrente: ");
    scanf("%lf", &numero);

    return numero;
}

void stampa_saldo(double saldo) {
    printf("\n\nSaldo attuale: %lf\n\n", saldo);
}

double deposito(double saldo) {
    double dep;
    
    printf("\nQuanto vuoi depositare? ");
    scanf("%lf", &dep);

    if (dep > 0) {
        saldo += dep;
        
        stampa_saldo(saldo);
    }
    else {
        printf("\nErrore, non è possibile depositare una cifra negativa\n");
    }

    return saldo;
}

double prelievo(double saldo) {
    double prel;

    printf("\nQuanto vuoi prelevare? ");
    scanf("%lf", &prel);

    if (prel > saldo) {
        printf("\nErrore, saldo conto insufficiente\n");
    }
    else {
        if (prel <= 0) {
            printf("\nErrore, non è possibile prelevare una cifra negativa\n");
        }
        else {
            saldo -= prel;
        }
    }

    stampa_saldo(saldo);

    return saldo;
}

double calcolo_interesse(double saldo) {
    int anni;
    double interesse;

    do {
        printf("\nQuanti anni vuoi considerare? ");
        scanf("%d", &anni);
    } while (anni <= 0);

    if (saldo < 0) {
        printf("Errore, il saldo è negativo, quindi non è possibile calcolare interessi");
    }
    else {
        interesse = saldo * TASSO * anni;

        stampa_saldo(saldo);
        printf("\nInteresse calcolato: %lf\n", interesse);
    }
}