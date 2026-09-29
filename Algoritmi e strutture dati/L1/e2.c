#include <stdio.h>
int test(int n) {
    int f = 0;
    int f0 = 1;
    int f1 = 0;
    while (n > 0) {
        n--;
        f = f0 + f1;
        f0 = f1;
        f1 = f;
    }
    return f;
}
int main() {
    int x, i;

    scanf("%d", &x);

    printf("\n");

    for (i = 0; i < x; i++) {
        printf("%d\t", test(i));
    }

    printf("\n\n");

    return 0;
}