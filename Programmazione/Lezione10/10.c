#include <stdio.h>
#include <stdlib.h>

#define FILEIN "10input.txt"
#define FILEOUT "10output.txt"

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

int salva(List*, char*);
int carica(List*, char*);

int rimuovi(List*, int);

int main(void) {
    List* lista = (List*) malloc(sizeof(List));
    lista->head = NULL;
    lista->size = 0;

    carica(lista, FILEIN);

    salva(lista, FILEOUT);

    stampaLista(lista);

    rimuovi(lista, 6);

    stampaLista(lista);

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

int salva(List* lista, char* file) {
    FILE* file_out = fopen(file, "w");

    if (file_out == NULL) {
        return -1;
    }

    Node* current = lista->head;

    while(current != NULL) {
        fprintf(file_out, "%d\n", current->info);

        current = current->next;
    }

    fclose(file_out);

    return 0;
}

int carica(List* lista, char* file) {
    FILE* file_in = fopen(file, "r");
    int numero_letto;

    if (file_in == NULL) {
        return -1;
    }

    while(fscanf(file_in, "%d\n", &numero_letto) != EOF) {
        inserisciInTesta(lista, numero_letto);
    }

    return 0;
}

int rimuovi(List* lista, int elem) {
    Node* current = lista->head;
    Node* successivo = current->next;

    while(current != NULL) {
        if(successivo->info == elem) {
            current->next = successivo->next;

            free(successivo);

            lista->size--;

            return elem;
        }

        current = current->next;
        successivo = successivo->next;
    }

    return -1;
}