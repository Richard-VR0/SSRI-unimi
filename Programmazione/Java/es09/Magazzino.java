import java.util.List;
import java.util.ArrayList;
import java.util.Iterator;

public class Magazzino {
    private List<Articolo> inventario;

    public Magazzino() {
        inventario = new ArrayList<>();
    }

    public void aggiungiArticolo(Articolo nuovo) {
        inventario.add(nuovo);
    }

    public Elettronico trovaElettronico(String marca, int garanziaMin) {
        Iterator<Articolo> index = inventario.iterator();

        while (index.hasNext()) {
            Articolo a = index.next();

            if (a instanceof Elettronico) {
                Elettronico e = (Elettronico) a;

                if (marca.equals(e.getMarca()) && e.getGaranziaMesi() >= garanziaMin) {
                    return e;
                }
            }
        }

        return null;
    }

    public Alimentare rimuoviAlimentare(boolean bio) {
        Iterator<Articolo> index = inventario.iterator();

        while (index.hasNext()) {
            Articolo a = index.next();

            if (a instanceof Alimentare) {
                Alimentare r = (Alimentare) a;

                if (r.getBio() == bio) {
                    index.remove();

                    return r;
                }
            }
        }

        return null;
    }

    public int quantitaTotale() {
        int sommaTotale = 0;

        Iterator<Articolo> index = inventario.iterator();

        while (index.hasNext()) {
            Articolo a = index.next();

            sommaTotale += a.getQuantita();
        }

        return sommaTotale;
    }

    public void sort() {
        inventario.sort(null);
    }

    public List<Articolo> getInventario() {
        return inventario;
    }
}