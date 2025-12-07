import java.util.Scanner;

public class arrayReverse {
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

    public static int[] reverse(int[] v) {
        int[] v_reversed = new int[v.length];
        int i;

        for(i = 0; i < v.length; i++) {
            v_reversed[i] = v[v.length - i - 1];
        }

        return v_reversed;
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
        int[] v_reversed = new int[n];

        v = readArray(n);

        v_reversed = reverse(v);

        printArray(v);
        printArray(v_reversed);
    }
}