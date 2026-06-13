#include <stdio.h>

void read_string(char*);
void clean(char*, char*, char);

int main(void) {
    char prima[BUFSIZ], dopo[BUFSIZ], ch;

    read_string(prima);

    printf("Inserisci il carattere da eliminare");
    scanf("%c", &ch);

    printf("Prima:\t%s", prima);

    clean(prima, dopo, ch);

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

void clean(char* s, char*t, char ch) {
    int i, j;

    for(i = 0, j = 0; *(s+i) != '\0'; i++) {
        if (*(s+i) != ch) {
            *(t+j) = *(s+i);

            j++;
        }
    }

    *(t+j) = '\0';
}