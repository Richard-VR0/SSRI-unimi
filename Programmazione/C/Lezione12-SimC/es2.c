#include <stdio.h>
#include <stdlib.h>

#define N 3

typedef struct Pattern {
    int h, w;
    int* pmatrix;
    int x, y;
} Pattern;

void inizializza(int[][N]);         //Inizializzazione del mondo con valori casuali
void stampa(int[][N]);              //Stampa del mondo

int vicini(int[][N], int, int);     //Controllo delle 8 celle adiacenti

void nuovaGenerazione(int[][N]);    //Generazione della nuova generazione di celle

void inserisciPattern(int[][N], Pattern);

int main(void) {
    int mondo[N][N];
    
    inizializza(mondo);

    stampa(mondo);

    nuovaGenerazione(mondo);

    stampa(mondo);

    return 0;
}

void inizializza(int mondo[][N]) {
    int i, j;
    
    for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++) {
            mondo[i][j] = (rand() % 2);
        }
    }
}

//---DA MODIFICARE IN " " E "#"---
void stampa(int mondo[][N]) {
    int i, j;

    printf("\n\n");

    for (i = 0; i < N; i++) {
        printf("|");
        for (j = 0; j < N; j++) {
            if (mondo[i][j] == 1) {
                printf("M ");   //Cella morta (= 1)
            }
            else {
                printf("V ");   //Cella viva (= 0)
            }
        }

        printf("|\n");
    }

    printf("\n\n");
}

int vicini(int mondo[][N], int x, int y) {
    int i, j, cont_vive = 0;

    for (i = (x - 1); i <= (x + 1); i++) {
        for (j = (y - 1); j <= (y + 1); j++) {
            if (i >= 0 && i < N && j >= 0 && j < N) {
                if(mondo[i][j] == 0 && !(x == i && y == j)) {
                    cont_vive++;    //Cella viva (i,j) adiacente a quella (x,y) conteggiata
                }
            }
        }
    }

    return cont_vive;   //Ritorno delle celle vive adiacenti a quella (x,y)
}

void nuovaGenerazione(int mondo[][N]) {
    int i, j, vive, modifiche[N][N];

    for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++) {
            vive = vicini(mondo, i, j);

            if(mondo[i][j] == 0) {
                if (vive < 2 || vive > 3) {
                    modifiche[i][j] = 1;            //Viva -> Morta (vive vicine <2 o >3)
                }
                else {
                    modifiche[i][j] = 0;            //Viva -> Viva (vive vicine =2 o =3)
                }
            }
            else {
                if (vive == 3) {
                    modifiche[i][j] = 0;            //Morta -> Viva (vive vicine =3)
                }
                else {
                    modifiche[i][j] = 1;            //Morta -> Morta (vive vicine <3)
                }
            }
        }
    }

    for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++) {
            mondo[i][j] = modifiche[i][j];          //Copia della matrice delle modifiche nel mondo
        }
    }
}

void inserisciPattern(int[][N], Pattern) {

}