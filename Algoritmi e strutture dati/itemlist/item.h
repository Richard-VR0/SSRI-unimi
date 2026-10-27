#include"key.h"

struct item{
	key chiave;
	int valint;
	long unsigned int ID;
};

typedef struct item item;

item new_item(key, int, long unsigned int);

key get_key(item);
void set_key(item *, key);

void leggi_item(item*);
void print_item(item);

void copy_item(item*, item);

int cmp_item(item, item);

