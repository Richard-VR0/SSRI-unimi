#include "func.h"

int leggi_triplette(FILE* fp, tripletta* arr, int n) {
    int i, r;

    for (i = 0; i < n; i++) {
        r = fscanf(fp, "%u %u %f", &arr[i].n1, &arr[i].n2, &arr[i].f);

        if (r != 3) {
            return i;
        }
    }

    return i;
}

void stampa_triplette(tripletta* arr, int n) {
    int i;

    printf("\t\tTriplette lette\n");
    printf("\tn1\t\tn2\t\tf\n");
    printf("--------------------------------------------------\n");

    for (i = 0; i < n; i++) {
        printf("T%d:\t%u\t\t%u\t\t%.2f\n", i, arr[i].n1, arr[i].n2, arr[i].f);
    }
}