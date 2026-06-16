import java.util.List;
import java.util.ArrayList;
import java.util.Iterator;

public class Studente {
    private String nome;
    private List<Esame> listaEsami;

    public Studente(String nome) {
        this.nome = nome;

        listaEsami = new ArrayList<>();
    }

    public void aggiungiEsame(Esame nuovo) {
        listaEsami.add(nuovo);
    }

    public double mediaVoti() {
        double media = 0.0f;
        
        for (Esame e: listaEsami) {
            media += e.getVoto();
        }

        return media / listaEsami.size();
    }

    public EsameOrale cercaOrale(String professore, int votoMin) {
        Iterator<Esame> indice = listaEsami.iterator();

        while(indice.hasNext()) {
            Esame e = indice.next();

            if (e instanceof EsameOrale) {
                EsameOrale o = (EsameOrale) e;

                if (professore.equals(o.getProfessore()) && o.getVoto() >= votoMin) {
                    return o;
                }
            }
        }

        return null;
    }

    public ArrayList<EsameScritto> scrittiSuperati() {
        ArrayList<EsameScritto> superati = new ArrayList<>();
        
        for (Esame e: listaEsami) {
            if (e instanceof EsameScritto) {
                EsameScritto s = (EsameScritto) e;

                if (s.getSuperato() == true) {
                    superati.add(s);
                }
            }
        }

        return superati;
    }

    public void sort() {
        listaEsami.sort(null);
    }

    public List<Esame> getListaEsami() {
        return listaEsami;
    }
}