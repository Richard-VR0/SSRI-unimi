public abstract class Stanza {
    protected int numero;
    protected int numeroLetti;
    protected String nomeOspite;

    public Stanza(int numero, int numeroLetti) {
        this.numero = numero;
        this.numeroLetti = numeroLetti;

        this.nomeOspite = null;
    }

    @Override
    public String toString() {
        return String.format("\nNumero stanza: %d\nNumero letti: %d\nOspite: %s\n", numero, numeroLetti, (nomeOspite == null ? "vuota" : nomeOspite));
    }
}