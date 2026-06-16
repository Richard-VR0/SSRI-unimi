public class Gatto extends Animale {
    private boolean indoor;

    public Gatto(String nome, int eta, boolean indoor) {
        super(nome, eta);

        this.indoor = indoor;
    }

    public boolean getIndoor() {
        return indoor;
    }
}