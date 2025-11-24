#include <stdio.h>
#include <ctype.h>

int main(int argc, char *argv[]) {
    char carattere;

    printf("Inserisci un carattere: ");
    carattere = getchar(); getchar();

    if (islower(carattere) != 0) {
        carattere = toupper(carattere);
    }
    else {
        if (isupper(carattere) != 0) {
            carattere = tolower(carattere);
        }
    }

    printf("\nCarattere: %c\n\n", carattere);
    
    return 0;
}
