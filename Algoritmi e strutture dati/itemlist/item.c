#include "item.h"
/* funzione che crea una nuova variabile di tipo item contenente la chiave k,
    e i dati satellite valint e ID*/
item new_item(key k, int valint, long unsigned int ID){	
	item it;
	copy_key(&it.chiave, k);
	it.valint = valint;
	it.ID = ID;
	return it;
}



/* funzione per restituire la chiave di una variabile di tipo item */
key get_key(item it){
	return it.chiave;
}

/* funzione per impostare a k la chiave della struttura item puntata da it. */
void set_key(item* it, key k){
	copy_key( &(it->chiave), k);
}


/* funzione per leggere da standard input i dati da inserire in un item, 
    chiave inclusa */
void leggi_item(item *it){
	if(it){
		leggi_key(&it->chiave);
		printf("\t Inserisci l'intero valint\n");
		scanf("%d", &it->valint);	
		printf("\t Inserisci l'intero positivo ID\n");
		scanf("%lu", &it->ID);	
	}else printf("\t leggi_item: input it non valido\n");
}	

/* funzione per stampare il contenuto di una variabile di tipo item */
void print_item(item it){
	printf("\t#*****  *****#\n");
	print_key(it.chiave);
	printf("\t--- valint: %d\n", it.valint);
	printf("\t--- ID: %lu\n", it.ID);
}

/* copia il contenuto di un item (source) nell'altro*/

void copy_item(item* target, item source){
			copy_key(&target->chiave, source.chiave);
			target->valint = source.valint;
			target->ID = source.ID;
}

int cmp_item(item target, item source){
			return cmp_key(target.chiave, source.chiave);
}


