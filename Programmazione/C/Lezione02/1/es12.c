#include <stdio.h>

int main(int argc, char *argv[]) {
    int a, b;

    printf("Inserisci il primo numero: ");
    scanf("%d", &a);

    printf("Inserisci il secondo numero: ");
    scanf("%d", &b);

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
