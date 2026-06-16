public class Main {
    public static void main(String[] args) {
        Canile canile = new Canile();

        // Aggiunta animali
        Cane c1 = new Cane("Rex", 3, "Labrador");
        Cane c2 = new Cane("Fido", 7, "Pastore");
        Cane c3 = new Cane("Bob", 2, "Labrador");
        Gatto g1 = new Gatto("Micio", 5, true);
        Gatto g2 = new Gatto("Tigre", 2, false);
        Gatto g3 = new Gatto("Luna", 8, true);

        canile.aggiungiAnimale(c1);
        canile.aggiungiAnimale(c2);
        canile.aggiungiAnimale(c3);
        canile.aggiungiAnimale(g1);
        canile.aggiungiAnimale(g2);
        canile.aggiungiAnimale(g3);

        // Test sort
        System.out.println("=== Lista ordinata per età ===");
        canile.sort();
        for (Animale a : canile.branco) {
            System.out.println(a.nome + " | età: " + a.eta);
        }

        // Test adottaCane
        System.out.println("\n=== Adotta Labrador (età max 5) ===");
        Cane adottato = canile.adottaCane("Labrador", 5);
        if (adottato != null) {
            System.out.println("Adottato: " + adottato.nome + " | razza: " + adottato.getRazza() + " | età: " + adottato.getEta());
        } else {
            System.out.println("Nessun cane disponibile");
        }

        // Test adottaCane non disponibile
        System.out.println("\n=== Adotta Bulldog (età max 10) ===");
        Cane nonTrovato = canile.adottaCane("Bulldog", 10);
        if (nonTrovato != null) {
            System.out.println("Adottato: " + nonTrovato.nome);
        } else {
            System.out.println("Nessun cane disponibile");
        }

        // Test adottaGatto
        System.out.println("\n=== Adotta gatto indoor (età max 6) ===");
        Gatto adottatoG = canile.adottaGatto(true, 6);
        if (adottatoG != null) {
            System.out.println("Adottato: " + adottatoG.nome + " | indoor: " + adottatoG.getIndoor() + " | età: " + adottatoG.getEta());
        } else {
            System.out.println("Nessun gatto disponibile");
        }

        // Test adottaGatto non disponibile
        System.out.println("\n=== Adotta gatto outdoor (età max 1) ===");
        Gatto nonTrovatoG = canile.adottaGatto(false, 1);
        if (nonTrovatoG != null) {
            System.out.println("Adottato: " + nonTrovatoG.nome);
        } else {
            System.out.println("Nessun gatto disponibile");
        }

        // Test restituisciAnimale
        System.out.println("\n=== Restituzione cane adottato ===");
        if (adottato != null) {
            canile.restituisciAnimale(adottato);
            System.out.println("Restituito: " + adottato.nome);
        }
    }
}