#include <stdio.h>
#include <stdlib.h>

#define TERMINA 4

int read_int();
double read_double();
double* inserimento_elenco(int);

void bubble_sort(double*, int);

void stampa_elenco(double*, int);

int main(void) {
    int n, scelta;
    double* array;

    array = NULL;

    n = read_int();

    do {
        printf("\n1. Inserisci elenco di double\n2. Ordina elenco\n3. Stampa elenco\n4. Termina\n>");
        scanf("%d", &scelta);

        if (scelta != TERMINA) {
            switch (scelta) {
                case 1:
                    free(array);

                    array = inserimento_elenco(n);

                    if (array == NULL) {
                        printf("\nErrore nell'essecuzione della malloc!\n");

                        return -1;
                    }
                    break;

                case 2:
                    if (array != NULL) {
                        bubble_sort(array, n);
                    }
                    break;

                case 3:
                    if (array != NULL) {
                        stampa_elenco(array, n);
                    }
                    break;

                default:
                    printf("\n\nOperazione non consentita!\n\n");
                    break;
            }
        }
    } while (scelta != TERMINA);

    return 0;
}

int read_int() {
    int numero;

    do {
        printf("Inserisci un numero intero: ");
        scanf("%d", &numero);
    } while(numero <= 0);

    return numero;
}

double read_double() {
    double numero;

    printf("Inserisci un numero double: ");
    scanf("%lf", &numero);

    return numero;
}

double* inserimento_elenco(int n) {
    int i;
    double* array;

    array = (double*) malloc(n * sizeof(double));

    for (i = 0; i < n; i++) {
        array[i] = read_double();
    }

    return array;
}

void bubble_sort(double* array, int n) {
    int scambio = 1, i;
    double aux;

    while (scambio) {
        scambio = 0;

        for (i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                aux = array[i];
                array[i] = array[i + 1];
                array[i + 1] = aux;

                scambio = 1;
            }
        }
    }
}

void stampa_elenco(double* array, int n) {
    int i;

    for (i = 0; i < n; i++) {
        printf("%lf\t", array[i]);
    }
}