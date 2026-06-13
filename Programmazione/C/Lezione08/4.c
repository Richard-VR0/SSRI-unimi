#include <stdio.h>

void read_string(char*);
int lex(char*, char*);

int main(void) {
    char s1[BUFSIZ], s2[BUFSIZ];
    int i;

    read_string(s1);

    read_string(s2);

    printf("\n\nEsito: %d\n\n", lex(s1, s2));

    return 0;
}

void read_string(char* str) {
    int i;

    printf("Inserisci la stringa: ");
    fgets(str, BUFSIZ, stdin);

    for (i = 0; str[i] != '\n'; i++);

    str[i] = '\0';
}

int lex(char* s1, char* s2) {
    int uguale = 0, i;
    
    for (i = 0; *(s1+i) != '\0' && *(s2+i) != '\0'; i++) {
        if (*(s1+i) < *(s2+i)) {
            uguale = 1;
        }

        if (*(s1+i) > *(s2+i)) {
            uguale = -1;
        }
    }

    if (*(s1+i) == '\0' && *(s2+i) != '\0') {
        uguale = 1;
    }

    if (*(s1+i) != '\0' && *(s2+i) == '\0') {
        uguale = -1;
    }

    return uguale;
}