public class Venditore extends Dipendente {
    private int venditeMese;
    private int tassoVendita;

    public Venditore(String nome, String cognome, double salarioBase, int venditeMese, int tassoVendita) {
        super(nome, cognome, salarioBase);

        this.venditeMese = venditeMese;
        this.tassoVendita = tassoVendita;
    }

    @Override
    public double calcolaStipendioMensile() {
        return stipendioBase + (venditeMese * tassoVendita);
    }

    @Override
    public String toString() {
        return String.format(super.toString() + "Vendite mensili: %d\nTasso vendita: %d\n", venditeMese, tassoVendita);
    }
}