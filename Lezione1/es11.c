#include <stdio.h>
#include <stdlib.h>
#include <float.h>

int main(int argc, char *argv[]) {
	int intera;
	double decimale;
	
	printf("Inserisci numero: ");
	scanf("%d", &intera);
	printf("\nValore: %d", intera);
	
	printf("\n\nInserisci numero: ");
	scanf("%lf", &decimale);
	printf("\nValore: %lf", decimale);
	
	return 0;
}
