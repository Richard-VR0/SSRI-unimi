#include "item.h"

struct itemlist{
	item dati;
	struct itemlist* next;
};
typedef struct itemlist itemlist;

void leggi_nodo(itemlist*);

item get_item(itemlist);
itemlist* list_insert(itemlist*);


itemlist* list_search(itemlist*, key);
itemlist* list_search_old(itemlist*, key);
int list_search2(itemlist*, key, item*);

itemlist* list_delete(itemlist*, key);
void print_list(itemlist*);

void list_destroy(itemlist*);
