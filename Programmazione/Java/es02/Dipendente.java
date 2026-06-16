public abstract class Dipendente {
    protected String nome;
    protected String cognome;
    protected double stipendioBase;

    public Dipendente(String nome, String cognome, double stipendioBase) {
        this.nome = nome;
        this.cognome = cognome;
        this.stipendioBase = stipendioBase;
    }

    public abstract double calcolaStipendioMensile();

    @Override
    public String toString() {
        return String.format("\nNome: %s\nCognome: %s\nStipendio base: %.2f\n", nome, cognome, stipendioBase);
    }
}