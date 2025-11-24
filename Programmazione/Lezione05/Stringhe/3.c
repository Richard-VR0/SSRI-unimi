#include <stdio.h>

#define N 30

int main() {
    char frase[N + 1];

    printf("Inserisci una frase: ");
    fgets(frase, sizeof(frase), stdin);

    printf("\n%s\n\n", frase);

    return 0;
}