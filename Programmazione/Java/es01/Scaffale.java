import java.util.ArrayList;

public class Scaffale {
    private String categoria;
    private ArrayList<Libro> catalogo;

    public Scaffale(String categoria) {
        this.categoria = categoria;

        this.catalogo = new ArrayList<>();
    }

    public void aggiungiLibro(Libro nuovo) {
        catalogo.add(nuovo);
    }

    public void attivaPrestito(int indice) {
        if (indice >= 0 && indice < catalogo.size()) {
            Libro libro_da_prestare = catalogo.get(indice);

            libro_da_prestare.attivaPrestito();
        }
        else {
            System.out.println("\nIndice libro non valido\n");
        }
    }

    public void terminaPrestito(int indice) {
        if (indice >= 0 && indice < catalogo.size()) {
            Libro libro_da_prestare = catalogo.get(indice);

            libro_da_prestare.terminaPrestito();
        }
        else {
            System.out.println("\nIndice libro non valido\n");
        }
    }

    public void visualizzaDisponibili() {
        System.out.println("\n-------------------------------------------------------\nLibri dello scaffale " + categoria + " disponibili:");

        for (Libro l: catalogo) {
            if (!(l.getPrestito())) {
                System.out.println(l.toString());
            }
        }

        System.out.println("-------------------------------------------------------");
    }

    public void visualizzaInPrestito() {
        System.out.println("\n-------------------------------------------------------\nLibri dello scaffale " + categoria + " in prestito:");

        for (Libro l: catalogo) {
            if (l.getPrestito()) {
                System.out.println(l.toString());
            }
        }

        System.out.println("-------------------------------------------------------");
    }

    public void visualizzaLibri() {
        System.out.println("\n-------------------------------------------------------\nLibri dello scaffale " + categoria + ":");
        
        for (Libro l: catalogo) {
            System.out.println(l.toString());
        }
        
        System.out.println("-------------------------------------------------------");
    }
}