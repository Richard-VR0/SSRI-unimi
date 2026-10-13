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