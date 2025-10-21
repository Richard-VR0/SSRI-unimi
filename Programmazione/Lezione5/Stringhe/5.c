#include <stdio.h>

#define N 30

int main() {
    char s[N + 1];
    char c;
    int i;

    printf("Inserisci una frase: ");
    fgets(s, sizeof(s), stdin);

    printf("Inserisci un carattere: ");
    c = getchar(); getchar();

    for (i = 0; s[i+2] != '\0'; i++);

    if (s[i] == c) {
        printf("\nEsito:\tSI\n\n");
    }
    else {
        printf("\nEsito:\tNO\n\n");
    }

    return 0;
}