#include <stdio.h>

int main() {
	double media = 0;
	int i, n;
	
	do {
		printf("Inserire la dimensione dell'array: ");
		scanf("%d", &n);
	} while (n <= 0);
	
	double v[n];
	
	for (i = 0; i < n; i++) {
		printf("Inserisci un numero: ");
		scanf("%lf", &v[i]);
		
		media += v[i];
	}
	
	media /= n;
	
	printf("\nMedia: %lf", media);
	
	return 0;
}