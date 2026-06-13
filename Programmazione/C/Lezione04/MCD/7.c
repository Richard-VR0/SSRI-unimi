#include <stdio.h>

int main() {
    int a, b, aux;

    do {
        printf("Inserisci il primo numero: ");
        scanf("%d", &a);
    } while (a <= 0);

    do {
        printf("Inserisci il secondo numero: ");
        scanf("%d", &b);
    } while (b <= 0);

    while (b != 0) {
        aux = b;
        b = a % b;
        a = aux;
    }

    printf("MCD: %d\n\n", a);

    return 0;
}