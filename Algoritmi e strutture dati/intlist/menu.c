#include "itemlist.h"

int main(){

	int scelta, res = 0;
	item it;
	key k;
	int exec = 1;
	itemlist * head = NULL;
	while(exec){		
		printf("\nChe operazione eseguire:\n--------------------------------------------\n --- 0: esci \n --- 1: crea lista vuota \n --- 2: inserisci elemento \n --- 3: ricerca elemento \n --- 4: cancella elemento \n --- 5: stampa lista \n --- 6: cancella lista\n --- -----------------------------------------\n"); 
		scanf("%d", &scelta);
		switch(scelta)
		{
			case 0:
				exec = 0;
			break;				
			case 1:
				head = NULL;
			break;
			case 2:				
				head = list_insert(head);
			break;
			case 3:
				leggi_key(&k);
				res=list_search2(head, k, &it);
				if(res) print_item(it);
				else printf("\t Elemento assente \n");
				res = 0;	
					
			break;			
			case 4:
				leggi_key(&k);
				head=list_delete(head, k);
			break;
			case 5:
				print_list(head);				
			break;
			case 6:
				list_destroy(head);
				head = NULL;				
			break;
			default: printf("\nScelta non valida\n"); 
			break;	
		}
	
	}
	return 0;
}
