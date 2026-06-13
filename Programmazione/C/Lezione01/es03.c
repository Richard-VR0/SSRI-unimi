#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    int n;

    printf("Inserisci un numero:");
    scanf("%d", &n);

    if (n < 0) {
        n = -n;         //Inverto il numero perchè negativo
    }

    printf("Valore assoluto: %d\n", n);
    
    return 0;
}
