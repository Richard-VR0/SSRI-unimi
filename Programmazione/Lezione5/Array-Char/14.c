#include <stdio.h>

#define N 256

int main() {
	char str[N + 1];
	int i, cont = 0;
	double media = 0;
	
	do {
		printf("\nScrivi qualcosa: ");
		fgets(str, N, stdin);
		
		for(i = 0; str[i + 1] != '\0'; i++);
		
		if (i) {
			media += i;
			cont++;
		}
	} while(i != 0);
	
	media /= cont;
	
	printf("\n\nMedia: %lf", media);
	
	return 0;
}
