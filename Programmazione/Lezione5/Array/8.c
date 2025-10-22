#include <stdio.h>

#define N 5

int main() {
	double v[N], media = 0;
	int i;
	
	for (i = 0; i < N; i++) {
		printf("Inserisci un numero: ");
		scanf("%lf", &v[i]);
		
		media += v[i];
	}
	
	media /= N;
	
	printf("\nMedia: %lf", media);
	
	return 0;
}
