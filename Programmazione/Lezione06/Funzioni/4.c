#include <stdio.h>

double read_double();
void addizione(double n1, double n2);
void sottrazione(double n1, double n2);
void moltiplicazione(double n1, double n2);
void divisione(double n1, double n2);

int main(int argc, char* argv[]) {
    char scelta;
    double n1, n2, res;

    do {
        n1 = read_double();
        n2 = read_double();

        printf("\n1. Addizione\n2. Sottrazione\n3. Moltiplicazione\n4. Divisione\n5. Esci\n>");
        getchar(); scelta = getchar(); getchar();

        if (scelta != '1' && scelta != '2' && scelta != '3' && scelta != '4' && scelta != '5') {
            printf("\nErrore, opreazione non consentita%c\n", scelta);
        }
        else {
            if (scelta != '5') {
                switch (scelta) {
                    case '1':
                        addizione(n1, n2);
                        break;

                    case '2':
                        sottrazione(n1, n2);
                        break;

                    case '3':
                        moltiplicazione(n1, n2);
                        break;
                        
                    case '4':
                        if (n2 != 0) {
                            divisione(n1, n2);
                        }
                        else {
                            printf("\nErrore!, divisione per 0 non possibile\n\n");
                        }
                        break;
                }
            }
        }
    } while (scelta != '5');
    
    return 0;
}

double read_double() {
    double numero;

    printf("Inserisci un numero: ");
    scanf("%lf", &numero);

    return numero;
}

void addizione(double n1, double n2) {
    double res;

    res = n1 + n2;
    
    printf("\n%lf+%lf = %lf\n\n", n1, n2, res);
}

void sottrazione(double n1, double n2) {
    double res;

    res = n1 - n2;
    
    printf("\n%lf-%lf = %lf\n\n", n1, n2, res);
}

void moltiplicazione(double n1, double n2) {
    double res;

    res = n1 * n2;
    
    printf("\n%lf*%lf = %lf\n\n", n1, n2, res);
}

void divisione(double n1, double n2) {
    double res;

    res = n1 / n2;
    
    printf("\n%lf/%lf = %lf\n\n", n1, n2, res);
}