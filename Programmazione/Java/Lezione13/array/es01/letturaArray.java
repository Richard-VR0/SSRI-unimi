import java.util.Scanner;

public class letturaArray {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        
        int n, i;

        do {
            System.out.printf("Quanti numeri vuoi inserire: ");
            n = in.nextInt();
        } while(n <= 0);

        int[] v = new int[n];

        for (i = 0; i < v.length; i++) {
            System.out.printf("Inserisci un numero: ");
            v[i] = in.nextInt();
        }

        System.out.printf("\n\nVettore letto: ");
        for (i = 0; i < v.length; i++) {
            System.out.printf("%d ", v[i]);
        }
    }
}