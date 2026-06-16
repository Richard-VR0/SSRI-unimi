public class Cane extends Animale {
    private String razza;

    public Cane(String nome, int eta, String razza) {
        super(nome, eta);

        this.razza = razza;
    }

    public String getRazza() {
        return razza;
    }
}