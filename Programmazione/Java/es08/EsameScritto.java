public class EsameScritto extends Esame {
    private int numDomande;
    private boolean superato;

    public EsameScritto(String materia, int voto, int numDomande, boolean superato) {
        super(materia, voto);

        this.numDomande = numDomande;
        this.superato = superato;
    }

    public boolean getSuperato() {
        return superato;
    }
}