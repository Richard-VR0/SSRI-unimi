#include <stdio.h>
#include <stdlib.h>
#include <float.h>

int main(int argc, char *argv[]) {
	double a, b;
	
	printf("Inserisci il primo numero:");
	scanf("%lf", &a);
	
	printf("Inserisci il secondo numero:");
	scanf("%lf", &b);
	
	printf("\nA + B: %lf", a + b);
	printf("\nA - B: %lf", a - b);
	printf("\nA x B: %lf", a * b);
	printf("\nA / B: %lf", a / b);
	
	return 0;
}
