#include <stdio.h>
#include <string.h>

#define DIM 5

void read_string(char*);
void ordina(char**, int);
int str_lung(char*);

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

int  str_lung(char* s) {
    int i;

    for (i = 0; s[i] != '\0'; i++);

    return i;
}

void ordina(char** s, int lung) {
    int scambio = 1, i;
    char *aux;

    while (scambio) {
        scambio = 0;

        for (i = 0; i < DIM - 1; i++) {
            if (str_lung(s[i]) > str_lung(s[i+1])) {
                aux = s[i];
                s[i] = s[i + 1];
                s[i + 1] = aux;

                scambio = 1;
            }
        }
    }
}