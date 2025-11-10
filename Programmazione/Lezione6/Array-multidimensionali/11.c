#include <stdio.h>

#define M 3
#define N 3

int main(int argc, char* argv[]) {
    int matrix[M][N] = {{1, 2, 3},
                        {2, 1, 4},
                        {3, 4, 1}};
    int i, j, flag;

    flag = 1;

    for (i = 0; i < M && flag == 1; i++) {
        for (j = 0; j < N && flag == 1; j++) {
            if (matrix[i][j] != matrix[j][i]) {
                flag = 0;
            }
        }
    }

    if (flag) {
        printf("\nMatrice simmetrica\n\n");
    }
    else {
        printf("\nMatrice NON simmetrica\n\n");
    }

    return 0;
}