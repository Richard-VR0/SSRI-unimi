public class Libro {
    private String titolo;
    private String autore;
    private boolean prestito;

    public Libro(String titolo, String autore) {
        this.titolo = titolo;
        this.autore = autore;
        this.prestito = false;
    }

    public void attivaPrestito() {
        if (prestito) {
            System.out.println("\n" + titolo + " è già in prestito ad un'altro utente");
        }
        else {
            prestito = true;

            System.out.println("\n" + titolo + " assegnato in prestito");
        }
    }

    public void terminaPrestito() {
        if (prestito) {
            prestito = false;

            System.out.println("\n" + titolo + " restituito con successo");
        }
        else {
            System.out.println("\n" + titolo + " non risulta in prestito");
        }
    }

    public String getTitolo() {
        return titolo;
    }

    public String getAutore() {
        return autore;
    }

    public boolean getPrestito() {
        return prestito;
    }

    @Override
    public String toString() {
        return String.format("\nTitolo: %s\nAutore: %s\nPrestito: %s", titolo, autore, (prestito ? "In prestito" : "Disponibile"));
    }
}