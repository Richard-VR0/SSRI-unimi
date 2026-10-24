#include "item.h"

typedef struct itemlist {
    item dati;
    struct itemlist* next;
} itemlist;