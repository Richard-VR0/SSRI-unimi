#include <stdio.h>

int main() {
    int a, b, aux;

    printf("Inserisci il primo numero: ");
    scanf("%d", &a);

    if (a <= 0) {
        printf("Errore! Numero inserito non valido\n\n");

        return -1;
    }

    printf("Inserisci il secondo numero: ");
    scanf("%d", &b);

    if (b <= 0) {
        printf("Errore! Numero inserito non valido\n\n");

        return -1;
    }

    while (b != 0) {
        aux = b;
        b = a % b;
        a = aux;
    }

    printf("MCD: %d\n\n", a);

    return 0;
}