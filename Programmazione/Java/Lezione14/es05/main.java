public class main {
    public static void main(String[] args) {
        Frazione f1 = new Frazione(4, 2);
        Frazione f2 = new Frazione(1, 3);

        System.out.printf("%s\n%s\n\nisMinore: %b\nisMaggiore: %b\nequals: %b\n", f1.toString(), f2.toString(), f1.isMinore(f2), f1.isMaggiore(f2), f1.equals(f2));

        f1.inversa();

        System.out.printf("%s", inv.toString());

        f1.semplifica();

        System.out.printf("%s", f1.toString());
    }
}