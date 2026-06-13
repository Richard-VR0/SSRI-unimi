#include <stdio.h>

void read_string(char*);
void clean(char*, char*);

int main(void) {
    char prima[BUFSIZ], dopo[BUFSIZ];

    read_string(prima);

    printf("Prima:\t%s", prima);

    clean(prima, dopo);

    printf("\nDopo:\t%s\n", dopo);

    return 0;
}

void read_string(char* str) {
    int i;

    printf("Inserisci la stringa: ");
    fgets(str, BUFSIZ, stdin);

    for (i = 0; str[i] != '\n'; i++);

    str[i] = '\0';
}

void clean(char* s, char*t) {
    int i, j;

    for(i = 0, j = 0; *(s+i) != '\0'; i++) {
        if (*(s+i) != ' ') {
            *(t+j) = *(s+i);

            j++;
        }
    }

    *(t+j) = '\0';
}