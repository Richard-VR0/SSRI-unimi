#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int info;
    struct Node* next;
} Node;

typedef struct {
    Node* head;
    int size;
} List;

int inserisciInTesta(List*, int);
int inserisciInCoda(List*, int);

int rimuoviInTesta(List*);
int rimuoviInCoda(List*);

void cancella(List*);

void stampaLista(List*);

int main(void) {
    List* lista = (List*) malloc(sizeof(List));
    lista->head = NULL;
    lista->size = 0;

    inserisciInTesta(lista, 7);

    stampaLista(lista);

    inserisciInTesta(lista, 2);

    stampaLista(lista);

    inserisciInCoda(lista, 9);

    stampaLista(lista);

    inserisciInCoda(lista, 2);

    stampaLista(lista);

    rimuoviInCoda(lista);

    stampaLista(lista);

    rimuoviInTesta(lista);

    cancella(lista);

    stampaLista(lista);

    inserisciInCoda(lista, 9);

    stampaLista(lista);

    inserisciInCoda(lista, 2);

    cancella(lista);

    return 0;
}

void stampaLista(List* lista) {
    Node* current = lista->head;
    
    printf("\nDimensione lista: %d\t\n\nLista: \t", lista->size);
    while (current != NULL) {
        printf("> %d ", current->info);

        current = current->next;
    }
    printf("> NULL\n\n");
}

int inserisciInTesta(List* lista, int numero) {
    Node* newNode = (Node*) malloc(sizeof(Node));

    if (newNode == NULL) {
        return -1;
    }

    newNode->info = numero;

    if (lista->head == NULL) {
        newNode->next = NULL;
    }
    else {
        newNode->next = lista->head;
    }

    lista->head = newNode;

    lista->size++;

    return numero;
}

int  inserisciInCoda(List* lista, int numero) {
    Node* newNode = (Node*) malloc(sizeof(Node));

    if (newNode == NULL) {
        return -1;
    }

    newNode->info = numero;

    if (lista->head == NULL) {
        lista->head = newNode;
    }
    else {
        Node* current = lista->head;

        while(current->next != NULL) {
            current = current->next;
        }

        current->next = newNode;
    }

    newNode->next = NULL;

    lista->size++;

    return numero;
}

int rimuoviInTesta(List* lista) {
    if (lista->head == NULL) {
        return -1;
    }

    Node* current = lista->head;

    lista->head = current->next;

    free(current);

    lista->size--;

    return 0;
}

int rimuoviInCoda(List* lista) {
    if (lista->head == NULL) {
        return -1;
    }

    Node* current = lista->head;
    Node* last = lista->head;

    while(current->next != NULL) {
        current = current->next;
    }

    while(last->next != current) {
        last = last->next;
    }

    last->next = NULL;

    free(current);

    lista->size--;

    return 0;
}

void cancella(List* lista) {
    Node* current = lista->head;
    Node* successivo;

    while(current != NULL) {
        successivo = current->next;
        
        free(current);

        current = successivo;
    }

    lista->head = NULL;
    lista->size = 0;
}