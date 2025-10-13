#include <stdio.h>

#define SOGLIA 18

int main(int argc, char argv[]) {
    int voto;

    printf("Inserisci il voto: ");
    scanf("%d", &voto);

    if (voto >= SOGLIA) {
        printf("Promosso\n");
    }
    else {
        printf("Bocciato\n");
    }
    
    return 0;
}