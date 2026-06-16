public class Podcast extends ContenutoAudio {
    private String argomento;

    public Podcast(String titolo, int durataSecondi, String argomento) {
        super(titolo, durataSecondi);

        this.argomento = argomento;
    }

    @Override
    public String toString() {
        return String.format("Podcast" + super.toString() + "\nArgomento: %s\n", argomento);
    }
}