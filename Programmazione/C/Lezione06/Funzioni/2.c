#include <stdio.h>

int read_int();
int fibonacci(int n);

int main(int argc, char* argv[]) {
    int n, fib;

    n = read_int();

    fib = fibonacci(n);

    printf("\nFibonacci di %d: %d\n", n, fib);

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

int fibonacci(int n) {
    int fib = 0, n1 = 0, n2 = 1, i;

    for(i = 0; i < n-1; i++) {
        fib = n1 + n2;

        n1 = n2;
        n2 = fib;
    }
    
    return fib;
}