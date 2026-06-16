public class Auto extends Veicolo {
    private int numeroPax;

    public Auto(String targa, String modello, int anno, int numeroPax) {
        super(targa, modello, anno);

        if (numeroPax >= 2 && numeroPax <= 8) {
            this.numeroPax = numeroPax;
        }
        else {
            this.numeroPax = 5;
        }
    }

    public int getNumeroPax() {
        return numeroPax;
    }
}