#include <stdio.h>

int F(int);
int M(int);

int main(void) {
    int n, i;

    do {
        printf("Inserisci un intero positivo: ");
        scanf("%d", &n);
    } while(n < 0);

    printf("i\tF(n)\tM(n)\n");
    for (i = 0; i <= n+1; i++) {
        printf("%d\t%d\t%d\n", i, F(i), M(i));
    }

    return 0;
}

int F(int n) {
    if (n == 0) {
        return 1;
    }

    return n - M(F(n-1));
}

int M(int n) {
    if (n == 0) {
        return 0;
    }

    return n - F(M(n-1));
}