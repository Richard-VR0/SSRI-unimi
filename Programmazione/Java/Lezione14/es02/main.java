public class main {
    public static void main(String[] args) {
        Complex a = new Complex(1, 2);
        Complex b = new Complex(2, 3);

        System.out.printf("%s\n%s", a.toString(), b.toString());

        a.sumComplex(b);
        b.subComplex(a);

        System.out.printf("\n%s\n%s", a.toString(), b.toString());
    }
}