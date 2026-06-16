import java.util.ArrayList;

public class Hotel {
    private ArrayList<Stanza> stanze;

    public Hotel() {
        this.stanze = new ArrayList<>();
    }

    public void aggiungiStanza(Stanza nuova) {
        stanze.add(nuova);
    }

    public Stanza assegna(String nomeOspite, boolean suite, int numeroLetti) {
        for (Stanza s: stanze) {
            if (s.nomeOspite == null) {
                if (numeroLetti < s.numeroLetti) {
                    if (suite && (s instanceof Suite)) {
                        s.nomeOspite = nomeOspite;
                        return s;
                    }
                    
                    if (!suite && (s instanceof Stanza)) {
                        s.nomeOspite = nomeOspite;
                        return s;
                    }
                }
            }
        }

        return null;
    }

    public Stanza liberaStanza(String nomeOspite) {
        for (Stanza s: stanze) {
            if (nomeOspite.equals(s.nomeOspite)) {
                s.nomeOspite = null;

                return s;
            }
        }

        return null;
    }

    @Override
    public String toString() {
        String riepilogoStanze = "";

        for (Stanza s: stanze) {
            riepilogoStanze += "\n" + s.toString() + "\n";
        }

        return riepilogoStanze;
    }
}