public abstract class Esame implements Comparable<Esame> {
    protected String materia;
    protected int voto;

    public Esame(String materia, int voto) {
        this.materia = materia;
        
        if (voto >= 18 && voto <= 30) {
            this.voto = voto;
        }
        else {
            this.voto = 18;
        }
    }

    public int getVoto() {
        return voto;
    }

    @Override
    public int compareTo(Esame altro) {
        return this.voto - altro.voto;
    }
}