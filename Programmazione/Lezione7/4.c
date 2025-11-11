#include <stdio.h>

#define STOP 0

void calcola_stats(double, double*, double*, double*);

int main(int argc, char* argv[]) {
    double num_letto, min, max, somma = 0;

    do {
        printf("Inserisci un numero: ");
        scanf("%lf", &num_letto);

        if (num_letto) {
            calcola_stats(num_letto, &min, &max, &somma);
        }
    } while (num_letto != STOP);
    
    return 0;
}

void calcola_stats(double n, double* min, double* max, double* somma) {
    if (*max < n) {
        *max = n;
    }

    if (*min > n) {
        *min = n;
    }

    *somma = *somma + n;

    printf("\n\nSomma: %lf\n\nMin: %lf\n\nMax: %lf\n\n", somma, min, max);
}