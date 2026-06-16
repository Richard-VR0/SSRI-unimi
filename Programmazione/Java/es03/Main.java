import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<ContenutoAudio> contenuti = new ArrayList<>();

        contenuti.add(new Canzone("La bamba", 100, "I Righeira"));
        contenuti.add(new Canzone("Stairway to heaven", 200, "Led Zeppelin"));
        contenuti.add(new Canzone("Paranoid", 250, "Black Sabbath"));

        contenuti.add(new Podcast("Trump in realtà è gay", 100, "Politica"));
        contenuti.add(new Podcast("Galeazzi non è più come prima", 199, "Tecnologia"));

        for (ContenutoAudio c: contenuti) {
            System.out.println(c.toString());
        }
    }
}