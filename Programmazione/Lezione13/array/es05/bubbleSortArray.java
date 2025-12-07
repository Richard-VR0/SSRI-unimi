import java.util.Scanner;

public class bubbleSortArray {
    public static int[] readArray(int n) {
        Scanner in = new Scanner(System.in);

        int[] v = new int[n];
        int i;
        
        for (i = 0; i < v.length; i++) {
            System.out.printf("Inserisci un numero: ");
            v[i] = in.nextInt();
        }

        return v;
    }

    public static void sortArray(int[] v) {
        boolean scambio = true;
        int i, aux;

        while(scambio) {
            scambio = false;

            for(i = 0; i <= (v.length - 2); i++) {
                if (v[i] > v[i + 1]) {
                    aux = v[i];
                    v[i] = v[i + 1];
                    v[i + 1] = aux;

                    scambio = true;
                }
            }
        }
    }

    public static void printArray(int[] v) {
        int i;

        System.out.printf("\n\nVettore: ");
        for (i = 0; i < v.length; i++) {
            System.out.printf("%d ", v[i]);
        }
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        
        int n;

        do {
            System.out.printf("Quanti numeri vuoi inserire: ");
            n = in.nextInt();
        } while(n <= 0);

        int[] v = new int[n];

        v = readArray(n);

        sortArray(v);

        printArray(v);
    }
}