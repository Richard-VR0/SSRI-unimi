#include <time.h>
#include <stdlib.h>
#include "alg1_variants.h"
#define MAXvettSIZE 250000
int main(int argc, char** argv){
	int i,j;
	clock_t inizio,fine;
	float tempo_esec = 0.0, tempo_esec_impr = 0.0, tempo_esec_impr_i = 0.0,tempo_esec_impr_j = 0.0;
	int vett[MAXvettSIZE], vett_orig[MAXvettSIZE];
	int size, ntimes= 10; /* numero di iterazioni dell'esperimento*/ 
	int verbose = 0;
	long int confr[4]={0};
	if(argc != 4){
		printf("Usage ./confronto <size> <verbosity> <repetitions>\n");
		exit(-1);
	}
	verbose = atoi(argv[2]);
	ntimes = atoi(argv[3]);
	size = atoi(argv[1]);	

	if(size > MAXvettSIZE){
		printf("Massima dimensione consentita %d\n", MAXvettSIZE);
		exit(-1);
	}
	srand(2);
	for(j=0; j< ntimes;j++){
	   /* generazione casuale dell'input*/
		for(i = 0; i<size; i++){
				vett[i] = rand()%100;
				vett_orig[i] = vett[i]; 
		}
		for(i=0;i<size;i++) if (verbose) printf("%d ", vett_orig[i]);		
		if (verbose) putchar('\n');
		inizio = clock();		
		confr[0] += Alg1(vett, size);
		fine = clock();
		tempo_esec += (float)(fine - inizio)/CLOCKS_PER_SEC;
		for(i=0;i<size;i++){
			if (verbose)   printf("%d ", vett[i]);
			vett[i] = vett_orig[i];
		}	
		if (verbose) putchar('\n');
		inizio = clock();
		confr[1] += Alg1_impr_i(vett, size);
		fine = clock();
		tempo_esec_impr_i += (float)(fine - inizio)/CLOCKS_PER_SEC;
		for(i=0;i<size;i++){
			if (verbose) printf("%d ", vett[i]);
			vett[i] = vett_orig[i];
		}
		if (verbose) putchar('\n');
		inizio = clock();
		confr[2] += Alg1_impr_j(vett, size);
		fine = clock();
		tempo_esec_impr_j += (float)(fine - inizio)/CLOCKS_PER_SEC;
		for(i=0;i<size;i++){
			if (verbose) printf("%d ", vett[i]);
			vett[i] = vett_orig[i];
		}
		if (verbose) putchar('\n');
		inizio = clock();
		confr[3] += Alg1_impr(vett, size);
		fine = clock();
		tempo_esec_impr += (float)(fine - inizio)/CLOCKS_PER_SEC;
		for(i=0;i<size;i++){
			if (verbose) printf("%d ", vett[i]);
			vett[i] = vett_orig[i];
		}
		if (verbose) putchar('\n');
   }
	printf("Tempo di esecuzione di Alg1: %f \n", tempo_esec/ntimes);
	printf("\t Numero medio confronti: %.3e \n", (double)confr[0]/ntimes);
	printf("Tempo di esecuzione di Alg1_impr_i: %f \n", tempo_esec_impr_i/ntimes);
	printf("\t Numero medio confronti: %.3e, guadagno %.3e \n", (float)confr[1]/ntimes, (double)(confr[0]-confr[1])/ntimes);
	printf("Tempo di esecuzione di Alg1_impr_j: %f \n", tempo_esec_impr_j/ntimes);
	printf("\t Numero medio confronti: %.3e, guadagno %.3e \n", (float)confr[2]/ntimes, (double)(confr[0]-confr[2])/ntimes);
	printf("Tempo di esecuzione di Alg1_impr: %f \n", tempo_esec_impr/ntimes);
	printf("\t Numero medio confronti: %.3e, guadagno %.3e \n", (float)confr[3]/ntimes, (double)(confr[0]-confr[3])/ntimes);
   return 0;
}
