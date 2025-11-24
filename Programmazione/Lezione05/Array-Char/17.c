#include <stdio.h>

#define N 256

int main() {
	char str[N + 1], car;
	int i, cont;
	double frequenza;
	
	do {
		printf("Scrivi qualcosa: ");
		fgets(str, N, stdin);
		
		printf("\nInserisci un carattere: ");
		car = getchar();
		
		if (car != '\n') {
			getchar();
			
			cont = 0;
		
			for(i = 0; str[i + 1] != '\0'; i++) {
				if (str[i] == car) {
					cont++;
				}
			}
			
			frequenza = (double) cont / i;
			
			printf("\nMassimo: %lf\n\n", frequenza);
		}
	} while (car != '\n');
	
	return 0;
}
