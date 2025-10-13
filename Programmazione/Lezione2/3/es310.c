#include <stdio.h>
#include <ctype.h>

int main(int argc, char argv[]) {
    char car;

    do {
        printf("Inserisci un carattere: ");
        car = getchar();

        if (car != '\n') {
            getchar();
            
            if (islower(car) == 0 && isupper(car) == 0) {
                printf("Il carattere %c non e' un carattere alfabetico\n\n", car);
            }
            else {
                if (islower(car)) {
                    printf("Il carattere %c è una lettera minuscola\n\n", car);
                }
                else {
                    printf("Il carattere %c è una lettera maiuscola\n\n", car);
                }
            }

        }
    } while (car != '\n');
    
    return 0;
}