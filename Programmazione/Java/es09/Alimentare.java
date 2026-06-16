public class Alimentare extends Articolo {
    private String scadenza;
    private boolean bio;

    public Alimentare(String nomeArticolo, int quantita, String scadenza, boolean bio) {
        super(nomeArticolo, quantita);

        this.scadenza = scadenza;
        this.bio = bio;
    }

    public boolean getBio() {
        return bio;
    }
}