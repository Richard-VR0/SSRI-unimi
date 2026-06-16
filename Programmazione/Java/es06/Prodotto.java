public abstract class Prodotto {
    protected String nome;
    protected int costo;

    public Prodotto(String nome, int costo) {
        this.nome = nome;
        this.costo = costo;
    }

    public int getCosto() {
        return costo;
    }
}