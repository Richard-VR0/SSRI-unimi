#include <stdio.h>

#define N 256

int main() {
	char str[N + 1];
	int i;
	
	printf("Scrivi qualcosa: ");
	fgets(str, N, stdin);
	
	printf("\nPrima:\t%s", str);
	
	for (i = 0; str[i + 1] != '\0'; i++) {
		if (str[i] >= 97 && str[i] <= 122) {
			str[i] -= 32;
		}
	}
	
	printf("\nDopo:\t%s", str);
	
	return 0;
}
