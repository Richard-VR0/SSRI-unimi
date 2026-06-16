public abstract class Dipendente implements Comparable<Dipendente> {
    protected String nome;
    protected double stipendio;

    public Dipendente(String nome, double stipendio) {
        this.nome = nome;
        
        if (stipendio >= 0) {
            this.stipendio = stipendio;
        }
        else {
            this.stipendio = 1000.0;
        }
    }

    public double getStipendio() {
        return stipendio;
    }

    public void setStipendio(double stipendio) {
        this.stipendio = stipendio;
    }

    public String getNome() {
        return nome;
    }

    @Override
    public int compareTo(Dipendente altro) {
        return Double.compare(this.stipendio, altro.stipendio);
    }
}