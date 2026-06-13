import java.util.Scanner;

public class letturaArrayMetodi {
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

    public static void printArray(int[] v) {
        int i;

        System.out.printf("\n\nVettore letto: ");
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

        printArray(v);
    }
}