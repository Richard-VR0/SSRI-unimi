#include <stdio.h>

int main(int argc, char *argv[]) {
    int a = 214, b = 128;

    printf("Il m.c.d. di %d e %d: ", a, b);

    while (a != b) {
        if (a > b) {
            a -= b;
        }
        else {
            b -= a;
        }
    }

    printf("%d\n", a);
    
    return 0;
}
