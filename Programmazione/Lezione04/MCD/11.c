#include <stdio.h>

int main() {
    int n, a, b, aux, cont_divisioni, i, f_i, f_prec;
    
    do {
        printf("Inserisci il primo numero (a): ");
        scanf("%d", &a);
    } while (a <= 0);

    do {
        printf("Inserisci il secondo numero (b): ");
        scanf("%d", &b);
    } while (b >= a);

    cont_divisioni = 0;

    while (b != 0) {
        aux = b;
        b = a % b;
        a = aux;

        cont_divisioni++;
    }

    n = cont_divisioni+1;

    f_i = f_prec = 1;

    for (i = 3; i <= n; i++) {
        aux = f_i;

        f_i += f_prec;

        f_prec = aux;
    }

    n = cont_divisioni+2;

    f_i = f_prec = 1;

    for (i = 3; i <= n; i++) {
        aux = f_i;

        f_i += f_prec;

        f_prec = aux;
    }

    printf("a = F(n+2) = %d\nb = F(n+1) = %d\n\n", f_i, f_prec);

    return 0;
}