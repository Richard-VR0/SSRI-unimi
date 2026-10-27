#include "key.h"

/* funzione che crea una nuova variabile di tipo key e ne inizializza il campo 
   codice con la stringa str.
   Restituisce la struttura*/
key new_key(char* str){	
	key k;
	if (str) 
		strcpy(k.codice, str);	
	else printf("new_key: la stringa fornita non è valida\n");	
	
	return k;
}
/* Funzione per leggere da standard input i deti per inizializzare la chiave 
    puntata da k*/
void leggi_key(key *k){
	if(k){
		printf("Inserisci codice stringa: max 15 caratteri\n");
		scanf("%s", k->codice);
	}else printf("\t leggi_key: input k non è valido\n");
}

/* funzione che copia la chiave k2 nella chiave puntata da k1. */
void copy_key(key * k1, key k2){
	if(k1) 
		strcpy(k1->codice, k2.codice);
	else 
		printf("copy_key: prima chiave non allocata\n");	
}

/* funzione per stampare il contenuto di una chiave */
void print_key(key k){
	printf("\t--- Chiave %s\n", k.codice);
}


/* Funzione per confrontare due chiavi. Restituisce il valore della funzione
   strcmp applicata sulle due strighe chiave. 
   Quindi restituisce un valore 
   < 0 se la prima chiave e' minore della seconda, 
     0 se sono uguali, 
   > 0  se la prima chiave è maggiore della seconda. */
int cmp_key(key k1, key k2){
	return strcmp(k1.codice, k2.codice);
}



