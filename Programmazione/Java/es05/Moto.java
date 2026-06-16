public class Moto extends Veicolo {
    private int cavalli;

    public Moto(String targa, String modello, int anno, int cavalli) {
        super(targa, modello, anno);

        if (cavalli >= 200 && cavalli <= 2000) {
            this.cavalli = cavalli;
        }
        else {
            this.cavalli = 1000;
        }
    }

    public int getCavalli() {
        return cavalli;
    }
}