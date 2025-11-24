#include <stdio.h>
#include <math.h>

int main() {
	double media = 0, varianza = 0, scarto_quadratico;
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
	
	for (i = 0; i < n; i++) {
		varianza += (v[i] - media) * (v[i] - media);
	}
	
	varianza /= n;
	
	scarto_quadratico = sqrt(varianza);
	
	printf("\n\nMedia: %lf\nVarianza: %lf\nScarto Quadratico: %lf", media, varianza, scarto_quadratico);
	
	return 0;
}
