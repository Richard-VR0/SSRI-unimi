public class Programmatore extends Dipendente {
    private String linguaggio;

    public Programmatore(String nome, String cognome, double salarioBase, String linguaggio) {
        super(nome, cognome, salarioBase);
        
        this.linguaggio = linguaggio;
    }

    @Override
    public double calcolaStipendioMensile() {
        return stipendioBase + 200.0;
    }

    @Override
    public String toString() {
        return String.format(super.toString() + "Linguaggio: %s\n", linguaggio);
    }
}