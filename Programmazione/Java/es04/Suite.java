public class Suite extends Stanza {
    private int numeroAmbienti;

    public Suite(int numero, int numeroLetti, int numeroAmbienti) {
        super(numero, numeroLetti);

        if (numeroAmbienti >= 2) {
            this.numeroAmbienti = numeroAmbienti;
        } else {
            this.numeroAmbienti = 2;
        }
    }

    @Override
    public String toString() {
        return super.toString() + String.format("Numero ambienti: %d", numeroAmbienti);
    }
}