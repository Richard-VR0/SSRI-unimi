#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
	int a, b;
	
	printf("Inserisci il primo numero:");
	scanf("%d", &a);
	
	printf("Inserisci il secondo numero:");
	scanf("%d", &b);
	
	printf("\nA + B: %d", a+b);
	printf("\nA - B: %d", a-b);
	printf("\nA x B: %d", a*b);
	printf("\nA / B: %d", a/b);
	printf("\nA mod B: %d", a%b);
	
	return 0;
}
