#include "pila.h"

/*funzione per cancella in testa da una lista concatenata*/
itemlist* list_deletehead(itemlist * head){
	itemlist* tmp = head;
	if(head){
		head = head->next;
		free(tmp);
	}
	return head;
}
pila * create_pila(){
	pila * p = (pila *) malloc(sizeof(pila));
	if (p) p->head = NULL;
	return p;
}

pila * push(pila * p){
	p->head = list_insert(p->head);
	return p;
}



int pop(pila * p, item * out){
	
	int flag = 0;
	if(p && out){ 
		if(p->head){
			copy_item(out, get_item(p->head));
			p->head = list_deletehead(p->head);
			flag = 1;
		}
	}else{
		printf("\t Pila non allocata oppure item di output non valido\n");
	}		
	return flag;
}


int top(pila * p, item * out){
	
	int flag = 0;
	if(p && out){ 
		if(p->head){
			copy_item(out, get_item(p->head));
			flag = 1;
		}
	}else{
		printf("\t Pila non allocata oppure item di output non valido\n");
	}		
	return flag;
}



