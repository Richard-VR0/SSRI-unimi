#include <stdio.h>
#include <string.h>

int lungstr(char*);

int main(void) {
    char stringa[BUFSIZ];

    printf("Scrivi qualcosa: ");
    fgets(stringa, BUFSIZ, stdin);
    stringa[strlen(stringa) - 1] = '\0';

    printf("\nLunghezza stringa: %d\n", lungstr(stringa));

    return 0;
}

int lungstr(char* str) {
    if (*str == '\0') {
        return 0;
    }

    return 1 + lungstr(str+1);
}