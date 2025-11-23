#include <stdio.h>
#include <stdlib.h>

#define N 100

int read_int();
void read_int_array(int*, int);
int* merge_array(int*, int*, int);

int main(void) {
    int v1[N], v2[N], *mergev, i, n;

    n = read_int();

    printf("\nLettura vettore 1\n");
    read_int_array(v1, n);
    printf("\nLettura vettore 2\n");
    read_int_array(v2, n);

    mergev = merge_array(v1, v2, n);

    printf("Vettore unito: ");
    for (i = 0; i < (2 * n); i++) {
        printf("%d ", mergev[i]);
    }

    return 0;
}

int read_int() {
    int numero;

    do {
        printf("Inserisci un numero intero: ");
        scanf("%d", &numero);
    } while(numero <= 0 || numero > 100);

    return numero;
}

void read_int_array(int* array, int dim) {
    int i;

    for (i = 0; i < dim; i++) {
        printf("Inserisci un numero intero: ");
        scanf("%d", &array[i]);
    }
}

int* merge_array(int* v1, int* v2, int dim) {
    int* array = malloc(2*dim*sizeof(int));
    int i;

    for (i = 0; i < dim; i++) {
        array[i] = v1[i];
    }

    for (i = 0; i < dim; i++) {
        array[dim + i] = v2[i];
    }

    return array;
}