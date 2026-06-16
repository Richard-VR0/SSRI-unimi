import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Azienda azienda = new Azienda();

        // Aggiunta dipendenti
        Manager m1 = new Manager("Rossi", 60000, 10, "IT");
        Manager m2 = new Manager("Bianchi", 75000, 25, "Marketing");
        Manager m3 = new Manager("Verdi", 90000, 5, "IT");
        Tirocinante t1 = new Tirocinante("Neri", 1200, "Bicocca", 3);
        Tirocinante t2 = new Tirocinante("Gialli", 1000, "Statale", 8);
        Tirocinante t3 = new Tirocinante("Blu", 1500, "Bicocca", 1);

        azienda.assumi(m1);
        azienda.assumi(m2);
        azienda.assumi(m3);
        azienda.assumi(t1);
        azienda.assumi(t2);
        azienda.assumi(t3);

        // Test sort
        System.out.println("=== Dipendenti ordinati per stipendio ===");
        azienda.sort();
        for (Dipendente d : azienda.getDipendenti()) {
            System.out.println(d.getNome() + " | stipendio: " + d.getStipendio());
        }

        // Test stipendioMedio
        System.out.println("\n=== Stipendio medio ===");
        System.out.printf("Media: %.2f%n", azienda.stipendioMedio());

        // Test aumentaStipendi
        System.out.println("\n=== Dopo aumento del 10% ===");
        azienda.aumentaStipendi(10.0);
        for (Dipendente d : azienda.getDipendenti()) {
            System.out.println(d.getNome() + " | stipendio: " + d.getStipendio());
        }

        // Test trovaManagerPerReparto
        System.out.println("\n=== Trova manager (reparto IT) ===");
        Manager managerTrovato = azienda.trovaManagerPerReparto("IT");
        if (managerTrovato != null) {
            System.out.println("Trovato: " + managerTrovato.getNome() + " | reparto: " + managerTrovato.getReparto());
        } else {
            System.out.println("Nessun manager trovato");
        }

        // Test trovaManagerPerReparto non disponibile
        System.out.println("\n=== Trova manager (reparto HR) ===");
        Manager managerNonTrovato = azienda.trovaManagerPerReparto("HR");
        if (managerNonTrovato != null) {
            System.out.println("Trovato: " + managerNonTrovato.getNome());
        } else {
            System.out.println("Nessun manager trovato");
        }

        // Test promuoviTirocinante
        System.out.println("\n=== Promuovi tirocinante (Bicocca, mesi rimanenti <= 3) ===");
        Tirocinante promosso = azienda.promuoviTirocinante("Bicocca", 3);
        if (promosso != null) {
            System.out.println("Promosso: " + promosso.getNome() + " | università: " + promosso.getUniversita() + " | mesi rimanenti: " + promosso.getMesiRimanenti());
        } else {
            System.out.println("Nessun tirocinante trovato");
        }

        // Verifica lista dopo promozione
        System.out.println("\n=== Lista dopo promozione ===");
        for (Dipendente d : azienda.getDipendenti()) {
            System.out.println(d.getNome());
        }

        // Test validazione stipendio negativo
        System.out.println("\n=== Test stipendio default ===");
        Dipendente dNegativo = new Manager("Test", -500, 5, "Test");
        System.out.println("Test | stipendio: " + dNegativo.getStipendio() + " (inserito -500, atteso 1000.0)");
    }
}