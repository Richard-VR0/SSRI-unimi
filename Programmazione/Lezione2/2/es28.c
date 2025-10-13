#include <stdio.h>
#include <math.h>

int main(int argc, char argv[]) {
    double a, b, c, delta, x1, x2;

    do {
        printf("Inserisci il coefficiente a: ");
        scanf("%lf", &a);

        if (a == 0) {
            printf("\nErrore! Il coefficiente deve essere diverso da 0\n\n");
        }
    } while (a == 0);

    printf("Inserisci il coefficiente b: ");
    scanf("%lf", &b);

    printf("Inserisci il coefficiente c: ");
    scanf("%lf", &c);

    delta = (b*b) - (4 * a * c);

    printf("\nDiscriminante:\t%lf\n\n", delta);

    if (delta > 0) {
        printf("Le soluzioni reali sono 2\n");

        x1 = (-b - sqrt(delta)) / (2*a);
        x2 = (-b + sqrt(delta)) / (2*a);

        printf("Le soluzioni sono %lf e %lf\n\n", x1, x2);
    }
    else {
        if (delta < 0) {
            printf("Non ci sono soluzioni reali\n");
        }
        else {
            printf("Le soluzioni reali sono coincidenti\n");

            x1 = (-b) / (2*a);

            printf("La soluzione e' %lf\n\n", x1);
        }
    }
    
    return 0;
}