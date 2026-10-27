#include "itemlist.h"

void leggi_nodo(itemlist* nodo){
	if(nodo){
		leggi_item(&nodo->dati);
		nodo->next = NULL;
	}else printf("\t leggi_nodo: input 'nodo' non valido\n");
}


/* Inserisce un nodo in testa alla lista concatenata. 
    il nuovo nodo viene allocato dinamicamente, e i suoi datti letti dall'input*/
itemlist* list_insert(itemlist* head){
	itemlist * tmp = malloc(sizeof(itemlist));
	if(tmp){
		leggi_item(&tmp->dati);
		tmp -> next = head;
		head = tmp;
	}else	printf("\t list_insert: Errore allocazione nodo\n");		
	return head; 
}


/* Funzione per cercare una chiave nella lista. 
    Viene scandito ogni nodo a partire dalla testa.
    OUTPUT: il puntatore al nodo cercato, se trovato, NULL altrimenti.
      
    Per uso interno, perché esporre i puntatori all'esterno è rischioso.
    Infatti la useremo nella cancellazione.*/ 

itemlist* list_search(itemlist *head, key k){
	itemlist *tmp; 
	if(head){
		for (tmp=head; tmp; tmp=tmp->next)
			if(!cmp_key(get_key(get_item(tmp)), k)) break;
	}else printf("list_search:...");
	return tmp;
}

/* Funzione di ricerca di una chiave per uso esterno. Restituisce in intero: 
     0 se la ricerca non ha successo
     1 altrimenti. In questo caso i dati vengono copiati nell'item puntato da out.
     */
int list_search2(itemlist* head, key k, item* out){
	itemlist * tmp;
	int flag = 0;
	if(head && out){
		for (tmp=head; tmp; tmp=tmp->next)
			if(!cmp_key(get_key(tmp->dati), k)){
				copy_item(out, get_item(tmp));
				printf("   **** Elemento trovato ***** \n");
				flag=1;
				break;
			}				
	}else{
		printf("Attenzione: lista vuota o item di output non allocato\n");
	}
	return flag;
}





itemlist* list_delete(itemlist* head, key k){
	itemlist * tmp=NULL, * todel=NULL;
	if(head){	
		/* chiave trovata nel nodo di testa */
		if(!cmp_key(get_key(head->dati), k)){
			todel = head;
			head = head->next;
		} 
		else{		
			for (tmp=head; tmp->next; tmp = tmp->next){
				/* confronto con la chiave del nodo successore, perché? */
				/* perché se lo trovo quando sono ancora nel nodo precedente, 
				     posso rimuoverlo e creare il ponte senza dove riscorrere la 
				     lista */
				if(!cmp_key(get_key(get_item(tmp->next)), k)){		
					todel = tmp->next;
					tmp->next = tmp->next->next; /* crea il ponte*/					
					break;
				}
			}			
		}
		free(todel);
		if (todel) printf("\t\tNodo trovato e cancellato\n");
		else printf("\t\tNodo assente\n");
	}
	return head;
}

/* Stampa il contenuto di tutta la lista puntata da head*/
void print_list(itemlist* head){
	if(head){
		while (head){
			print_item(get_item(head));
			printf("\t***************\n");
			head = head->next; 
		}
	}else printf("\t print_list: nodo di testa 'head' non valido\n");
}

/*  siccome i nodi vengono allocati dinamicamente, vanno alla fine deallocati
     tutti quando la lista non ci serve più*/
void list_destroy(itemlist* head){
	itemlist * tmp;
	if(head)
		while( (tmp=head) ){
			head = head->next;
			free(tmp);		
		}
}

item get_item(itemlist* tmp){
    item it;
    if (tmp){
        copy_item(&it, tmp->dati);
    }
    return it;    
}



