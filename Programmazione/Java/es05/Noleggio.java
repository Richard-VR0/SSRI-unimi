import java.util.List;
import java.util.ArrayList;
import java.util.Iterator;

public class Noleggio {
    private List<Veicolo> listaVeicoli;

    public Noleggio() {
        listaVeicoli = new ArrayList<>();
    }

    public void aggiungiVeicolo(Veicolo nuovo) {
        listaVeicoli.add(nuovo);
    }

    public Auto noleggiaAuto(int numeroPax, int anno) {
        Iterator<Veicolo> index = listaVeicoli.iterator();

        while (index.hasNext()) {
            Veicolo v = index.next();

            if (v instanceof Auto) {
                Auto a = (Auto) v;

                if (a.getNumeroPax() >= numeroPax && a.getAnno() >= anno) {
                    index.remove();

                    a.aggiornaNumeroNoleggi();

                    return a;
                }
            }
        }

        return null;
    }

    public Moto noleggiaMoto(String modello, int cavalli) {
        Iterator<Veicolo> index = listaVeicoli.iterator();

        while (index.hasNext()) {
            Veicolo v = index.next();

            if (v instanceof Moto) {
                Moto m = (Moto) v;

                if (modello.equals(m.getModello()) && m.getCavalli() >= cavalli) {
                    index.remove();

                    m.aggiornaNumeroNoleggi();

                    return m;
                }
            }
        }

        return null;
    }

    public void restituisciVeicolo(Veicolo restituito) {
        listaVeicoli.add(restituito);
    }

    public void sort() {
        listaVeicoli.sort(null);
    }

    public List<Veicolo> getListaVeicoli() {
        return listaVeicoli;
    }
}