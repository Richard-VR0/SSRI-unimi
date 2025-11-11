#include <stdio.h>

int read_int();
int fattoriale(int n);
int cifre(int n);

int main(int argc, char* argv[]) {
    int n;

    n = read_int();

    printf("\n%d! = %d\n", n, fattoriale(n));
    printf("\nCifre di %d! = %d\n", n, cifre(n));
    
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

int fattoriale(int n) {
    int fattoriale = 1, i;

    for (i = 1; i <= n; fattoriale *= i, i++);
    
    return fattoriale;
}

int cifre(int n) {
    int i;

    for (i = 0; n != 0; n /= 10, i++);

    return i;
}