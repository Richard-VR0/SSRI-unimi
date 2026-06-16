public class Canzone extends ContenutoAudio {
    private String autore;

    public Canzone(String titolo, int durataSecondi, String autore) {
        super(titolo, durataSecondi);

        this.autore = autore;
    }

    @Override
    public String toString() {
        return String.format("Canzone" + super.toString() + "\nAutore: %s\n", autore);
    }
}