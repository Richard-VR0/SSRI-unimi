#include <stdio.h>

int main(int argc, char *argv[]) {
	int i, j, n, flag;
	
	do {
		printf("Inserisci una cifra massima per calcolare i numeri primi: ");
		scanf("%d", &n);
	} while(n <= 0);
	
	for(i = 3; i < n; i+=2) {
		flag = 1;
		
		for (j = 3; j < i / 2; j++) {
			if (i % j == 0) {
				flag = 0;
			}
		}
		
		if (flag) {
			printf("%d ", i);
		}
	}

    printf("\n");
	
	return 0;
}
