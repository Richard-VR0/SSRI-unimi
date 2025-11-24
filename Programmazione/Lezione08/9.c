#include <stdio.h>
#include <string.h>

#define DIM 5

void read_string(char*);
void ordina(char**, int);
int lex(char*, char*);

int main(void) {
    char *ptr[DIM], strings[DIM][BUFSIZ], lettura[BUFSIZ];

    int i;
    for(i = 0; i < DIM; i++) {
        read_string(lettura);

        strcpy(*(strings+i), lettura);

        ptr[i] = *(strings+i);
    }

    printf("\n\nPrima:\n");
    for(i = 0; i < DIM; i++) {
        printf("Stringa %d: %s\n", i, *(ptr+i));
    }

    ordina(ptr, DIM);

    printf("\n\nDopo:\n");
    for(i = 0; i < DIM; i++) {
        printf("Stringa %d: %s\n", i, *(ptr+i));
    }

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

void ordina(char** s, int lung) {
    int scambio = 1, i;
    char *aux;

    while (scambio) {
        scambio = 0;

        for (i = 0; i < DIM - 1; i++) {
            if (lex(s[i], s[i+1]) < 0) {
                aux = s[i];
                s[i] = s[i + 1];
                s[i + 1] = aux;

                scambio = 1;
            }
        }
    }
}