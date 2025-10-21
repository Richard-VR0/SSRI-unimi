#include <stdio.h>

#define N 30

int main() {
    char s[N + 1];
    char c;
    int i, finale = 0;

    printf("Inserisci una frase: ");
    fgets(s, sizeof(s), stdin);

    printf("Inserisci un carattere: ");
    c = getchar(); getchar();

    for (i = 0; s[i+1] != '\0'; i++);

    if (s[i] == c) {
        finale = 1;
    }

    if (finale) {
        printf("\nEsito:\tSI\n\n%c", s[i]);
    }
    else {
        printf("\nEsito:\tNO\n\n");
    }

    return 0;
}