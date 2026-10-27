#include"../list/itemlist.h"

struct pila{
	itemlist*  head;
};
typedef struct pila pila;

pila * create_pila();

pila * push(pila * );



int pop(pila *, item*);
int top(pila *, item*);
