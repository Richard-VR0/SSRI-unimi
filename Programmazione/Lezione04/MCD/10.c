#include <stdio.h>

int main() {
    int n, i, f_i, f_prec;

    do {
        printf("Inserisci un intero positivo: ");
        scanf("%d", &n);
    } while (n <= 0);

    printf("F(%d) = ", n);

    f_i = f_prec = 1;

    for (i = 3; i <= n; i++) {
        int aux = f_i;

        f_i += f_prec;

        f_prec = aux;
    }

    printf("%d\n", f_i);

    return 0;
}