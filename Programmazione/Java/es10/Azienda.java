import java.util.List;
import java.util.ArrayList;
import java.util.Iterator;

public class Azienda {
    private List<Dipendente> dipendenti;

    public Azienda() {
        dipendenti = new ArrayList<>();
    }

    public void assumi(Dipendente nuovo) {
        dipendenti.add(nuovo);
    }

    public void aumentaStipendi(double percentuale) {
        Iterator<Dipendente> index = dipendenti.iterator();

        while (index.hasNext()) {
            Dipendente d = index.next();

            d.setStipendio(d.getStipendio() + ((d.getStipendio() * percentuale) / 100));
        }
    }

    public Manager trovaManagerPerReparto(String reparto) {
        Iterator<Dipendente> index = dipendenti.iterator();

        while(index.hasNext()) {
            Dipendente d = index.next();

            if (d instanceof Manager) {
                Manager m = (Manager) d;

                if (reparto.equals(m.getReparto())) {
                    return m;
                }
            }
        }

        return null;
    }

    public Tirocinante promuoviTirocinante(String universita, int mesiRimanentiMax) {
        Iterator<Dipendente> index = dipendenti.iterator();

        while (index.hasNext()) {
            Dipendente d = index.next();
            
            if (d instanceof Tirocinante) {
                Tirocinante t = (Tirocinante) d;
                
                if (universita.equals(t.getUniversita()) && t.getMesiRimanenti() <= mesiRimanentiMax) {
                    index.remove();

                    return t;
                }
            }
        }

        return null;
    }

    public double stipendioMedio() {
        double media = 0.0f;

        Iterator<Dipendente> index = dipendenti.iterator();

        while (index.hasNext()) {
            Dipendente d = index.next();

            media += d.getStipendio();
        }

        return (double) media / dipendenti.size();
    }

    public void sort() {
        dipendenti.sort(null);
    }

    public List<Dipendente> getDipendenti() {
        return dipendenti;
    }
}