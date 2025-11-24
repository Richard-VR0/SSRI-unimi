#include <stdio.h>
#include <string.h>

int occ(char*, char);

int main(void) {
    char stringa[BUFSIZ], ch;

    printf("Scrivi qualcosa: ");
    fgets(stringa, BUFSIZ, stdin);
    stringa[strlen(stringa) - 1] = '\0';

    printf("\nScrivi un carattere: ");
    scanf("%c", &ch);

    printf("\nOccorrenze di '%c' in \"%s\": %d\n", ch, stringa, occ(stringa, ch));
    
    return 0;
}

int occ(char* str, char ch) {
    if (str == NULL) {
        return -1;
    }

    if (*str == '\0') {
        return 0;
    }

    if (*str == ch) {
        return 1 + occ(str+1, ch);
    }
    else {
        return 0 + occ(str+1, ch);
    }
}