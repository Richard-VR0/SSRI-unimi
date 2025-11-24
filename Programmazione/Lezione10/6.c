#include <stdio.h>

int delannoy(int, int);

int main(void) {
    int m, n, i, j;

    do {
        printf("Inserisci un intero positivo: ");
        scanf("%d", &m);
    } while(m < 0);

    do {
        printf("Inserisci un intero positivo: ");
        scanf("%d", &n);
    } while(n < 0);

    for (i = 0; i <= m; i++) {
        for (j = 0; j <= n; j++) {
            printf("%d\t", delannoy(i,j));
        }

        printf("\n");
    }

    return 0;
}

int delannoy(int m, int n) {
    if (m == 0 || n == 0) {
        return 1;
    }

    return delannoy(m - 1, n) + delannoy(m, n - 1) + delannoy(m - 1, n - 1);
}