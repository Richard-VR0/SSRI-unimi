#include <stdio.h>

int main(int argc, char *argv[]) {
    int a, b;

    printf("Inserisci il primo numero: ");
    scanf("%d", &a);

    printf("Inserisci il secondo numero: ");
    scanf("%d", &b);

    if (a <= 0 || b <= 0) {
        printf("Errore! I numeri inseriti non rispettano la condizione a,b > 0\n");

        return -1;
    }

    printf("Il m.c.d. di %d e %d: ", a, b);

    while (a != b) {
        if (a > b) {
            a -= b;
        }
        else {
            b -= a;
        }
    }

    printf("%d\n", a);
    
    return 0;
}
