#define STRLEN 16
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
struct key{
	char codice[STRLEN];
};
typedef struct key key;

key new_key(char *);

void leggi_key(key *);

void copy_key(key *, key);

void destroy_key(key*);

int cmp_key(key, key);

void print_key(key);
