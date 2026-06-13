#include <stdio.h>

int main(int argc, char* argv[]) {
    int *px, *py, x, y, *aux;

    x = 0;
    y = 1;

    px = &x;
    py = &y;

    printf("Prima:\n*px = %d\n*py = %d\n\n", *px, *py);

    aux = px;

    px = py;

    py = aux;

    printf("\n\nDopo:\n*px = %d\n*py = %d\n\n", *px, *py);

    return 0;
}