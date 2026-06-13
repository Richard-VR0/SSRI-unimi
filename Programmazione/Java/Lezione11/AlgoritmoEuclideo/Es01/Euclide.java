public class Euclide {
    public static void main(String []args) {
        int a = 228, b = 126;

        System.out.printf("\nMCD(%d, %d)", a, b);

        while (a != b) {
            if (a > b) {
                a -= b;
            }
            else {
                b -= a;
            }
        }

        System.out.printf(" = %d\n", a);
    }
}