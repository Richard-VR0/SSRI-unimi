#include <stdio.h>
#include <ctype.h>

int main(int argc, char *argv[]) {
    char car;

    printf("Inserisci un carattere: ");
    car = getchar(); getchar();

    if (islower(car) == 0 && isupper(car) == 0) {
        printf("Il carattere %c non e' un carattere alfabetico", car);
    }
    else {
        if (islower(car)) {
            printf("Il carattere %c è una lettera minuscola", car);
        }
        else {
            printf("Il carattere %c è una lettera maiuscola", car);
        }
    }
    
    return 0;
}
