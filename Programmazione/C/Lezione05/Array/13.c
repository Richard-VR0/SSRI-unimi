#include <stdio.h>
#include <math.h>

int main() {
	double media = 0, varianza = 0, scarto_quadratico, aux, mediana;
	int i, n, scambio;
	
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
	
	for (i = 0; i < n; i++) {
		varianza += (v[i] - media) * (v[i] - media);
	}
	
	varianza /= n;
	
	scarto_quadratico = sqrt(varianza);
	
	// Bubble sort
	scambio = 1;
	
	while (scambio) {
		scambio = 0;
		
		for (i = 0; i < n - 1; i++) {
			if (v[i] > v[i + 1]) {
				aux = v[i];
				v[i] = v[i + 1];
				v[i + 1] = aux;
				
				scambio = 1;
			}
		}
	}
	
	printf("\n\nVettore dopo: \t");
	for (i = 0; i < n; i++) {
		printf("%lf ", v[i]);
	}
	// Fine Bubble sort
	
	if (n % 2 == 0) {
		mediana = (v[n / 2] + v[(n / 2) - 1]) / 2;
	}
	else {
		mediana = v[n / 2];
	}
	
	printf("\n\nMedia: %lf\nVarianza: %lf\nScarto Quadratico: %lf\nMediana: %lf", media, varianza, scarto_quadratico, mediana);
	
	return 0;
}
