#include <stdio.h>

void reverse(char*, char*);

int main(void) {
    char str1[BUFSIZ], str2[BUFSIZ];
    int i;

    printf("Inserisci una stringa:");

    
    if (fgets(str1, BUFSIZ, stdin) == NULL) {
        printf("Errore nella lettura della stringa");

        return -1;
    }

    for (i = 0; str1[i] != '\n'; i++);

    str1[i] = '\0';

    reverse(str1, str2);

    printf("\nStringa al contrario: %s\n\n", str2);

    return 0;
}

void reverse(char* s, char* t) {
    int i, j;

    for (i = 0; *(s+i) != '\0'; i++);

    for (j = 0; *(s+j) != '\0'; j++) {
        *(t+(i-j-1)) = *(s+j);
    }

    *(t+i) = '\0';
}