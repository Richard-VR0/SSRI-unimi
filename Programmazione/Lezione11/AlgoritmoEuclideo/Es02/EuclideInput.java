import java.util.Scanner;

public class EuclideInput {
    public static void main(String []args) {
        int a, b, iterazioni = 0;

        Scanner in = new Scanner(System.in);

        do {
            System.out.printf("\nInserisci a: ");
            a = in.nextInt();
        } while(a <= 0);

        do {
            System.out.printf("\nInserisci b: ");
            b = in.nextInt();
        } while(b <= 0);

        System.out.printf("\nMCD(%d, %d)", a, b);

        while (a != b) {
            if (a > b) {
                a -= b;
            }
            else {
                b -= a;
            }

            iterazioni++;
        }

        System.out.printf(" = %d\nCon %d iterazioni\n\n", a, iterazioni);
    }
}