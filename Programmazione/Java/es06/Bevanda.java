public class Bevanda extends Prodotto {
    private int volume;

    public Bevanda(String nome, int costo, int volume) {
        super(nome, costo);

        this.volume = volume;
    }

    public int getVolume() {
        return volume;
    }
}