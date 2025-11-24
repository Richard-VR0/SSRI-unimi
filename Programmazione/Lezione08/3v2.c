#include <stdio.h>

void read_string(char*);
int palindroma(char*);

int main(void) {
    char s1[BUFSIZ], s2[BUFSIZ];
    int i;

    read_string(s1);


    printf("\nEsito: %d\n\n", palindroma(s1));

    return 0;
}

void read_string(char* str) {
    int i;

    printf("Inserisci la stringa: ");
    fgets(str, BUFSIZ, stdin);

    for (i = 0; str[i] != '\n'; i++);

    str[i] = '\0';
}

int palindroma(char* str) {
    int palindroma = 1, d, j;

    for (d = 0; *(str+d) != '\0'; d++);

    for (j = 0; j < (d / 2) && palindroma == 1; j++) {
        if (*(str + j) == *(str + (d - j))) {
            palindroma = 0;
        }
    }

    return palindroma;
}