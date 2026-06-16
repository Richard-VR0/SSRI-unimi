import java.util.List;
import java.util.ArrayList;
import java.util.Iterator;

public class Canile {
    List<Animale> branco;

    public Canile() {
        branco = new ArrayList<>();
    }

    public void aggiungiAnimale(Animale nuovo) {
        branco.add(nuovo);
    }

    public Cane adottaCane(String razzaRichiesta, int etaMax) {
        Iterator<Animale> indice = branco.iterator();

        while(indice.hasNext()) {
            Animale a = indice.next();

            if (a instanceof Cane) {
                Cane c = (Cane) a;

                if (razzaRichiesta.equals(c.getRazza()) && c.getEta() <= etaMax) {
                    indice.remove();

                    return c;
                }
            }
        }

        return null;
    }

    public Gatto adottaGatto(boolean indoorRichiesta, int etaMax) {
        Iterator<Animale> indice = branco.iterator();

        while(indice.hasNext()) {
            Animale a = indice.next();

            if (a instanceof Gatto) {
                Gatto g = (Gatto) a;
                
                if ((g.getIndoor() == indoorRichiesta) && g.getEta() <= etaMax) {
                    indice.remove();

                    return g;
                }
            }
        }

        return null;
    }

    public void restituisciAnimale(Animale restituito) {
        branco.add(restituito);
    }

    public void sort() {
        branco.sort(null);
    }
}