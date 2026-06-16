public class Elettronico extends Articolo {
    private String marca;
    private int garanziaMesi;

    public Elettronico(String nomeArticolo, int quantita, String marca, int garanziaMesi) {
        super(nomeArticolo, quantita);

        this.marca = marca;
        
        if (garanziaMesi < 6 || garanziaMesi > 36) {
            this.garanziaMesi = 12;
        }
        else {
            this.garanziaMesi = garanziaMesi;
        }
    }

    public String getMarca() {
        return marca;
    }

    public int getGaranziaMesi() {
        return garanziaMesi;
    }
}