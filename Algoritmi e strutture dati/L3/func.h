#include <stdio.h>
#include <stdlib.h>

typedef struct tripletta {
    unsigned int n1, n2;
    float f;
} tripletta;

int leggi_triplette(FILE*, tripletta*, int);