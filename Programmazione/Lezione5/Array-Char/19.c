#include <stdio.h>

#define N 256

int main() {
	char s1[N + 1], s2[N + 1];
	int i, j, contenuto;
	
	printf("Scrivi qualcosa: ");
	fgets(s1, N, stdin);
	
	printf("Scrivi qualcosa: ");
	fgets(s2, N, stdin);
	
	contenuto = 1;
	
	for (i = 0; s1[i + 1] != '\0' && contenuto == 1; i++) {
		for (j = 0; s2[j + 1] != '\0' && contenuto == 1; j++) {
			if (s1[i + j] != s2[j]) {
				contenuto = 0;
			}
		}
	}
	
	if (contenuto) {
		printf("\n\nSI");
	}
	else {
		printf("\n\nNo");
	}
	
	return 0;
}
