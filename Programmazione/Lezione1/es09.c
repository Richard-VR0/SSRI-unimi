#include <stdio.h>
#include <stdlib.h>

int main(int argc, char argv[]) {
	int var = INT_MAX;
	
	printf("Prima %d\n", var);
	
	var += 1;
	
	printf("Dopo %d", var);
	
	return 0;
}
