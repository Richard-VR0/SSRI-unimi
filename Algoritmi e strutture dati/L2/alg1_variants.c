#include "alg1_variants.h"

void swap(int* i, int* j){
	int tmp = *j;
	*j = *i;
	*i = tmp;
}

/* Original algorithm Alg1*/
int Alg1(int a[], int n) {  
   int i,j, temp, nconfronti=0; 
   for (i=0; i <= n-2; i++){
   	for (j=0; j<= n-2; j++){
   		nconfronti++;
   		if(a[j] > a[j+1]){
   			temp = a[j+1];
   			a[j+1] = a[j];
   			a[j] = temp;
   		}
   	}	
   }
   return nconfronti;
}
/* Algortihm 1 with improvement over j*/
int Alg1_impr_j(int a[], int n) {  
   int i,j, temp, nconfronti=0; 
   for (i=0; i <= n-2; i++){
	for (j=0; j <= n-2-i; j++){ /* First improvement: by construction, after i iteration, at least i element from the end are sorted, we can omit last i iter*/
		nconfronti++;
		if(a[j] > a[j+1]){
			temp = a[j+1];
			a[j+1] = a[j];
			a[j] = temp;
		}
	}	
   }
   return nconfronti;
}

/* Alg1 with improvement over i*/
int Alg1_impr_i(int a[], int n) {  
   int i,j, temp, nconfronti=0; 
   int swap = 1; /* second improvement: if one iter over j does not swap anything, we dont need next iterations over i*/
   for (i=0; i <= n-2; i++){
   	if(swap){
		swap = 0;
		for (j=0; j<= n-2; j++){
			nconfronti++; 
			if(a[j] > a[j+1]){
				swap = 1;
				temp = a[j+1];
				a[j+1] = a[j];
				a[j] = temp;
			}
		}	
	}else break;		
   }
   return nconfronti;
}
    
/* Alg1 with improvement over i and j*/
int Alg1_impr(int a[], int n) {  
   int i,j, temp, nconfronti=0; 
   int swap = 1; /* second improvement: if one iter over j does not swap anything, we dont need next iterations over i*/

   for (i=0; i <= n-2; i++){
   	 if(swap) {
		swap = 0;
		for (j = 0; j <= n-2-i; j++){ /* First improvement: by construction, after i iteration, at least i element from the end are sorted, we can omit last i iter*/
			nconfronti++;
			if(a[j] > a[j+1]){
				swap = 1;
				temp = a[j+1];
				a[j+1] = a[j];
				a[j] = temp;
			}
		}	
	 }else break;		
   }
   return nconfronti;
}   
