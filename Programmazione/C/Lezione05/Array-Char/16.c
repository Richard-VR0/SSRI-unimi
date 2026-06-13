#include <stdio.h>

#define N 256

int main() {
	char str[N + 1], car;
	int i, cont = 0;
	double frequenza;
	
	printf("\nScrivi qualcosa: ");
	fgets(str, N, stdin);
	
	printf("\nInserisci un carattere: ");
	car = getchar(); getchar();
	
	for(i = 0; str[i + 1] != '\0'; i++) {
		if (str[i] == car) {
			cont++;
		}
	}
	
	frequenza = (double) cont / i;
	
	printf("\n\nMassimo: %lf", frequenza);
	
	return 0;
}
