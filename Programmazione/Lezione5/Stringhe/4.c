#include <stdio.h>

#define N 30

int main() {
    char frase[N + 1];
    int i;

    printf("Inserisci una frase: ");
    fgets(frase, sizeof(frase), stdin);

    for (i = 0; frase[i+1] != '\0'; i++);

    printf("\nDimensione:\t%d\n\n", i);

    return 0;
}