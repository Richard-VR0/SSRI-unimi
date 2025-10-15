#include <stdio.h>

int main(int argc, char *argv[]) {
    int a, b, contatore;

    printf("Inserisci il primo numero: ");
    scanf("%d", &a);

    printf("Inserisci il secondo numero: ");
    scanf("%d", &b);

    if (a <= 0 || b <= 0) {
        printf("Errore! I numeri inseriti non rispettano la condizione a,b > 0\n");

        return -1;
    }

    printf("Il m.c.d. di %d e %d: ", a, b);

    contatore = 0;

    while (a != b) {
        if (a > b) {
            a -= b;
        }
        else {
            b -= a;
        }

        contatore++;
    }

    printf("%d\n", a);

    printf("Numero di iterazioni del while: %d\n", contatore);
    
    return 0;
}
