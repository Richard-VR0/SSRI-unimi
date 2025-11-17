#include <stdio.h>

#define DIM 3

void read_string(char*);
void ordina(char**, int);

int main(void) {
    char *str[DIM] = {"ciao", "rick", "vescio"};
    int i;
/*
    for(i = 0; i < DIM; i++) {
        read_string(*(str+i));
    }
*/
    for(i = 0; i < DIM; i++) {
        printf("\n\nStringa %d: %s", i, *(str+i));
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

void ordina(char** s, int lung) {

}