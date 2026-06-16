public abstract class Animale implements Comparable<Animale> {
    protected String nome;
    protected int eta;

    public Animale(String nome, int eta) {
        this.nome = nome;
        this.eta = eta;
    }

    public int getEta() {
        return eta;
    }

    @Override
    public int compareTo(Animale altro) {
        return this.eta - altro.eta;
    }
}