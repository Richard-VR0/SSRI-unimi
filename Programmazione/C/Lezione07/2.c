#include <stdio.h>
#include <string.h>

int main(int argc, char* argv[]) {
    char *px, *py, x[BUFSIZ], y[BUFSIZ], *aux;

    strcpy(x, "ciao");
    strcpy(y, "oaic");

    px = x;
    py = y;

    printf("Prima:\npx = %s\npy = %s\n\n", px, py);

    aux = px;

    px = py;

    py = aux;

    printf("\n\nDopo:\npx = %s\npy = %s\n\n", px, py);

    return 0;
}