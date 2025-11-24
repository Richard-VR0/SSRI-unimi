#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
	int a, b, prod;
	
	printf("Inserisci il primo numero:");
	scanf("%d", &a);
	
	printf("Inserisci il secondo numero:");
	scanf("%d", &b);
	
	prod = a * b;
	
	if (prod > 0) {
		printf("Risultato maggiore di 0");
	}
	else {
		if (prod < 0) {
			printf("Risultato minore di 0");
		}
		else {
			printf("Risultato uguale a 0");
		}
	}
	
	printf("\nRisultato: %d", prod);
	
	return 0;
}
