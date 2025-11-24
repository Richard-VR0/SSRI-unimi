#include <stdio.h>

int catalan(int);

int main(void) {
    int n, i;

    do {
        printf("Inserisci un intero positivo: ");
        scanf("%d", &n);
    } while(n < 0);

    for (i = 0; i <= n; i++) {
        printf("Catalan(%d): %d\n", i, catalan(i));
    }

    return 0;
}

int catalan(int n) {
    if (n == 0) {
        return 1;
    }

    return (2 * ((2 * n) - 1) * catalan(n-1)) / (n + 1);
}