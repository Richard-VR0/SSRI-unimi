#include <stdio.h>

int main() {
    char c1, c2;

    printf("Inserisci 1° carattere: ");
    c1 = getchar(); getchar();

    printf("Inserisci 1° carattere: ");
    c2 = getchar(); getchar();

    printf("%c\t%c\n", c1, c2);

    return 0;
}