public class Main {
    public static void main(String[] args) {
        Noleggio noleggio = new Noleggio();

        // Aggiunta veicoli
        Auto a1 = new Auto("AA111AA", "OPEL", 2020, 5);
        Auto a2 = new Auto("BB222BB", "FIAT", 2015, 2);
        Auto a3 = new Auto("CC333CC", "BMW", 2023, 7);
        Moto m1 = new Moto("DD444DD", "Yamaha", 2018, 600);
        Moto m2 = new Moto("EE555EE", "Yamaha", 2021, 900);
        Moto m3 = new Moto("FF666FF", "Honda", 2019, 300);

        noleggio.aggiungiVeicolo(a1);
        noleggio.aggiungiVeicolo(a2);
        noleggio.aggiungiVeicolo(a3);
        noleggio.aggiungiVeicolo(m1);
        noleggio.aggiungiVeicolo(m2);
        noleggio.aggiungiVeicolo(m3);

        // Test sort
        System.out.println("=== Lista ordinata per anno ===");
        noleggio.sort();
        for (Veicolo v : noleggio.getListaVeicoli()) {
            System.out.println(v.getModello() + " | anno: " + v.getAnno() + " | noleggi: " + v.getNumNoleggi());
        }

        // Test noleggiaAuto
        System.out.println("\n=== Noleggio auto (min 5 pax, dal 2018) ===");
        Auto noleggiata = noleggio.noleggiaAuto(5, 2018);
        if (noleggiata != null) {
            System.out.println("Noleggiata: " + noleggiata.getModello() + " | pax: " + noleggiata.getNumeroPax() + " | noleggi: " + noleggiata.getNumNoleggi());
        } else {
            System.out.println("Nessuna auto disponibile");
        }

        // Test noleggiaMoto
        System.out.println("\n=== Noleggio moto (Yamaha, min 700 cavalli) ===");
        Moto noleggiataM = noleggio.noleggiaMoto("Yamaha", 700);
        if (noleggiataM != null) {
            System.out.println("Noleggiata: " + noleggiataM.getModello() + " | cavalli: " + noleggiataM.getCavalli() + " | noleggi: " + noleggiataM.getNumNoleggi());
        } else {
            System.out.println("Nessuna moto disponibile");
        }

        // Test noleggio non disponibile
        System.out.println("\n=== Noleggio moto non disponibile (Ducati, min 500 cavalli) ===");
        Moto nonTrovata = noleggio.noleggiaMoto("Ducati", 500);
        if (nonTrovata != null) {
            System.out.println("Noleggiata: " + nonTrovata.getModello());
        } else {
            System.out.println("Nessuna moto disponibile");
        }

        // Test restituisciVeicolo
        System.out.println("\n=== Restituzione auto noleggiata ===");
        if (noleggiata != null) {
            noleggio.restituisciVeicolo(noleggiata);
            System.out.println("Auto restituita: " + noleggiata.getModello());
        }

        // Verifica lista dopo restituzione
        System.out.println("\n=== Lista dopo restituzione ===");
        for (Veicolo v : noleggio.getListaVeicoli()) {
            System.out.println(v.getModello() + " | anno: " + v.getAnno() + " | noleggi: " + v.getNumNoleggi());
        }

        // Test valori di default
        System.out.println("\n=== Test valori di default ===");
        Auto aDefault = new Auto("GG777GG", "FORD", 1700, 10); // anno → 2025, pax → 5
        Moto mDefault = new Moto("HH888HH", "KTM", 2022, 50);  // cavalli → 1000
        System.out.println("FORD | anno: " + aDefault.getAnno() + " | pax: " + aDefault.getNumeroPax());
        System.out.println("KTM | cavalli: " + mDefault.getCavalli());

        // Test eccezione su anno diverso da 2025
        System.out.println("\n=== Test eccezione (anno != 2025) ===");
        try {
            Auto aIllegale = new Auto("II999II", "AUDI", 2020, 4);
            noleggio.aggiungiVeicolo(aIllegale);
            System.out.println("Veicolo aggiunto senza errori");
        } catch (IllegalArgumentException e) {
            System.out.println("Eccezione catturata: " + e.getMessage());
        }
    }
}