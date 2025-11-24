#include <stdio.h>

double read_double();
void addizione(double n1, double n2);
void sottrazione(double n1, double n2);
void moltiplicazione(double n1, double n2);
void divisione(double n1, double n2);

int main(int argc, char* argv[]) {
    char scelta;
    int flag = 0;
    double n1, n2, res;

    do {
        printf("\n0. Inserimento operandi\n1. Addizione\n2. Sottrazione\n3. Moltiplicazione\n4. Divisione\n5. Esci\n>");
        scelta = getchar(); getchar();

        if (scelta != '0' && scelta != '1' && scelta != '2' && scelta != '3' && scelta != '4' && scelta != '5') {
            printf("\nErrore, opreazione non consentita%c\n", scelta);
        }
        else {
            if (scelta != '5') {
                switch (scelta) {
                    case '0':
                        n1 = read_double();
                        n2 = read_double();

                        flag = 1;
                        getchar();
                        break;

                    case '1':
                        if (flag) {
                            addizione(n1, n2);
                        }
                        else {
                            printf("\nOperandi non ancora inseriti\n");
                        }
                        break;

                    case '2':
                        if (flag) {
                            sottrazione(n1, n2);
                        }
                        else {
                            printf("\nOperandi non ancora inseriti\n");
                        }
                        break;

                    case '3':
                        if (flag) {
                            moltiplicazione(n1, n2);
                        }
                        else {
                            printf("\nOperandi non ancora inseriti\n");
                        }
                        break;
                        
                    case '4':
                        if (flag) {
                            if (n2 != 0) {
                                divisione(n1, n2);
                            }
                            else {
                                printf("\nErrore!, divisione per 0 non possibile\n\n");
                            }
                        }
                        else {
                            printf("\nOperandi non ancora inseriti\n");
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