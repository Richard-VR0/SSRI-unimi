#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    char var1 = 'a';
    char var2;

    printf("Il valore numerico di %c e': %d\n", var1, var1);

    var2 = var1 - 32;

    printf("Il valore numerico di %c e': %d\n", var2, var2);
    
    return 0;
}
