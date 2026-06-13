#include <stdio.h>

#define N 30

int main() {
	char str[N + 1];
	int i, car_ins = 0;
	
	do {
		printf("Inserisci una stringa: ");
		fgets(str, sizeof(str), stdin);
		
		printf("\nStringa inserita:\t%s\n", str);
		
		for (i = 0; i < N && str[i+1] != '\0'; i++);
		
		car_ins += i;
	} while (i != 0);
	
	printf("\n\nCaratteri totali inseriti:\t%d", car_ins);
	
	return 0;
}
