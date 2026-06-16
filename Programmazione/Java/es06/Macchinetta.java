import java.util.List;
import java.util.ArrayList;

public class Macchinetta {
    List<Prodotto> listaProdotti;

    public Macchinetta() {
        listaProdotti = new ArrayList<>();
    }

    public void aggiungiProdotto(Prodotto nuovo) {
        listaProdotti.add(nuovo);
    }

    public Merendina compraMerendina(int soldi, int calorie) {
        for (Prodotto p: listaProdotti) {
            if (p instanceof Merendina) {
                Merendina m = (Merendina) p;

                if (m.getCosto() <= soldi && m.getCalorie() <= calorie) {
                    return m;
                }
            }
        }

        return null;
    }

    public Bevanda compraBevanda(int soldi, int volume) {
        for (Prodotto p: listaProdotti) {
            if (p instanceof Bevanda) {
                Bevanda b = (Bevanda) p;

                if (b.getCosto() <= soldi && b.getVolume() >= volume) {
                    return b;
                }
            }
        }

        return null;
    }
}