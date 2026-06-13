#include <stdio.h>

int read_int();

int main(int argc, char* argv[]) {
    int a, b, somma;

    a = read_int();
    b = read_int();

    somma = a + b;

    printf("\n%d + %d = %d\n", a, b, somma);

    return 0;
}

int read_int() {
    int numero;

    do {
        printf("Inserisci un numero: ");
        scanf("%d", &numero);
    } while(numero <= 0);

    return numero;
}