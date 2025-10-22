#include <stdio.h>

#define N 10

int main() {
	int v[N], i, scambio, aux, n_scambi = 0;
	
	for (i = 0; i < N; i++) {
		printf("Inserisci un numero: ");
		scanf("%d", &v[i]);
	}
	
	printf("\n\nVettore prima: \t");
	for (i = 0; i < N; i++) {
		printf("%d ", v[i]);
	}
	
	scambio = 1;
	
	while (scambio) {
		scambio = 0;
		
		for (i = 0; i < N - 1; i++) {
			if (v[i] > v[i + 1]) {
				aux = v[i];
				v[i] = v[i + 1];
				v[i + 1] = aux;
				
				scambio = 1;
				
				n_scambi++;
			}
		}
	}
	
	printf("\n\nVettore dopo: \t");
	for (i = 0; i < N; i++) {
		printf("%d ", v[i]);
	}
	
	printf("\nNumero scambi: %d", n_scambi);
	
	return 0;
}
