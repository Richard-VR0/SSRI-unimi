import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Magazzino magazzino = new Magazzino();

        // Aggiunta articoli
        Elettronico e1 = new Elettronico("Smartphone", 10, "Samsung", 24);
        Elettronico e2 = new Elettronico("Tablet", 5, "Apple", 12);
        Elettronico e3 = new Elettronico("Cuffie", 20, "Samsung", 6);
        Alimentare a1 = new Alimentare("Pasta", 50, "2027-01-01", true);
        Alimentare a2 = new Alimentare("Riso", 30, "2026-12-31", false);
        Alimentare a3 = new Alimentare("Latte", -5, "2026-08-01", true); // quantità → 0 di default

        magazzino.aggiungiArticolo(e1);
        magazzino.aggiungiArticolo(e2);
        magazzino.aggiungiArticolo(e3);
        magazzino.aggiungiArticolo(a1);
        magazzino.aggiungiArticolo(a2);
        magazzino.aggiungiArticolo(a3);

        // Test sort
        System.out.println("=== Inventario ordinato per quantità ===");
        magazzino.sort();
        for (Articolo art : magazzino.getInventario()) {
            System.out.println(art.nomeArticolo + " | quantità: " + art.quantita);
        }

        // Test quantitaTotale
        System.out.println("\n=== Quantità totale ===");
        System.out.println("Totale: " + magazzino.quantitaTotale());

        // Test trovaElettronico
        System.out.println("\n=== Trova elettronico (Samsung, garanzia min 12) ===");
        Elettronico trovato = magazzino.trovaElettronico("Samsung", 12);
        if (trovato != null) {
            System.out.println("Trovato: " + trovato.nomeArticolo + " | marca: " + trovato.getMarca() + " | garanzia: " + trovato.getGaranziaMesi());
        } else {
            System.out.println("Nessun elettronico trovato");
        }

        // Test trovaElettronico non disponibile
        System.out.println("\n=== Trova elettronico (Sony, garanzia min 12) ===");
        Elettronico nonTrovato = magazzino.trovaElettronico("Sony", 12);
        if (nonTrovato != null) {
            System.out.println("Trovato: " + nonTrovato.nomeArticolo);
        } else {
            System.out.println("Nessun elettronico trovato");
        }

        // Test rimuoviAlimentare
        System.out.println("\n=== Rimuovi alimentare bio (true) ===");
        Alimentare rimosso = magazzino.rimuoviAlimentare(true);
        if (rimosso != null) {
            System.out.println("Rimosso: " + rimosso.nomeArticolo + " | bio: " + rimosso.getBio());
        } else {
            System.out.println("Nessun alimentare trovato");
        }

        // Verifica che sia stato rimosso dall'inventario
        System.out.println("\n=== Inventario dopo la rimozione ===");
        for (Articolo art : magazzino.getInventario()) {
            System.out.println(art.nomeArticolo);
        }

        // Test validazione quantità negativa
        System.out.println("\n=== Test quantità default ===");
        System.out.println("Latte | quantità: " + a3.getQuantita() + " (inserito -5, atteso 0)");
    }
}