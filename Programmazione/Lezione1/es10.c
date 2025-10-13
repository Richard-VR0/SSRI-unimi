#include <stdio.h>
#include <stdlib.h>
#include <float.h>

int main(int argc, char argv[]) {
	float num = FLT_MIN;
	
	const float k = FLT_MAX;
	
	printf("Valore: %f\n", num);
	
	num /= k;
	
	printf("Valore: %f", num);
	
	return 0;
}
