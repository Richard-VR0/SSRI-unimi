#include <stdio.h>
#include <stdlib.h>

int read_int();
double read_double();
void bubble_sort(double*, int);

int main(void) {
    int n, i;
    double* array;

    n = read_int();

    array = (double*) malloc(n * sizeof(double));

    if (array == NULL) {
        printf("\nErrore nell'essecuzione della malloc!\n");

        return -1;
    }

    for (i = 0; i < n; i++) {
        array[i] = read_double();
    }

    printf("\n\nPrima:\t");
    for (i = 0; i < n; i++) {
        printf("%lf\t", array[i]);
    }

    bubble_sort(array, n);

    printf("\n\nDopo:\t");
    for (i = 0; i < n; i++) {
        printf("%lf\t", array[i]);
    }

    free(array);

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