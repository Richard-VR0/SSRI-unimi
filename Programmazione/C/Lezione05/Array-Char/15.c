#include <stdio.h>

#define N 256

int main() {
	char str[N + 1];
	int i, max = 0;
	
	do {
		printf("\nScrivi qualcosa: ");
		fgets(str, N, stdin);
		
		for(i = 0; str[i + 1] != '\0'; i++);
		
		if (i > max) {
			max = i;
		}
	} while(i != 0);
	
	printf("\n\nMassimo: %d", max);
	
	return 0;
}
