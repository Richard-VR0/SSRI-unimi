public class Tirocinante extends Dipendente {
    private String universita;
    private int mesiRimanenti;

    public Tirocinante(String nome, int stipendio, String universita, int mesiRimanenti) {
        super(nome, stipendio);

        this.universita = universita;
        this.mesiRimanenti = mesiRimanenti;
    }

    public String getUniversita() {
        return universita;
    }

    public int getMesiRimanenti() {
        return mesiRimanenti;
    }
}