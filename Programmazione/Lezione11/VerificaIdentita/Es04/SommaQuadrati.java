import java.util.Scanner;

public class SommaQuadrati {
    public static void main(String []args) {
        Scanner in = new Scanner(System.in);
        int n, i, somma_s = 0, somma_f;

        do {
            System.out.printf("\nInserisci n: ");
            n = in.nextInt();
        } while(n < 1);

        for (i = 0; i <= n; i++) {
            somma_s += i*i;
        }

        somma_f = (n * (n + 1) * ((2 * n) + 1)) / 6;

        System.out.printf("\n\nSomma con sommatoria:\t%d\nSomma con formula:\t%d\n", somma_s, somma_f);
    }
}