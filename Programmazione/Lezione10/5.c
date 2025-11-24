#include <stdio.h>

int delannoy(int, int);

int main(void) {
    int m, n;

    do {
        printf("Inserisci un intero positivo: ");
        scanf("%d", &m);
    } while(m < 0);

    do {
        printf("Inserisci un intero positivo: ");
        scanf("%d", &n);
    } while(n < 0);

    printf("Delannoy(%d, %d): %d", m, n, delannoy(m,n));

    return 0;
}

int delannoy(int m, int n) {
    if (m == 0 || n == 0) {
        return 1;
    }

    return delannoy(m-1, n) + delannoy(m, n-1) + delannoy(m-1, n-1);
}