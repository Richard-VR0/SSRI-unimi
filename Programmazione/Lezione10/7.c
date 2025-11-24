#include <stdio.h>

int bell(int);
int fatt(int);
int binom(int, int);

int main(void) {
    int n;

    do {
        printf("Inserisci un intero positivo: ");
        scanf("%d", &n);
    } while(n < 0);

    printf("Bell(%d): %d", n, bell(n));

    return 0;
}

int fatt(int n) {
    if (n == 0) {
        return 1;
    }

    return n * fatt(n-1);
}

int binom(int n, int k) {
    return fatt(n) / (fatt(k) * fatt(n-k));
}

int bell(int n) {


    if (n == 0 || n == 1) {
        return 1;
    }

    return binom(n-1, k) * bell(k);
}