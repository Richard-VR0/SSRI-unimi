#include <stdio.h>

#define M 3
#define N 3

int main(int argc, char* argv[]) {
    int matrix[M][N] = {{10, 20, 4},
                        {2, 21, 31},
                        {33, 22, 32}};
    int i, j, max_x = 0, max_y = 0, min_x = 0, min_y = 0;

    for (i = 0; i < M; i++) {
        for (j = 0; j < N; j++) {
            if (matrix[i][j] > matrix[max_x][max_y]) {
                max_x = i;
                max_y = j;
            }

            if (matrix[i][j] < matrix[min_x][min_y]) {
                min_x = i;
                min_y = j;
            }
        }
    }

    printf("\nMassimo matrix[%d][%d] = %d\n", max_x, max_y, matrix[max_x][max_y]);
    printf("\n\nMinore matrix[%d][%d] = %d\n\n", min_x, min_y, matrix[min_x][min_y]);

    return 0;
}