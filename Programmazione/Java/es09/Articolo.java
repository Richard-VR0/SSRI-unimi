public abstract class Articolo implements Comparable<Articolo> {
    protected String nomeArticolo;
    protected int quantita;

    public Articolo(String nomeArticolo, int quantita) {
        this.nomeArticolo = nomeArticolo;
        
        if (quantita < 0) {
            this.quantita = 0;
        }
        else {
            this.quantita = quantita;
        }
    }

    public int getQuantita() {
        return quantita;
    }

    @Override
    public int compareTo(Articolo altro) {
        return this.quantita - altro.quantita;
    }
}