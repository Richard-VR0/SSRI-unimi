#include "itemlist.h"

typedef struct itemlist {
    item dati;
    struct itemlist* next;
} itemlist;