public abstract class ContenutoAudio implements Comparable<ContenutoAudio> {
    protected String titolo;
    protected int durataSecondi;

    public ContenutoAudio(String titolo, int durataSecondi) {
        this.titolo = titolo;
        this.durataSecondi = durataSecondi;
    }

    public int compareTo(ContenutoAudio altro) {
        return Integer.compare(this.durataSecondi, altro.durataSecondi);
    }

    @Override
    public String toString() {
        return String.format("\nTitolo: %s\nDurata in secondi: %d", titolo, durataSecondi);
    }
}