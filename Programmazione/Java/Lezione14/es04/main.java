public class main {
    public static void main(String[] args) {
        Vett centro = new Vett(1, 2);
        Vett centro2 = new Vett(1, 13);
        Cerchio a = new Cerchio(3, centro);
        Cerchio b = new Cerchio(5, centro);

        System.out.printf("%s\nCirconferenza: %f\nArea: %f", a.toString(), a.getCirconferenza(), a.getArea());
        System.out.printf("\n\n%s\nCirconferenza: %f\nArea: %f", b.toString(), b.getCirconferenza(), b.getArea());

        //a.setCentro(centro2);

        //a.setRaggio(1);

        System.out.printf("\n\nConcentrici: %b", a.isConcetric(b));
        System.out.printf("\n\nContains: %b", a.contains(b));
    }
}