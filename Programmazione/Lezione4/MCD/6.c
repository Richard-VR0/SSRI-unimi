#include <stdio.h>

int main() {
    int a = 100, b = 46, aux;

    while (b != 0) {
        aux = b;
        b = a % b;
        a = aux;
    }

    printf("MCD: %d\n\n", a);

    return 0;
}