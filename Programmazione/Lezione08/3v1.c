#include <stdio.h>

void read_string(char*);
void reverse(char*, char*);
int equals(char*, char*);

int main(void) {
    char s1[BUFSIZ], s2[BUFSIZ];
    int i;

    read_string(s1);

    reverse(s1, s2);

    printf("Esito: %d\n\n", equals(s1, s2));

    return 0;
}

void read_string(char* str) {
    int i;

    printf("Inserisci la stringa: ");
    fgets(str, BUFSIZ, stdin);

    for (i = 0; str[i] != '\n'; i++);

    str[i] = '\0';
}

int equals(char* s1, char* s2) {
    int uguale = 1, i;
    
    for (i = 0; *(s1+i) != '\0' && *(s2+i) != '\0' && uguale == 1; i++) {
        if (*(s1+i) != *(s2+i)) {
            uguale = 0;
        }
    }

    if (*(s1+i) != '\0' || *(s2+i) != '\0') {
        uguale = 0;
    }

    return uguale;
}

void reverse(char* s, char* t) {
    int i, j;

    for (i = 0; *(s+i) != '\0'; i++);

    for (j = 0; *(s+j) != '\0'; j++) {
        *(t+(i-j-1)) = *(s+j);
    }

    *(t+i) = '\0';
}