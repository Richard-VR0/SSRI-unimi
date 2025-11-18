#include <stdio.h>
#include <stdlib.h>

int main(int argc, char* argv[]) {
    int n, i;
    double* v;

    printf("Quanti numeri vuoi inserire? ");
    scanf("%d", &n);

    v = (double*) malloc(n * sizeof(double));

    if(v == NULL) {
        printf("\n\nErrore malloc\n");

        return -1;
    }

    for(i = 0; i < n; i++) {
        printf("Inserisci un numero: ");
        scanf("%lf",&v[i]);
    }


    for(i = 0; i < n; i++) {
        printf("%lf\n", v[i]);
    }
    
    return 0;
}