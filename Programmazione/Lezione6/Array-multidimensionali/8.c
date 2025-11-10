#include <stdio.h>

#define M 3
#define N 3

int main(int argc, char* argv[]) {
    int matrix[M][N] = {{10, 20, 30},
                        {11, 21, 31},
                        {12, 22, 32}};
    int i, j, sum = 0;

    for (i = 0; i < M; i++) {
        for (j = 0; j < N; j++) {
            if (i == j) {
                sum += matrix[i][j];
            }
        }
    }

    printf("Somma: %d\n", sum);

    return 0;
}