#include <stdio.h>

void calcola_stats(double, double*, double*, double*);

int main(int argc, char* argv[]) {
    double num_letto, min, max, somma = 0;
    int primo = 1;

    do {
        printf("Inserisci un numero:\n>");
        scanf("%lf", &num_letto);

        if (primo) {
            min = num_letto;
            max = num_letto;

            primo = !primo;
        }

        if (num_letto) {
            calcola_stats(num_letto, &min, &max, &somma);

            printf("+--------------------+\nSomma: %lf\n\nMin: %lf\n\nMax: %lf\n+--------------------+\n\n", somma, min, max);
        }
    } while (num_letto);
    
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
}