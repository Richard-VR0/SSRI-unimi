#include <stdio.h>
#include <ctype.h>

int main(int argc, char *argv[]) {
    char carattere;
    int scelta;

    printf("Inserisci un carattere: ");
    carattere = getchar(); getchar();

    if (islower(carattere) != 0 || isupper(carattere) != 0) {
        printf("Conversione in maiuscola (1) o maiuscola (altro numero)?");
        scanf("%d", &scelta);

        if (scelta == 1) {
            carattere = toupper(carattere);
        }
        else {
            carattere = tolower(carattere);
        }
    }

    printf("\nCarattere: %c\n\n", carattere);
    
    return 0;
}
