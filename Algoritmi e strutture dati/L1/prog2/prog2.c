/* prog2.c */
#include "prog2.h"
int main(void){
	int n_euro = geteuro();
	double n_lire = n_euro * LIRE_PER_EURO;
	putlire(n_euro,n_lire);
	return 0;
}