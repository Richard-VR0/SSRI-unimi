#include <stdio.h>

#define N 30

int main() {
    char s[N + 1];
    char c;
    int i;

    printf("Inserisci una nome: ");
    fgets(s, sizeof(s), stdin);

    for (i = 0; s[i+2] != '\0'; i++);

    if (s[i] == 'a' || s[i] == 'e') {
        printf("\nFemminile\n\n");
    }
    else {
        if (s[i] == 'o' || s[i] == 'i') {
            printf("\nMaschile\n\n");
        }
        else {
            printf("\nNon decifrabile\n\n");
        }
    }

    return 0;
}