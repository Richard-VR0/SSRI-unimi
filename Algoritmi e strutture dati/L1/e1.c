#include <stdio.h>

#define N 5

/*
begin Alg1(list)
    for each i from 0 to list.length-2 do
        for each j from i to list.length-2 do
            if list[j] > list[j+1]
                swap(list[j], list[j+1])
            end if
        end for
    end for
    
    return list
end Alg1
*/

void printList(int* list) {
    int i;

    printf("\n");
    
    for (i = 0; i < N; i++) {
        printf("%d\t", list[i]);
    }

    printf("\n");
}

void swap(int* n1, int* n2) {
    int aux;

    aux = *n1;
    *n1 = *n2;
    *n2  = aux;
}

void Alg1(int* list) {
    int i, j, aux, scambio;

    while (scambio) {
        scambio = 0;

        for (i = 0; i < N-1; i++) {
            if (list[i] > list[i+1]) {
                swap(&list[i], &list[i+1]);

                scambio = 1;
            }
        }
    }
}

int main() {
    int list[N] = {5, 4, 3, 2, 1};

    printList(list);

    Alg1(list);

    printList(list);

    return 0;
}