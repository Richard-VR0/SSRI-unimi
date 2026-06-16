public class EsameOrale extends Esame {
    private String professore;
    private int durataMinuti;

    public EsameOrale(String materia, int voto, String professore, int durataMinuti) {
        super(materia, voto);

        this.professore = professore;
        this.durataMinuti = durataMinuti;
    }

    public String getProfessore() {
        return professore;
    }
}