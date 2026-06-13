#include <stdio.h>

int main() {
    /*
    se !domenica
        se !pioggia e previsioni_buone
            se giorno_pari
                giardini pubblici con libro

            altrimenti
                caffe con diario

        altrimenti
            non esce

    altrimenti
        se pioggia o !previsioni_buone
                visita da Precisina ombrello

        altrimenti
                visita da Precisina parasole
    */

    int domenica, pioggia, previsioni_buone, giorno_pari, errore;
    char ch;
    
    errore = 0;
    
    printf("E' domenica?");
    ch = getchar();
    if (ch == 'S' || ch == 'N') {
    	domenica = ch % 2;
    	
    	getchar();
	}
	else {
		errore = 1;
	}
	
	printf("Piove?");
	ch = getchar();
    if (ch == 'S' || ch == 'N') {
    	pioggia = ch % 2;
    	
    	getchar();
	}
	else {
		errore = 1;
	}
	
	printf("Sono buole le previsioni?");
	ch = getchar();
    if (ch == 'S' || ch == 'N') {
    	previsioni_buone = ch % 2;
    	
    	getchar();
	}
	else {
		errore = 1;
	}
	
	printf("E' un giorno pari?");
	ch = getchar();
    if (ch == 'S' || ch == 'N') {
    	giorno_pari = ch % 2;
    	
    	getchar();
	}
	else {
		errore = 1;
	}

    if (!errore) {
    	if (!domenica) {
	        if (!pioggia && previsioni_buone) {
	            if (giorno_pari) {
	                printf("\nIl signor Pignolino oggi e' uscito per recarsi ai giardini pubblici. Ha portato con se' un libro.\n");
	            }
	            else {
	                printf("\nIl signor Pignolino oggi e' uscito per recarsi al Caffe'. Ha portato con se' il suo diario.\n");
	            }
	        }
	        else {
	            printf("\nIl signor Pignolino oggi non e' uscito.\n");
	        }
	    }
	    else {
	        if (!pioggia || !previsioni_buone) {
	            printf("\n Il signor Pignolino oggi e' uscito per recarsi dalla signora Precisina. Ha portato con se' un ombrello.\n");
	        }
	        else {
	            printf("\n Il signor Pignolino oggi e' uscito per recarsi dalla signora Precisina. Ha portato con se' un parasole.\n");
	        }
	    }
	}
	else {
		printf("Errore nell'inserimento di una risposta'");
	}

    return 0;
}
