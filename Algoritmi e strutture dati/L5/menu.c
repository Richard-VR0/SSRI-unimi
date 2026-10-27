#include "pila.h"

int main(){

	int scelta, res = 0;
	item it;
	int exec = 1;
	pila * P = NULL;
	while(exec){		
		printf("\nChe operazione eseguire:\n--------------------------------------------\n --- 0: esci \n --- 1: crea pila vuota \n --- 2: push \n --- 3: pop \n --- 4: top \n --- 5: cancella pila\n--------------------------------------------\n");
		scanf("%d", &scelta);
		switch(scelta)
		{
			case 0:
				exec = 0;
			break;				
			case 1:
				P = create_pila();
			break;
			case 2:				
				if (P) push(P);
				else printf("\t Pila da creare \n");
			break;
			case 3:
				res = pop(P, &it);
				if(res) print_item(it);
				else printf("\t Impossibile accedere alla pila \n");
				res = 0;	
						
			break;			
			case 4:
				res = top(P, &it);
				if(res) print_item(it);
				else printf("\t Impossibile accedere alla pila \n");
				res = 0;	
			break;
			case 5:
				if(P) {
					list_destroy(P->head);
					free (P);
					P = NULL;
				}else printf("Pila non ancora creata\n");				
			break;
			default: printf("\nScelta non valida\n"); 
			break;	
		}
	
	}
	return 0;
}
