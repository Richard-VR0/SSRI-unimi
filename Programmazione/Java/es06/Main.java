public class Main {
    public static void main(String[] args) {
        Macchinetta macchinetta = new Macchinetta();

        // Aggiunta prodotti
        Merendina m1 = new Merendina("Croissant", 150, 200);
        Merendina m2 = new Merendina("Snack", 100, 350);
        Merendina m3 = new Merendina("Torta", 200, 500);
        Bevanda b1 = new Bevanda("Acqua", 50, 500);
        Bevanda b2 = new Bevanda("Succo", 120, 200);
        Bevanda b3 = new Bevanda("Energy", 180, 330);

        macchinetta.aggiungiProdotto(m1);
        macchinetta.aggiungiProdotto(m2);
        macchinetta.aggiungiProdotto(m3);
        macchinetta.aggiungiProdotto(b1);
        macchinetta.aggiungiProdotto(b2);
        macchinetta.aggiungiProdotto(b3);

        // Test compraMerendina
        System.out.println("=== Merendina (max 150 soldi, max 300 calorie) ===");
        Merendina mer = macchinetta.compraMerendina(150, 300);
        if (mer != null) {
            System.out.println("Comprata: " + mer.nome + " | costo: " + mer.getCosto() + " | calorie: " + mer.getCalorie());
        } else {
            System.out.println("Nessuna merendina disponibile");
        }

        // Test compraMerendina non disponibile
        System.out.println("=== Merendina (max 50 soldi, max 100 calorie) ===");
        Merendina merNull = macchinetta.compraMerendina(50, 100);
        if (merNull != null) {
            System.out.println("Comprata: " + merNull.nome);
        } else {
            System.out.println("Nessuna merendina disponibile");
        }

        // Test compraBevanda
        System.out.println("=== Bevanda (max 120 soldi, min 200 volume) ===");
        Bevanda bev = macchinetta.compraBevanda(120, 200);
        if (bev != null) {
            System.out.println("Comprata: " + bev.nome + " | costo: " + bev.getCosto() + " | volume: " + bev.getVolume());
        } else {
            System.out.println("Nessuna bevanda disponibile");
        }

        // Test compraBevanda non disponibile
        System.out.println("=== Bevanda (max 30 soldi, min 500 volume) ===");
        Bevanda bevNull = macchinetta.compraBevanda(30, 500);
        if (bevNull != null) {
            System.out.println("Comprata: " + bevNull.nome);
        } else {
            System.out.println("Nessuna bevanda disponibile");
        }
    }
}