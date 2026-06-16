public class Manager extends Dipendente {
    private int dimensioneTeam;
    private String reparto;

    public Manager(String nome, double stipendio, int dimensioneTeam, String reparto) {
        super(nome, stipendio);

        if (dimensioneTeam >= 1 && dimensioneTeam <= 50) {
            this.dimensioneTeam = dimensioneTeam;
        }
        else {
            this.dimensioneTeam = 5;
        }

        this.reparto = reparto;
    }

    public String getReparto() {
        return reparto;
    }
}