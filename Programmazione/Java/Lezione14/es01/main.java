public class main {
    public static void main(String[] args) {
        Contatore cont = new Contatore();

        System.out.printf("%s", cont.toString());

        cont.inc();

        System.out.printf("%s", cont.toString());

        cont.inc();

        System.out.printf("%s", cont.toString());

        cont.reset();

        System.out.printf("%s", cont.toString());
    }
}